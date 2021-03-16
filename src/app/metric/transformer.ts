import * as Adapter from 'src/lib/adapter';
import {
  ICreateMetricPayload,
  ICreateMetricTransformedPayload,
  IMetricDocument,
  IMetricResponse
} from 'src/types';
import * as MetricAdapter from './adapter';

export async function create(
  data: ICreateMetricPayload
): Promise<ICreateMetricTransformedPayload> {
  return Adapter.urn(data);
}

export async function get(data: IMetricDocument): Promise<IMetricResponse> {
  return MetricAdapter.addSql(data);
}
