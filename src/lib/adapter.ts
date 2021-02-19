import { v1 as uuidv1 } from 'uuid';

export function urn<T>(data: T) {
  const uuid = uuidv1();
  return { ...data, urn: uuid };
}
