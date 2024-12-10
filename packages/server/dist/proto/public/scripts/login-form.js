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
var login_form_exports = {};
__export(login_form_exports, {
  LoginForm: () => LoginForm
});
module.exports = __toCommonJS(login_form_exports);
var import_mustang = require("@calpoly/mustang");
var import_reset_css = __toESM(require("./styles/reset.css.js"));
var import_headings_css = __toESM(require("./styles/headings.css.js"));
class LoginForm extends HTMLElement {
  static template = import_mustang.html`<template>
    <form onsubmit="false;">
      <slot name="title">
        <h3>Sign in with Username and Password</h3>
      </slot>
      <label>
        <span>
          <slot name="username">Username</slot>
        </span>
        <input name="username" autocomplete="off" />
      </label>
      <label>
        <span>
          <slot name="password">Password</slot>
        </span>
        <input type="password" name="password" />
      </label>
      <slot name="submit">
        <button type="submit">Sign In</button>
      </slot>
    </form>
  </template>`;
  static styles = import_mustang.css`
    form {
      display: grid;
      grid-column: 1/-1;
      grid-template-columns: subgrid;
      gap: inherit;
    }

    label {
      display: contents;

      > span {
        grid-column: 1 / auto;
        justify-self: end;
      }
      > input {
        grid-column: auto / span 2;
      }
    }

    ::slotted(*[slot="title"]),
    slot[name="title"] > * {
      grid-column: 1/-1;
    }

    ::slotted(button[slot="submit"]),
    button[type="submit"] {
      grid-column: 2 / -2;
      align-self: center;
    }
  `;
  get form() {
    return this.shadowRoot.querySelector("form");
  }
  constructor() {
    super();
    (0, import_mustang.shadow)(this).template(LoginForm.template).styles(import_reset_css.default.styles, import_headings_css.default.styles, LoginForm.styles);
    this.form.addEventListener(
      "submit",
      (event) => submitLoginForm(
        event,
        this.getAttribute("api"),
        this.getAttribute("redirect") || "/"
      )
    );
  }
}
function submitLoginForm(event, endpoint, redirect) {
  event.preventDefault();
  const form = event.target.closest("form");
  const data = new FormData(form);
  const method = "POST";
  const headers = {
    "Content-Type": "application/json"
  };
  const body = JSON.stringify(Object.fromEntries(data));
  console.log("POST login request:", body);
  fetch(endpoint, { method, headers, body }).then((res) => {
    if (res.status !== 200)
      throw `Form submission failed: Status ${res.status}`;
    return res.json();
  }).then((payload) => {
    const { token } = payload;
    form.dispatchEvent(
      new CustomEvent("auth:message", {
        bubbles: true,
        composed: true,
        detail: ["auth/signin", { token, redirect }]
      })
    );
  }).catch((err) => console.log("Error submitting form:", err));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginForm
});
