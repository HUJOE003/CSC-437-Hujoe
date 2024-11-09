// src/pages/horror-location.ts
import { css, html } from "@calpoly/mustang/server";
import { HorrorLocation, Review } from "../models";
import renderPage from "./renderPage"; // generic page renderer

if (typeof window !== 'undefined') {
  class HorrorReview extends HTMLElement {
    connectedCallback() {
      const src = this.getAttribute('src'); // Get the API endpoint from the src attribute
      if (src) {
        fetch(src) // Fetch the review data from the API
          .then(response => response.json()) // Parse the response as JSON
          .then(data => {
            // Get the elements using querySelector
            const reviewerNameSlot = this.querySelector('[slot="reviewer-name"]');
            const reviewDateSlot = this.querySelector('[slot="review-date"]');
            const ratingSlot = this.querySelector('[slot="rating"]');
            const commentSlot = this.querySelector('[slot="comment"]');

            // Only set the textContent if the element exists
            if (reviewerNameSlot) {
              reviewerNameSlot.textContent = data.reviewerName;
            }
            if (reviewDateSlot) {
              reviewDateSlot.textContent = new Date(data.reviewDate).toLocaleDateString();
            }
            if (ratingSlot) {
              ratingSlot.textContent = "⭐".repeat(data.rating);
            }
            if (commentSlot) {
              commentSlot.textContent = data.comment;
            }
          })
          .catch(error => console.error('Error loading review data:', error)); // Handle errors
      }
    }
  }

  customElements.define('horror-review', HorrorReview);
}
export class HorrorLocationPage {
  data: HorrorLocation;

  constructor(data: HorrorLocation) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: [],
      styles: [
        css`main.page {
            --page-grids: 8;
            @media screen and (max-width: 48rem) {
              --page-grids: 6;
          }
        }`
      ],
      scripts: [`import { define } from "@calpoly/mustang";`]
    });
  }

  renderReview(review: Review) {
    const { reviewerName, reviewDate, rating, comment } = review;
    
    // return html`
    //   <blz-review>
    //     <span slot="reviewer-name">${reviewerName}</span>
    //     <time slot="review-date" datetime="${reviewDate.toString()}">
    //       ${reviewDate.toLocaleDateString()}
    //     </time>
    //     <span slot="rating">${"⭐".repeat(rating)}</span>
    //     <p slot="comment">${comment}</p>
    //   </blz-review>
    // `;
    return html`
      <horror-review src="/api/reviews/${reviewerName}">
        <!-- Slots will be populated dynamically by the custom element -->
        <span slot="reviewer-name">${reviewerName}</span>
        <time slot="review-date" datetime="${reviewDate.toString()}">
          ${reviewDate.toLocaleDateString()}
        </time>
        <span slot="rating">${"⭐".repeat(rating)}</span>
        <p slot="comment">${comment}</p>
      </horror-review>
    `;
  }

  renderImages(images: string[]) {
    return html`
      <div class="location-images">
        ${images.map(
          (image) => html`
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
    const reviewsList = reviews
      ? html`<section class="reviews">
          <h3>Reviews</h3>
          ${reviews.map((review) => this.renderReview(review))}
        </section>`
      : "";

    return html`
      <body>
        <main class="horror-location-page">
          <article class="location">
            <header>
              <h1>${name}</h1>
              ${rating ? html`<div class="rating">Rating: ${rating}/5</div>` : ""}
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
