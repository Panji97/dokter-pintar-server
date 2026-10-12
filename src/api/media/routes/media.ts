export default {
  routes: [
    {
      method: 'POST',
      path: '/media/signed-urls',
      handler: 'media.signedUrls',
      // Tanpa `auth: false` → wajib JWT + permission Authenticated
      // `media.signedUrls` di Strapi Admin (beda vs HRIS yang publik).
    },
  ],
};
