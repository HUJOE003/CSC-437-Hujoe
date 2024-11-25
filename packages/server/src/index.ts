import express, { Request, Response } from "express";
import { HorrorLocationPage } from "./pages/HorrorPage";
import { getHorrorLocation } from "./services/HorrorPage-svc";
import path from "path";

const app = express();
const port = process.env.PORT || 3007;
const staticDir = path.resolve(process.env.STATIC || "public"); // Ensure path resolves correctly

// Serve static files
app.use(express.static(staticDir));

// Basic route
app.get("/Hujoe", (req: Request, res: Response) => {
    res.send("Why you know my name bro");
});

// Dynamic horror location page
app.get("/horror/:isd", (req: Request, res: Response) => {
    const { isd } = req.params;

    // Get horror location data
    const data = getHorrorLocation(isd);

    // If data not found, return a 404
    if (!data) {
        res.status(404).send(`<h1>Location Not Found</h1><p>The horror location with ID '${isd}' does not exist.</p>`);
        return;
    }

    // Render the page
    const page = new HorrorLocationPage(data);
    res.set("Content-Type", "text/html").send(page.render());
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
