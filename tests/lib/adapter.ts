import { urn } from 'src/lib/adapter';

describe('Adapter', () => {
  describe('urn', () => {
    test('should add urn to the object', () => {
      const input = {};
      const result = urn(input);
      expect(result.urn).toBeDefined();
    });

    test('should override urn to the object', () => {
      const oldUrn = 'old-urn';
      const input = {
        urn: oldUrn
      };
      const result = urn(input);
      expect(result.urn).not.toBe(oldUrn);
    });
  });
});
