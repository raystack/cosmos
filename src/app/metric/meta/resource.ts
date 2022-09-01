import * as Boom from '@hapi/boom';
import Metric from 'src/models/metric';

type MetaFields = Map<string, string>;

export const list = async (urn: string): Promise<Record<string, string>> => {
  const metric = await Metric.findByUrn(urn);
  if (!metric) {
    throw Boom.notFound(`Metric not found for urn: ${urn}`);
  }
  return Object.fromEntries(metric.meta || new Map());
};

export const get = async (
  urn: string,
  keyName: string
): Promise<Record<string, string>> => {
  const metric = await Metric.findByUrn(urn);
  if (!metric) {
    throw Boom.notFound(`Metric not found for urn: ${urn}`);
  }
  if (!metric.meta?.has(keyName)) {
    throw Boom.notFound(`Meta ${keyName} not found for Metric: ${urn}`);
  }
  return { [keyName]: metric.meta?.get(keyName) || '' };
};

export const create = async (
  urn: string,
  meta: Record<string, string>
): Promise<Record<string, string>> => {
  const metric = await Metric.findByUrn(urn);
  if (!metric) {
    throw Boom.notFound(`Metric not found for urn: ${urn}`);
  }

  for (let key in meta) {
    metric.meta?.set(key, meta[key]);
  }
  const updatedMetric = await metric.save();
  return Object.fromEntries(updatedMetric.meta || new Map());
};

export const update = async (
  urn: string,
  keyName: string,
  { value }: { value: string }
): Promise<Record<string, string>> => {
  const metric = await Metric.findByUrn(urn);
  if (!metric) {
    throw Boom.notFound(`Metric not found for urn: ${urn}`);
  }

  if (!metric.meta?.has(keyName)) {
    throw Boom.notFound(`Meta ${keyName} not found for Metric: ${urn}`);
  }

  metric.meta?.set(keyName, value);

  const updatedMetric = await metric.save();
  return Object.fromEntries(updatedMetric.meta || new Map());
};

export const deleteMeta = async (
  urn: string,
  keyName: string
): Promise<Record<string, string>> => {
  const metric = await Metric.findByUrn(urn);
  if (!metric) {
    throw Boom.notFound(`Metric not found for urn: ${urn}`);
  }
  if (!metric.meta?.has(keyName)) {
    throw Boom.notFound(`Meta ${keyName} not found for Metric: ${urn}`);
  }
  metric.meta?.delete(keyName);
  const updatedMetric = await metric.save();
  return Object.fromEntries(updatedMetric.meta || new Map());
};
