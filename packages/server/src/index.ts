const mongoose = require('mongoose');
import express, { Request, Response } from "express";
import { HorrorLocationPage } from "./pages/HorrorPage";
import { getHorrorLocations }  from "./services/horrorpagesvc";
import {updateHorrorLocation} from "./services/horrorpagesvc"
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/LoginPage";
import path from "path";
import fs from "fs";
import auth, { authenticateUser } from "./routes/auth";
const app = express();
const port = 3016;
const staticDir = path.join(__dirname, "../../proto/public");
require('dotenv').config();

// Connect to MongoDB
mongoose
  .connect(process.env.mongoURI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error("MongoDB connection error:", err.message);
    } else {
      console.error("Unexpected error:", err);
    }
  });


// Serve static files
app.use(express.static(staticDir));
app.use(express.json());
app.use("/auth", auth);

app.get("/", authenticateUser,(req: Request, res: Response) => {
    res.sendFile(path.resolve(staticDir, "index.html"));
});
// Basic route
app.get("/Hujoe", (req: Request, res: Response) => {
    res.send("Why you know my name bro");
});

// Dynamic horror location page
app.get("/horror/:isd", authenticateUser,async (req: Request, res: Response) => {
    const { isd } = req.params;
    console.log("Received ID:", isd);


    // Get horror location data
    const data = await getHorrorLocations(isd);

    //console.log("data being used:", data);

    // If data not found, return a 404
    if (!data) {
        res.status(404).send(`<h1>Location Not Found</h1><p>The horror location with ID '${isd}' does not exist.</p>`);
        return;
    }

    // Render the page
    // const page = new HorrorLocationPage(data);
    // res.set("Content-Type", "text/html").send(page.render());
    res.send(data)
});

app.post("/horror/:isd", authenticateUser, async (req: Request, res: Response) => {
  const { isd } = req.params;
  console.log("Received ID:", isd);

  // Get new data from the request body to update the horror location
  const updatedData = req.body;

  // Get the existing horror location data
  const existingData = await getHorrorLocations(isd);

  // If data not found, return a 404
  if (!existingData) {
      res.status(404).send(`<h1>Location Not Found</h1><p>The horror location with ID '${isd}' does not exist.</p>`);
      return;
  }

  // Perform the update (this will depend on your DB or storage solution)
  const updatedLocation = await updateHorrorLocation(isd, updatedData);

  // If the update is successful, return a success response
  if (updatedLocation) {
      res.status(200).send({ message: "Horror location updated successfully", data: updatedLocation });
  } else {
      res.status(500).send({ message: "Failed to update the horror location" });
  }
});


app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/register", (req: Request, res: Response) => {
  const page = new RegistrationPage();
  res.set("Content-Type", "text/html").send(page.render());
});


const locationsFile = path.join(__dirname, '../../proto/public/scripts/locations.js');
// Add location route

app.post('/add-location', async (req: Request, res: Response): Promise<any | undefined> => {
  const newLocation = req.body;

  if (!newLocation || !newLocation.name || !newLocation.coordinates) {
    return res.status(400).send('Invalid location data');
  }

  try {
    // Load existing locations
    const fileContent = fs.readFileSync(locationsFile, 'utf-8');
    const locations = JSON.parse(fileContent.replace('export const horrorLocations = ', ''));

    // Add the new location
    locations.push(newLocation);

    // Save back to file
    const updatedContent = `export const horrorLocations = ${JSON.stringify(locations, null, 2)};`;
    fs.writeFileSync(locationsFile, updatedContent, 'utf-8');
    
    res.status(200).send('Location added successfully');
  } catch (err) {
    console.error('Error processing locations file:', err);  // Add more details
    res.status(500).send('Error processing locations file');
  }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
