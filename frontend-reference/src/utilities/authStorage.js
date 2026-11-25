/**
 * @module authStorage
 * @description Per-tab sessionStorage wrapper for auth token, refreshToken, and user
 * so multiple browser tabs can stay logged into different DBUU accounts simultaneously
 * without overwriting each other's sessions during live chat demos.
 */

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

const getStore = () => {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

export const notifyAuthChanged = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth-changed"));
  }
};

export const getAuthToken = () => {
  const store = getStore();
  return store ? store.getItem(TOKEN_KEY) : null;
};

export const setAuthToken = (token) => {
  const store = getStore();
  if (store && token) {
    store.setItem(TOKEN_KEY, token);
  }
};

export const getRefreshToken = () => {
  const store = getStore();
  return store ? store.getItem(REFRESH_TOKEN_KEY) : null;
};

export const setRefreshToken = (refreshToken) => {
  const store = getStore();
  if (store && refreshToken) {
    store.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const getStoredUserString = () => {
  const store = getStore();
  return store ? store.getItem(USER_KEY) : null;
};

export const getStoredUserObj = () => {
  const raw = getStoredUserString();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => {
  const store = getStore();
  if (store && user) {
    const serialized = typeof user === "string" ? user : JSON.stringify(user);
    store.setItem(USER_KEY, serialized);
  }
};

export const setAuthSession = ({ token, refreshToken, user }) => {
  if (token) setAuthToken(token);
  if (refreshToken) setRefreshToken(refreshToken);
  if (user) setStoredUser(user);
  notifyAuthChanged();
};

export const clearAuthStorage = () => {
  const store = getStore();
  if (store) {
    store.removeItem(TOKEN_KEY);
    store.removeItem(REFRESH_TOKEN_KEY);
    store.removeItem(USER_KEY);
  }
  notifyAuthChanged();
};
