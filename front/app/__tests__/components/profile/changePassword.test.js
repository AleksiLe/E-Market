import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ChangePassword from '../../../src/components/profile/changePassword';
import PostChangePassword from '@/services/postChangePassword';
jest.mock('@/services/postChangePassword');

describe('ChangePassword Component', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        window.localStorage.setItem('token', 'test-token');
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    test('renders the component correctly', () => {
        render(<ChangePassword onClose={mockOnClose} />);
        expect(screen.getAllByText('Change Password')[0]).toBeInTheDocument();
        expect(screen.getByLabelText('New Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
    });

    test('shows error message when passwords do not match', () => {
        render(<ChangePassword onClose={mockOnClose} />);
        fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'password456' } });
        act(() => {
            fireEvent.click(screen.getAllByText('Change Password')[1]);
        });
        expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    });

    test('shows error message when token is missing', () => {
        window.localStorage.removeItem('token');
        render(<ChangePassword onClose={mockOnClose} />);
        fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'password123' } });
        act(() => {
            fireEvent.click(screen.getAllByText('Change Password')[1]);
        });
        expect(screen.getByText('You must be logged in to change your password.')).toBeInTheDocument();
    });

    test('handles successful password change', async () => {
        PostChangePassword.mockResolvedValue({ success: true });
        render(<ChangePassword onClose={mockOnClose} />);
        fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'password123' } });
        act(() => {
            fireEvent.click(screen.getAllByText('Change Password')[1]);
        });
        expect(PostChangePassword).toHaveBeenCalledWith('test-token', 'password123');
        await screen.findByText('Password changed successfully!');
        expect(mockOnClose).toHaveBeenCalled();
    });

    test('handles API errors', async () => {
        PostChangePassword.mockResolvedValue({
            errors: [{ path: 'password', msg: 'Password is too weak' }],
        });
        render(<ChangePassword onClose={mockOnClose} />);
        fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'password123' } });
        act(() => {
            fireEvent.click(screen.getAllByText('Change Password')[1]);
        });
        await screen.findByText('password : Password is too weak');
    });

    test('shows generic error message if API returns a failure', async () => {
        PostChangePassword.mockResolvedValue({ success: false, message: 'Something went wrong' });
        render(<ChangePassword onClose={mockOnClose} />);
        fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'password123' } });
        act(() => {
            fireEvent.click(screen.getAllByText('Change Password')[1]);
        });
        await screen.findByText('Something went wrong');
    });

    test('calls onClose when cancel button is clicked', () => {
        render(<ChangePassword onClose={mockOnClose} />);
        act(() => {
            fireEvent.click(screen.getByText('Cancel'));
        });
        expect(mockOnClose).toHaveBeenCalled();
    });

    test('does not call API if password fields are empty', () => {
        render(<ChangePassword onClose={mockOnClose} />);
        act(() => {
            fireEvent.click(screen.getAllByText('Change Password')[1]);
        });
        expect(PostChangePassword).not.toHaveBeenCalled();
        expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    });
});