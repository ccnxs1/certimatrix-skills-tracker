
/**
 * Authentication utilities for handling user authentication state
 */

// Mock user for demonstration purposes
const MOCK_USER = {
  id: "user-123",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg"
};

// Initialize auth in localStorage if it doesn't exist
const initAuth = (): void => {
  if (localStorage.getItem('auth_initialized') !== 'true') {
    // For demo purposes, we'll set the user as authenticated by default
    localStorage.setItem('auth_token', 'mock-jwt-token');
    localStorage.setItem('user_data', JSON.stringify(MOCK_USER));
    localStorage.setItem('auth_initialized', 'true');
  }
};

// Call init on file load
initAuth();

// Check if user is authenticated
export const isUserAuthenticated = (): boolean => {
  // We need to explicitly check for the auth token's existence
  return localStorage.getItem('auth_token') !== null;
};

// Get user data
export const getUserData = () => {
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};

// Sign out user completely
export const signOutUser = (): void => {
  console.log("Starting complete sign out process");
  
  // Clear all authentication-related items from localStorage
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
  
  // Clear any other auth-related items that might exist
  localStorage.removeItem('auth_state');
  localStorage.removeItem('user_session');
  
  // Force reset the initialization flag
  localStorage.removeItem('auth_initialized');
  
  // Also clear session storage to be thorough
  sessionStorage.clear();
  
  console.log("Auth state cleared from storage");

  // Force a complete page reload to ensure all components re-render
  // This is crucial for resetting React state across the application
  window.location.reload();
};

// Mock sign in function (for demonstration)
export const signInUser = (): void => {
  localStorage.setItem('auth_token', 'mock-jwt-token');
  localStorage.setItem('user_data', JSON.stringify(MOCK_USER));
  localStorage.setItem('auth_initialized', 'true');
  console.log("User signed in with mock data");
};
