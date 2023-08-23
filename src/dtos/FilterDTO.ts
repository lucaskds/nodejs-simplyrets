export interface FilterDTO {
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  type?: string;
  offset: number;
  limit: number;
}
