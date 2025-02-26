import validateToken from '../../src/services/validateToken';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('validateToken', () => {
  it('validates token successfully', async () => {
    const token = 'test-token';
    const isValid = await validateToken(token);
    expect(isValid).toBe(true);
  });

  it('handles token validation failure', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false }),
      })
    );
    const token = 'invalid-token';
    const isValid = await validateToken(token);
    expect(isValid).toBe(false);
  });
});