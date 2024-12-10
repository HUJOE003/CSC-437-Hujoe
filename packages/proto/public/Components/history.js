import { html, css, LitElement } from 'https://cdn.skypack.dev/lit';
import { unsafeHTML } from 'https://cdn.skypack.dev/lit/directives/unsafe-html.js';

class HauntedLocationFinder extends LitElement {
  static styles = css`
     body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #2b2b2b;
            color: #FFFFF;
            line-height: 1.6;
        }
        header, footer {
            background: #1a1a1a;
            padding: 15px;
            text-align: center;
        }
        header a, footer p {
            color: #f39c12;
            text-decoration: none;
        }
        main {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background: #333;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        }
        h1 {
            color: #f39c12;
        }
        .button {
            display: inline-block;
            background: #f39c12;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px 0;
            font-size: 16px;
            text-align: center;
        }
        .button:hover {
            background: #e67e22;
        }

        /* Popup Styling */
        .popup-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .popup-container.active {
            visibility: visible;
            opacity: 1;
        }
        .popup {
            background: #222;
            color: #fff;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
            max-width: 400px;
        }
        .popup h2 {
            margin-bottom: 10px;
            color: #f39c12;
        }
        .popup input, .popup textarea {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .popup button {
            background: #f39c12;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .popup button:hover {
            background: #e67e22;
        }
  `;

  static properties = {
    locationTitle: { type: String },
    ghostType: { type: String },
    locationDescription: { type: String },
    locationDetails: { type: String },
    isPopupActive: { type: Boolean },
    locationID: { type: Number },
    isUpdatePopupActive: { type: Boolean },
    city: { type: String },
    state: { type: String }
  };

  constructor() {
    super();
    this.locationTitle = 'Loading...';
    this.ghostType = 'Fetching...';
    this.locationDescription = 'Fetching location details...';
    this.locationDetails = '';
    this.isPopupActive = true;
    this.isUpdatePopupActive = false;  // Initially, the update popup is not active
    this.locationID = null;
    this.city = '';
    this.state = '';
  }

  updated(changedProperties) {
    super.updated(changedProperties);
  }

  async handleSubmitNumber() {
    const thrillNumber = parseInt(this.shadowRoot.getElementById('thrill-number').value, 10);
    if (isNaN(thrillNumber) || thrillNumber < 0 || thrillNumber > 9000) {
      alert('Please enter a valid number between 0 and 9000!');
      return;
    }

    this.isPopupActive = false;
    const token = localStorage.getItem('auth_token');
    const apiEndpoint = `/horror/${thrillNumber}`;
    try {
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: token }
      });

      if (!response.ok) throw new Error('Failed to fetch location data.');

      const data = await response.json();
      this.locationTitle = data.api_data.title || 'No Title';
      this.ghostType = `Ghost Type: ${data.api_data.ghost_type || 'Unknown'}`;
      this.locationDescription = data.api_data.description || 'No Description';
      this.locationDetails = `
        <p>City: ${data.api_data.city || 'Unknown'}</p>
        <p>State: ${data.api_data.state || 'Unknown'}</p>
        <p>Coordinates: ${data.geometry.y || 'Unknown'}, ${data.geometry.x || 'Unknown'}</p>
      `;
      this.locationID = thrillNumber;  // Set the location ID
      this.city = data.api_data.city || ''; // Store city value
      this.state = data.api_data.state || ''; // Store state value
    } catch (error) {
      console.error(error);
    }
  }

  // Show update popup
  showUpdatePopup() {
    this.isUpdatePopupActive = true;
  }

  // Handle location update (POST request)
  async handleLocationUpdate() {
    const updatedData = {
      api_data: {
        title: this.shadowRoot.getElementById('location-title').value,
        ghost_type: this.shadowRoot.getElementById('ghost-type').value,
        description: this.shadowRoot.getElementById('location-description').value,
        city: this.shadowRoot.getElementById('location-city').value,  // Added city field
        state: this.shadowRoot.getElementById('location-state').value,  // Added state field
      },
      geometry: {
        x: parseFloat(this.shadowRoot.getElementById('location-x').value),
        y: parseFloat(this.shadowRoot.getElementById('location-y').value)
      }
    };

    const token = localStorage.getItem('auth_token');
    const apiEndpoint = `/horror/${this.locationID}`;

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) throw new Error('Failed to update location data.');

      const data = await response.json();
      alert('Location updated successfully!');
      this.isUpdatePopupActive = false;  // Close the popup after update
    } catch (error) {
      console.error(error);
      alert('Failed to update location.');
    }
  }

  render() {
    return html`
      <header>
        <div>
          <a href="../index.html">Home</a> > <a href="history.html">History</a>
        </div>
      </header>

      <main>
        <h1>Haunted Location Finder</h1>
        <button class="button" @click="${() => { this.isPopupActive = true; }}">Enter New number</button>
        <section class="horror-location-page">
          <article class="location">
            <header>
              <h1>${this.locationTitle}</h1>
              <div>${this.ghostType}</div>
            </header>
            <section class="location-info">
              <p>${this.locationDescription}</p>
              <div>
                ${unsafeHTML(this.locationDetails)}
              </div>
              <button class="button" @click="${this.showUpdatePopup}">Update Location</button>
            </section>
          </article>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Haunted Location Finder. All rights reserved. Hujoe Pandi Selvan</p>
      </footer>

      <!-- Main input popup -->
      <div class="popup-container ${this.isPopupActive ? 'active' : ''}">
        <div class="popup">
          <h2>Thrill Me!</h2>
          <p>Enter a number between 0 and 9000 to get thrilled:</p>
          <input type="number" id="thrill-number" placeholder="Enter a number" />
          <button @click="${this.handleSubmitNumber}">Submit</button>
        </div>
      </div>

      <!-- Update location popup -->
      <div class="popup-container ${this.isUpdatePopupActive ? 'active' : ''}">
        <div class="popup">
          <h2>Update Location</h2>
          <input type="text" id="location-title" placeholder="Location Title" />
          <input type="text" id="ghost-type" placeholder="Ghost Type" />
          <textarea id="location-description" placeholder="Location Description"></textarea>
          <input type="number" id="location-x" placeholder="X Coordinate" />
          <input type="number" id="location-y" placeholder="Y Coordinate" />
          <input type="text" id="location-city" placeholder="City" />
          <input type="text" id="location-state" placeholder="State" />
          <button @click="${this.handleLocationUpdate}">Update</button>
          <button @click="${() => { this.isUpdatePopupActive = false; }}">Cancel</button>
        </div>
      </div>
    `;
  }
}

customElements.define('haunted-location-finder', HauntedLocationFinder);
