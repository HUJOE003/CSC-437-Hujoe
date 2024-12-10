import { css, html, shadow } from "@calpoly/mustang";

export class LoginForm extends HTMLElement {
  static template = html`
    <template>
      <form>
        <slot name="title">
          <h2 class="form-title">Sign In</h2>
        </slot>
        <label for="username">
          <span class="label-text">Username</span>
          <input
            id="username"
            name="username"
            autocomplete="username"
            required
            aria-label="Enter your username"
          />
        </label>
        <label for="password">
          <span class="label-text">Password</span>
          <input
            id="password"
            type="password"
            name="password"
            autocomplete="current-password"
            required
            aria-label="Enter your password"
          />
        </label>
        <slot name="submit">
          <button type="submit">Sign In</button>
        </slot>
        <div class="signup-prompt">
         <slot name="signup">Don't have an account? <a href="/register">Sign Up</a></slot>
        </div>
      </form>
      <div id="error-message" class="hidden"></div>
    </template>
  `;

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50vh;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #333;
    }

    form {
    margin-top: 50vh;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 350px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.85);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .form-title {
      text-align: center;
      font-size: 1.75rem;
      font-weight: bold;
      color: var(--primary-color, #007bff);
      margin-bottom: 1rem;
    }

    label {
      display: flex;
      flex-direction: column;
      font-size: 1rem;
      font-weight: bold;
    }

    .label-text {
      margin-bottom: 0.5rem;
    }

    input {
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      background-color: #f7f7f7;
    }

    input:focus {
      outline: 2px solid var(--primary-color, #007bff);
      background-color: white;
    }

    button {
      padding: 0.75rem;
      font-size: 1.25rem;
      font-weight: bold;
      color: white;
      background-color: var(--primary-color, #007bff);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: var(--primary-hover, #0056b3);
    }

    .signup-prompt {
      text-align: center;
      font-size: 0.875rem;
      margin-top: 1rem;
    }

    .signup-prompt a {
      color: var(--primary-color, #007bff);
      text-decoration: none;
    }

    #error-message {
      color: var(--error-color, #d9534f);
      font-size: 1rem;
      font-weight: bold;
    }

    .hidden {
      display: none;
    }
  `;

  constructor() {
    super();
    shadow(this).template(LoginForm.template).styles(LoginForm.styles);
    this.form = this.shadowRoot.querySelector("form");
    this.errorMessage = this.shadowRoot.querySelector("#error-message");

    this.form.addEventListener("submit", (event) =>
      this.submitLoginForm(
        event,
        this.getAttribute("api"),
        this.getAttribute("redirect") || "/"
      )
    );
  }

  async submitLoginForm(event, endpoint, redirect) {
    event.preventDefault();
    this.errorMessage.classList.add("hidden");
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    const headers = { "Content-Type": "application/json" };
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const payload = await response.json();
  
      // Store token (or handle it as needed)
      localStorage.setItem("auth_token", payload.token);
  
      // Check for token presence before redirect
      if (payload.token) {
        form.dispatchEvent(
          new CustomEvent("auth:message", {
            bubbles: true,
            composed: true,
            detail: ["auth/signin", { token: payload.token, redirect }],
          })
        );
  
        // Redirect after successful login
        window.location.href = redirect || "/";
      }
  
    } catch (error) {
      this.errorMessage.textContent = `Login failed: ${error.message}`;
      this.errorMessage.classList.remove("hidden");
    }
  }
}  