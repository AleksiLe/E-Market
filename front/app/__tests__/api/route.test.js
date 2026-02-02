/**
 * @jest-environment node
 */

import { GET } from '@/app/api/session/route';
import { validateSession } from '@/app/lib/session';

jest.mock('@/app/lib/session', () => ({
  validateSession: jest.fn(),
}));

describe('GET validate-session route', () => {
  it('returns valid: true when session is valid', async () => {
    validateSession.mockResolvedValue(true);

    const response = await GET();
    const json = await response.json();

    expect(json).toEqual({ valid: true });
  });

  it('returns valid: false when session is invalid', async () => {
    validateSession.mockResolvedValue(false);

    const response = await GET();
    const json = await response.json();

    expect(json).toEqual({ valid: false });
  });
});