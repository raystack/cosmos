import { v1 as uuidv1 } from 'uuid';
import { encrypt, decrypt } from 'src/lib/utils';
import { ICreateConnectionPayload } from 'src/types';

export function urn<T>(data: T): T & { urn: string } {
  const uuid = uuidv1();
  return { ...data, urn: uuid };
}

export function encryptCredentials<
  T extends Pick<ICreateConnectionPayload, 'credentials'>
>(data: T): T & { credentials: string } {
  const credentials = encrypt(JSON.stringify(data.credentials));
  return { ...data, credentials };
}

export function decrptCredentials<T extends { credentials: string }>(
  data: T
): T & Pick<ICreateConnectionPayload, 'credentials'> {
  const credentials = JSON.parse(decrypt(data.credentials));
  return { ...data, credentials };
}
