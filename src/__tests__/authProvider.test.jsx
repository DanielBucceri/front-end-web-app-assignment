import { render, screen, fireEvent } from '@testing-library/react';
import AuthProvider, { useAuth } from '../provider/authProvider';
import React from 'react';
import { act } from 'react';

function TestComponent() {
  const { token, setToken, isAuthenticated } = useAuth();
  return (
    <div>
      <span data-testid="token">{token}</span>
      <span data-testid="auth">{isAuthenticated ? 'yes' : 'no'}</span>
      <button onClick={() => setToken('TestToken')}>Set Token</button>
    </div>
  );
}

describe('AuthProvider', () => {
  it('provides initial token and updates it', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('token').textContent).toBe('');
    expect(screen.getByTestId('auth').textContent).toBe('no');
    await act(async () => {
      fireEvent.click(screen.getByText('Set Token'));
    });
    expect(screen.getByTestId('token').textContent).toBe('TestToken');
    expect(screen.getByTestId('auth').textContent).toBe('yes');
  });
});
