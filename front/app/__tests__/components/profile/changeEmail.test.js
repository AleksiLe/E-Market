import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ChangeEmail from '../../../src/components/profile/changeEmail';
import PostChangeEmail from '@/services/postChangeEmail';
jest.mock('@/services/postChangeEmail');

describe('ChangeEmail Component', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        window.localStorage.setItem('token', 'test-token');
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    test('renders the component correctly', () => {
        render(<ChangeEmail onClose={mockOnClose} />);
        expect(screen.getAllByText('Change Email')[0]).toBeInTheDocument();
        expect(screen.getByLabelText('New Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm New Email')).toBeInTheDocument();
    });

    test('shows error message when emails do not match', () => {
        render(<ChangeEmail onClose={mockOnClose} />);
        fireEvent.change(screen.getByLabelText('New Email'), { target: { value: 'user123@gmail.com' } });
        fireEvent.change(screen.getByLabelText('Confirm New Email'), { target: { value: 'user1234@gmail.com' } });
        act(() => {
            fireEvent.click(screen.getAllByText('Change Email')[1]);
        });
        expect(screen.getByText('Emails do not match.')).toBeInTheDocument();
    });

    test('shows error message when token is missing', () => {
        window.localStorage.removeItem('token');
        render(<ChangeEmail onClose={mockOnClose} />);
        fireEvent.change(screen.getByLabelText('New Email'), { target: { value: 'user123@gmail.com' } });
        fireEvent.change(screen.getByLabelText('Confirm New Email'), { target: { value: 'user123@gmail.com' } });
        act(() => {
            fireEvent.click(screen.getAllByText('Change Email')[1]);
        });
        expect(screen.getByText('You must be logged in to change your email.')).toBeInTheDocument();
    });

    test('handles successful email change', async () => {
        PostChangeEmail.mockResolvedValue({ success: true });
        render(<ChangeEmail onClose={mockOnClose} />);
        fireEvent.change(screen.getByLabelText('New Email'), { target: { value: 'user123@gmail.com' } });
        fireEvent.change(screen.getByLabelText('Confirm New Email'), { target: { value: 'user123@gmail.com' } });
        act(() => {
            fireEvent.click(screen.getAllByText('Change Email')[1]);
        });
        expect(PostChangeEmail).toHaveBeenCalledWith('test-token', 'user123@gmail.com');
        await screen.findByText('Email changed successfully!');
        expect(mockOnClose).toHaveBeenCalled();
    });

    test('shows generic error message if API returns a failure', async () => {
        PostChangeEmail.mockResolvedValue({ success: false, message: 'Something went wrong' });
        render(<ChangeEmail onClose={mockOnClose} />);
        fireEvent.change(screen.getByLabelText('New Email'), { target: { value: 'user123@gmail.com' } });
        fireEvent.change(screen.getByLabelText('Confirm New Email'), { target: { value: 'user123@gmail.com' } });
        act(() => {
            fireEvent.click(screen.getAllByText('Change Email')[1]);
        });
        await screen.findByText('Something went wrong');
    });

    test('calls onClose when cancel button is clicked', () => {
        render(<ChangeEmail onClose={mockOnClose} />);
        act(() => {
            fireEvent.click(screen.getByText('Cancel'));
        });
        expect(mockOnClose).toHaveBeenCalled();
    });

    test('handles API errors', async () => {
        PostChangeEmail.mockResolvedValue({
            errors: [{ path: 'email', msg: 'Email is too weak' }],
        });
        render(<ChangeEmail onClose={mockOnClose} />);
        fireEvent.change(screen.getByLabelText('New Email'), { target: { value: 'user123@gmail.com' } });
        fireEvent.change(screen.getByLabelText('Confirm New Email'), { target: { value: 'user123@gmail.com' } });
        act(() => {
            fireEvent.click(screen.getAllByText('Change Email')[1]);
        });
        await screen.findByText('email : Email is too weak');
    });

    test('does not call API if email fields are empty', () => {
        render(<ChangeEmail onClose={mockOnClose} />);
        act(() => {
            fireEvent.click(screen.getAllByText('Change Email')[1]);
        });
        expect(PostChangeEmail).not.toHaveBeenCalled();
        expect(screen.getByText('Emails do not match.')).toBeInTheDocument();
    });
});