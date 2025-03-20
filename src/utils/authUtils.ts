
/**
 * Authentication utilities for handling user authentication state
 */

// Check if user is authenticated
export const isUserAuthenticated = (): boolean => {
  return localStorage.getItem('auth_token') !== null;
};

// Sign out user completely
export const signOutUser = (): void => {
  // Clear all authentication-related items from localStorage
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
  
  // Clear any other auth-related items that might exist
  localStorage.removeItem('auth_state');
  localStorage.removeItem('user_session');
  
  // Force clear session storage as well
  sessionStorage.clear();
}
