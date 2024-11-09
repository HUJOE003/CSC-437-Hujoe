// src/routes.ts
import express, { Request, Response, Router } from "express";
import { getHorrorLocation } from "../services/MongoHorrorPage-svc";
import { HorrorLocationPage } from "../pages/HorrorPage";
import  { create }  from "../services/MongoHorrorPage-svc";
import HorrorLocationService from "../services/MongoHorrorPage-svc";

const router = Router();


router.get("/:isd", async (req: Request, res: Response) => {
    const isd = req.params.isd;
    console.log(isd);
    try {
      const data = await getHorrorLocation(isd);
      console.log("this is data", data);
      if (!data) {
        res.status(404).json({ message: "Location not found" }); // Returning JSON for not found
        return;
      }
      // Return data as JSON instead of HTML
      res.status(200).json(data); // Sending the data in JSON format
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" }); // Returning error as JSON
    }
});

// POST route for creating a new horror location
router.post("/", async (req: Request, res: Response): Promise<any> => {
    const newHorrorLocation = req.body;
    console.log("Received new horror location:", newHorrorLocation);
    // Log the request body for debugging
    console.log("Received new horror location:", newHorrorLocation);
  
    // Validate that all required fields are present
    if (
      !newHorrorLocation.name ||
      !newHorrorLocation.description ||
      !newHorrorLocation.type ||
      !newHorrorLocation.address ||
      !newHorrorLocation.coordinates ||
      !newHorrorLocation.coordinates.latitude ||
      !newHorrorLocation.coordinates.longitude ||
      !newHorrorLocation.rating ||
      !newHorrorLocation.images
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    // Call the service to create the new location
    await HorrorLocationService.create(newHorrorLocation)
      .then((location) => res.status(201).json(location)) // Return the created location
      .catch((err) => {
        console.error("Error creating location:", err); // Log any errors
        res.status(500).json({ message: "Failed to create location", error: err });
      });
  });

// PUT route for updating a specific horror location
router.put("/:isd", async (req: Request, res: Response): Promise<any> => {
    const isd = req.params.isd;  // Extract the 'isd' parameter (used as identifier)
    const updatedData = req.body; // Extract the data to update from the request body

    console.log(`Received update for horror location with isd: ${isd}`, updatedData);

    // Validate required fields in the update body
    if (
        !updatedData.name ||
        !updatedData.description ||
        !updatedData.type ||
        !updatedData.address ||
        !updatedData.coordinates ||
        !updatedData.coordinates.latitude ||
        !updatedData.coordinates.longitude ||
        !updatedData.rating ||
        !updatedData.images
    ) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Call the update function from the service
        const updatedLocation = await HorrorLocationService.update(isd, updatedData);
        
        if (!updatedLocation) {
            return res.status(404).json({ message: `Location with isd: ${isd} not found` });
        }

        // Send back the updated location
        res.status(200).json(updatedLocation);
    } catch (err) {
        console.error("Error updating location:", err);
        res.status(500).json({ message: "Failed to update location", error: err });
    }
});

// DELETE route for deleting a specific horror location by name
router.delete("/:isd", async (req: Request, res: Response) => {
    const isd = req.params.isd;  // Extract the 'isd' parameter (used as identifier)
    console.log(`Received request to delete horror location with isd: ${isd}`);

    try {
        // Call the remove function from the service to delete the location
        await HorrorLocationService.remove(isd);
        
        // If successful, send a success response
        res.status(200).json({ message: `Location with isd: ${isd} deleted successfully` });
    } catch (err) {
        // If an error occurs, send an error response
        console.error("Error deleting location:", err);
        res.status(500).json({ message: `Failed to delete location with isd: ${isd}`, error: err });
    }
});


export default router;
