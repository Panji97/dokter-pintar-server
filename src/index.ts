// Role aplikasi memakai bawaan users-permissions (up_roles) agar permission
// bisa diatur per-modul dari Admin Panel > Roles. Daftar peran faskes
// dipastikan ada saat bootstrap + permission disalin dari Authenticated
// supaya fungsi existing tidak terkunci.

const APP_ROLES = [
  'Admin Faskes',
  'Dokter Umum',
  'Dokter Gigi',
  'Perawat',
  'Apoteker',
  'Kasir',
  'Pengguna',
];

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'role';

async function ensureAppRoles(strapi: any) {
  const roleUid = 'plugin::users-permissions.role';
  const authRole: any = await strapi
    .documents(roleUid)
    .findFirst({ filters: { type: 'authenticated' } });
  if (!authRole) return;

  for (const name of APP_ROLES) {
    let existing: any = await strapi
      .documents(roleUid)
      .findFirst({ filters: { name } });
    if (!existing) {
      const type = slugify(name);
      const clash: any = await strapi
        .documents(roleUid)
        .findFirst({ filters: { type } });
      await strapi.documents(roleUid).create({
        data: {
          name,
          description: `${name} — akun faskes`,
          type: clash ? `${type}-${Date.now()}` : type,
        },
      });
    }
  }

  // Salin permission Authenticated ke peran baru yang masih kosong,
  // agar semua peran langsung bisa memakai API yang sama.
  // Atur pembatasan per-modul setelahnya via Admin Panel > Roles.
  // Plus: pastikan aksi custom faskes selalu aktif untuk semua peran
  // faskes (mencakup aksi baru seperti listRoles yang belum ada saat clone).
  try {
    const knex = strapi.db.connection;
    if (!knex) return;
    const authLinks: Array<{ permission_id: number }> = await knex(
      'up_permissions_role_lnk',
    )
      .where('role_id', authRole.id)
      .select('permission_id');
    const allRoles: any[] = await strapi.documents(roleUid).findMany({
      filters: { name: { $in: APP_ROLES } },
      limit: 50,
    });
    for (const r of allRoles) {
      if (r.id === authRole.id) continue;
      const count = Number(
        (await knex('up_permissions_role_lnk').where('role_id', r.id).count('* as c'))[0]?.c ??
          0,
      );
      if (count === 0 && authLinks.length > 0) {
        const rows = authLinks.map((l) => ({
          permission_id: l.permission_id,
          role_id: r.id,
        }));
        // Insert bertahap agar tidak kena batas parameter.
        for (let i = 0; i < rows.length; i += 100) {
          await knex('up_permissions_role_lnk')
            .insert(rows.slice(i, i + 100))
            .onConflict(['permission_id', 'role_id'])
            .ignore();
        }
      }
    }

    const faskesActions = [
      'api::faskes.faskes.inviteStaff',
      'api::faskes.faskes.listStaff',
      'api::faskes.faskes.listRoles',
      'api::faskes.faskes.me',
    ];
    const targetIds = [...allRoles.map((r) => r.id), authRole.id];
    for (const action of faskesActions) {
      let perm = await knex('up_permissions').where('action', action).first();
      if (!perm) {
        // Buat baris permission bila sync Strapi belum membuatnya
        // (mis. aksi baru + server belum full-restart).
        const docId =
          Math.random().toString(36).slice(2, 14) + Math.random().toString(36).slice(2, 14);
        try {
          await knex('up_permissions').insert({
            document_id: docId,
            action,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
          });
        } catch {
          /* kemungkinan sudah dibuat bersamaan — lanjut */
        }
        perm = await knex('up_permissions').where('action', action).first();
        if (!perm) continue;
      }
      const rows = targetIds.map((role_id) => ({ permission_id: perm.id, role_id }));
      for (let i = 0; i < rows.length; i += 100) {
        await knex('up_permissions_role_lnk')
          .insert(rows.slice(i, i + 100))
          .onConflict(['permission_id', 'role_id'])
          .ignore();
      }
    }
  } catch {
    /* abaikan — admin bisa atur manual via Roles */
  }
}

async function migrateLegacyAppRole(strapi: any) {
  // Migrasi sekali jalan: up_users.app_role (string lama) -> relasi role bawaan.
  // Aman bila kolom sudah dihapus (skip).
  try {
    const knex = strapi.db.connection;
    if (!knex) return;
    const hasCol = await knex.schema.hasColumn('up_users', 'app_role');
    if (!hasCol) return;
    const rows: Array<{ id: number; app_role: string | null }> = await knex(
      'up_users',
    ).select('id', 'app_role');
    if (rows.length === 0) return;
    const roleUid = 'plugin::users-permissions.role';
    const cache = new Map<string, number>();
    const resolveRoleId = async (name: string): Promise<number | null> => {
      const key = name.trim() || 'Pengguna';
      if (cache.has(key)) return cache.get(key)!;
      const found: any = await strapi
        .documents(roleUid)
        .findFirst({ filters: { name: key } });
      const id = found?.id ?? null;
      if (id) cache.set(key, id);
      return id;
    };
    for (const row of rows) {
      const want = (row.app_role ?? '').trim();
      if (!want) continue;
      const roleId = await resolveRoleId(want);
      if (!roleId) continue;
      const link = await knex('up_users_role_lnk')
        .where('user_id', row.id)
        .first();
      if (link) {
        if (link.role_id !== roleId) {
          await knex('up_users_role_lnk').where('user_id', row.id).update({ role_id: roleId });
        }
      } else {
        await knex('up_users_role_lnk').insert({ user_id: row.id, role_id: roleId });
      }
    }
  } catch {
    /* abaikan — migrasi manual via SQL bila perlu */
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: any) {
    await ensureAppRoles(strapi);
    await migrateLegacyAppRole(strapi);
  },
};
