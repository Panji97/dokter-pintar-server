// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * CATATAN: permission role diatur langsung di database
   * (tabel up_permissions) — bukan lewat kode di sini.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
