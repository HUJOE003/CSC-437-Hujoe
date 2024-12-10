import {
    Auth,
    define,
    Dropdown,
    Events,
    Observer
  } from "@calpoly/mustang";
  import { css, html, LitElement } from "lit";
  import { state } from "lit/decorators.js";
  import headings from "../styles/headings.css";
  import reset from "../styles/reset.css";
  
  function toggleDarkMode(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    const checked = target.checked;
  
    Events.relay(ev, "dark-mode", { checked });
  }
  
  function signOut(ev: MouseEvent) {
    Events.relay(ev, "auth:message", ["auth/signout"]);
  }
  
  export class HeaderElement extends LitElement {
    static uses = define({
      "mu-dropdown": Dropdown.Element
    });
  
    @state()
    userid: string = "Wandering Soul";
  
    protected render() {
      return html` <header>
        <h1>Phantom Trails</h1>
        <nav>
          <p><slot>Unnamed Haunting</slot></p>
          <mu-dropdown>
            <a slot="actuator">
              Welcome,
              <span id="userid">${this.userid}</span>
            </a>
            <menu>
              <li>
                <label @change=${toggleDarkMode}>
                  <input type="checkbox" />
                  Night Mode
                </label>
              </li>
              <li class="when-signed-in">
                <a id="signout" @click=${signOut}>Escape</a>
              </li>
              <li class="when-signed-out">
                <a href="/login">Enter</a>
              </li>
            </menu>
          </mu-dropdown>
        </nav>
      </header>`;
    }
  
    static styles = [
      reset.styles,
      headings.styles,
      css`
        :host {
          display: contents;
        }
        header {
          display: flex;
          flex-wrap: wrap;
          align-items: bottom;
          justify-content: space-between;
          padding: var(--size-spacing-medium);
          background-color: var(--color-background-header-dark);
          color: var(--color-text-ghostly);
          font-family: "Creepster", cursive;
        }
        header ~ * {
          margin: var(--size-spacing-medium);
        }
        header p {
          --color-link: var(--color-link-ghostly);
        }
        nav {
          display: flex;
          flex-direction: column;
          flex-basis: max-content;
          align-items: end;
        }
        a[slot="actuator"] {
          color: var(--color-link-ghostly);
          cursor: pointer;
        }
        #userid:empty::before {
          content: "Wandering Soul";
        }
        menu a {
          color: var(--color-link);
          cursor: pointer;
          text-decoration: underline;
        }
        a:has(#userid:empty) ~ menu > .when-signed-in,
        a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
          display: none;
        }
      `
    ];
  
    _authObserver = new Observer<Auth.Model>(
      this,
      "phantom:auth"
    );
  
    connectedCallback() {
      super.connectedCallback();
  
      this._authObserver.observe(({ user }) => {
        if (user && user.username !== this.userid) {
          this.userid = user.username;
        }
      });
    }
  
    static initializeOnce() {
      function toggleDarkMode(
        page: HTMLElement,
        checked: boolean
      ) {
        page.classList.toggle("dark-mode", checked);
      }
  
      document.body.addEventListener("dark-mode", (event) =>
        toggleDarkMode(
          event.currentTarget as HTMLElement,
          (event as CustomEvent).detail?.checked
        )
      );
    }
  }