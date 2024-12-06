const isValidReferrer = require('../../../src/app/contactUs/referrerValidator');

describe('isValidURL', () => {
  test('should return true for valid absolute URLs', () => {
      expect(isValidReferrer('https://example.com')).toBe(true);
      expect(isValidReferrer('http://example.com')).toBe(true);
      expect(isValidReferrer('https://example.com/page?query=1')).toBe(true);
      expect(isValidReferrer('https://example.com#section')).toBe(true);
  });

  test('should return true for valid relative URLs', () => {
      expect(isValidReferrer('/dashboard')).toBe(true);
      expect(isValidReferrer('/page?query=1')).toBe(true);
      expect(isValidReferrer('/')).toBe(true);
      expect(isValidReferrer('/section#anchor')).toBe(true);
  });

  test('should return false for invalid absolute URLs with unsafe schemes', () => {
      expect(isValidReferrer('htp://invalid-url')).toBe(false);
      expect(isValidReferrer('://missing-protocol.com')).toBe(false);
      expect(isValidReferrer('example.com')).toBe(false);
      expect(isValidReferrer('data:text/html;base64,xx')).toBe(false);
      expect(isValidReferrer('file:///etc/passwd')).toBe(false);
      expect(isValidReferrer('ftp://example.com')).toBe(false);
  });

  test('should return false for invalid relative URLs', () => {
      expect(isValidReferrer('dashboard')).toBe(false);
      expect(isValidReferrer('javascript:alert(1)')).toBe(false);
      expect(isValidReferrer('')).toBe(false);
  });

  test('should return false for null and undefined inputs', () => {
      expect(isValidReferrer(null)).toBe(false);
      expect(isValidReferrer(undefined)).toBe(false);
  });

  test('should return false for other invalid inputs', () => {
      expect(isValidReferrer("123")).toBe(false);
      expect(isValidReferrer("{}")).toBe(false);
      expect(isValidReferrer("[]")).toBe(false);
  });
});