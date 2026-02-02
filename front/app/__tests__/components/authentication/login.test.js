import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Login from '@/components/authentication/login'; 
import { AuthContext } from '@/context/authContext';

// mock server action import (not used directly since we mock useActionState)
jest.mock('@/app/actions/auth', () => ({
  login: jest.fn(),
}));

// this component imports useRouter but doesn't use it — still safe to mock
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

describe('Login', () => {
  const onClose = jest.fn();
  const onRegisterClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    // Restore useActionState if we spied on it
    (React.useActionState)?.mockRestore?.();
  });

  /**
   * Helper: mock useActionState for this component.
   * It returns [state, action, pending]
   */
  const mockUseActionState = (opts) => {
    const { state = undefined, pending = false } = opts;
    const action = jest.fn();

    jest
      .spyOn(React, 'useActionState')
      .mockImplementation(() => [state, action, pending]);
  };

  const renderLogin = (auth) => {
    const refreshAuth = auth?.refreshAuth ?? jest.fn();

    render(
      <AuthContext.Provider value={{ refreshAuth }}>
        <Login onClose={onClose} onRegisterClick={onRegisterClick} />
      </AuthContext.Provider>
    );

    return { refreshAuth };
  };

  it('renders the form fields and buttons', () => {
    mockUseActionState({ state: undefined, pending: false });

    renderLogin();

    // Title heading
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();

    // Fields
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    // Buttons
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create an account' })).toBeInTheDocument();
  });

  it('calls onClose when Cancel is clicked', () => {
    mockUseActionState({ state: undefined, pending: false });

    renderLogin();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onRegisterClick when "Create an account" is clicked', () => {
    mockUseActionState({ state: undefined, pending: false });

    renderLogin();

    fireEvent.click(screen.getByRole('button', { name: 'Create an account' }));
    expect(onRegisterClick).toHaveBeenCalledTimes(1);
  });

  it('renders top-level error message when state.error.message exists', () => {
    mockUseActionState({
      state: { error: { message: 'Invalid credentials' } },
      pending: false,
    });

    renderLogin();

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('renders field errors when present', () => {
    mockUseActionState({
      pending: false,
      state: {
        error: {
          email: 'Email is required',
          password: 'Password is required',
        },
      },
    });

    renderLogin();

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('shows success message and after 2 seconds calls refreshAuth then onClose', async () => {
    const refreshAuth = jest.fn();

    mockUseActionState({
      pending: false,
      state: {
        success: true,
        message: 'Login successful!',
      },
    });

    renderLogin({ refreshAuth });

    // success visible (showSuccess true)
    expect(screen.getByText('Login successful!')).toBeInTheDocument();

    // not immediately called
    expect(refreshAuth).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(refreshAuth).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('cleans up timer on unmount (no calls after unmount)', () => {
    const refreshAuth = jest.fn();

    mockUseActionState({
      pending: false,
      state: {
        success: true,
        message: 'Login successful!',
      },
    });

    const { unmount } = render(
      <AuthContext.Provider value={{ refreshAuth }}>
        <Login onClose={onClose} onRegisterClick={onRegisterClick} />
      </AuthContext.Provider>
    );

    unmount();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(refreshAuth).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not crash if state is undefined', async () => {
    // sanity: initial state case
    mockUseActionState({ state: undefined, pending: false });

    renderLogin();

    // still renders basic UI
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    });
  });
});