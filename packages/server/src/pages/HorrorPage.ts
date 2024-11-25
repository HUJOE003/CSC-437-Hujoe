import { css, html } from "@calpoly/mustang/server";
import { HorrorLocation } from "../models";
import renderPage from "./renderPage"; // generic page renderer

// Updated to reflect the HorrorLocation interface structure.
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
        css`
          main.page {
            --page-grids: 8;
            @media screen and (max-width: 48rem) {
              --page-grids: 6;
            }
          }
        `
      ],
      scripts: [`import { define } from "@calpoly/mustang";`]
    });
  }

  renderImages(images: string[]) {
    return html`
      <div class="location-images">
        ${images.map(
          (image) => html`
            <img src="${image}" alt="View of ${this.data.api_data.title}" />
          `
        )}
      </div>
    `;
  }

  renderBody() {
    const {
      api_data: { title, description, ghost_type, city, state },
      geometry: { x, y }
    } = this.data;

    // Coordinates from x and y values
    const coordinates = { latitude: y, longitude: x };

    return html`
      <body>
        <main class="horror-location-page">
          <article class="location">
            <header>
              <h1>${title}</h1>
              <div class="ghost-type">Ghost Type: ${ghost_type}</div>
            </header>

            <section class="location-info">
              <p class="description">${description}</p>
              <div class="details">
                <p class="location-type">Location Type: ${this.data.original.location_type}</p>
                <p class="city">City: ${city}</p>
                <p class="state">State: ${state}</p>
                <p class="coordinates">
                  Location: ${coordinates.latitude}, ${coordinates.longitude}
                </p>
              </div>
            </section>

            <!-- Placeholder for images if available -->
            ${this.renderImages([])} 
          </article>
        </main>
      </body>
    `;
  }
}
