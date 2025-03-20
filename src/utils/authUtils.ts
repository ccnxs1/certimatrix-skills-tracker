
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
  return localStorage.getItem('auth_token') !== null;
};

// Get user data
export const getUserData = () => {
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};

// Sign out user completely
export const signOutUser = (): void => {
  // Clear all authentication-related items from localStorage
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
  
  // Clear any other auth-related items that might exist
  localStorage.removeItem('auth_state');
  localStorage.removeItem('user_session');
  
  // Force reset the init flag to ensure clean slate
  localStorage.removeItem('auth_initialized');
  
  // Reinstantiate the auth state (this is critical)
  setTimeout(() => {
    initAuth();
    
    // Force a complete page refresh to ensure all components re-render
    window.location.href = window.location.origin;
  }, 100);
  
  console.log("Auth state cleared from storage");
};

// Mock sign in function (for demonstration)
export const signInUser = (): void => {
  localStorage.setItem('auth_token', 'mock-jwt-token');
  localStorage.setItem('user_data', JSON.stringify(MOCK_USER));
  console.log("User signed in with mock data");
};
