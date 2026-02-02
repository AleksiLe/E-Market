/**
 * @jest-environment node
 */

import {
  createSession,
  validateSession,
  clearSession,
} from '@/app/lib/session';

import validateToken from '@/services/validateToken';
import { cookies } from 'next/headers';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

jest.mock('@/services/validateToken', () => jest.fn());

describe('session utilities', () => {
  let cookieStore;

  beforeEach(() => {
    cookieStore = {
      set: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
    };

    cookies.mockResolvedValue(cookieStore);
    jest.clearAllMocks();
  });

  describe('createSession', () => {
    it('sets session cookie', async () => {
      await createSession('test-token');

      expect(cookieStore.set).toHaveBeenCalledTimes(1);
      expect(cookieStore.set).toHaveBeenCalledWith(
        'session',
        'test-token',
        expect.objectContaining({
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
          expires: expect.any(Date),
        })
      );
    });
  });

  describe('validateSession', () => {
    it('returns true when token is valid', async () => {
      cookieStore.get.mockReturnValue({ value: 'valid-token' });
      validateToken.mockResolvedValue(true);

      const result = await validateSession();

      expect(validateToken).toHaveBeenCalledWith('valid-token');
      expect(result).toBe(true);
    });

    it('returns false when token is invalid', async () => {
      cookieStore.get.mockReturnValue({ value: 'invalid-token' });
      validateToken.mockResolvedValue(false);

      const result = await validateSession();

      expect(validateToken).toHaveBeenCalledWith('invalid-token');
      expect(result).toBe(false);
    });

    it('returns false when no session cookie exists', async () => {
      cookieStore.get.mockReturnValue(undefined);
      validateToken.mockResolvedValue(false);

      const result = await validateSession();

      expect(validateToken).toHaveBeenCalledWith(undefined);
      expect(result).toBe(false);
    });
  });

  describe('clearSession', () => {
    it('deletes session cookie', async () => {
      await clearSession();

      expect(cookieStore.delete).toHaveBeenCalledTimes(1);
      expect(cookieStore.delete).toHaveBeenCalledWith('session', { path: '/' });
    });
  });
});