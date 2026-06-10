export type AuthState = "loading" | "authenticated" | "unauthenticated";

export interface UserLocationState {
  latitude: number;
  longitude: number;
}
