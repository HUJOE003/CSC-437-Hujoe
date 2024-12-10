import {
  Auth,
  define,
  History,
  Switch
} from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { HeaderElement } from "./components/blazing-header.ts";
import { HomeViewElement } from "./views/home-view";
import { TourViewElement } from "./views/tour-view";

const routes: Switch.Route[] = [
  {
    auth: "protected",
    path: "/app/horror/:id",
    view: (params: Switch.Params) => html`
      <horror-view tour-id=${params.id}></horror-view>
    `
  },
  {
    auth: "protected",
    path: "/app/horror/:id",
    view: (
      params: Switch.Params,
      query?: URLSearchParams
    ) => html`
      <horror-view
        userid=${params.id}
        mode=${query?.has("edit")
          ? "edit"
          : query?.has("new")
            ? "new"
            : "view"}></horror-view>
    `
  },
  {
    auth: "protected",
    path: "/app",
    view: () => html`<home-view></home-view>`
  },
  {
    path: "/",
    redirect: "/app"
  }
];

class AppElement extends LitElement {
  render() {
    return html`<mu-switch></mu-switch>`;
  }

  connectedCallback() {
    super.connectedCallback();
    HeaderElement.initializeOnce();
  }
}

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "blazing:history", "blazing:auth");
    }
  },
  "blazing-app": AppElement,
  "blazing-header": HeaderElement,
  "home-view": HomeViewElement,
  "tour-view": TourViewElement,
});