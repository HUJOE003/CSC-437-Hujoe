import { Auth, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import reset from "../styles/reset.css";
import {
  convertStartEndDates,
  formatDate
} from "../utils/dates";

export class HomeViewElement extends LitElement {
  src = "/api/tours";

  @state()
  _authObserver = new Observer<Auth.Model>(
    this,
    "blazing:auth"
  );

  _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
      }
      this.hydrate(this.src);
    });
  }

  hydrate(url: string) {
    fetch(url, {
      headers: Auth.headers(this._user)
    })
      .then((res: Response) => {
        if (res.status === 200) return res.json();
        throw `Server responded with status ${res.status}`;
      })
      .catch((err) =>
        console.log("Failed to load haunted tour data:", err)
      )
      .catch((err) =>
        console.log("Failed to convert haunted tour data:", err)
      );
  }

  render() {

    return html`
      <main class="page">
        <header>
          <h2>Enter the Unknown</h2>
        </header>
      </main>
    `;
  }
  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
      main.page {
        display: grid;
        grid-column: 1/-1;
        padding: var(--size-spacing-small)
          var(--size-spacing-medium);
        grid-template-columns: subgrid;
        grid-template-rows: auto auto auto 1fr;
        grid-template-areas:
          "hd hd yr dt1 dt2 dd dd dd"
          "xx xx yr dt1 dt2 dd dd dd";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
        align-items: end;
        background-color: #0a0a0a;
        color: #f8f8f2;
        font-family: 'Creepster', cursive;
      }
      header {
        grid-area: hd;
        text-align: center;
        color: #ff6666;
      }
      dl {
        display: contents;
      }
      dt {
        grid-area: yr;
        text-align: right;
        color: #cc3333;
      }
      dt + dt {
        grid-area: dt1;
        text-align: center;
        color: #cc3333;
      }
      dt + dt + dt {
        grid-area: dt2;
        color: #cc3333;
      }
      dd {
        grid-area: dd;
      }
      a {
        color: #ff6666;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
        color: #ff3333;
      }
      time {
        white-space: nowrap;
        font-style: italic;
      }
    `
  ];
}