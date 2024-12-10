"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var horrorpagesvc_exports = {};
__export(horrorpagesvc_exports, {
  getHorrorLocations: () => getHorrorLocations,
  updateHorrorLocation: () => updateHorrorLocation
});
module.exports = __toCommonJS(horrorpagesvc_exports);
var import_mongointerface = require("../models/mongointerface");
const getHorrorLocations = async (isd) => {
  try {
    console.log("Searching for ID in nested field:", isd);
    let query = {};
    let isdAsNumber = Number(isd);
    if (Number.isInteger(isdAsNumber) && isdAsNumber >= -2147483648 && isdAsNumber <= 2147483647) {
      query = { "original.ObjectId": isdAsNumber };
    } else {
      query = { "original.ObjectId": isd };
    }
    const location = await import_mongointerface.HorrorLocationModel.findOne(query);
    if (location) {
      console.log("Found location with ObjectId type:", typeof location.original.ObjectId);
      return location;
    } else {
      console.log("Location not found with the provided query:", query);
    }
    return null;
  } catch (error) {
    console.error("Error fetching horror location:", error);
    return null;
  }
};
const updateHorrorLocation = async (isd, updatedData) => {
  try {
    const updatedLocation = await import_mongointerface.HorrorLocationModel.findOneAndUpdate(
      { "original.ObjectId": isd },
      // Match location by ObjectId
      { $set: updatedData },
      // Update with the new data
      { new: true }
      // Return the updated document
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHorrorLocations,
  updateHorrorLocation
});
