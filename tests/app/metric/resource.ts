import Metric from 'src/models/metric';
import * as Resource from 'src/app/metric/resource';
import * as Transformer from 'src/app/metric/transformer';

import { ICreateMetricPayload } from 'src/types';

afterEach(() => {
  jest.resetAllMocks();
});

describe('Connection::Metric', () => {
  describe('create', () => {
    test('should add metric', async () => {
      const data: ICreateMetricPayload = {
        name: 'test',
        abbreviation: 'TST',
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
});
