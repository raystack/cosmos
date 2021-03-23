import * as Adapter from 'src/lib/adapter';
import {
  ICreateMetricPayload,
  ICreateMetricTransformedPayload
} from 'src/types';

export async function create(
  data: ICreateMetricPayload
): Promise<ICreateMetricTransformedPayload> {
  return Adapter.urn(data);
}
