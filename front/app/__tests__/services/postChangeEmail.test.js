import postChangeEmail from '../../src/services/postChangeEmail';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('postChangeEmail', () => {
  it('changes email successfully', async () => {
    const token = 'test-token';
    const newEmail = 'newemail@example.com';
    const response = await postChangeEmail(token, newEmail);
    expect(response).toEqual({ success: true });
  });
});