import { ObjectId } from "mongoose";

export interface HorrorLocation {
    _id: ObjectId,
    name: string;              // Name of the location (e.g., "Haunted Mansion")
    description: string;       // A description of the location (e.g., "A spooky mansion rumored to be haunted")
    type: HorrorLocationType;  // Type of the location (e.g., haunted house, graveyard)
    address: string;           // The physical address of the location (e.g., "123 Spooky St.")
    coordinates: Point;        // Geographical coordinates (latitude, longitude)
    images?: string[];         // An optional array of image URLs to showcase the location
    reviews?: Review[];        // Optional reviews about the location
    rating?: number;           // Average rating (could be a number from 1-5)
  }

export type HorrorLocationType =
| "Haunted House"
| "Graveyard"
| "Abandoned Asylum"
| "Ghost Town"
| "Cursed Forest"
| "Murder Site"
| "Other";

export interface Point {
    latitude: number;
    longitude: number;
  }

export interface Review {
reviewerName: string;      // Name of the reviewer
reviewDate: Date;          // Date of the review
rating: number;            // Rating (e.g., 1 to 5 stars)
comment: string;           // Review text (e.g., "Very scary! Would recommend.")
}
