/**
 * faskes controller — core CRUD bawaan + aksi custom multi-tenant:
 * - POST /api/faskes/register (publik): daftar faskes baru + akun Admin Faskes
 * - POST /api/faskes/staff (admin faskes): undang akun login staf di faskesnya
 * - GET  /api/faskes/staff (login): daftar akun login di faskesnya
 * - GET  /api/faskes/roles (login): daftar role bawaan Strapi yang bisa dipilih
 *
 * Peran memakai relasi bawaan users-permissions (`role`), bukan field
 * custom `appRole`, agar permission bisa diatur per-modul via Admin Panel > Roles.
 */
import { factories } from '@strapi/strapi';
import { errors } from '@strapi/utils';

const { ValidationError, UnauthorizedError, ForbiddenError } = errors;

const ROLE_UID = 'plugin::users-permissions.role';
const USER_UID = 'plugin::users-permissions.user';

// Hanya peran ini yang boleh mengundang staf.
const ADMIN_ROLE_NAMES = ['Admin Faskes', 'Administrator'];

const roleName = (u: any): string => {
  const r = Array.isArray(u?.role) ? u.role[0] : u?.role;
  return String(r?.name ?? '');
};

const sanitizeUser = (u: any) => {
  const r = Array.isArray(u.role) ? u.role[0] : u.role;
  return {
    id: u.id,
    documentId: u.documentId,
    username: u.username,
    email: u.email,
    role: r
      ? { id: r.id, documentId: r.documentId, name: r.name, type: r.type }
      : null,
    faskes: u.faskes
      ? { documentId: u.faskes.documentId, name: u.faskes.name }
      : null,
  };
};

async function getCaller(strapi: any, ctx: any) {
  const docId = ctx.state?.user?.documentId;
  if (!docId) throw new UnauthorizedError('Login diperlukan.');
  const me: any = await strapi.documents(USER_UID).findOne({
    documentId: docId,
    populate: ['faskes', 'role'],
  });
  if (!me || me.blocked) throw new UnauthorizedError('Akun tidak valid.');
  if (!me.faskes) throw new ForbiddenError('Akun belum terikat ke faskes.');
  return me;
}

async function findRoleByName(strapi: any, name: string) {
  return strapi.documents(ROLE_UID).findFirst({ filters: { name } });
}

async function resolveRole(strapi: any, input: unknown): Promise<any> {
  const raw = String(input ?? '').trim();
  if (!raw) throw new ValidationError('Peran wajib dipilih.');
  // Dukung id numerik, documentId, nama, maupun type.
  const asId = Number(raw);
  let found: any = null;
  if (Number.isInteger(asId) && asId > 0) {
    found = await strapi.db.query(ROLE_UID).findOne({ where: { id: asId } });
  }
  if (!found) {
    found = await strapi.documents(ROLE_UID).findFirst({
      filters: {
        $or: [{ name: raw }, { type: raw }, { documentId: raw }],
      },
    });
  }
  if (!found) throw new ValidationError('Peran tidak dikenal.');
  if (['public'].includes(String(found.type))) {
    throw new ValidationError('Peran tersebut tidak boleh dipakai untuk staf.');
  }
  return found;
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
      .documents(USER_UID)
      .findFirst({ filters: { email } });
    if (existingUser) throw new ValidationError('Email sudah terdaftar.');

    const created: any = await strapi.documents('api::faskes.faskes').create({
      data: {
        name,
        address: String(f.address ?? '').trim() || undefined,
        phone: String(f.phone ?? '').trim() || undefined,
      },
    });

    const adminRole =
      (await findRoleByName(strapi, 'Admin Faskes')) ??
      (await strapi.documents(ROLE_UID).findFirst({ filters: { type: 'authenticated' } }));
    if (!adminRole) throw new ValidationError('Role Admin Faskes / Authenticated tidak ditemukan.');

    let user: any = null;
    try {
      user = await strapi.documents(USER_UID).create({
        data: {
          username,
          email,
          password,
          confirmed: true,
          blocked: false,
          provider: 'local',
          role: adminRole.documentId ?? adminRole.id,
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
          await strapi.documents(USER_UID).delete({
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
    const full = await strapi.documents(USER_UID).findOne({
      documentId: user.documentId,
      populate: ['faskes', 'role'],
    });

    ctx.send({
      data: {
        jwt,
        faskes: { documentId: created.documentId, name: created.name },
        user: sanitizeUser({ ...(full ?? user), faskes: full?.faskes ?? created }),
      },
      meta: {},
    });
  },

  async inviteStaff(ctx: any) {
    const me = await getCaller(strapi, ctx);
    if (!ADMIN_ROLE_NAMES.includes(roleName(me)))
      throw new ForbiddenError('Hanya admin faskes yang bisa mengundang staf.');

    const payload = ctx.request.body?.data ?? ctx.request.body ?? {};
    const cleanName = String(payload.name ?? '').trim();
    const cleanEmail = String(payload.email ?? '').trim().toLowerCase();
    const pw = String(payload.password ?? '');
    // Terima `role` (nama/id/documentId/type bawaan Strapi).
    // Tetap terima `appRole` lama sebagai alias agar client lama tidak pecah.
    const roleInput = payload.role ?? payload.roleId ?? payload.appRole ?? 'Pengguna';

    if (cleanName.length < 3) throw new ValidationError('Nama staf minimal 3 karakter.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail))
      throw new ValidationError('Email staf tidak valid.');
    if (pw.length < 6) throw new ValidationError('Kata sandi minimal 6 karakter.');
    const targetRole = await resolveRole(strapi, roleInput);

    const existing: any = await strapi
      .documents(USER_UID)
      .findFirst({ filters: { email: cleanEmail } });
    if (existing) throw new ValidationError('Email sudah terdaftar.');

    const user: any = await strapi.documents(USER_UID).create({
      data: {
        username: cleanName,
        email: cleanEmail,
        password: pw,
        confirmed: true,
        blocked: false,
        provider: 'local',
        role: targetRole.documentId ?? targetRole.id,
        faskes: me.faskes.documentId,
      },
    });
    const full = await strapi.documents(USER_UID).findOne({
      documentId: user.documentId,
      populate: ['faskes', 'role'],
    });

    ctx.send({ data: sanitizeUser({ ...(full ?? user), faskes: full?.faskes ?? me.faskes }), meta: {} });
  },

  async listStaff(ctx: any) {
    const me = await getCaller(strapi, ctx);
    const users: any[] = await strapi.documents(USER_UID).findMany({
      filters: { faskes: { documentId: me.faskes.documentId } },
      populate: ['faskes', 'role'],
      sort: 'createdAt:asc',
      limit: 100,
    });
    ctx.send({ data: users.map(sanitizeUser), meta: { count: users.length } });
  },

  async listRoles(ctx: any) {
    await getCaller(strapi, ctx);
    const roles: any[] = await strapi.documents(ROLE_UID).findMany({
      sort: 'name:asc',
      limit: 50,
    });
    ctx.send({
      data: roles
        .filter((r) => r.type !== 'public')
        .map((r) => ({ id: r.id, documentId: r.documentId, name: r.name, type: r.type })),
      meta: { count: roles.length },
    });
  },

  // Profil diri + role bawaan (pengganti /users/me yang tidak mengembalikan role).
  async me(ctx: any) {
    const me = await getCaller(strapi, ctx);
    ctx.send({ data: sanitizeUser(me), meta: {} });
  },
}));
