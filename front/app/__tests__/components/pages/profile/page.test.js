import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '@/app/profile/page';
import { useToken } from '@/context/tokenContext';

jest.mock('@/context/tokenContext', () => ({
    useToken: jest.fn(),
}));

describe('Profile Component', () => {
    const mockCheckToken = jest.fn();
    const mockIsTokenValid = true;

    beforeEach(() => {
        jest.clearAllMocks();
        useToken.mockReturnValue({
            isTokenValid: mockIsTokenValid,
            checkToken: mockCheckToken,
        });
    });

    test('renders the profile page correctly', () => {
        render(<Profile />);
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Welcome to your profile page!')).toBeInTheDocument();
        expect(screen.getByText('Change Password')).toBeInTheDocument();
        expect(screen.getByText('Change Email')).toBeInTheDocument();
        expect(screen.getByText('Log Out')).toBeInTheDocument();
    });

     test('calls checkToken on mount', () => {
        render(<Profile />);
        expect(mockCheckToken).toHaveBeenCalled();
    });

    test('redirects to home if token is invalid', () => {
        useToken.mockReturnValue({
            isTokenValid: false,
            checkToken: mockCheckToken,
        });
        delete window.location;
        window.location = { href: '' };

        render(<Profile />);
        expect(window.location.href).toBe('/');
    });

    test('shows ChangePassword component when "Change Password" button is clicked', () => {
        render(<Profile />);
        fireEvent.click(screen.getByText('Change Password'));
        expect(screen.getByText('New Password')).toBeInTheDocument();
    });

    test('hides ChangePassword component when onClose is triggered', () => {
        render(<Profile />);
        fireEvent.click(screen.getByText('Change Password'));
        expect(screen.getByText('New Password')).toBeInTheDocument();
        fireEvent.click(screen.getAllByText('Cancel')[0]);
        expect(screen.queryByText('New Password')).not.toBeInTheDocument();
    });

    test('shows ChangeEmail component when "Change Email" button is clicked', () => {
        render(<Profile />);
        fireEvent.click(screen.getByText('Change Email'));
        expect(screen.getByText('New Email')).toBeInTheDocument();
    });

    test('hides ChangeEmail component when onClose is triggered', () => {
        render(<Profile />);
        fireEvent.click(screen.getByText('Change Email'));
        expect(screen.getByText('New Email')).toBeInTheDocument();
        fireEvent.click(screen.getAllByText('Cancel')[0]);
        expect(screen.queryByText('New Email')).not.toBeInTheDocument();
    });
    test('logs out and redirects to home when "Log Out" button is clicked', () => {
        delete window.location;
        window.location = { href: '' };

        render(<Profile />);
        fireEvent.click(screen.getByText('Log Out'));
        expect(window.localStorage.getItem('token')).toBeNull();
        expect(window.location.href).toBe('/');
    }); 
});