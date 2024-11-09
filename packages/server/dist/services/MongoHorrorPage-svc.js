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
  default: () => MongoHorrorPage_svc_default,
  getHorrorLocation: () => getHorrorLocation
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
var MongoHorrorPage_svc_default = { index, getHorrorLocation };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHorrorLocation
});
