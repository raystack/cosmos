import * as Adapter from 'src/lib/adapter';
import {
  ICreateConnectionPayload,
  ICreateConnectionTransformedPayload,
  IConnectionResponse,
  IConnection
} from 'src/types';

export async function create(
  data: ICreateConnectionPayload
): Promise<ICreateConnectionTransformedPayload> {
  const dataWithUrn = Adapter.urn(data);
  const dataWithEncryptedCredentials = Adapter.encryptCredentials(dataWithUrn);
  return dataWithEncryptedCredentials;
}

export async function get(data: IConnection): Promise<IConnectionResponse> {
  return Adapter.decrptCredentials(data);
}

export async function update(
  data: ICreateConnectionPayload
): Promise<
  Omit<ICreateConnectionPayload, 'credentials'> & {
    credentials: string;
  }
> {
  return Adapter.encryptCredentials(data);
}
