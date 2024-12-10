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
var mongointerface_exports = {};
__export(mongointerface_exports, {
  HorrorLocationModel: () => HorrorLocationModel
});
module.exports = __toCommonJS(mongointerface_exports);
var import_mongoose = require("mongoose");
const GeometrySchema = new import_mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true }
});
const ApiDataSchema = new import_mongoose.Schema({
  city: { type: String, default: null },
  description: { type: String, default: null },
  ghost_type: { type: String, default: null },
  location_type: { type: String, default: null },
  state: { type: String, default: null },
  title: { type: String, default: null },
  ObjectId: {
    type: Number,
    required: false,
    validate: {
      validator: function(v) {
        return Number.isInteger(v) && v >= -2147483648 && v <= 2147483647;
      },
      message: (props) => `${props.value} is not a valid Int32 value!`
    }
  }
  // Use Number type with validation for Int32 range
});
const HorrorLocationSchema = new import_mongoose.Schema({
  original: {
    ObjectId: {
      type: Number,
      required: false,
      default: null,
      validate: {
        validator: function(v) {
          return Number.isInteger(v) && v >= -2147483648 && v <= 2147483647;
        },
        message: (props) => `${props.value} is not a valid Int32 value!`
      }
    },
    location_type: { type: String, default: null }
  },
  geometry: { type: GeometrySchema, required: true },
  api_data: { type: ApiDataSchema, required: true }
});
const HorrorLocationModel = (0, import_mongoose.model)("HorrorLocation", HorrorLocationSchema, "HorrorLocation");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HorrorLocationModel
});
