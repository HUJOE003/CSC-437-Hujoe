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
var horror_svc_exports = {};
__export(horror_svc_exports, {
  getHorrorLocation: () => getHorrorLocation
});
module.exports = __toCommonJS(horror_svc_exports);
const horrorLocations = {
  hauntedMansion: {
    name: "Spooky Haunted Mansion",
    description: "A haunted mansion with a dark history of mysterious disappearances.",
    type: "Haunted House",
    address: "456 Haunted Ave, Ghost City",
    coordinates: { latitude: 37.7749, longitude: -122.4194 },
    images: [
      "http://example.com/spooky1.jpg",
      "http://example.com/spooky2.jpg"
    ],
    reviews: [
      {
        reviewerName: "John Doe",
        reviewDate: /* @__PURE__ */ new Date("2024-10-10"),
        rating: 5,
        comment: "Scariest place I've ever been! Definitely worth a visit!"
      },
      {
        reviewerName: "Jane Smith",
        reviewDate: /* @__PURE__ */ new Date("2024-10-12"),
        rating: 4,
        comment: "Great experience, but a bit too many tourists."
      }
    ],
    rating: 4.5
  },
  creepyGraveyard: {
    name: "Creepy Graveyard",
    description: "An eerie graveyard with restless spirits rumored to haunt the area.",
    type: "Graveyard",
    address: "789 Ghostly Rd, Spirit Town",
    coordinates: { latitude: 37.785, longitude: -122.401 },
    images: [
      "http://example.com/graveyard1.jpg",
      "http://example.com/graveyard2.jpg"
    ],
    reviews: [
      {
        reviewerName: "Timothy Green",
        reviewDate: /* @__PURE__ */ new Date("2024-09-15"),
        rating: 3,
        comment: "It was a bit too quiet, but the atmosphere was spooky."
      }
    ],
    rating: 3.5
  }
};
function getHorrorLocation(locationName) {
  return horrorLocations[locationName] || null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHorrorLocation
});
