import crypto from 'crypto';
import * as Config from 'src/config/config';

const algorithm = 'aes-256-ctr';
const secretKey = Config.get<string>('/encryption_secrect_key');
const key = crypto
  .createHash('sha256')
  .update(String(secretKey))
  .digest('base64')
  .substr(0, 32);

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(text: string): string {
  const [iv, content] = text.split(':');
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, 'hex')
  );
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(content, 'hex')),
    decipher.final()
  ]);
  return decrpyted.toString();
}
