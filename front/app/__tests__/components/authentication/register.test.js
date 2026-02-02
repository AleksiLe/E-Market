import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Register from '@/components/authentication/register';

// Mock the server action import (not used directly once we mock useActionState)
jest.mock('@/app/actions/auth', () => ({
register: jest.fn(),
}));

describe('Register component', () => {
const onClose = jest.fn();
const onLoginClick = jest.fn();
const onLoginClickFromRegister = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

/**
 * Helper to mock useActionState return values per test
 */
const mockUseActionState = (opts) => {
    const { state = undefined, pending = false } = opts;

    const action = jest.fn(); // form action handler

    jest
    .spyOn(React, 'useActionState')
    .mockImplementation(() => [state, action, pending]);
};

it('renders the form fields and buttons', () => {
    mockUseActionState({ state: undefined, pending: false });

    render(
    <Register
        onClose={onClose}
        onLoginClick={onLoginClick}
        onLoginClickFromRegister={onLoginClickFromRegister}
    />
    );

    const registerTexts = screen.getAllByText('Register');
    expect(registerTexts[0]).toBeInTheDocument();

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
});

it('shows "Registering..." when pending is true', () => {
    mockUseActionState({ state: undefined, pending: true });

    render(
    <Register
        onClose={onClose}
        onLoginClick={onLoginClick}
        onLoginClickFromRegister={onLoginClickFromRegister}
    />
    );

    expect(screen.getByRole('button', { name: 'Registering...' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Register' })).not.toBeInTheDocument();
});

it('calls onClose when Cancel is clicked', () => {
    mockUseActionState({ state: undefined, pending: false });

    render(
    <Register
        onClose={onClose}
        onLoginClick={onLoginClick}
        onLoginClickFromRegister={onLoginClickFromRegister}
    />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);
});

it('calls onLoginClickFromRegister when the bottom Login button is clicked', () => {
    mockUseActionState({ state: undefined, pending: false });

    render(
    <Register
        onClose={onClose}
        onLoginClick={onLoginClick}
        onLoginClickFromRegister={onLoginClickFromRegister}
    />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(onLoginClickFromRegister).toHaveBeenCalledTimes(1);
});

it('renders field validation errors when present', () => {
    mockUseActionState({
    pending: false,
    state: {
        error: {
        email: 'Email is invalid',
        username: 'Username is required',
        password: 'Password too short',
        confirmPassword: 'Passwords do not match',
        },
    },
    });

    render(
    <Register
        onClose={onClose}
        onLoginClick={onLoginClick}
        onLoginClickFromRegister={onLoginClickFromRegister}
    />
    );

    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Password too short')).toBeInTheDocument();
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
});

it('renders a top-level error message when state.error.message exists', () => {
    mockUseActionState({
    pending: false,
    state: {
        error: {
        message: 'Registration failed',
        },
    },
    });

    render(
    <Register
        onClose={onClose}
        onLoginClick={onLoginClick}
        onLoginClickFromRegister={onLoginClickFromRegister}
    />
    );

    expect(screen.getByText('Registration failed')).toBeInTheDocument();
});

it('shows success message and after 2 seconds calls onClose and onLoginClick', () => {
    mockUseActionState({
    pending: false,
    state: {
        success: true,
        message: 'Registration successful!',
    },
    });

    render(
    <Register
        onClose={onClose}
        onLoginClick={onLoginClick}
        onLoginClickFromRegister={onLoginClickFromRegister}
    />
    );

    // Success alert visible
    expect(screen.getByText('Registration successful!')).toBeInTheDocument();

    // Not called immediately
    expect(onClose).not.toHaveBeenCalled();
    expect(onLoginClick).not.toHaveBeenCalled();

    // After 2 seconds, should redirect to login (onClose + onLoginClick)
    act(() => {
    jest.advanceTimersByTime(2000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onLoginClick).toHaveBeenCalledTimes(1);
});

it('cleans up the timer on unmount (no redirect after unmount)', () => {
    mockUseActionState({
    pending: false,
    state: {
        success: true,
        message: 'Registration successful!',
    },
    });

    const { unmount } = render(
    <Register
        onClose={onClose}
        onLoginClick={onLoginClick}
        onLoginClickFromRegister={onLoginClickFromRegister}
    />
    );

    unmount();

    act(() => {
    jest.advanceTimersByTime(2000);
    });

    expect(onClose).not.toHaveBeenCalled();
    expect(onLoginClick).not.toHaveBeenCalled();
});
});