import updateCart from '@/services/postCartUpdate';

global.fetch = jest.fn();

describe('updateCart', () => {
  it('updates cart successfully', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    const result = await updateCart('token123', 'product1', 2);
    expect(result).toEqual({ success: true });
  });

  it('handles fetch error', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Fetch error'))
    );

    await expect(
      updateCart('token123', 'product1', 2)
    ).rejects.toThrow('Fetch error');
  });

  it('handles non-OK response', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Something went wrong' }),
      })
    );

    const result = await updateCart('token123', 'product1', 2);
    expect(result).toEqual({ success: false, message: 'Something went wrong' });
  });

  it('handles non-OK response without message', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    const result = await updateCart('token123', 'product1', 2);
    expect(result).toEqual({ success: false, message: 'Something went wrong' });
  });
});