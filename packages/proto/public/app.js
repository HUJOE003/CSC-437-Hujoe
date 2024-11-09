//---------------------------------Dark Mode----------------------------------------------------

document.querySelector('.darkmode-toggle').addEventListener("change",(e) => {
    if (e.target.classList.contains('darkmode'))
    {
        const darkmodeevent = new CustomEvent('darkmode:toggle',{
            detail: {
                enabledbruh: e.target.checked
            }
        });

        e.stopPropagation();

        document.querySelector('.darkmode').dispatchEvent(darkmodeevent)
    }
})

document.querySelector('.darkmode').addEventListener('darkmode:toggle', function (event) {
    
    if (event.detail.enabledbruh){
        document.body.classList.add("darkness");
    }
    else{
        document.body.classList.remove("darkness");
    }

});
//---------------------------------Dark Mode----------------------------------------------------

// Define the custom element 'haunted-location'
class HauntedLocationElement extends HTMLElement {
    static template = `
      <style>
        .location-card {
          border: 1px solid #ccc;
          padding: 16px;
          margin: 10px 0;
          border-radius: 8px;
        }
        .location-card h3 {
          margin-top: 0;
        }
      </style>
      <div class="location-card">
        <h3></h3>
        <p id="description"></p>
        <img id="image" width="200" alt="Location image"/>
        <a id="link" href="#">Learn more</a>
      </div>
    `;
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      // Fetch the 'src' attribute
      const src = this.getAttribute('src');
      if (src) {
        this.hydrate(src);
      }
    }
  
    // Method to fetch the data from the provided URL and render it
    hydrate(url) {
      fetch(url)
        .then(res => {
          if (res.status !== 200) {
            throw new Error(`Failed to fetch: ${res.status}`);
          }
          return res.json();
        })
        .then(json => this.render(json))
        .catch(error => console.error('Error fetching haunted location data:', error));
    }
  
    // Method to render the data into the custom element's shadow DOM
    render(json) {
      const { name, description, image, link } = json;
  
      // Apply the template and render the content
      this.shadowRoot.innerHTML = HauntedLocationElement.template;
      
      this.shadowRoot.querySelector('h3').textContent = name || 'Unknown Location';
      this.shadowRoot.querySelector('#description').textContent = description || 'No description available.';
      this.shadowRoot.querySelector('#image').src = image || 'https://via.placeholder.com/200';
      this.shadowRoot.querySelector('#link').href = link || '#';
    }
  }
  
  // Define the custom element
  customElements.define('haunted-location', HauntedLocationElement);
  
  // Handle the search functionality
  document.querySelector('.search_bar').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const locations = document.querySelectorAll('haunted-location');
    
    locations.forEach(location => {
      const name = location.shadowRoot.querySelector('h3').textContent.toLowerCase();
      if (name.includes(searchTerm)) {
        location.style.display = '';
      } else {
        location.style.display = 'none';
      }
    });
  });