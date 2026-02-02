import { render, screen, fireEvent } from '@testing-library/react';
import Page from '@/app/page'

jest.mock('next/link', () => {
  return ({ href, children }) => <a href={href}>{children}</a>;
});

jest.mock('@/components/authentication/login', () => {
  return ({ onClose, onRegisterClick }) => (
    <div data-testid="login-popup">
      <button onClick={onClose}>Close Login</button>
      <button onClick={onRegisterClick}>Go to Register</button>
    </div>
  );
});

jest.mock('@/components/authentication/register', () => {
  return ({ onClose, onLoginClickFromRegister }) => (
    <div data-testid="register-popup">
      <button onClick={onClose}>Close Register</button>
      <button onClick={onLoginClickFromRegister}>Go to Login</button>
    </div>
  );
});

describe('Home page', () => {
  it('renders headline and call-to-action', () => {
    render(<Page />);

    expect(
      screen.getByText('Shopping made simple for everyone')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Welcome to the E-Market')
    ).toBeInTheDocument();

    expect(screen.getByText('Shop Now')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('opens login popup when Sign Up is clicked', () => {
    render(<Page />);

    fireEvent.click(screen.getByText('Sign Up'));
    expect(screen.getByTestId('login-popup')).toBeInTheDocument();
  });

  it('closes login popup when Close Login is clicked', () => {
    render(<Page />);

    fireEvent.click(screen.getByText('Sign Up'));
    expect(screen.getByTestId('login-popup')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close Login'));
    expect(screen.queryByTestId('login-popup')).not.toBeInTheDocument();
  });

  it('switches from login popup to register popup', () => {
    render(<Page />);

    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByText('Go to Register'));

    expect(screen.queryByTestId('login-popup')).not.toBeInTheDocument();
    expect(screen.getByTestId('register-popup')).toBeInTheDocument();
  });

  it('switches from register popup back to login popup', () => {
    render(<Page />);

    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByText('Go to Register'));
    fireEvent.click(screen.getByText('Go to Login'));

    expect(screen.queryByTestId('register-popup')).not.toBeInTheDocument();
    expect(screen.getByTestId('login-popup')).toBeInTheDocument();
  });

  it('closes register popup when Close Register is clicked', () => {
    render(<Page />);

    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByText('Go to Register'));
    expect(screen.getByTestId('register-popup')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close Register'));
    expect(screen.queryByTestId('register-popup')).not.toBeInTheDocument();
  });
});