export type AuthState = "loading" | "authenticated" | "unauthenticated";

export interface UserLocationState {
  latitude: number;
  longitude: number;
}

export interface DetailedAd {
  id: string;
  title: string;
  description: string;
  primaryImageUrl: string;
  imageUrls: string[];
  category: string;
  brand: string;
  model: string;
  price: number;
  locationText: string;
  userName: string;
  firstName: string;
  userCreated: string;
}
