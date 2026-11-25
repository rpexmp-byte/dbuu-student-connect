import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI, adaptUserFromAPI } from "../../services";
import { saveCampusMetaLocal } from "../../utilities/CampusRoleUtils";
import { toast } from "react-toastify";

/**
 * Register a new user with email, password, and DBUU campus role details
 * @param {Object} credentials - User registration data
 */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      fullName,
      firstName,
      lastName,
      headline,
      countryLoc,
      postalCodeLoc,
      role,
      department,
      academicYear,
      rollNumber,
      graduationYear,
      currentPosition,
      profileImage,
    },
    { rejectWithValue }
  ) => {
    try {
      const additionalData = {
        firstName,
        lastName,
        headline,
        countryLoc,
        postalCodeLoc,
        role,
        department,
        academicYear,
        rollNumber,
        graduationYear,
        currentPosition,
      };
      const response = await authAPI.registerUser(
        email,
        password,
        fullName,
        additionalData,
        profileImage
      );
      saveCampusMetaLocal(response.user?._id, email, {
        role,
        department,
        academicYear,
        rollNumber,
        graduationYear,
        currentPosition,
      });
      toast.success("Welcome to DBUU Student Connect!");
      return adaptUserFromAPI(response.user);
    } catch (error) {
      // apiClient already returns error.response.data, so error.message is the actual message
      const message = error.message || "Registration failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

/**
 * Login user with email and password
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 */
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.loginUser(email, password);
      toast.success("Login successful!");
      return adaptUserFromAPI(response.user);
    } catch (error) {
      // apiClient already returns error.response.data, so error.message is the actual message
      const message = error.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

/**
 * Login with Google OAuth
 * @param {Object} googleUser - Google user data from OAuth
 * @param {string} googleUser.email - Google user email
 * @param {string} googleUser.displayName - Google user display name
 * @param {string} googleUser.photoURL - Google user profile picture URL
 */
export const loginWithGoogle = createAsyncThunk(
  "auth/google",
  async (googleUser, { rejectWithValue }) => {
    try {
      const response = await authAPI.googleSignIn(googleUser);
      toast.success("Welcome!");
      return adaptUserFromAPI(response.user);
    } catch (error) {
      // apiClient already returns error.response.data, so error.message is the actual message
      const message = error.message || "Google login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

/**
 * Get current authenticated user
 */
export const getCurrentUser = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getCurrentUser();
      return adaptUserFromAPI(response.user);
    } catch (error) {
      // apiClient already returns error.response.data, so error.message is the actual message
      const message = error.message || "Failed to fetch user";
      return rejectWithValue(message);
    }
  }
);

/**
 * Logout current user
 */
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logoutUser();
      toast.success("Logged out successfully");
      return null;
    } catch (error) {
      // apiClient already returns error.response.data, so error.message is the actual message
      const message = error.message || "Logout failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

/**
 * Refresh access token
 */
export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.refreshAccessToken();
      return response.token;
    } catch (error) {
      // apiClient already returns error.response.data, so error.message is the actual message
      const message = error.message || "Token refresh failed";
      return rejectWithValue(message);
    }
  }
);
