/**
 * faskes-scope — penegakan sekat tenant di level server.
 *
 * - POST ke 23 collection: otomatis isi `faskes` dari user login bila kosong;
 *   tolak (403) bila mengisi faskes milik tenant lain.
 * - GET list: paksa filter faskes milik user (abaikan filter faskes dari client).
 * - GET/PUT/DELETE satuan: hanya boleh bila record milik faskes user (404 bila bukan).
 * - /api/faskes-list: user hanya boleh melihat faskesnya sendiri.
 *
 * Dilewati: /api/faskes/* (custom register/staff punya cek sendiri),
 * /api/auth/*, /api/users/*, /api/upload*, /admin/*.
 */
import { errors } from '@strapi/utils';

const { ForbiddenError, NotFoundError } = errors;

// plural -> uid untuk 23 collection ber-tenant
const SCOPED: Record<string, string> = {
  patients: 'api::patient.patient',
  registrations: 'api::registration.registration',
  bookings: 'api::booking.booking',
  'emr-documents': 'api::emr-document.emr-document',
  invoices: 'api::invoice.invoice',
  'apotek-invoices': 'api::apotek-invoice.apotek-invoice',
  'insurance-claims': 'api::insurance-claim.insurance-claim',
  letters: 'api::letter.letter',
  referrals: 'api::referral.referral',
  medicines: 'api::medicine.medicine',
  suppliers: 'api::supplier.supplier',
  factories: 'api::factory.factory',
  brands: 'api::brand.brand',
  penerimaans: 'api::penerimaan.penerimaan',
  pengeluarans: 'api::pengeluaran.pengeluaran',
  penyesuaians: 'api::penyesuaian.penyesuaian',
  returs: 'api::retur.retur',
  rooms: 'api::room.room',
  'patient-groups': 'api::patient-group.patient-group',
  'clinic-services': 'api::clinic-service.clinic-service',
  'service-packages': 'api::service-package.service-package',
  'service-discounts': 'api::service-discount.service-discount',
  staffs: 'api::staff.staff',
  'staff-schedules': 'api::staff-schedule.staff-schedule',
};

export default (_config: unknown, { strapi }: any) => {
  return async (ctx: any, next: () => Promise<void>) => {
    const m = /^\/api\/([a-z-]+)(?:\/([^/]+))?$/.exec(ctx.path ?? '');
    if (!m) return next();
    const [, plural, docId] = m;
    const isFaskesList = plural === 'faskes-list';
    const uid = SCOPED[plural];
    if (!uid && !isFaskesList) return next();

    // Catatan: middleware global jalan SEBELUM auth users-permissions,
    // jadi verifikasi JWT manual di sini.
    const header = ctx.request.header?.authorization as string | undefined;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return next(); // anonim -> gagal di permission seperti biasa

    let fid: string | undefined;
    try {
      const payload: any = await strapi
        .plugin('users-permissions')
        .service('jwt')
        .verify(token);
      const userId = payload?.id ?? payload?.userId;
      if (!userId) return next();
      const u: any = await strapi.db
        .query('plugin::users-permissions.user')
        .findOne({ where: { id: Number(userId) }, populate: { faskes: true } });
      if (!u || u.blocked) return next();
      const fk = Array.isArray(u.faskes) ? u.faskes[0] : u.faskes;
      fid = (fk?.document_id ?? fk?.documentId) as string | undefined;
    } catch {
      return next(); // token tidak valid -> biar route yang menolak
    }
    if (!fid) throw new ForbiddenError('Akun belum terikat ke faskes.');

    const method = ctx.method as string;

    if (isFaskesList) {
      if ((method === 'GET' || method === 'HEAD') && !docId) {
        ctx.query = {
          ...(ctx.query as object),
          filters: { documentId: { $eq: fid } },
        };
        return next();
      }
      if (docId && docId !== fid) throw new NotFoundError('Not Found');
      return next();
    }

    if (method === 'POST') {
      const data = ctx.request.body?.data;
      if (data) {
        const want = data.faskes;
        if (!want) {
          data.faskes = fid;
        } else if (want !== fid && want?.documentId !== fid && want?.id !== fid) {
          // bentuk string documentId / {documentId} / {id} yang bukan miliknya
          const normalized =
            typeof want === 'string' ? want : (want.documentId ?? String(want.id ?? ''));
          if (normalized !== fid) throw new ForbiddenError('Faskes tidak sesuai.');
        }
      }
      return next();
    }

    if ((method === 'GET' || method === 'HEAD') && !docId) {
      const q = (ctx.query ?? {}) as Record<string, unknown>;
      const filters = (q.filters ?? {}) as Record<string, unknown>;
      ctx.query = { ...q, filters: { ...filters, faskes: { documentId: { $eq: fid } } } };
      return next();
    }

    if (docId && ['GET', 'HEAD', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      if (method === 'PUT' || method === 'PATCH') {
        const want = ctx.request.body?.data?.faskes;
        if (want) {
          const normalized =
            typeof want === 'string' ? want : (want.documentId ?? String(want.id ?? ''));
          if (normalized !== fid) throw new ForbiddenError('Faskes tidak sesuai.');
        }
      }
      const rec: any = await strapi.documents(uid).findOne({
        documentId: docId,
        populate: ['faskes'],
      });
      const owner = rec?.faskes?.documentId;
      if (!rec || owner !== fid) throw new NotFoundError('Not Found');
      return next();
    }

    return next();
  };
};
