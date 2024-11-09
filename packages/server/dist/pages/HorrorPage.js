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
var HorrorPage_exports = {};
__export(HorrorPage_exports, {
  HorrorLocationPage: () => HorrorLocationPage
});
module.exports = __toCommonJS(HorrorPage_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
if (typeof window !== "undefined") {
  class HorrorReview extends HTMLElement {
    connectedCallback() {
      const src = this.getAttribute("src");
      if (src) {
        fetch(src).then((response) => response.json()).then((data) => {
          const reviewerNameSlot = this.querySelector('[slot="reviewer-name"]');
          const reviewDateSlot = this.querySelector('[slot="review-date"]');
          const ratingSlot = this.querySelector('[slot="rating"]');
          const commentSlot = this.querySelector('[slot="comment"]');
          if (reviewerNameSlot) {
            reviewerNameSlot.textContent = data.reviewerName;
          }
          if (reviewDateSlot) {
            reviewDateSlot.textContent = new Date(data.reviewDate).toLocaleDateString();
          }
          if (ratingSlot) {
            ratingSlot.textContent = "\u2B50".repeat(data.rating);
          }
          if (commentSlot) {
            commentSlot.textContent = data.comment;
          }
        }).catch((error) => console.error("Error loading review data:", error));
      }
    }
  }
  customElements.define("horror-review", HorrorReview);
}
class HorrorLocationPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: [],
      styles: [
        import_server.css`main.page {
            --page-grids: 8;
            @media screen and (max-width: 48rem) {
              --page-grids: 6;
          }
        }`
      ],
      scripts: [`import { define } from "@calpoly/mustang";`]
    });
  }
  renderReview(review) {
    const { reviewerName, reviewDate, rating, comment } = review;
    return import_server.html`
      <horror-review src="/api/reviews/${reviewerName}">
        <!-- Slots will be populated dynamically by the custom element -->
        <span slot="reviewer-name">${reviewerName}</span>
        <time slot="review-date" datetime="${reviewDate.toString()}">
          ${reviewDate.toLocaleDateString()}
        </time>
        <span slot="rating">${"\u2B50".repeat(rating)}</span>
        <p slot="comment">${comment}</p>
      </horror-review>
    `;
  }
  renderImages(images) {
    return import_server.html`
      <div class="location-images">
        ${images.map(
      (image) => import_server.html`
            <img src="${image}" alt="View of ${this.data.name}" />
          `
    )}
      </div>
    `;
  }
  renderBody() {
    const {
      name,
      description,
      type,
      address,
      coordinates,
      images,
      reviews,
      rating
    } = this.data;
    const imageGallery = images ? this.renderImages(images) : "";
    const reviewsList = reviews ? import_server.html`<section class="reviews">
          <h3>Reviews</h3>
          ${reviews.map((review) => this.renderReview(review))}
        </section>` : "";
    return import_server.html`
      <body>
        <main class="horror-location-page">
          <article class="location">
            <header>
              <h1>${name}</h1>
              ${rating ? import_server.html`<div class="rating">Rating: ${rating}/5</div>` : ""}
            </header>
            
            <section class="location-info">
              <p class="description">${description}</p>
              <div class="details">
                <p class="type">Type: ${type}</p>
                <address>${address}</address>
                <p class="coordinates">
                  Location: ${coordinates.latitude}, ${coordinates.longitude}
                </p>
              </div>
            </section>

            ${imageGallery}
            ${reviewsList}
          </article>
        </main>
      </body>
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HorrorLocationPage
});
