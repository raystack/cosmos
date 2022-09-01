import * as Adapter from 'src/lib/adapter';
import { ICreateCubePayload, ICreateCubeTransformedPayload } from 'src/types';

export async function create(
  data: ICreateCubePayload
): Promise<ICreateCubeTransformedPayload> {
  return Adapter.urn(data);
}
