/**
 * ============================================================================
 * USER CONTEXT - GLOBAL USER STATE MANAGEMENT
 * ============================================================================
 * 
 * Provides global user state and profile update methods
 * - Manages current authenticated user
 * - Handles profile updates across the app
 * - Syncs with localStorage
 * - Provides optimistic updates
 * 
 * @version 1.0.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  clearAuthStorage,
  getStoredUserObj,
  notifyAuthChanged,
  setStoredUser,
} from "../utilities/authStorage";

const UserContext = createContext(null);

/**
 * UserProvider Component
 * Wraps the app to provide user state globally
 */
export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from per-tab sessionStorage on mount & sync on auth changes
  useEffect(() => {
    const syncUserFromStorage = () => {
      setCurrentUser(getStoredUserObj());
      setLoading(false);
    };

    syncUserFromStorage();
    window.addEventListener("auth-changed", syncUserFromStorage);
    return () => {
      window.removeEventListener("auth-changed", syncUserFromStorage);
    };
  }, []);

  /**
   * Update current user data
   * - Updates state
   * - Syncs with per-tab sessionStorage
   * - Merges with existing data
   */
  const updateUser = useCallback((userData) => {
    setCurrentUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        ...userData,
        profile: {
          ...(prevUser?.profile || {}),
          ...(userData?.profile || {}),
        },
      };

      setStoredUser(updatedUser);
      notifyAuthChanged();
      return updatedUser;
    });
  }, []);

  /**
   * Update specific profile fields
   * Useful for partial updates (e.g., just experience or skills)
   */
  const updateProfileField = useCallback((field, value) => {
    setCurrentUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        profile: {
          ...(prevUser?.profile || {}),
          [field]: value,
        },
      };

      setStoredUser(updatedUser);
      notifyAuthChanged();
      return updatedUser;
    });
  }, []);

  /**
   * Clear user data (logout)
   */
  const clearUser = useCallback(() => {
    setCurrentUser(null);
    clearAuthStorage();
  }, []);

  /**
   * Set complete user data (login)
   */
  const setUser = useCallback((userData) => {
    setCurrentUser(userData);
    setStoredUser(userData);
    notifyAuthChanged();
  }, []);

  const value = {
    currentUser,
    loading,
    updateUser,
    updateProfileField,
    clearUser,
    setUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * Hook to access user context
 * Must be used within UserProvider
 */
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}

export default UserContext;
