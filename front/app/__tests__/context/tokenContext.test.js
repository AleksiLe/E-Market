import '@testing-library/jest-dom';
import { render, screen, waitFor, rerender } from '@testing-library/react';
import { TokenProvider, useToken } from '../../src/context/tokenContext';
import validateToken from '../../src/services/validateToken';

//This file is wip
// The mocking of local storage and rendering tokenContext does not work correctly
// and i am not able to test changes in mocked local storage

// Mock the validateToken service
jest.mock('../../src/services/validateToken');

const TestComponent = () => {
  const { isTokenValid, checkToken } = useToken();

  return (
    <div>
      <div data-testid="token-status">{isTokenValid ? 'Valid' : 'Invalid'}</div>
      <button onClick={checkToken}>Check Token</button>
    </div>
  );
};

describe('TokenContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initially sets token status to invalid', () => {
    render(
      <TokenProvider>
        <TestComponent />
      </TokenProvider>
    );

    expect(screen.getByTestId('token-status')).toHaveTextContent('Invalid');
  });

  it('sets token status to valid when token is valid', async () => {
    localStorage.setItem('token', 'valid-token');
    validateToken.mockResolvedValue(true);

    render(
      <TokenProvider>
        <TestComponent />
      </TokenProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('token-status')).toHaveTextContent('Valid');
    });
  });

  it('sets token status to invalid when token is invalid', async () => {
    localStorage.setItem('token', 'invalid-token');
    validateToken.mockResolvedValue(false);

    render(
      <TokenProvider>
        <TestComponent />
      </TokenProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('token-status')).toHaveTextContent('Invalid');
    });
  });

  it('sets token status to invalid when no token is present', async () => {
    render(
      <TokenProvider>
        <TestComponent />
      </TokenProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('token-status')).toHaveTextContent('Invalid');
    });
  });
});