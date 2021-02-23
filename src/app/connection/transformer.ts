import * as Adapter from 'src/lib/adapter';
import {
  ICreateConnectionPayload,
  ICreateConnectionTransformReturn,
  IConnectionResponse,
  IConnection
} from 'src/types';

export async function create(
  data: ICreateConnectionPayload
): Promise<ICreateConnectionTransformReturn> {
  const dataWithUrn = Adapter.urn(data);
  const dataWithEncryptedCredentials = Adapter.encryptCredentials(dataWithUrn);
  return dataWithEncryptedCredentials;
}

export async function get(data: IConnection): Promise<IConnectionResponse> {
  return Adapter.decrptCredentials(data);
}
