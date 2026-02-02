import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

jest.mock('next/font/local', () => {
  return () => ({
    variable: 'mock-font-variable',
  });
});

jest.mock('@/app/globals.css', () => ({}));

jest.mock('@/components/navbar/navbar', () => {
  return function NavbarMock() {
    return <nav data-testid="navbar">Navbar</nav>;
  };
});

jest.mock('@/context/authContext', () => ({
  AuthProvider: ({ children }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
}));

describe('RootLayout', () => {
  it('renders Navbar and children inside AuthProvider', () => {
    const element = RootLayout({
      children: <div data-testid="page-content">Page Content</div>,
    });

    // element = <html> ... </html>
    // element.props.children = <body> ... </body>
    // body.props.children = the actual app content (AuthProvider -> Navbar + children)
    const body = element.props.children;
    const bodyContents = body.props.children;

    render(bodyContents);

    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
  });
});