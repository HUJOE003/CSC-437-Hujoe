"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var horrorRoutes_exports = {};
__export(horrorRoutes_exports, {
  default: () => horrorRoutes_default
});
module.exports = __toCommonJS(horrorRoutes_exports);
var import_express = require("express");
var import_MongoHorrorPage_svc = require("../services/MongoHorrorPage-svc");
var import_MongoHorrorPage_svc3 = __toESM(require("../services/MongoHorrorPage-svc"));
const router = (0, import_express.Router)();
router.get("/:isd", async (req, res) => {
  const isd = req.params.isd;
  console.log(isd);
  try {
    const data = await (0, import_MongoHorrorPage_svc.getHorrorLocation)(isd);
    console.log("this is data", data);
    if (!data) {
      res.status(404).json({ message: "Location not found" });
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/", async (req, res) => {
  const newHorrorLocation = req.body;
  console.log("Received new horror location:", newHorrorLocation);
  console.log("Received new horror location:", newHorrorLocation);
  if (!newHorrorLocation.name || !newHorrorLocation.description || !newHorrorLocation.type || !newHorrorLocation.address || !newHorrorLocation.coordinates || !newHorrorLocation.coordinates.latitude || !newHorrorLocation.coordinates.longitude || !newHorrorLocation.rating || !newHorrorLocation.images) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  await import_MongoHorrorPage_svc3.default.create(newHorrorLocation).then((location) => res.status(201).json(location)).catch((err) => {
    console.error("Error creating location:", err);
    res.status(500).json({ message: "Failed to create location", error: err });
  });
});
router.put("/:isd", async (req, res) => {
  const isd = req.params.isd;
  const updatedData = req.body;
  console.log(`Received update for horror location with isd: ${isd}`, updatedData);
  if (!updatedData.name || !updatedData.description || !updatedData.type || !updatedData.address || !updatedData.coordinates || !updatedData.coordinates.latitude || !updatedData.coordinates.longitude || !updatedData.rating || !updatedData.images) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const updatedLocation = await import_MongoHorrorPage_svc3.default.update(isd, updatedData);
    if (!updatedLocation) {
      return res.status(404).json({ message: `Location with isd: ${isd} not found` });
    }
    res.status(200).json(updatedLocation);
  } catch (err) {
    console.error("Error updating location:", err);
    res.status(500).json({ message: "Failed to update location", error: err });
  }
});
router.delete("/:isd", async (req, res) => {
  const isd = req.params.isd;
  console.log(`Received request to delete horror location with isd: ${isd}`);
  try {
    await import_MongoHorrorPage_svc3.default.remove(isd);
    res.status(200).json({ message: `Location with isd: ${isd} deleted successfully` });
  } catch (err) {
    console.error("Error deleting location:", err);
    res.status(500).json({ message: `Failed to delete location with isd: ${isd}`, error: err });
  }
});
var horrorRoutes_default = router;
