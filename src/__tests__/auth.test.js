import { saveToken, getToken, removeToken, isAuthenticated } from '../services/auth';

describe('auth service', () => {
  const TOKEN_KEY = 'jwt_token';

  beforeEach(() => {
    localStorage.clear();
  });

  test('saveToken stores the token in localStorage', () => {
    saveToken('TestToken');
    expect(localStorage.getItem(TOKEN_KEY)).toBe('TestToken');
  });

  test('getToken retrieves the token', () => {
    localStorage.setItem(TOKEN_KEY, 'TestToken');
    expect(getToken()).toBe('TestToken');
  });

  test('removeToken deletes the token', () => {
    localStorage.setItem(TOKEN_KEY, 'TestToken');
    removeToken();
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
  });

  test('isAuthenticated returns true only when a token exists', () => {
    expect(isAuthenticated()).toBe(false);
    saveToken('TestToken');
    expect(isAuthenticated()).toBe(true);
  });
});
