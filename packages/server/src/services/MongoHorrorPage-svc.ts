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

// New create function to add a new HorrorLocation
export function create(json: HorrorLocation): Promise<HorrorLocation> {
  const newLocation = new HorrorLocationModel(json);
  return newLocation.save();
}


// Function to update a HorrorLocation by its name (or _id, depending on your needs)
export function update(
  name: string,
  updatedLocation: HorrorLocation
): Promise<HorrorLocation> {
  return HorrorLocationModel.findOneAndUpdate(
    { name }, // Search for the location by name
    updatedLocation, // The new data to update the location with
    { new: true } // Returns the updated document
  )
    .then((updated) => {
      if (!updated) throw new Error(`${name} not found or updated`);
      return updated as HorrorLocation;
    })
    .catch((err) => {
      console.error(err);
      throw new Error(`Error updating location: ${err.message}`);
    });
  }
  export function remove(name: string): Promise<any> {
    return HorrorLocationModel.findOneAndDelete({ name })
      .then((deleted) => {
        if (!deleted) {
          throw new Error(`Location with name ${name} not found or deleted`);
        }
      })
      .catch((err) => {
        console.error(err);
        throw new Error(`Error deleting location: ${err.message}`);
      });
  }

export default { index, getHorrorLocation, create, update, remove };
