import postChangePassword from '../../src/services/postChangePassword';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('postChangePassword', () => {
  it('changes password successfully', async () => {
    const token = 'test-token';
    const newPassword = 'newpassword';
    const response = await postChangePassword(token, newPassword);
    expect(response).toEqual({ success: true });
  });
});