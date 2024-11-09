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
var MongoHorrorPage_svc_exports = {};
__export(MongoHorrorPage_svc_exports, {
  create: () => create,
  default: () => MongoHorrorPage_svc_default,
  getHorrorLocation: () => getHorrorLocation,
  remove: () => remove,
  update: () => update
});
module.exports = __toCommonJS(MongoHorrorPage_svc_exports);
var import_mongoose = require("mongoose");
const HorrorLocationSchema = new import_mongoose.Schema(
  {
    _id: { type: import_mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    images: { type: [String], required: true },
    reviews: [
      {
        reviewerName: { type: String, required: true, trim: true },
        reviewDate: { type: Date, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true, trim: true }
      }
    ],
    rating: { type: Number, required: true }
  },
  { collection: "HorrorLocation" }
);
const HorrorLocationModel = (0, import_mongoose.model)("HorrorLocation", HorrorLocationSchema);
function index() {
  return HorrorLocationModel.find();
}
function getHorrorLocation(name) {
  return HorrorLocationModel.findOne({ name }).catch((err) => {
    console.error(err);
    throw new Error(`${name} nott Found`);
  });
}
function create(json) {
  const newLocation = new HorrorLocationModel(json);
  return newLocation.save();
}
function update(name, updatedLocation) {
  return HorrorLocationModel.findOneAndUpdate(
    { name },
    // Search for the location by name
    updatedLocation,
    // The new data to update the location with
    { new: true }
    // Returns the updated document
  ).then((updated) => {
    if (!updated) throw new Error(`${name} not found or updated`);
    return updated;
  }).catch((err) => {
    console.error(err);
    throw new Error(`Error updating location: ${err.message}`);
  });
}
function remove(name) {
  return HorrorLocationModel.findOneAndDelete({ name }).then((deleted) => {
    if (!deleted) {
      throw new Error(`Location with name ${name} not found or deleted`);
    }
  }).catch((err) => {
    console.error(err);
    throw new Error(`Error deleting location: ${err.message}`);
  });
}
var MongoHorrorPage_svc_default = { index, getHorrorLocation, create, update, remove };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  getHorrorLocation,
  remove,
  update
});
