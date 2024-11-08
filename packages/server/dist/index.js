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
var import_HorrorPage = require("./pages/HorrorPage");
var import_HorrorPage_svc = require("./services/HorrorPage-svc");
const app = (0, import_express.default)();
const port = process.env.PORT || 3003;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.get("/Hujoe", (req, res) => {
  res.send("Why you know my name bro");
});
app.get(
  "/horror/:isd",
  (req, res) => {
    const isd = req.params.isd;
    const data = (0, import_HorrorPage_svc.getHorrorLocation)(isd);
    if (!data) {
      res.status(400).send();
      return;
    }
    const page = new import_HorrorPage.HorrorLocationPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  }
);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
