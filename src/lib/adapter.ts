import { v1 as uuidv1 } from 'uuid';

export function urn<T>(data: T): T & { urn: string } {
  const uuid = uuidv1();
  return { ...data, urn: uuid };
}
