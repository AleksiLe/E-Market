import getCart from '@/services/getCart';

global.fetch = jest.fn();

describe('getCart', () => {
  it('fetches cart items successfully', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([{ _id: '1', name: 'Item 1', quantity: 2 }]),
      })
    );

    const cart = await getCart();
    expect(cart).toEqual([{ _id: '1', name: 'Item 1', quantity: 2 }]);
  });

  it('handles fetch error', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Fetch error'))
    );

    await expect(getCart()).rejects.toThrow('Fetch error');
  });

  it('handles non-OK response', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Something went wrong' }),
      })
    );

    await expect(getCart()).rejects.toThrow('Something went wrong');
  });

  it('handles non-OK response without message', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    await expect(getCart()).rejects.toThrow('Something went wrong');
  });
});