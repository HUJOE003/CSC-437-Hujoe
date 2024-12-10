"use strict";
const mongoose = require("mongoose");
const LocationSchema = new mongoose.Schema({
  original: {
    ObjectId: Number,
    location_type: String
  },
  geometry: {
    x: Number,
    y: Number
  },
  api_data: {
    city: String,
    description: String,
    ghost_type: String,
    location_type: String,
    state: String,
    title: String,
    ObjectId: Number
  }
});
module.exports = mongoose.model("Location", LocationSchema);
