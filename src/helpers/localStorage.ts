import { AuthUser } from "../auth/AuthContext";

const TOKEN_KEY = "access_token";
const USER_KEY = "user";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setUserLocal = (user: AuthUser) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): AuthUser | null => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? (JSON.parse(user) as AuthUser) : null;
  } catch {
    console.warn("Invalid user in localStorage");
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};
