import { Schema, model } from "mongoose";
import { HorrorLocation } from "../models";


const HorrorLocationSchema = new Schema<HorrorLocation>(
    {
      _id: { type: Schema.Types.ObjectId, required: true },
      name: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      type: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
      },
      images: { type: [String], required: true },
      reviews: [
        {
          reviewerName: { type: String, required: true, trim: true },
          reviewDate: { type: Date, required: true },
          rating: { type: Number, required: true },
          comment: { type: String, required: true, trim: true }
        }
      ],
      rating: { type: Number, required: true }
    },
    { collection: "HorrorLocation" }
  );

const HorrorLocationModel = model<HorrorLocation>("HorrorLocation", HorrorLocationSchema);

function index(): Promise<HorrorLocation[]> {
    return HorrorLocationModel.find();
}

export function getHorrorLocation(name: string): Promise<HorrorLocation | null> {
// Assuming you are querying your MongoDB or another database
    return HorrorLocationModel.findOne({ name })
    .catch((err) => {
        console.error(err); 
        throw new Error(`${name} nott Found`);
});
}

export default { index, getHorrorLocation };
