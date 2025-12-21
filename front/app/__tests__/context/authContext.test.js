import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../../src/context/authContext';

// Mock validateSession
jest.mock('@/app/lib/session', () => ({
    validateSession: jest.fn(),
}));

describe('AuthProvider', () => {
    let validateSession;

    beforeEach(() => {
        validateSession = require('@/app/lib/session').validateSession;
        jest.clearAllMocks();
    });

    it('provides isAuthenticated and setIsAuthenticated', async () => {
        validateSession.mockResolvedValueOnce(true);

        let contextValue;
        function TestComponent() {
            contextValue = React.useContext(AuthContext);
            return null;
        }

        await act(async () => {
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );
        });

        // After mount, refreshAuth is called and sets isAuthenticated
        expect(validateSession).toHaveBeenCalledTimes(1);
        expect(typeof contextValue.isAuthenticated).toBe('boolean');
        expect(typeof contextValue.setIsAuthenticated).toBe('function');
        expect(typeof contextValue.refreshAuth).toBe('function');
    });

    it('refreshAuth updates isAuthenticated to true', async () => {
        validateSession.mockResolvedValueOnce(false).mockResolvedValueOnce(true);

        let contextValue;
        function TestComponent() {
            contextValue = React.useContext(AuthContext);
            return null;
        }

        await act(async () => {
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );
        });

        // Initially false
        expect(contextValue.isAuthenticated).toBe(false);

        // Call refreshAuth and check update
        await act(async () => {
            await contextValue.refreshAuth();
        });

        expect(validateSession).toHaveBeenCalledTimes(2);
        expect(contextValue.isAuthenticated).toBe(true);
    });

    it('refreshAuth updates isAuthenticated to false', async () => {
        validateSession.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

        let contextValue;
        function TestComponent() {
            contextValue = React.useContext(AuthContext);
            return null;
        }

        await act(async () => {
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );
        });

        // Initially true
        expect(contextValue.isAuthenticated).toBe(true);

        // Call refreshAuth and check update
        await act(async () => {
            await contextValue.refreshAuth();
        });

        expect(validateSession).toHaveBeenCalledTimes(2);
        expect(contextValue.isAuthenticated).toBe(false);
    });

    it('setIsAuthenticated can manually set value', async () => {
        validateSession.mockResolvedValueOnce(false);

        let contextValue;
        function TestComponent() {
            contextValue = React.useContext(AuthContext);
            return null;
        }

        await act(async () => {
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );
        });

        expect(contextValue.isAuthenticated).toBe(false);

        act(() => {
            contextValue.setIsAuthenticated(true);
        });

        expect(contextValue.isAuthenticated).toBe(true);
    });
});