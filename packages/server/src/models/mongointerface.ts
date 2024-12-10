import { Schema, model, Document, Types } from "mongoose";

// Define Geometry interface
interface Geometry {
  x: number;
  y: number;
}

// Define ApiData interface
interface ApiData {
  city?: string;
  description?: string;
  ghost_type?: string;
  location_type?: string;
  state?: string;
  title?: string;
  ObjectId: number | string;  // Ensure this is of type Int32 (number or string)
}

// Define HorrorLocation interface extending Mongoose's Document
export interface HorrorLocation extends Document {
    original: {
    ObjectId: number | null;  // Correctly typed as number (Int32)
    location_type: string | null;
  };
  geometry: Geometry;
  api_data: ApiData;
}

// Define the Geometry Schema
const GeometrySchema = new Schema<Geometry>({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

// Define the ApiData Schema
const ApiDataSchema = new Schema<ApiData>({
  city: { type: String, default: null },
  description: { type: String, default: null },
  ghost_type: { type: String, default: null },
  location_type: { type: String, default: null },
  state: { type: String, default: null },
  title: { type: String, default: null },
  ObjectId: { 
    type: Number, 
    required: false,
    validate: {
      validator: function(v: number) {
        return Number.isInteger(v) && v >= -2147483648 && v <= 2147483647;
      },
      message: props => `${props.value} is not a valid Int32 value!`
    }
  },  // Use Number type with validation for Int32 range
});

// Define the HorrorLocation Schema
const HorrorLocationSchema = new Schema<HorrorLocation>({
  original: {
    ObjectId: { 
      type: Number, 
      required: false, 
      default: null,
      validate: {
        validator: function(v: number) {
          return Number.isInteger(v) && v >= -2147483648 && v <= 2147483647;
        },
        message: props => `${props.value} is not a valid Int32 value!`
      }
    },
    location_type: { type: String, default: null },
  },
  geometry: { type: GeometrySchema, required: true },
  api_data: { type: ApiDataSchema, required: true },
});

// Export the Mongoose model
export const HorrorLocationModel = model<HorrorLocation>("HorrorLocation", HorrorLocationSchema, "HorrorLocation");
