import Metric from 'src/models/metric';
import * as Resource from 'src/app/metric/resource';
import * as Transformer from 'src/app/metric/transformer';

import { ICreateMetricPayload, IMetricDocument } from 'src/types';

afterEach(() => {
  jest.resetAllMocks();
});

describe('Connection::Metric', () => {
  describe('create', () => {
    test('should add metric', async () => {
      const data: ICreateMetricPayload = {
        name: 'test',
        abbreviation: 'TST',
        meta: {
          foo: 'bar'
        },
        fields: {
          measures: [],
          dimensions: [],
          filters: []
        }
      };

      const urn = 'test-urn';
      const metric = new Metric(data);
      const transformerCreateSpy = jest
        .spyOn(Transformer, 'create')
        .mockResolvedValueOnce({
          ...data,
          urn
        });
      const connectionSpy = jest
        .spyOn(Metric, 'create')
        // @ts-ignore
        .mockResolvedValue({ ...metric, urn });
      const result = await Resource.create(data);
      expect(result.urn).toBe(urn);

      expect(transformerCreateSpy).toHaveBeenCalledWith(data);
      expect(transformerCreateSpy).toHaveBeenCalledTimes(1);

      expect(connectionSpy).toHaveBeenCalledWith({
        ...data,
        urn
      });
      expect(connectionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('get', () => {
    test('should pass urn to findByUrn', async () => {
      const metric = new Metric();
      const urn = 'test-urn';
      const spy = jest.spyOn(Metric, 'findByUrn').mockResolvedValueOnce(metric);
      await Resource.get(urn);
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return null if metric not found', async () => {
      const urn = 'test-urn';
      const spy = jest.spyOn(Metric, 'findByUrn').mockResolvedValueOnce(null);
      const result = await Resource.get(urn);
      expect(result).toBeNull();
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('list', () => {
    test('should return empty list', async () => {
      const spy = jest.spyOn(Metric, 'list').mockResolvedValueOnce([]);
      const expectedResult: IMetricDocument[] = [];
      const result = await Resource.list();
      expect(result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith({});
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return metrics list', async () => {
      const metrics = [new Metric({ urn: 1 }), new Metric({ urn: 2 })];
      const spy = jest.spyOn(Metric, 'list').mockResolvedValueOnce(metrics);
      const expectedResult: IMetricDocument[] = metrics;
      const result = await Resource.list();
      expect(result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith({});
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should filter list based on meta', async () => {
      const query = { meta: { foo: 'bar', foo1: 'bar1' } };
      const metrics = [
        new Metric({ urn: 1, meta: { foo: 'bar', foo1: 'bar1' } }),
        new Metric({ urn: 2, meta: { foo: 'bar', foo1: 'bar1' } })
      ];
      const spy = jest.spyOn(Metric, 'list').mockResolvedValueOnce(metrics);
      const expectedResult: IMetricDocument[] = metrics;
      const result = await Resource.list(query);
      expect(result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(query);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
