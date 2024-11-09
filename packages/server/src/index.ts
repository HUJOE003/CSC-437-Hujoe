// src/index.ts
import express, { Request, Response } from "express";
import { HorrorLocationPage } from "./pages/HorrorPage";
import { connect } from "./services/mongo";
import { getHorrorLocation } from "./services/MongoHorrorPage-svc";

connect("CSC-437");
const app = express();
const port = process.env.PORT || 3005;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/Hujoe", (req: Request, res: Response) => {
    res.send("Why you know my name bro");
});

app.get("/horror/:isd",
  async (req: Request, res: Response) => {
    //const {isd} = req.params;
    const isd = req.params.isd;
    console.log(isd)
    try {

      const data = await getHorrorLocation(isd);
      console.log("this is data",data)
      if (!data) {
        res.status(404).send("Location not found");
        return;
      }
      const page = new HorrorLocationPage(data);
      res.set("Content-Type", "text/html").send(page.render());
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
