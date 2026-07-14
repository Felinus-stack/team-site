import { publicApiBaseUrl } from "./public-api";

const AUTH_TOKEN_KEY = "team-site-access-token";

export type AuthUser = {
  id: string;
  name: string | null;
  email: string | null;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isAuthUser = (value: unknown): value is AuthUser =>
  isRecord(value) &&
  typeof value.id === "string" &&
  (typeof value.name === "string" || value.name === null) &&
  (typeof value.email === "string" || value.email === null);

export const parseAuthResponse = (value: unknown): AuthResponse | null => {
  if (!isRecord(value) || typeof value.token !== "string" || !isAuthUser(value.user)) {
    return null;
  }
  return { token: value.token, user: value.user };
};

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
};

export const saveAuthToken = (token: string): void => {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = (): void => {
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getAuthorizationHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export { publicApiBaseUrl };
