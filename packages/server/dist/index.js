"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_horrorpagesvc = require("./services/horrorpagesvc");
var import_horrorpagesvc2 = require("./services/horrorpagesvc");
var import_LoginPage = require("./pages/LoginPage");
var import_LoginPage2 = require("./pages/LoginPage");
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var import_auth = __toESM(require("./routes/auth"));
const mongoose = require("mongoose");
const app = (0, import_express.default)();
const port = 3016;
const staticDir = import_path.default.join(__dirname, "../../proto/public");
require("dotenv").config();
mongoose.connect(process.env.mongoURI || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected successfully!")).catch((err) => {
  if (err instanceof Error) {
    console.error("MongoDB connection error:", err.message);
  } else {
    console.error("Unexpected error:", err);
  }
});
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/auth", import_auth.default);
app.get("/", import_auth.authenticateUser, (req, res) => {
  res.sendFile(import_path.default.resolve(staticDir, "index.html"));
});
app.get("/Hujoe", (req, res) => {
  res.send("Why you know my name bro");
});
app.get("/horror/:isd", import_auth.authenticateUser, async (req, res) => {
  const { isd } = req.params;
  console.log("Received ID:", isd);
  const data = await (0, import_horrorpagesvc.getHorrorLocations)(isd);
  if (!data) {
    res.status(404).send(`<h1>Location Not Found</h1><p>The horror location with ID '${isd}' does not exist.</p>`);
    return;
  }
  res.send(data);
});
app.post("/horror/:isd", import_auth.authenticateUser, async (req, res) => {
  const { isd } = req.params;
  console.log("Received ID:", isd);
  const updatedData = req.body;
  const existingData = await (0, import_horrorpagesvc.getHorrorLocations)(isd);
  if (!existingData) {
    res.status(404).send(`<h1>Location Not Found</h1><p>The horror location with ID '${isd}' does not exist.</p>`);
    return;
  }
  const updatedLocation = await (0, import_horrorpagesvc2.updateHorrorLocation)(isd, updatedData);
  if (updatedLocation) {
    res.status(200).send({ message: "Horror location updated successfully", data: updatedLocation });
  } else {
    res.status(500).send({ message: "Failed to update the horror location" });
  }
});
app.get("/login", (req, res) => {
  const page = new import_LoginPage.LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/register", (req, res) => {
  const page = new import_LoginPage2.RegistrationPage();
  res.set("Content-Type", "text/html").send(page.render());
});
const locationsFile = import_path.default.join(__dirname, "../../proto/public/scripts/locations.js");
app.post("/add-location", async (req, res) => {
  const newLocation = req.body;
  if (!newLocation || !newLocation.name || !newLocation.coordinates) {
    return res.status(400).send("Invalid location data");
  }
  try {
    const fileContent = import_fs.default.readFileSync(locationsFile, "utf-8");
    const locations = JSON.parse(fileContent.replace("export const horrorLocations = ", ""));
    locations.push(newLocation);
    const updatedContent = `export const horrorLocations = ${JSON.stringify(locations, null, 2)};`;
    import_fs.default.writeFileSync(locationsFile, updatedContent, "utf-8");
    res.status(200).send("Location added successfully");
  } catch (err) {
    console.error("Error processing locations file:", err);
    res.status(500).send("Error processing locations file");
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
