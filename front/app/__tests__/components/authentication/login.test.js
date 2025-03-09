import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../../src/components/authentication/login';
import postLogin from '../../../src/services/postLogin';
import { useToken } from '../../../src/context/tokenContext';

// Mock the postLogin service
jest.mock('../../../src/services/postLogin');

// Mock the useToken hook
jest.mock('../../../src/context/tokenContext', () => ({
useToken: jest.fn(),
}));

describe('Login', () => {
const onClose = jest.fn();
const onRegisterClick = jest.fn();   

beforeEach(() => {
    useToken.mockReturnValue({
        checkToken: jest.fn(),
    });
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(window, 'alert').mockImplementation(() => {});
});

it('renders the Login component', () => {
    render(<Login onClose={onClose} onRegisterClick={onRegisterClick} />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
});

it('calls postLogin and handles successful login', async () => {
    postLogin.mockResolvedValue({ success: true, token: 'test-token' });
    render(<Login onClose={onClose} onRegisterClick={onRegisterClick} />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getAllByText('Login')[1]);

    await waitFor(() => {
        expect(Storage.prototype.setItem).toHaveBeenCalled()
        expect(useToken.mockReturnValue()).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
    });
});

it('calls postLogin and handles failed login', async () => {
    postLogin.mockResolvedValue({ success: false, message: 'Invalid credentials' });
    render(<Login onClose={onClose} onRegisterClick={onRegisterClick} />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getAllByText('Login')[1]);

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalled();
    });
});

it('calls onClose when cancel button is clicked', () => {
    render(<Login onClose={onClose} onRegisterClick={onRegisterClick} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
});

it('calls onRegisterClick when create an account button is clicked', () => {
    render(<Login onClose={onClose} onRegisterClick={onRegisterClick} />);
    fireEvent.click(screen.getByText('Create an account'));
    expect(onRegisterClick).toHaveBeenCalled();
});
});