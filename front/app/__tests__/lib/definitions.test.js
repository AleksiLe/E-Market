import { RegisterFormSchema, LoginFormSchema } from '@/app/lib/definitions'; 

describe('RegisterFormSchema', () => {
  it('passes with valid data', () => {
    const result = RegisterFormSchema.safeParse({
      username: 'john',
      email: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    });

    expect(result.success).toBe(true);
  });

  it('fails when passwords do not match', () => {
    const result = RegisterFormSchema.safeParse({
      username: 'john',
      email: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password2!',
    });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].path).toEqual(['confirmPassword']);
    expect(result.error.issues[0].message).toBe("Passwords don't match");
  });

  it('fails when username is too short', () => {
    const result = RegisterFormSchema.safeParse({
      username: 'j',
      email: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    });

    expect(result.success).toBe(false);
  });

  it('fails when email is invalid', () => {
    const result = RegisterFormSchema.safeParse({
      username: 'john',
      email: 'not-an-email',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    });

    expect(result.success).toBe(false);
  });

  it('fails when password lacks a number', () => {
    const result = RegisterFormSchema.safeParse({
      username: 'john',
      email: 'john@example.com',
      password: 'Password!',
      confirmPassword: 'Password!',
    });

    expect(result.success).toBe(false);
  });

  it('fails when password lacks a special character', () => {
    const result = RegisterFormSchema.safeParse({
      username: 'john',
      email: 'john@example.com',
      password: 'Password1',
      confirmPassword: 'Password1',
    });

    expect(result.success).toBe(false);
  });
});

describe('LoginFormSchema', () => {
  it('passes with valid data', () => {
    const result = LoginFormSchema.safeParse({
      email: 'john@example.com',
      password: 'Password1!',
    });

    expect(result.success).toBe(true);
  });

  it('fails when email is invalid', () => {
    const result = LoginFormSchema.safeParse({
      email: 'invalid-email',
      password: 'Password1!',
    });

    expect(result.success).toBe(false);
  });

  it('fails when password is too short', () => {
    const result = LoginFormSchema.safeParse({
      email: 'john@example.com',
      password: 'Pass1!',
    });

    expect(result.success).toBe(false);
  });

  it('fails when password lacks a letter', () => {
    const result = LoginFormSchema.safeParse({
      email: 'john@example.com',
      password: '12345678!',
    });

    expect(result.success).toBe(false);
  });

  it('fails when password lacks a number', () => {
    const result = LoginFormSchema.safeParse({
      email: 'john@example.com',
      password: 'Password!',
    });

    expect(result.success).toBe(false);
  });

  it('fails when password lacks a special character', () => {
    const result = LoginFormSchema.safeParse({
      email: 'john@example.com',
      password: 'Password1',
    });

    expect(result.success).toBe(false);
  });
});