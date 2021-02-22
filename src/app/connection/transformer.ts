import * as Adapter from 'src/lib/adapter';
import {
  ICreateConnectionPayload,
  ICreateConnectionTransformReturn,
  IConnectionResponse,
  IConnectionDocument
} from 'src/types';

export async function create(
  data: ICreateConnectionPayload
): Promise<ICreateConnectionTransformReturn> {
  const dataWithUrn = Adapter.urn(data);
  const dataWithEncryptedCredentials = Adapter.encryptCredentials(dataWithUrn);
  return dataWithEncryptedCredentials;
}

export async function get(
  data: IConnectionDocument
): Promise<IConnectionResponse> {
  return Adapter.decrptCredentials(data);
}
