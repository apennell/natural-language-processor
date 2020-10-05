import validateUrl from '../client/js/validations';

describe('Validations', () => {
  test('should have validateUrl defined', () => {
    expect(validateUrl).toBeDefined();
  });

  test('should return false if no url is passed', () => {
    const isValid = validateUrl();
    expect(isValid).toBe(false);
  });

  test('should return false if url is undefined', () => {
    const isValid = validateUrl(undefined);
    expect(isValid).toBe(false);
  });

  test('should return false if url is undefined or null', () => {
    const isValid = validateUrl(null);
    expect(isValid).toBe(false);
  });

  test('should return true for URLs that pass regex validation', () => {
    const validUrls = [
      'http://google.com/google?asdf=123',
      'https://google.com',
      'https://www.google.com',
      'www.google.com',
      'google.co',
    ];
    validUrls.forEach((url) => {
      expect(validateUrl(url)).toBe(true);
    });
  });

  test('should return false for URLs that do not pass regex validation', () => {
    const invalidUrls = [
      'http:/google.com/google?asdf=123',
      'http//google.com',
      'htt://google.com',
      '.google.com',
      'www.googlecom',
      'google',
      'localhost',
      2,
      '2',
      { foo: 'bar' },
    ];
    invalidUrls.forEach((url) => {
      expect(validateUrl(url)).toBe(false);
    });
  });
});
