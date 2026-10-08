/**
 * faskes controller — core CRUD bawaan + 3 aksi custom multi-tenant:
 * - POST /api/faskes/register (publik): daftar faskes baru + akun Admin Faskes
 * - POST /api/faskes/staff (admin faskes): undang akun login staf di faskesnya
 * - GET  /api/faskes/staff (login): daftar akun login di faskesnya
 */
import { factories } from '@strapi/strapi';
import { errors } from '@strapi/utils';

const { ValidationError, UnauthorizedError, ForbiddenError } = errors;

const ADMIN_ROLES = ['Administrator', 'Admin Faskes'];
const STAFF_ROLES = [
  'Admin Faskes',
  'Dokter Gigi',
  'Dokter Umum',
  'Perawat',
  'Apoteker',
  'Kasir',
  'Pengguna',
];

const sanitizeUser = (u: any) => ({
  id: u.id,
  documentId: u.documentId,
  username: u.username,
  email: u.email,
  appRole: u.appRole,
  faskes: u.faskes
    ? { documentId: u.faskes.documentId, name: u.faskes.name }
    : null,
});

async function getCaller(strapi: any, ctx: any) {
  const docId = ctx.state?.user?.documentId;
  if (!docId) throw new UnauthorizedError('Login diperlukan.');
  const me: any = await strapi.documents('plugin::users-permissions.user').findOne({
    documentId: docId,
    populate: ['faskes', 'role'],
  });
  if (!me || me.blocked) throw new UnauthorizedError('Akun tidak valid.');
  if (!me.faskes) throw new ForbiddenError('Akun belum terikat ke faskes.');
  return me;
}

async function getAuthRole(strapi: any) {
  const role: any = await strapi.documents('plugin::users-permissions.role').findFirst({
    filters: { type: 'authenticated' },
  });
  if (!role) throw new ValidationError('Role Authenticated tidak ditemukan.');
  return role;
}

/**
 * Salin master global (ms-*) menjadi data awal faskes baru.
 * Faskes baru langsung bisa dipakai tanpa isi master di Pengaturan.
 */
const MASTER_COPIES: Array<{ from: string; to: string; pick: string[]; defaults?: Record<string, unknown> }> = [
  { from: 'api::ms-poli.ms-poli', to: 'api::room.room', pick: ['name', 'satusehat'] },
  { from: 'api::ms-patient-group.ms-patient-group', to: 'api::patient-group.patient-group', pick: ['name', 'code', 'description'] },
  { from: 'api::ms-service.ms-service', to: 'api::clinic-service.clinic-service', pick: ['code', 'name', 'price', 'room'] },
  { from: 'api::ms-medicine.ms-medicine', to: 'api::medicine.medicine', pick: ['code', 'name', 'category', 'form', 'unit', 'minStock', 'price', 'supplier'], defaults: { stock: 0 } },
  { from: 'api::ms-supplier.ms-supplier', to: 'api::supplier.supplier', pick: ['code', 'name', 'phone', 'address'] },
  { from: 'api::ms-factory.ms-factory', to: 'api::factory.factory', pick: ['code', 'name'] },
  { from: 'api::ms-brand.ms-brand', to: 'api::brand.brand', pick: ['code', 'name'] },
];

async function seedFaskesMasters(strapi: any, faskesDocumentId: string) {
  for (const { from, to, pick, defaults } of MASTER_COPIES) {
    const templates: any[] = await strapi.documents(from).findMany({ limit: 1000 });
    for (const t of templates) {
      const data: Record<string, unknown> = { faskes: faskesDocumentId };
      for (const key of pick) {
        if (t[key] !== undefined && t[key] !== null) data[key] = t[key];
      }
      Object.assign(data, defaults ?? {});
      await strapi.documents(to).create({ data });
    }
  }
}

