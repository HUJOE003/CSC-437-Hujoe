import {
    PageParts,
    renderWithDefaults
  } from "@calpoly/mustang/server";
  
  const defaults = {
    stylesheets: [],
    styles: [],
    scripts: [],
    googleFontURL:
      "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,200;0,400;0,700;1,700&family=Merriweather:wght@400;700&display=swap",
    imports: {
      "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang"
    }
  };
  
  export default function renderPage(page: PageParts) {
    return renderWithDefaults(page, defaults);
  }