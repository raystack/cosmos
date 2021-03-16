import Metric from 'src/models/metric';
import {
  ICreateMetricPayload,
  IMetricResponse,
  IMetricDocument,
  IUpdateMetricPayload
} from 'src/types';
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

export const get = async (urn: string): Promise<IMetricResponse | null> => {
  const metric = await Metric.findByUrn(urn);
  return metric && Transformer.get(metric);
};

export const update = async (
  urn: string,
  payload: IUpdateMetricPayload
): Promise<IMetricDocument | null> => {
  return Metric.updateByUrn(urn, payload);
};
