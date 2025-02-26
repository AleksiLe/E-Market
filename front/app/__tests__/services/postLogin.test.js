import postLogin from '../../src/services/postLogin';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true, token: 'test-token' }),
  })
);

describe('postLogin', () => {
  it('logs in successfully', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const response = await postLogin(email, password);
    expect(response).toEqual({ success: true, token: 'test-token' });
  });
});