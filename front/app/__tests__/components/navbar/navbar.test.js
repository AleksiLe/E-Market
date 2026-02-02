import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/navbar/navbar';
import { AuthContext } from '@/context/authContext';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock child components
jest.mock('@/components/navbar/hyperlink', () => {
  return ({ address, text }) => (
    <a href={address}>{text}</a>
  );
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
  return ({ onClose, onLoginClick }) => (
    <div data-testid="register-popup">
      <button onClick={onClose}>Close Register</button>
      <button onClick={onLoginClick}>Go to Login</button>
    </div>
  );
});

const renderNavbar = (isAuthenticated) => {
  return render(
    <AuthContext.Provider value={{ isAuthenticated }}>
      <Navbar />
    </AuthContext.Provider>
  );
};

describe('Navbar', () => {
  it('renders navigation links', () => {
    renderNavbar(false);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('shows Login button when not authenticated', () => {
    renderNavbar(false);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('shows Profile link when authenticated', () => {
    renderNavbar(true);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('opens login popup when Login button is clicked', () => {
    renderNavbar(false);

    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByTestId('login-popup')).toBeInTheDocument();
  });

  it('closes login popup when Close Login is clicked', () => {
    renderNavbar(false);

    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByTestId('login-popup')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close Login'));
    expect(screen.queryByTestId('login-popup')).not.toBeInTheDocument();
  });

  it('switches from login popup to register popup', () => {
    renderNavbar(false);

    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Go to Register'));

    expect(screen.queryByTestId('login-popup')).not.toBeInTheDocument();
    expect(screen.getByTestId('register-popup')).toBeInTheDocument();
  });

  it('closes register popup when Close Register is clicked', () => {
    renderNavbar(false);

    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Go to Register'));
    expect(screen.getByTestId('register-popup')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close Register'));
    expect(screen.queryByTestId('register-popup')).not.toBeInTheDocument();
  });
});