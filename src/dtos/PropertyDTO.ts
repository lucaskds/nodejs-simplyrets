export interface PropertyDTO {
  id: number;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  type: string | null;
}

export interface UpdatePropertyDTO {
  address?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
}
