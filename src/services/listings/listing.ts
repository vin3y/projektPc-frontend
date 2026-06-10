import { api } from "@/api/axios";

export interface NearbyListingRequest {
  latitude: number;
  longitude: number;
  radius: number;
  page?: number;
  limit?: number;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  primaryImageUrl: string;
  category: string;
  brand: string;
  model: string;
  price: number;
  locationText: string;
  distanceKm: number;
}

export interface NearbyListingResponse {
  reqType: string;
  reqStatus: string;

  page: number;
  limit: number;

  results: Listing[];
}

export const getNearListing = async (
  params: NearbyListingRequest,
): Promise<NearbyListingResponse> => {
  const response = await api.get("/projektpc/v1/trades/nearby", { params });

  return response.data;
};

export interface InputSuggestionsRequest {
  q: string;
}

export interface InputSuggestionsResponse {
  reqType: string;
  reqStatus: string;
  suggestions: string[];
}

export const getInputSuggesions = async (
  params: InputSuggestionsRequest,
): Promise<InputSuggestionsResponse> => {
  const response = await api.get("/projektpc/v1/trades/search", { params });

  return response.data;
};
