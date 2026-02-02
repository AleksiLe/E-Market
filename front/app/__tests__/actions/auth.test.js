/**
 * @jest-environment node
 */

import { register, login } from '@/app/actions/auth';
import postRegister from '@/services/postRegister';
import postLogin from '@/services/postLogin';
import { createSession } from '@/app/lib/session';

jest.mock('@/services/postRegister', () => jest.fn());
jest.mock('@/services/postLogin', () => jest.fn());
jest.mock('@/app/lib/session', () => ({
  createSession: jest.fn(),
}));

// helper to mock FormData
const createFormData = (data) => ({
  get: (key) => data[key],
});

describe('register action', () => {
  it('returns validation errors when fields are invalid', async () => {
    const formData = createFormData({
      username: 'a',
      email: 'invalid-email',
      password: '123',
      confirmPassword: '456',
    });

    const result = await register(undefined, formData);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(postRegister).not.toHaveBeenCalled();
  });

  it('returns error when postRegister fails', async () => {
    postRegister.mockResolvedValueOnce({
      success: false,
      message: 'Registration failed',
    });

    const formData = createFormData({
      username: 'john',
      email: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    });

    const result = await register(undefined, formData);

    expect(postRegister).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      success: false,
      error: { message: 'Registration failed' },
    });
  });

  it('returns success when postRegister succeeds', async () => {
    postRegister.mockResolvedValueOnce({
      success: true,
      message: 'Registered successfully',
    });

    const formData = createFormData({
      username: 'john',
      email: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    });

    const result = await register(undefined, formData);

    expect(postRegister).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      success: true,
      message: 'Registered successfully',
    });
  });
});

describe('login action', () => {
  it('returns validation errors when fields are invalid', async () => {
    const formData = createFormData({
      email: 'invalid-email',
      password: '123',
    });

    const result = await login(undefined, formData);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(postLogin).not.toHaveBeenCalled();
  });

  it('returns error when postLogin fails', async () => {
    postLogin.mockResolvedValueOnce({
      success: false,
      message: 'Invalid credentials',
    });

    const formData = createFormData({
      email: 'john@example.com',
      password: 'Password1!',
    });

    const result = await login(undefined, formData);

    expect(postLogin).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      success: false,
      error: { message: 'Invalid credentials' },
    });
    expect(createSession).not.toHaveBeenCalled();
  });

  it('creates session and returns success when login succeeds', async () => {
    postLogin.mockResolvedValueOnce({
      success: true,
      token: 'test-token',
    });

    const formData = createFormData({
      email: 'john@example.com',
      password: 'Password1!',
    });

    const result = await login(undefined, formData);

    expect(postLogin).toHaveBeenCalledTimes(1);
    expect(createSession).toHaveBeenCalledWith('test-token');
    expect(result).toEqual({
      success: true,
      message: 'Login successful.',
    });
  });
});