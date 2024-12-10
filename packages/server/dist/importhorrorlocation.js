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
var import_mongoose = __toESM(require("mongoose"));
var import_horrorlocation = __toESM(require("./models/horrorlocation"));
var import_HorrorPage_svc = __toESM(require("./services/HorrorPage-svc"));
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/horrorDB";
import_mongoose.default.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
  console.log("Connected to MongoDB");
  await import_horrorlocation.default.deleteMany({});
  console.log("Cleared existing data");
  await import_horrorlocation.default.insertMany(import_HorrorPage_svc.default);
  console.log("Inserted horror location data");
  import_mongoose.default.disconnect();
}).catch((err) => console.error("Error connecting to MongoDB:", err));
