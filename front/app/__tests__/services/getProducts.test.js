import getProducts from '../../src/services/getProducts';

global.fetch = jest.fn();

describe('getProducts', () => {
  it('fetches products successfully', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ _id: '1', name: 'Product 1', description: 'Description 1' }]),
      })
    );

    const products = await getProducts();
    expect(products).toEqual([{ _id: '1', name: 'Product 1', description: 'Description 1' }]);
  });

  it('handles fetch error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch error')));
    await expect(getProducts()).rejects.toThrow('Fetch error');
  });

  it('handles non-OK response', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Something went wrong' }),
      })
    );

    await expect(getProducts()).rejects.toThrow('Something went wrong');
  });

  it('handles non-OK response without message', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    await expect(getProducts()).rejects.toThrow('Something went wrong');
  });
});