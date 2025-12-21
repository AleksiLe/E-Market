import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../../../src/components/authentication/register';
import postRegister from '../../../src/services/postRegister';

// Mock the postRegister service
jest.mock('../../../src/services/postRegister');

describe('Register', () => {
const onClose = jest.fn();
const onLoginClick = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
});

it('renders the Register component', () => {
    render(<Register onClose={onClose} onLoginClick={onLoginClick} />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
});

it('validates password mismatch', async () => {
    render(<Register onClose={onClose} onLoginClick={onLoginClick} />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password132!' } });
    fireEvent.click(screen.getAllByText('Register')[1]);

    await waitFor(() => {
        expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    });
});

it('calls postRegister and handles successful registration', async () => {
    postRegister.mockResolvedValue({ success: true, message: 'Registration successful' });
    render(<Register onClose={onClose} onLoginClick={onLoginClick} />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getAllByText('Register')[1]);

    await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
        expect(onLoginClick).toHaveBeenCalled();
    });
});

it('calls postRegister and handles registration errors when user is taken', async () => {
    postRegister.mockResolvedValue({
    success: false,
    errors: { message: 'Email already in use.' },
    });
    render(<Register onClose={onClose} onLoginClick={onLoginClick} />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getAllByText('Register')[1]);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    expect(screen.getByText('Email already in use.')).toBeInTheDocument();
});
});

/* it('calls postRegister and handles registration error', async () => {
    postRegister.mockResolvedValue({
    success: false,
    message: 'Registration failed',
    });
    render(<Register onClose={onClose} onLoginClick={onLoginClick} />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getAllByText('Register')[1]);

    await waitFor(() => {
    expect(screen.getByText('Registration failed')).toBeInTheDocument();
    });
}); */

it('calls postRegister and returns correct error message', async () => {
    postRegister.mockResolvedValue({
    success: false,
    });
    render(<Register onClose={onClose} onLoginClick={onLoginClick} />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password!' } });
    fireEvent.click(screen.getAllByText('Register')[1]);

    await waitFor(() => {
    expect(screen.getByText("Contain at least one number.")).toBeInTheDocument();
    });
});  

it('calls onClose when cancel button is clicked', () => {
    render(<Register onClose={onClose} onLoginClick={onLoginClick} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
});