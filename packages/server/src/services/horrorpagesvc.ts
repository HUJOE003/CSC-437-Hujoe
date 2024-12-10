import { HorrorLocationModel, HorrorLocation } from "../models/mongointerface";
import { Types } from "mongoose";

export const getHorrorLocations = async (isd: string): Promise<HorrorLocation | null> => {
    try {
      console.log("Searching for ID in nested field:", isd);
  
      let query = {};
  
      // Try to convert to a number
      let isdAsNumber = Number(isd);
  
      // Check if isd is a valid integer and within Int32 range
      if (Number.isInteger(isdAsNumber) && isdAsNumber >= -2147483648 && isdAsNumber <= 2147483647) {
        //console.log("Using isd as number:", isdAsNumber);
        query = { "original.ObjectId": isdAsNumber };  // Query using Int32 (number)
      } else {
        //console.log("Using isd as string:", isd);
        query = { "original.ObjectId": isd };  // Query using string if it's not a valid number
      }

      // Query the database using the `query` object
      const location = await HorrorLocationModel.findOne(query);
      //console.log("this is lcoation", location)
      
      if (location) {
        console.log("Found location with ObjectId type:", typeof location.original.ObjectId);
        return location as HorrorLocation;
      } else {
        console.log("Location not found with the provided query:", query);
      }
  
      return null;
    } catch (error) {
      console.error("Error fetching horror location:", error);
      return null;
    }
  };
  
  export const updateHorrorLocation = async (isd: string, updatedData: Partial<HorrorLocation>): Promise<HorrorLocation | null> => {
    try {
        const updatedLocation = await HorrorLocationModel.findOneAndUpdate(
            { "original.ObjectId": isd }, // Match location by ObjectId
            { $set: updatedData }, // Update with the new data
            { new: true } // Return the updated document
        );

        if (updatedLocation) {
            console.log("Updated Horror Location:", updatedLocation);
            return updatedLocation;
        } else {
            console.log("Location not found for update:", isd);
            return null;
        }
    } catch (error) {
        console.error("Error updating horror location:", error);
        return null;
    }
};