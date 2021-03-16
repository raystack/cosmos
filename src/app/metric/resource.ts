import Metric from 'src/models/metric';
import { ICreateMetricPayload, IMetricDocument } from 'src/types';
import * as Transformer from './transformer';

export const list = async (
  query: { meta?: Record<string, string> } = {}
): Promise<IMetricDocument[]> => {
  return Metric.list(query);
};

export const create = async (
  payload: ICreateMetricPayload
): Promise<IMetricDocument> => {
  const data = await Transformer.create(payload);
  const metric = await Metric.create(data);
  return metric;
};

export const get = async (urn: string): Promise<IMetricDocument | null> => {
  return Metric.findByUrn(urn);
};
