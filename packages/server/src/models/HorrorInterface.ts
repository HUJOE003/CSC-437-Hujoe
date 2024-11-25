export interface Geometry {
  x: number;
  y: number;
}

export interface ApiData {
  city: string | null;
  description: string | null;
  ghost_type: string | null;
  location_type: string | null;
  state: string | null;
  title: string | null;
  ObjectId: number;
}

export interface HorrorLocation {
  original: {
    ObjectId: number | null;
    location_type: string | null;
  };
  geometry: Geometry;
  api_data: ApiData;
}
