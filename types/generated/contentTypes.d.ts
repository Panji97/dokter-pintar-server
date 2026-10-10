import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    adminPermissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::permission'
    >;
    adminUserOwner: Schema.Attribute.Relation<'manyToOne', 'admin::user'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    kind: Schema.Attribute.Enumeration<['content-api', 'admin']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'content-api'>;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    apiToken: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    apiTokens: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordTokenExpiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiApotekInvoiceItemApotekInvoiceItem
  extends Struct.CollectionTypeSchema {
  collectionName: 'apotek_invoice_items';
  info: {
    displayName: 'ApotekInvoiceItem';
    pluralName: 'apotek-invoice-items';
    singularName: 'apotek-invoice-item';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    apotek_invoice: Schema.Attribute.Relation<
      'manyToOne',
      'api::apotek-invoice.apotek-invoice'
    >;
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::apotek-invoice-item.apotek-invoice-item'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    qty: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiApotekInvoiceApotekInvoice
  extends Struct.CollectionTypeSchema {
  collectionName: 'apotek_invoices';
  info: {
    displayName: 'ApotekInvoice';
    pluralName: 'apotek-invoices';
    singularName: 'apotek-invoice';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    items: Schema.Attribute.Relation<
      'oneToMany',
      'api::apotek-invoice-item.apotek-invoice-item'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::apotek-invoice.apotek-invoice'
    > &
      Schema.Attribute.Private;
    patient: Schema.Attribute.Relation<'manyToOne', 'api::patient.patient'>;
    patientName: Schema.Attribute.String;
    paymentStatus: Schema.Attribute.Enumeration<['Belum Dibayar', 'Lunas']> &
      Schema.Attribute.DefaultTo<'Belum Dibayar'>;
    publishedAt: Schema.Attribute.DateTime;
    total: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    type: Schema.Attribute.Enumeration<['Obat Bebas', 'Obat Resep']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBookingBooking extends Struct.CollectionTypeSchema {
  collectionName: 'bookings';
  info: {
    displayName: 'Booking';
    pluralName: 'bookings';
    singularName: 'booking';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    doctor: Schema.Attribute.String;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::booking.booking'
    > &
      Schema.Attribute.Private;
    patient: Schema.Attribute.Relation<'manyToOne', 'api::patient.patient'>;
    patientName: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    serviceType: Schema.Attribute.String;
    source: Schema.Attribute.Enumeration<
      ['HelloDokterPintar', 'BPJS', 'Manual']
    >;
    status: Schema.Attribute.Enumeration<
      ['Menunggu Konfirmasi', 'Terjadwal', 'Selesai', 'Dibatalkan']
    >;
    time: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBrandBrand extends Struct.CollectionTypeSchema {
  collectionName: 'brands';
  info: {
    displayName: 'Faskes Brand';
    pluralName: 'brands';
    singularName: 'brand';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::brand.brand'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiClinicServiceClinicService
  extends Struct.CollectionTypeSchema {
  collectionName: 'clinic_services';
  info: {
    displayName: 'Faskes Pelayanan';
    pluralName: 'clinic-services';
    singularName: 'clinic-service';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::clinic-service.clinic-service'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    room: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEmrAlkesEmrAlkes extends Struct.CollectionTypeSchema {
  collectionName: 'emr_alkes_list';
  info: {
    displayName: 'EmrAlkes';
    pluralName: 'emr-alkes-list';
    singularName: 'emr-alkes';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    emr_document: Schema.Attribute.Relation<
      'manyToOne',
      'api::emr-document.emr-document'
    >;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-alkes.emr-alkes'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    qty: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEmrDiagnosaEmrDiagnosa extends Struct.CollectionTypeSchema {
  collectionName: 'emr_diagnosas';
  info: {
    displayName: 'EmrDiagnosa';
    pluralName: 'emr-diagnosas';
    singularName: 'emr-diagnosa';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    emr_document: Schema.Attribute.Relation<
      'manyToOne',
      'api::emr-document.emr-document'
    >;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    icd10Code: Schema.Attribute.String;
    icd10Desc: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-diagnosa.emr-diagnosa'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    tipe: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEmrDocumentEmrDocument extends Struct.CollectionTypeSchema {
  collectionName: 'emr_documents';
  info: {
    displayName: 'EmrDocument';
    pluralName: 'emr-documents';
    singularName: 'emr-document';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    alergiDebu: Schema.Attribute.String;
    alergiGatal: Schema.Attribute.String;
    alergiLainnya: Schema.Attribute.String;
    alergiMakanan: Schema.Attribute.String;
    alergiObat: Schema.Attribute.String;
    alergiUdara: Schema.Attribute.String;
    alkes: Schema.Attribute.Relation<'oneToMany', 'api::emr-alkes.emr-alkes'>;
    beratBadan: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deskripsiPemeriksaan: Schema.Attribute.Text;
    diagnosa: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-diagnosa.emr-diagnosa'
    >;
    diastema: Schema.Attribute.String;
    dokumenAsesmenAwal: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    dokumenAsesmenPraTindakan: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    dokumenGeneralConsent: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    dokumenInformedConsent: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    dokumenSurgicalSafety: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    gigiAnomali: Schema.Attribute.String;
    gigiMulut: Schema.Attribute.String;
    gravida: Schema.Attribute.String;
    keluhanTambahan: Schema.Attribute.Text;
    keluhanUtama: Schema.Attribute.Text;
    kondisi: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-kondisi.emr-kondisi'
    >;
    kulit: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-document.emr-document'
    > &
      Schema.Attribute.Private;
    mata: Schema.Attribute.String;
    nadi: Schema.Attribute.String;
    occlusi: Schema.Attribute.String;
    odontogramGigi: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-odontogram-gigi.emr-odontogram-gigi'
    >;
    odontoLain: Schema.Attribute.String;
    palatum: Schema.Attribute.String;
    patient: Schema.Attribute.Relation<'manyToOne', 'api::patient.patient'>;
    penyakitSaatIni: Schema.Attribute.Text;
    pernapasan: Schema.Attribute.String;
    photoCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    regId: Schema.Attribute.String & Schema.Attribute.Required;
    registration: Schema.Attribute.Relation<
      'manyToOne',
      'api::registration.registration'
    >;
    reseps: Schema.Attribute.Relation<'oneToMany', 'api::emr-resep.emr-resep'>;
    riwayatPenyakit: Schema.Attribute.Text;
    suhu: Schema.Attribute.String;
    tensiDiastolik: Schema.Attribute.String;
    tensiSistolik: Schema.Attribute.String;
    tindakan: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-tindakan.emr-tindakan'
    >;
    tinggiBadan: Schema.Attribute.String;
    torusMandibularis: Schema.Attribute.String;
    torusPlatinus: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEmrKondisiEmrKondisi extends Struct.CollectionTypeSchema {
  collectionName: 'emr_kondisis';
  info: {
    displayName: 'EmrKondisi';
    pluralName: 'emr-kondisis';
    singularName: 'emr-kondisi';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deskripsi: Schema.Attribute.Text;
    emr_document: Schema.Attribute.Relation<
      'manyToOne',
      'api::emr-document.emr-document'
    >;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-kondisi.emr-kondisi'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    toothNumber: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEmrOdontogramGigiEmrOdontogramGigi
  extends Struct.CollectionTypeSchema {
  collectionName: 'emr_odontogram_gigis';
  info: {
    displayName: 'EmrOdontogramGigi';
    pluralName: 'emr-odontogram-gigis';
    singularName: 'emr-odontogram-gigi';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    condition: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    emr_document: Schema.Attribute.Relation<
      'manyToOne',
      'api::emr-document.emr-document'
    >;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-odontogram-gigi.emr-odontogram-gigi'
    > &
      Schema.Attribute.Private;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    surfaceBottom: Schema.Attribute.String;
    surfaceCenter: Schema.Attribute.String;
    surfaceLeft: Schema.Attribute.String;
    surfaceRight: Schema.Attribute.String;
    surfaceTop: Schema.Attribute.String;
    toothNumber: Schema.Attribute.Integer & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEmrResepItemEmrResepItem
  extends Struct.CollectionTypeSchema {
  collectionName: 'emr_resep_items';
  info: {
    displayName: 'EmrResepItem';
    pluralName: 'emr-resep-items';
    singularName: 'emr-resep-item';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-resep-item.emr-resep-item'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    qty: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    resep: Schema.Attribute.Relation<'manyToOne', 'api::emr-resep.emr-resep'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEmrResepEmrResep extends Struct.CollectionTypeSchema {
  collectionName: 'emr_reseps';
  info: {
    displayName: 'EmrResep';
    pluralName: 'emr-reseps';
    singularName: 'emr-resep';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    emr_document: Schema.Attribute.Relation<
      'manyToOne',
      'api::emr-document.emr-document'
    >;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    items: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-resep-item.emr-resep-item'
    >;
    jenis: Schema.Attribute.Enumeration<['apotek', 'rujukan']> &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-resep.emr-resep'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    urutan: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface ApiEmrTindakanEmrTindakan extends Struct.CollectionTypeSchema {
  collectionName: 'emr_tindakans';
  info: {
    displayName: 'EmrTindakan';
    pluralName: 'emr-tindakans';
    singularName: 'emr-tindakan';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    discount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    emr_document: Schema.Attribute.Relation<
      'manyToOne',
      'api::emr-document.emr-document'
    >;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-tindakan.emr-tindakan'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    qty: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    tooth: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFactoryFactory extends Struct.CollectionTypeSchema {
  collectionName: 'factories';
  info: {
    displayName: 'Faskes Pabrik';
    pluralName: 'factories';
    singularName: 'factory';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::factory.factory'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFaskesFaskes extends Struct.CollectionTypeSchema {
  collectionName: 'faskes_list';
  info: {
    displayName: 'Faskes';
    pluralName: 'faskes-list';
    singularName: 'faskes';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    address: Schema.Attribute.Text;
    apotek_invoice_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::apotek-invoice-item.apotek-invoice-item'
    >;
    apotek_invoices: Schema.Attribute.Relation<
      'oneToMany',
      'api::apotek-invoice.apotek-invoice'
    >;
    bookings: Schema.Attribute.Relation<'oneToMany', 'api::booking.booking'>;
    brands: Schema.Attribute.Relation<'oneToMany', 'api::brand.brand'>;
    clinic_services: Schema.Attribute.Relation<
      'oneToMany',
      'api::clinic-service.clinic-service'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    emr_alkes_list: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-alkes.emr-alkes'
    >;
    emr_diagnosas: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-diagnosa.emr-diagnosa'
    >;
    emr_documents: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-document.emr-document'
    >;
    emr_kondisis: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-kondisi.emr-kondisi'
    >;
    emr_odontogram_gigis: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-odontogram-gigi.emr-odontogram-gigi'
    >;
    emr_resep_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-resep-item.emr-resep-item'
    >;
    emr_reseps: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-resep.emr-resep'
    >;
    emr_tindakans: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-tindakan.emr-tindakan'
    >;
    factories: Schema.Attribute.Relation<'oneToMany', 'api::factory.factory'>;
    insurance_claims: Schema.Attribute.Relation<
      'oneToMany',
      'api::insurance-claim.insurance-claim'
    >;
    invoices: Schema.Attribute.Relation<'oneToMany', 'api::invoice.invoice'>;
    letters: Schema.Attribute.Relation<'oneToMany', 'api::letter.letter'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::faskes.faskes'
    > &
      Schema.Attribute.Private;
    medicines: Schema.Attribute.Relation<'oneToMany', 'api::medicine.medicine'>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    patient_allergies: Schema.Attribute.Relation<
      'oneToMany',
      'api::patient-allergy.patient-allergy'
    >;
    patient_groups: Schema.Attribute.Relation<
      'oneToMany',
      'api::patient-group.patient-group'
    >;
    patients: Schema.Attribute.Relation<'oneToMany', 'api::patient.patient'>;
    penerimaan_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::penerimaan-item.penerimaan-item'
    >;
    penerimaans: Schema.Attribute.Relation<
      'oneToMany',
      'api::penerimaan.penerimaan'
    >;
    pengeluarans: Schema.Attribute.Relation<
      'oneToMany',
      'api::pengeluaran.pengeluaran'
    >;
    penyesuaian_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::penyesuaian-item.penyesuaian-item'
    >;
    penyesuaians: Schema.Attribute.Relation<
      'oneToMany',
      'api::penyesuaian.penyesuaian'
    >;
    phone: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    referrals: Schema.Attribute.Relation<'oneToMany', 'api::referral.referral'>;
    registrations: Schema.Attribute.Relation<
      'oneToMany',
      'api::registration.registration'
    >;
    retur_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::retur-item.retur-item'
    >;
    returs: Schema.Attribute.Relation<'oneToMany', 'api::retur.retur'>;
    rooms: Schema.Attribute.Relation<'oneToMany', 'api::room.room'>;
    service_discounts: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-discount.service-discount'
    >;
    service_packages: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-package.service-package'
    >;
    staff_schedules: Schema.Attribute.Relation<
      'oneToMany',
      'api::staff-schedule.staff-schedule'
    >;
    staffs: Schema.Attribute.Relation<'oneToMany', 'api::staff.staff'>;
    suppliers: Schema.Attribute.Relation<'oneToMany', 'api::supplier.supplier'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiInsuranceClaimInsuranceClaim
  extends Struct.CollectionTypeSchema {
  collectionName: 'insurance_claims';
  info: {
    displayName: 'InsuranceClaim';
    pluralName: 'insurance-claims';
    singularName: 'insurance-claim';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    amount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::insurance-claim.insurance-claim'
    > &
      Schema.Attribute.Private;
    patient: Schema.Attribute.Relation<'manyToOne', 'api::patient.patient'>;
    patientName: Schema.Attribute.String;
    penjamin: Schema.Attribute.Enumeration<
      ['Umum', 'BPJS Kesehatan', 'Asuransi Swasta', 'Member']
    >;
    publishedAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['Diajukan', 'Diproses', 'Dibayar', 'Ditolak']
    > &
      Schema.Attribute.DefaultTo<'Diajukan'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInvoiceInvoice extends Struct.CollectionTypeSchema {
  collectionName: 'invoices';
  info: {
    displayName: 'Invoice';
    pluralName: 'invoices';
    singularName: 'invoice';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    alkesFee: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    consultationFee: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    discount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    doctor: Schema.Attribute.String;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    group: Schema.Attribute.Enumeration<
      ['Umum', 'BPJS Kesehatan', 'Asuransi Swasta', 'Member']
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::invoice.invoice'
    > &
      Schema.Attribute.Private;
    medicineFee: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    paidAt: Schema.Attribute.Date;
    patient: Schema.Attribute.Relation<'manyToOne', 'api::patient.patient'>;
    patientId: Schema.Attribute.String;
    patientName: Schema.Attribute.String;
    paymentMethod: Schema.Attribute.Enumeration<
      ['Tunai', 'QRIS', 'Debit', 'Transfer', 'BPJS']
    >;
    paymentStatus: Schema.Attribute.Enumeration<['Belum Dibayar', 'Lunas']> &
      Schema.Attribute.DefaultTo<'Belum Dibayar'>;
    procedureFee: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    registration: Schema.Attribute.Relation<
      'oneToOne',
      'api::registration.registration'
    >;
    total: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    visitId: Schema.Attribute.String;
  };
}

export interface ApiLetterLetter extends Struct.CollectionTypeSchema {
  collectionName: 'letters';
  info: {
    displayName: 'Letter';
    pluralName: 'letters';
    singularName: 'letter';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    doctor: Schema.Attribute.String;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    kind: Schema.Attribute.Enumeration<
      [
        'Surat Sakit',
        'Surat Sehat',
        'Surat Keterangan',
        'Surat Kontrol',
        'Surat Kematian',
      ]
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::letter.letter'
    > &
      Schema.Attribute.Private;
    notes: Schema.Attribute.Text;
    patient: Schema.Attribute.Relation<'manyToOne', 'api::patient.patient'>;
    patientName: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMedicineMedicine extends Struct.CollectionTypeSchema {
  collectionName: 'medicines';
  info: {
    displayName: 'Faskes Obat';
    pluralName: 'medicines';
    singularName: 'medicine';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    batchNumber: Schema.Attribute.String;
    category: Schema.Attribute.Enumeration<
      [
        'Antibiotik',
        'Analgesik',
        'Anastesi',
        'BHP Gigi',
        'Vitamin',
        'Lainnya',
        'Alkes',
      ]
    >;
    code: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    expiryDate: Schema.Attribute.Date;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    form: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::medicine.medicine'
    > &
      Schema.Attribute.Private;
    minStock: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    stock: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    supplier: Schema.Attribute.String;
    unit: Schema.Attribute.Enumeration<
      ['Tablet', 'Kapsul', 'Botol', 'Ampul', 'Pcs', 'Strip', 'Buah']
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMsBrandMsBrand extends Struct.CollectionTypeSchema {
  collectionName: 'ms_brands';
  info: {
    displayName: 'Ms Brand';
    pluralName: 'ms-brands';
    singularName: 'ms-brand';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ms-brand.ms-brand'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMsFactoryMsFactory extends Struct.CollectionTypeSchema {
  collectionName: 'ms_factories';
  info: {
    displayName: 'Ms Pabrik';
    pluralName: 'ms-factories';
    singularName: 'ms-factory';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ms-factory.ms-factory'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMsIcdMsIcd extends Struct.CollectionTypeSchema {
  collectionName: 'ms_icds';
  info: {
    displayName: 'Ms ICD';
    pluralName: 'ms-icds';
    singularName: 'ms-icd';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<['ICD-10', 'ICD-9']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'ICD-10'>;
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    desc: Schema.Attribute.Text & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ms-icd.ms-icd'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMsMedicineMsMedicine extends Struct.CollectionTypeSchema {
  collectionName: 'ms_medicines';
  info: {
    displayName: 'Ms Obat';
    pluralName: 'ms-medicines';
    singularName: 'ms-medicine';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'Antibiotik',
        'Analgesik',
        'Anastesi',
        'BHP Gigi',
        'Vitamin',
        'Lainnya',
        'Alkes',
      ]
    >;
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    form: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ms-medicine.ms-medicine'
    > &
      Schema.Attribute.Private;
    minStock: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    supplier: Schema.Attribute.String;
    unit: Schema.Attribute.Enumeration<
      ['Tablet', 'Kapsul', 'Botol', 'Ampul', 'Pcs', 'Strip', 'Buah']
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMsPatientGroupMsPatientGroup
  extends Struct.CollectionTypeSchema {
  collectionName: 'ms_patient_groups';
  info: {
    displayName: 'Ms Grup Pasien';
    pluralName: 'ms-patient-groups';
    singularName: 'ms-patient-group';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ms-patient-group.ms-patient-group'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMsPoliMsPoli extends Struct.CollectionTypeSchema {
  collectionName: 'ms_polis';
  info: {
    displayName: 'Ms Poli';
    pluralName: 'ms-polis';
    singularName: 'ms-poli';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ms-poli.ms-poli'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    satusehat: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMsServiceMsService extends Struct.CollectionTypeSchema {
  collectionName: 'ms_services';
  info: {
    displayName: 'Ms Pelayanan';
    pluralName: 'ms-services';
    singularName: 'ms-service';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ms-service.ms-service'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    room: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMsSupplierMsSupplier extends Struct.CollectionTypeSchema {
  collectionName: 'ms_suppliers';
  info: {
    displayName: 'Ms Supplier';
    pluralName: 'ms-suppliers';
    singularName: 'ms-supplier';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    address: Schema.Attribute.Text;
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ms-supplier.ms-supplier'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPatientAllergyPatientAllergy
  extends Struct.CollectionTypeSchema {
  collectionName: 'patient_allergies';
  info: {
    displayName: 'PatientAllergy';
    pluralName: 'patient-allergies';
    singularName: 'patient-allergy';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    alergen: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    keterangan: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::patient-allergy.patient-allergy'
    > &
      Schema.Attribute.Private;
    patient: Schema.Attribute.Relation<'manyToOne', 'api::patient.patient'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPatientGroupPatientGroup
  extends Struct.CollectionTypeSchema {
  collectionName: 'patient_groups';
  info: {
    displayName: 'Faskes Grup Pasien';
    pluralName: 'patient-groups';
    singularName: 'patient-group';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::patient-group.patient-group'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPatientPatient extends Struct.CollectionTypeSchema {
  collectionName: 'patients';
  info: {
    displayName: 'Patient';
    pluralName: 'patients';
    singularName: 'patient';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    address: Schema.Attribute.Text;
    allergies: Schema.Attribute.Relation<
      'oneToMany',
      'api::patient-allergy.patient-allergy'
    >;
    apotek_invoices: Schema.Attribute.Relation<
      'oneToMany',
      'api::apotek-invoice.apotek-invoice'
    >;
    birthDate: Schema.Attribute.Date;
    bloodType: Schema.Attribute.String;
    bookings: Schema.Attribute.Relation<'oneToMany', 'api::booking.booking'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    emr_documents: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-document.emr-document'
    >;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    gender: Schema.Attribute.Enumeration<['L', 'P']>;
    insurance_claims: Schema.Attribute.Relation<
      'oneToMany',
      'api::insurance-claim.insurance-claim'
    >;
    invoices: Schema.Attribute.Relation<'oneToMany', 'api::invoice.invoice'>;
    letters: Schema.Attribute.Relation<'oneToMany', 'api::letter.letter'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::patient.patient'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    nik: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    referrals: Schema.Attribute.Relation<'oneToMany', 'api::referral.referral'>;
    registeredAt: Schema.Attribute.Date;
    registrations: Schema.Attribute.Relation<
      'oneToMany',
      'api::registration.registration'
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPenerimaanItemPenerimaanItem
  extends Struct.CollectionTypeSchema {
  collectionName: 'penerimaan_items';
  info: {
    displayName: 'PenerimaanItem';
    pluralName: 'penerimaan-items';
    singularName: 'penerimaan-item';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    batch: Schema.Attribute.String;
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    expiry: Schema.Attribute.Date;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::penerimaan-item.penerimaan-item'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    penerimaan: Schema.Attribute.Relation<
      'manyToOne',
      'api::penerimaan.penerimaan'
    >;
    price: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    qty: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPenerimaanPenerimaan extends Struct.CollectionTypeSchema {
  collectionName: 'penerimaans';
  info: {
    displayName: 'Penerimaan';
    pluralName: 'penerimaans';
    singularName: 'penerimaan';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    faktur: Schema.Attribute.String;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    items: Schema.Attribute.Relation<
      'oneToMany',
      'api::penerimaan-item.penerimaan-item'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::penerimaan.penerimaan'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    supplier: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPengeluaranPengeluaran extends Struct.CollectionTypeSchema {
  collectionName: 'pengeluarans';
  info: {
    displayName: 'Pengeluaran';
    pluralName: 'pengeluarans';
    singularName: 'pengeluaran';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pengeluaran.pengeluaran'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    qty: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    room: Schema.Attribute.String;
    unit: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPenyesuaianItemPenyesuaianItem
  extends Struct.CollectionTypeSchema {
  collectionName: 'penyesuaian_items';
  info: {
    displayName: 'PenyesuaianItem';
    pluralName: 'penyesuaian-items';
    singularName: 'penyesuaian-item';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::penyesuaian-item.penyesuaian-item'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    penyesuaian: Schema.Attribute.Relation<
      'manyToOne',
      'api::penyesuaian.penyesuaian'
    >;
    publishedAt: Schema.Attribute.DateTime;
    reason: Schema.Attribute.Text;
    stockAfter: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    stockBefore: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPenyesuaianPenyesuaian extends Struct.CollectionTypeSchema {
  collectionName: 'penyesuaians';
  info: {
    displayName: 'Penyesuaian';
    pluralName: 'penyesuaians';
    singularName: 'penyesuaian';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    items: Schema.Attribute.Relation<
      'oneToMany',
      'api::penyesuaian-item.penyesuaian-item'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::penyesuaian.penyesuaian'
    > &
      Schema.Attribute.Private;
    nota: Schema.Attribute.String;
    pic: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiReferralReferral extends Struct.CollectionTypeSchema {
  collectionName: 'referrals';
  info: {
    displayName: 'Referral';
    pluralName: 'referrals';
    singularName: 'referral';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    destination: Schema.Attribute.String;
    diagnosis: Schema.Attribute.String;
    doctor: Schema.Attribute.String;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    kind: Schema.Attribute.Enumeration<
      ['Rujukan Internal', 'Rujukan ke Fasilitas Lain']
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::referral.referral'
    > &
      Schema.Attribute.Private;
    patient: Schema.Attribute.Relation<'manyToOne', 'api::patient.patient'>;
    patientName: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRegistrationRegistration
  extends Struct.CollectionTypeSchema {
  collectionName: 'registrations';
  info: {
    displayName: 'Registration';
    pluralName: 'registrations';
    singularName: 'registration';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    doctor: Schema.Attribute.String;
    emr_documents: Schema.Attribute.Relation<
      'oneToMany',
      'api::emr-document.emr-document'
    >;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    group: Schema.Attribute.Enumeration<
      ['Umum', 'BPJS Kesehatan', 'Asuransi Swasta', 'Member']
    >;
    invoice: Schema.Attribute.Relation<'oneToOne', 'api::invoice.invoice'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::registration.registration'
    > &
      Schema.Attribute.Private;
    patient: Schema.Attribute.Relation<'manyToOne', 'api::patient.patient'>;
    patientId: Schema.Attribute.String;
    patientName: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    regDate: Schema.Attribute.DateTime;
    room: Schema.Attribute.String;
    serviceType: Schema.Attribute.String;
    status: Schema.Attribute.Enumeration<['Registrasi', 'Proses', 'Selesai']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiReturItemReturItem extends Struct.CollectionTypeSchema {
  collectionName: 'retur_items';
  info: {
    displayName: 'ReturItem';
    pluralName: 'retur-items';
    singularName: 'retur-item';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::retur-item.retur-item'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    qty: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    reason: Schema.Attribute.Text;
    retur: Schema.Attribute.Relation<'manyToOne', 'api::retur.retur'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiReturRetur extends Struct.CollectionTypeSchema {
  collectionName: 'returs';
  info: {
    displayName: 'Retur';
    pluralName: 'returs';
    singularName: 'retur';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    items: Schema.Attribute.Relation<'oneToMany', 'api::retur-item.retur-item'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::retur.retur'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<
      ['Retur Pengeluaran', 'Retur Penerimaan']
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRoomRoom extends Struct.CollectionTypeSchema {
  collectionName: 'rooms';
  info: {
    displayName: 'Faskes Poli';
    pluralName: 'rooms';
    singularName: 'room';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::room.room'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    satusehat: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiServiceDiscountServiceDiscount
  extends Struct.CollectionTypeSchema {
  collectionName: 'service_discounts';
  info: {
    displayName: 'ServiceDiscount';
    pluralName: 'service-discounts';
    singularName: 'service-discount';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    appliesTo: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-discount.service-discount'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    percent: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiServicePackageServicePackage
  extends Struct.CollectionTypeSchema {
  collectionName: 'service_packages';
  info: {
    displayName: 'ServicePackage';
    pluralName: 'service-packages';
    singularName: 'service-package';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-package.service-package'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    patientName: Schema.Attribute.String;
    price: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    totalSessions: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    usedSessions: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface ApiStaffScheduleStaffSchedule
  extends Struct.CollectionTypeSchema {
  collectionName: 'staff_schedules';
  info: {
    displayName: 'StaffSchedule';
    pluralName: 'staff-schedules';
    singularName: 'staff-schedule';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    day: Schema.Attribute.String;
    endTime: Schema.Attribute.String;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::staff-schedule.staff-schedule'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    room: Schema.Attribute.String;
    staffName: Schema.Attribute.String;
    startTime: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiStaffStaff extends Struct.CollectionTypeSchema {
  collectionName: 'staffs';
  info: {
    displayName: 'Staff';
    pluralName: 'staffs';
    singularName: 'staff';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::staff.staff'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Enumeration<
      ['Dokter Gigi', 'Dokter Umum', 'Perawat', 'Apoteker', 'Kasir', 'Admin']
    >;
    room: Schema.Attribute.String;
    sip: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSupplierSupplier extends Struct.CollectionTypeSchema {
  collectionName: 'suppliers';
  info: {
    displayName: 'Faskes Supplier';
    pluralName: 'suppliers';
    singularName: 'supplier';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    address: Schema.Attribute.Text;
    code: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::supplier.supplier'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.Text;
    caption: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    focalPoint: Schema.Attribute.JSON;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.Text;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    appRole: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Pengguna'>;
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    faskes: Schema.Attribute.Relation<'manyToOne', 'api::faskes.faskes'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::apotek-invoice-item.apotek-invoice-item': ApiApotekInvoiceItemApotekInvoiceItem;
      'api::apotek-invoice.apotek-invoice': ApiApotekInvoiceApotekInvoice;
      'api::booking.booking': ApiBookingBooking;
      'api::brand.brand': ApiBrandBrand;
      'api::clinic-service.clinic-service': ApiClinicServiceClinicService;
      'api::emr-alkes.emr-alkes': ApiEmrAlkesEmrAlkes;
      'api::emr-diagnosa.emr-diagnosa': ApiEmrDiagnosaEmrDiagnosa;
      'api::emr-document.emr-document': ApiEmrDocumentEmrDocument;
      'api::emr-kondisi.emr-kondisi': ApiEmrKondisiEmrKondisi;
      'api::emr-odontogram-gigi.emr-odontogram-gigi': ApiEmrOdontogramGigiEmrOdontogramGigi;
      'api::emr-resep-item.emr-resep-item': ApiEmrResepItemEmrResepItem;
      'api::emr-resep.emr-resep': ApiEmrResepEmrResep;
      'api::emr-tindakan.emr-tindakan': ApiEmrTindakanEmrTindakan;
      'api::factory.factory': ApiFactoryFactory;
      'api::faskes.faskes': ApiFaskesFaskes;
      'api::insurance-claim.insurance-claim': ApiInsuranceClaimInsuranceClaim;
      'api::invoice.invoice': ApiInvoiceInvoice;
      'api::letter.letter': ApiLetterLetter;
      'api::medicine.medicine': ApiMedicineMedicine;
      'api::ms-brand.ms-brand': ApiMsBrandMsBrand;
      'api::ms-factory.ms-factory': ApiMsFactoryMsFactory;
      'api::ms-icd.ms-icd': ApiMsIcdMsIcd;
      'api::ms-medicine.ms-medicine': ApiMsMedicineMsMedicine;
      'api::ms-patient-group.ms-patient-group': ApiMsPatientGroupMsPatientGroup;
      'api::ms-poli.ms-poli': ApiMsPoliMsPoli;
      'api::ms-service.ms-service': ApiMsServiceMsService;
      'api::ms-supplier.ms-supplier': ApiMsSupplierMsSupplier;
      'api::patient-allergy.patient-allergy': ApiPatientAllergyPatientAllergy;
      'api::patient-group.patient-group': ApiPatientGroupPatientGroup;
      'api::patient.patient': ApiPatientPatient;
      'api::penerimaan-item.penerimaan-item': ApiPenerimaanItemPenerimaanItem;
      'api::penerimaan.penerimaan': ApiPenerimaanPenerimaan;
      'api::pengeluaran.pengeluaran': ApiPengeluaranPengeluaran;
      'api::penyesuaian-item.penyesuaian-item': ApiPenyesuaianItemPenyesuaianItem;
      'api::penyesuaian.penyesuaian': ApiPenyesuaianPenyesuaian;
      'api::referral.referral': ApiReferralReferral;
      'api::registration.registration': ApiRegistrationRegistration;
      'api::retur-item.retur-item': ApiReturItemReturItem;
      'api::retur.retur': ApiReturRetur;
      'api::room.room': ApiRoomRoom;
      'api::service-discount.service-discount': ApiServiceDiscountServiceDiscount;
      'api::service-package.service-package': ApiServicePackageServicePackage;
      'api::staff-schedule.staff-schedule': ApiStaffScheduleStaffSchedule;
      'api::staff.staff': ApiStaffStaff;
      'api::supplier.supplier': ApiSupplierSupplier;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
