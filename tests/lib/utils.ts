import { decrypt, encrypt } from 'src/lib/utils';

jest.mock('crypto', () => {
  return {
    createHash: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    digest: jest.fn().mockReturnValue(Buffer.from('test').toString('base64')),
    randomBytes: jest.fn().mockReturnValue(Buffer.from('test')),
    createCipheriv: jest.fn().mockReturnValue({
      final: jest.fn().mockReturnValue(Buffer.from('test')),
      update: jest.fn().mockReturnValue(Buffer.from('test'))
    }),
    createDecipheriv: jest.fn().mockReturnValue({
      final: jest.fn().mockReturnValue(Buffer.from('test')),
      update: jest.fn().mockReturnValue(Buffer.from('test'))
    })
  };
});

describe('utils', () => {
  describe('encrypt', () => {
    it('return hash of the text', () => {
      const input = 'abc';
      const result = encrypt(input);
      expect(result).toEqual(expect.stringMatching(/[\w]+:[\w+]+/));
    });
  });

  describe('decrypt', () => {
    it('return return text from decrypt', () => {
      const input = 'abcd:abcd';
      const result = decrypt(input);
      expect(result).toBe('testtest');
    });
  });
});
