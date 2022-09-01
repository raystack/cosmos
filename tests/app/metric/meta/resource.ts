import Metric from 'src/models/metric';
import * as Resource from 'src/app/metric/meta/resource';

afterEach(() => {
  jest.resetAllMocks();
});

describe('Metric/Meta::Resource', () => {
  describe('list', () => {
    test('should return error if metric not found', async () => {
      const spy = jest.spyOn(Metric, 'findByUrn').mockResolvedValueOnce(null);
      try {
        await Resource.list('metricUrn');
      } catch (e) {
        expect(e.message).toEqual('Metric not found for urn: metricUrn');
      }
      expect(spy).toHaveBeenCalledWith('metricUrn');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return meta object', async () => {
      const meta = { foo: 'bar', foo1: 'bar1' };
      const metric = new Metric({ urn: 'metricUrn', meta });
      const spy = jest.spyOn(Metric, 'findByUrn').mockResolvedValueOnce(metric);
      const result = await Resource.list('metricUrn');
      expect(result).toEqual(meta);
      expect(spy).toHaveBeenCalledWith('metricUrn');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
  describe('get', () => {
    test('should return error if metric not found', async () => {
      const spy = jest.spyOn(Metric, 'findByUrn').mockResolvedValueOnce(null);
      try {
        await Resource.get('metricUrn', 'meta1');
      } catch (e) {
        expect(e.message).toEqual('Metric not found for urn: metricUrn');
      }
      expect(spy).toHaveBeenCalledWith('metricUrn');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return error if meta key not found', async () => {
      const meta = new Map([
        ['foo', 'bar'],
        ['foo1', 'bar1']
      ]);
      const metric = new Metric({ urn: 'metricUrn', meta });
      const spy = jest.spyOn(Metric, 'findByUrn').mockResolvedValueOnce(metric);
      try {
        await Resource.get('metricUrn', 'meta1');
      } catch (e) {
        expect(e.message).toEqual('Meta meta1 not found for Metric: metricUrn');
      }
      expect(spy).toHaveBeenCalledWith('metricUrn');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return meta key value', async () => {
      const meta = new Map([
        ['foo', 'bar'],
        ['foo1', 'bar1']
      ]);
      const metric = new Metric({ urn: 'metricUrn', meta });
      const spy = jest.spyOn(Metric, 'findByUrn').mockResolvedValueOnce(metric);
      const result = await Resource.get('metricUrn', 'foo');
      expect(result).toEqual({ foo: 'bar' });
      expect(spy).toHaveBeenCalledWith('metricUrn');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    test('should add meta', async () => {
      const metaPayload = { foo: 'bar', foo1: 'bar1' };
      const urn = 'test-urn';
      const metric = new Metric({ urn: urn });
      const saveSpy = jest
        .spyOn(Metric.prototype, 'save')
        .mockImplementation(() => ({
          meta: new Map([
            ['foo', 'bar'],
            ['foo1', 'bar1']
          ])
        }));
      const findSpy = jest
        .spyOn(Metric, 'findByUrn')
        .mockResolvedValueOnce(metric);
      const result = await Resource.create(urn, metaPayload);
      expect(result).toEqual(metaPayload);
      expect(saveSpy).toHaveBeenCalledWith(/* Empty */);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(urn);
      expect(findSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    test('should return error if metric not found', async () => {
      const updatePayload = { value: 'abc' };
      const urn = 'test-urn';
      const metaName = 'meta1';
      const spy = jest.spyOn(Metric, 'findByUrn').mockResolvedValueOnce(null);
      try {
        await Resource.update(urn, metaName, updatePayload);
      } catch (e) {
        expect(e.message).toEqual('Metric not found for urn: test-urn');
      }
      expect(spy).toHaveBeenCalledWith('test-urn');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return error if meta name not found', async () => {
      const updatePayload = { value: 'abc' };
      const urn = 'test-urn';
      const metaName = 'meta1';
      const meta = new Map([
        ['foo', 'bar'],
        ['foo1', 'bar1']
      ]);
      const metric = new Metric({ urn, meta });
      const spy = jest.spyOn(Metric, 'findByUrn').mockResolvedValueOnce(metric);
      try {
        await Resource.update(urn, metaName, updatePayload);
      } catch (e) {
        expect(e.message).toEqual('Meta meta1 not found for Metric: test-urn');
      }
      expect(spy).toHaveBeenCalledWith('test-urn');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should update meta value', async () => {
      const updatePayload = { value: 'abc' };
      const meta = new Map([
        ['foo', 'bar'],
        ['foo1', 'bar1']
      ]);
      const urn = 'test-urn';
      const metaName = 'foo';

      const metric = new Metric({ urn: urn, meta });
      const saveSpy = jest
        .spyOn(Metric.prototype, 'save')
        .mockImplementation(() => ({
          meta: new Map([
            ['foo', 'abc'],
            ['foo1', 'bar1']
          ])
        }));
      const findSpy = jest
        .spyOn(Metric, 'findByUrn')
        .mockResolvedValueOnce(metric);
      const result = await Resource.update(urn, metaName, updatePayload);
      expect(result).toEqual({
        foo: 'abc',
        foo1: 'bar1'
      });
      expect(saveSpy).toHaveBeenCalledWith(/* Empty */);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(urn);
      expect(findSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteMeta', () => {
    test('should return error if metric not found', async () => {
      const urn = 'test-urn';
      const metaName = 'meta1';
      const spy = jest.spyOn(Metric, 'findByUrn').mockResolvedValueOnce(null);
      try {
        await Resource.deleteMeta(urn, metaName);
      } catch (e) {
        expect(e.message).toEqual('Metric not found for urn: test-urn');
      }
      expect(spy).toHaveBeenCalledWith('test-urn');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return error if meta name not found', async () => {
      const urn = 'test-urn';
      const metaName = 'meta1';
      const meta = new Map([
        ['foo', 'bar'],
        ['foo1', 'bar1']
      ]);
      const metric = new Metric({ urn, meta });
      const spy = jest.spyOn(Metric, 'findByUrn').mockResolvedValueOnce(metric);
      try {
        await Resource.deleteMeta(urn, metaName);
      } catch (e) {
        expect(e.message).toEqual('Meta meta1 not found for Metric: test-urn');
      }
      expect(spy).toHaveBeenCalledWith('test-urn');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should delete meta key', async () => {
      const meta = new Map([
        ['foo', 'bar'],
        ['foo1', 'bar1']
      ]);
      const urn = 'test-urn';
      const metaName = 'foo';

      const metric = new Metric({ urn: urn, meta });
      const saveSpy = jest
        .spyOn(Metric.prototype, 'save')
        .mockImplementation(() => ({
          meta: new Map([['foo1', 'bar1']])
        }));
      const findSpy = jest
        .spyOn(Metric, 'findByUrn')
        .mockResolvedValueOnce(metric);
      const result = await Resource.deleteMeta(urn, metaName);
      expect(result).toEqual({
        foo1: 'bar1'
      });
      expect(saveSpy).toHaveBeenCalledWith(/* Empty */);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(urn);
      expect(findSpy).toHaveBeenCalledTimes(1);
    });
  });
});
