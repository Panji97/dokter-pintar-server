import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * Klien MinIO (kompatibel S3) tunggal — dipakai ulang semua handler
 * (HRIS membuat instance baru di tiap file controller/service).
 */
let cached: S3Client | null = null;

function s3(): S3Client {
  if (!cached) {
    cached = new S3Client({
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY ?? '',
        secretAccessKey: process.env.MINIO_SECRET_KEY ?? '',
      },
      region: process.env.MINIO_REGION || 'us-east-1',
      endpoint: process.env.MINIO_ENDPOINT,
      forcePathStyle: true,
    });
  }
  return cached;
}

export const minioBucket = (): string => process.env.MINIO_BUCKET || 'dpi';

export default () => ({
  /** URL baca bertanda-tangan untuk satu object key (kedaluwarsa singkat). */
  async signKey(key: string, expiresIn = 1800): Promise<string> {
    const cmd = new GetObjectCommand({ Bucket: minioBucket(), Key: key });
    return getSignedUrl(s3(), cmd, { expiresIn });
  },
});
