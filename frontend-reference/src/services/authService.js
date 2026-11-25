/**
 * @module authService
 * @description Authentication service to replace Firebase Auth with REST API
 */

import apiClient from "./apiClient";
import {
  clearAuthStorage,
  getAuthToken,
  getRefreshToken,
  getStoredUserObj,
  notifyAuthChanged,
  setAuthSession,
  setAuthToken,
  setStoredUser,
} from "../utilities/authStorage";

/**
 * Register a new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} fullName - User full name
 * @param {Object} additionalData - Additional registration data (firstName, lastName, headline, etc.)
 * @param {File} profileImage - Optional profile picture file
 * @returns {Promise<Object>} User object
 */
export const registerUser = async (email, password, fullName, additionalData = {}, profileImage = null) => {
  // If profile image is provided, use FormData for multipart upload
  if (profileImage) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fullName", fullName);
    formData.append("profileImage", profileImage);
    
    // Add additional data fields
    Object.keys(additionalData).forEach(key => {
      if (additionalData[key]) {
        formData.append(key, additionalData[key]);
      }
    });

    const response = await apiClient.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Store per-tab tokens and user
    setAuthSession({
      token: response.token,
      refreshToken: response.refreshToken,
      user: response.user,
    });

    return { user: response.user, token: response.token };
  } else {
    // No profile image - use JSON
    const response = await apiClient.post("/auth/register", {
      email,
      password,
      fullName,
      ...additionalData,
    });

    setAuthSession({
      token: response.token,
      refreshToken: response.refreshToken,
      user: response.user,
    });

    return { user: response.user, token: response.token };
  }
};

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User object
 */
export const loginUser = async (email, password) => {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });

  setAuthSession({
    token: response.token,
    refreshToken: response.refreshToken,
    user: response.user,
  });

  return { user: response.user, token: response.token };
};

/**
 * Google Sign-In (OAuth)
 * First get user info from Google, then send to backend
 * @param {Object} googleUser - Google user object from OAuth
 * @returns {Promise<Object>} User object
 */
export const googleSignIn = async (googleUser) => {
  const response = await apiClient.post("/auth/google", {
    email: googleUser.email,
    fullName: googleUser.displayName || googleUser.name,
    profilePicURL: googleUser.photoURL || googleUser.picture,
  });

  setAuthSession({
    token: response.token,
    refreshToken: response.refreshToken,
    user: response.user,
  });

  return { user: response.user, token: response.token };
};

/**
 * Get current authenticated user
 * @returns {Promise<Object>} User object
 */
export const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");
  
  if (response && response.user) {
    setStoredUser(response.user);
    notifyAuthChanged();
  }
  
  return response;
};

/**
 * Logout current user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch (error) {
    // Even if API call fails, clear per-tab storage
    console.error("Logout error:", error);
  } finally {
    clearAuthStorage();
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is logged in
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  const user = getStoredUserObj();
  return !!(token && user);
};

/**
 * Get stored user from per-tab storage
 * @returns {Object|null} User object or null
 */
export const getStoredUser = () => {
  return getStoredUserObj();
};

/**
 * Refresh access token using refresh token
 * @returns {Promise<string>} New access token
 */
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await apiClient.post("/auth/refresh", { refreshToken });
  
  setAuthToken(response.token);
  
  return response.token;
};

/**
 * Request password reset (forgot password)
 * @param {string} email - User email
 * @returns {Promise<Object>} Response with success message
 */
export const forgotPassword = async (email) => {
  // apiClient already returns response.data
  const data = await apiClient.post("/auth/forgot-password", { email });
  return data;
};

/**
 * Reset password with token
 * @param {string} token - Reset token from email
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} User object and token (auto-login after reset)
 */
export const resetPassword = async (token, newPassword) => {
  // apiClient already returns response.data
  const data = await apiClient.post("/auth/reset-password", {
    token,
    newPassword,
  });

  // Store per-tab tokens and user (auto-login)
  if (data.token && data.user) {
    setAuthSession({
      token: data.token,
      refreshToken: data.refreshToken,
      user: data.user,
    });
  }

  return { user: data.user, token: data.token };
};
