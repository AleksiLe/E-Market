import postRegister from '../../src/services/postRegister';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('postRegister', () => {
  it('registers successfully', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const username = 'testuser';
    const response = await postRegister(email, password, username);
    expect(response).toEqual({ success: true });
  });
});