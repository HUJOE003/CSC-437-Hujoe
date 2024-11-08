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
var svc_exports = {};
__export(svc_exports, {
  getHorrorLocation: () => getHorrorLocation
});
module.exports = __toCommonJS(svc_exports);
const horrorLocations = {
  hauntedMansion: {
    name: "Spooky Haunted Mansion",
    description: "A haunted mansion with a dark history of mysterious disappearances.",
    type: "Haunted House",
    address: "456 Haunted Ave, Ghost City",
    coordinates: { latitude: 37.7749, longitude: -122.4194 },
    images: [
      "https://images.unsplash.com/photo-1633555690973-b736f84f3c1b?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1494376877685-d3d2559d4f82?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9ycm9yfGVufDB8fDB8fHww"
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
      "https://images.unsplash.com/photo-1633630939868-6163dd35e95b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvcnJvciUyMGdyYXZleWFyZHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1637949631006-0c076ce8e6ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvcnJvciUyMGdyYXZleWFyZHxlbnwwfHwwfHx8MA%3D%3D"
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
