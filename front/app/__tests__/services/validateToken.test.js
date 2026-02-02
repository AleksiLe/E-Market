import validateToken from '../../src/services/validateToken';

describe('validateToken', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns true when API responds with success', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const result = await validateToken('valid-token');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('user/verify'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer valid-token',
        }),
      })
    );

    expect(result).toBe(true);
  });

  it('returns false when response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const result = await validateToken('bad-token');

    expect(result).toBe(false);
  });

  it('returns false when success is missing', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const result = await validateToken('token');

    expect(result).toBe(false);
  });
});