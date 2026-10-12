import { errors } from '@strapi/utils';

const { ValidationError, UnauthorizedError, ForbiddenError } = errors;

/**
 * media controller — baca file private MinIO tanpa membuka bucket ke publik.
 *
 * - POST /api/media/signed-urls { ids: number[], expiresIn?: detik }
 *   → { data: [{ id, documentId, name, mime, signedUrl, expiresIn }] }
 *
 * Beda vs HRIS (`api/download`, 1 request per file + `auth: false`):
 * - Batch: seluruh foto satu kunjungan cukup 1 request (hemat N query DB).
 * - Wajib login (tanpa `auth: false`) + file difilter kepemilikan faskes:
 *   file yang terhubung ke emr-document faskes lain DILEWATI DIAM-DIAM
 *   (tak membocorkan keberadaan file), file fresh-upload dikenali via
 *   `caption` = documentId faskes yang diisi client saat upload.
 */
async function getCallerFaskesId(strapi: any, ctx: any): Promise<string> {
  const docId = ctx.state?.user?.documentId;
  if (!docId) throw new UnauthorizedError('Login diperlukan.');
  const me: any = await strapi.documents('plugin::users-permissions.user').findOne({
    documentId: docId,
    populate: ['faskes'],
  });
  const fk = Array.isArray(me?.faskes) ? me.faskes[0] : me?.faskes;
  if (!fk?.documentId) throw new ForbiddenError('Akun belum terikat ke faskes.');
  return fk.documentId as string;
}

export default ({ strapi }: { strapi: any }) => ({
  async signedUrls(ctx: any) {
    const body = ctx.request.body?.data ?? ctx.request.body ?? {};
    const rawIds = Array.isArray(body.ids) ? body.ids : [];
    const ids = [...new Set(rawIds.map(Number).filter((n: number) => Number.isInteger(n) && n > 0))].slice(0, 50);
    if (ids.length === 0) throw new ValidationError('ids wajib diisi (array id file, maks 50).');
    let expiresIn = Math.floor(Number(body.expiresIn ?? 1800));
    if (!Number.isFinite(expiresIn)) expiresIn = 1800;
    expiresIn = Math.min(7200, Math.max(60, expiresIn));

    const faskesId = await getCallerFaskesId(strapi, ctx);

    const files: any[] = await strapi.db.query('plugin::upload.file').findMany({
      where: { id: { $in: ids } },
    });
    if (files.length === 0) return { data: [] };

    // Peta file → faskes pemilik (lewat relasi emr-document.photos).
    const links: any[] = await strapi.db.query('api::emr-document.emr-document').findMany({
      where: { photos: { id: { $in: ids } } },
      populate: { photos: true, faskes: true },
    });
    const ownerOf = new Map<number, string | null>();
    for (const d of links) {
      const fk = Array.isArray(d.faskes) ? d.faskes[0] : d.faskes;
      for (const p of d.photos ?? []) ownerOf.set(p.id, fk?.documentId ?? null);
    }

    const minio = strapi.service('api::media.minio');
    const out: Array<{ id: number; documentId: string; name: string; mime: string; signedUrl: string; expiresIn: number }> = [];
    for (const f of files) {
      const owner = ownerOf.has(f.id) ? ownerOf.get(f.id) : undefined;
      const allowed = owner !== undefined
        // Sudah terhubung ke EMR → hanya faskes pemilik yang boleh.
        ? owner === faskesId
        // Fresh-upload (belum di-Selesai-kan) → cocokkan caption titipan client.
        : f.caption === faskesId;
      if (!allowed) continue;
      const signedUrl = await minio.signKey(`${f.hash}${f.ext}`, expiresIn);
      out.push({ id: f.id, documentId: f.documentId, name: f.name, mime: f.mime, signedUrl, expiresIn });
    }
    return { data: out };
  },
});
