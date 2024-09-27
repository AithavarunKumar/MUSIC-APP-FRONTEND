import { renderHook ,act} from '@testing-library/react';
import useAuthService from './authService';

describe('useAuthService', () => {
  it('should start with user as null', () => {
    const { result } = renderHook(() => useAuthService());

    expect(result.current.user).toBeNull();
  });
});


describe('useAuthService', () => {
  it('should update user on successful login', () => {
    const { result } = renderHook(() => useAuthService());

    act(() => {
      result.current.login('testuser', 'password123');
    });

    expect(result.current.user).toEqual({ username: 'testuser' });
  });
});
describe('useAuthService', () => {
  it('should set user to null on logout', () => {
    const { result } = renderHook(() => useAuthService());

    // First, simulate a login
    act(() => {
      result.current.login('testuser', 'password123');
    });

    // Then, simulate a logout
    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });
});