export default factories.createCoreController('api::faskes.faskes', ({ strapi }: any) => ({
  async register(ctx: any) {
    const { faskes: f = {}, admin: a = {} } = ctx.request.body ?? {};
    const name = String(f.name ?? '').trim();
    const email = String(a.email ?? '').trim().toLowerCase();
    const username = String(a.name ?? '').trim();
    const password = String(a.password ?? '');

    if (name.length < 3) throw new ValidationError('Nama faskes minimal 3 karakter.');
    if (username.length < 3) throw new ValidationError('Nama admin minimal 3 karakter.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      throw new ValidationError('Email admin tidak valid.');
    if (password.length < 6) throw new ValidationError('Kata sandi minimal 6 karakter.');

    const existingFaskes: any = await strapi.documents('api::faskes.faskes').findFirst({
      filters: { name },
    });
    if (existingFaskes) throw new ValidationError('Nama faskes sudah terdaftar.');
    const existingUser: any = await strapi
      .documents('plugin::users-permissions.user')
      .findFirst({ filters: { email } });
    if (existingUser) throw new ValidationError('Email sudah terdaftar.');

    const created: any = await strapi.documents('api::faskes.faskes').create({
      data: {
        name,
        address: String(f.address ?? '').trim() || undefined,
        phone: String(f.phone ?? '').trim() || undefined,
      },
    });

    const authRole = await getAuthRole(strapi);

    let user: any = null;
    try {
      user = await strapi.documents('plugin::users-permissions.user').create({
        data: {
          username,
          email,
          password,
          confirmed: true,
          blocked: false,
          provider: 'local',
          role: authRole.id,
          appRole: 'Admin Faskes',
          faskes: created.documentId,
        },
      });

      await seedFaskesMasters(strapi, created.documentId);

      // Buat akun pendaftar sebagai staf pertama agar faskes langsung bisa registrasi pasien
      await strapi.documents('api::staff.staff').create({
        data: {
          name: username,
          role: 'Dokter Umum',
          room: 'Poli Umum',
          active: true,
          faskes: created.documentId,
        },
      });
    } catch (err) {
      // Rollback parsial agar percobaan ulang tidak kena "sudah terdaftar".
      try {
        if (user?.documentId) {
          await strapi.documents('plugin::users-permissions.user').delete({
            documentId: user.documentId,
          });
        }
        await strapi.documents('api::faskes.faskes').delete({
          documentId: created.documentId,
        });
      } catch {
        /* abaikan kegagalan rollback */
      }
      throw err;
    }

    const jwt = await strapi.plugin('users-permissions').service('jwt').issue({ id: user.id });

    ctx.send({
      data: {
        jwt,
        faskes: { documentId: created.documentId, name: created.name },
        user: sanitizeUser({ ...user, faskes: created }),
      },
      meta: {},
    });
  },

  async inviteStaff(ctx: any) {
    const me = await getCaller(strapi, ctx);
    if (!ADMIN_ROLES.includes(me.appRole))
      throw new ForbiddenError('Hanya admin faskes yang bisa mengundang staf.');

    const payload = ctx.request.body?.data ?? ctx.request.body ?? {};
    const cleanName = String(payload.name ?? '').trim();
    const cleanEmail = String(payload.email ?? '').trim().toLowerCase();
    const pw = String(payload.password ?? '');
    const appRole = String(payload.appRole ?? 'Pengguna');

    if (cleanName.length < 3) throw new ValidationError('Nama staf minimal 3 karakter.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail))
      throw new ValidationError('Email staf tidak valid.');
    if (pw.length < 6) throw new ValidationError('Kata sandi minimal 6 karakter.');
    if (!STAFF_ROLES.includes(appRole)) throw new ValidationError('Peran tidak dikenal.');

    const existing: any = await strapi
      .documents('plugin::users-permissions.user')
      .findFirst({ filters: { email: cleanEmail } });
    if (existing) throw new ValidationError('Email sudah terdaftar.');

    const authRole = await getAuthRole(strapi);

    const user: any = await strapi.documents('plugin::users-permissions.user').create({
      data: {
        username: cleanName,
        email: cleanEmail,
        password: pw,
        confirmed: true,
        blocked: false,
        provider: 'local',
        role: authRole.id,
        appRole,
        faskes: me.faskes.documentId,
      },
    });

    ctx.send({ data: sanitizeUser({ ...user, faskes: me.faskes }), meta: {} });
  },

  async listStaff(ctx: any) {
    const me = await getCaller(strapi, ctx);
    const users: any[] = await strapi.documents('plugin::users-permissions.user').findMany({
      filters: { faskes: { documentId: me.faskes.documentId } },
      populate: ['faskes'],
      sort: 'createdAt:asc',
      limit: 100,
    });
    ctx.send({ data: users.map(sanitizeUser), meta: { count: users.length } });
  },
}));
