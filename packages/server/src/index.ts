// src/index.ts
import express, { Request, Response } from "express";
import { HorrorLocationPage } from "./pages/HorrorPage";
import { getHorrorLocation } from "./services/HorrorPage-svc";

const app = express();
const port = process.env.PORT || 3003;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/Hujoe", (req: Request, res: Response) => {
    res.send("Why you know my name bro");
});

app.get("/horror/:isd",
  (req: Request, res: Response) => {
    //const {isd} = req.params;
    const isd = req.params.isd
    const data = getHorrorLocation(isd);
    if (!data){
      res.status(400).send()
      return;
    }
    const page = new HorrorLocationPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
