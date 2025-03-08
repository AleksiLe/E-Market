import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../../src/components/navbar/navbar';
import { useToken } from '../../../src/context/tokenContext';
import { usePathname } from 'next/navigation';

// Mock the useToken hook
jest.mock('../../../src/context/tokenContext', () => ({
  useToken: jest.fn(),
}));

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('/');
    useToken.mockReturnValue({
      isTokenValid: false,
      checkToken: jest.fn(),
    });
  });

  it('renders the Navbar component', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows login popup when login button is clicked', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('closes login popup when close button is clicked', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByLabelText('Cancel')).not.toBeInTheDocument();
  });

  it('shows register popup when register button is clicked', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Create an account'));
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('closes register popup when close button is clicked', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Create an account'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByLabelText('Confirm Password')).not.toBeInTheDocument();
  });
   
  it('renders profile link when token is valid', () => {
    useToken.mockReturnValue({
      isTokenValid: true,
      checkToken: jest.fn(),
    });
    render(<Navbar />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});