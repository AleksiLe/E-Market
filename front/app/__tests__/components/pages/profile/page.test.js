import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '@/app/profile/page'; 
import { AuthContext } from '@/context/authContext';
import { redirect } from 'next/navigation';
import { clearSession } from '@/app/lib/session';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('@/app/lib/session', () => ({
  clearSession: jest.fn(),
}));

jest.mock('@/components/profile/changePassword', () => {
  return function ChangePasswordMock({ onClose }) {
    return (
      <div data-testid="change-password">
        <p>ChangePassword Popup</p>
        <button onClick={onClose}>Close Change Password</button>
      </div>
    );
  };
});

jest.mock('@/components/profile/changeEmail', () => {
  return function ChangeEmailMock({ onClose }) {
    return (
      <div data-testid="change-email">
        <p>ChangeEmail Popup</p>
        <button onClick={onClose}>Close Change Email</button>
      </div>
    );
  };
});

const renderProfile = (opts) => {
  const refreshAuth = jest.fn();

  render(
    <AuthContext.Provider value={{ isAuthenticated: opts.isAuthenticated, refreshAuth }}>
      <Profile />
    </AuthContext.Provider>
  );

  return { refreshAuth };
};

describe('Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to "/" when not authenticated', () => {
    renderProfile({ isAuthenticated: false });

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('renders profile page when authenticated', () => {
    renderProfile({ isAuthenticated: true });

    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByText('Welcome to your profile page!')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Change Password' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Change Email' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log Out' })).toBeInTheDocument();
  });

  it('opens and closes Change Password popup', () => {
    renderProfile({ isAuthenticated: true });

    expect(screen.queryByTestId('change-password')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Change Password' }));
    expect(screen.getByTestId('change-password')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close Change Password' }));
    expect(screen.queryByTestId('change-password')).not.toBeInTheDocument();
  });

  it('opens and closes Change Email popup', () => {
    renderProfile({ isAuthenticated: true });

    expect(screen.queryByTestId('change-email')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Change Email' }));
    expect(screen.getByTestId('change-email')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close Change Email' }));
    expect(screen.queryByTestId('change-email')).not.toBeInTheDocument();
  });

  it('logs out by clearing session and refreshing auth', () => {
    const { refreshAuth } = renderProfile({ isAuthenticated: true });

    fireEvent.click(screen.getByRole('button', { name: 'Log Out' }));

    expect(clearSession).toHaveBeenCalledTimes(1);
    expect(refreshAuth).toHaveBeenCalledTimes(1);
  });
});