class PropertyList {
    constructor() {
    this.properties = [];
    this.propertyListElement = document.getElementById('propertyList');
    this.loadingElement = document.getElementById('loading');
    this.errorElement = document.getElementById('error');
    this.sortSelect = document.getElementById('sortBy');
    this.allProperties = [];
    this.searchInput = document.getElementById('searchInput');
    this.searchButton = document.getElementById('searchButton');
    
    this.sortSelect.addEventListener('change', () => this.sortProperties());
    this.searchButton.addEventListener('click', () => this.handleSearch());
    this.searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') this.handleSearch();
    });
    }
    
    showLoading() {
    this.loadingElement.style.display = 'block';
    this.errorElement.style.display = 'none';
    this.propertyListElement.innerHTML = '';
    }
    
    showError(message) {
    this.loadingElement.style.display = 'none';
    this.errorElement.style.display = 'block';
    this.errorElement.textContent = message;
    }
    
    hideLoading() {
    this.loadingElement.style.display = 'none';
    }
    
    renderProperties() {
    this.propertyListElement.innerHTML = this.properties
    .map(property => this.createPropertyCard(property))
    .join('');
    }
    
    createPropertyCard(property) {
    console.log('Property data:', property);
    
    const locationName = property.location[0]?.name ||
    property.geography?.name ||
    property.address?.join(', ') ||
    'Location not available';
    
    return `
    <div class="property-card">
    <img
    src="${property.coverPhoto?.url || 'placeholder-image.jpg'}"
    alt="${property.title}"
    class="property-image"
    >
    <div class="property-info">
    <h2 class="property-title">${property.title}</h2>
    <p class="property-price">AED ${property.price.toLocaleString()}</p>
    <p class="property-location">${locationName}</p>
    </div>
    </div>
    `;
    }
    
    sortProperties() {
    const sortType = this.sortSelect.value;
    
    switch(sortType) {
    case 'price-asc':
    this.properties.sort((a, b) => a.price - b.price);
    break;
    case 'price-desc':
    this.properties.sort((a, b) => b.price - a.price);
    break;
    case 'location':
    this.properties.sort((a, b) => a.location[0].localeCompare(b.location[0]));
    break;
    }
    
    this.renderProperties();
    }
    
    handleSearch() {
    const searchTerm = this.searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
    this.properties = [...this.allProperties];
    } else {
    this.properties = this.allProperties.filter(property => {
    const title = property.title.toLowerCase();
    const location = (property.location[0]?.name ||
    property.geography?.name ||
    property.address?.join(', ') ||
    '').toLowerCase();
    return title.includes(searchTerm) || location.includes(searchTerm);
    });
    }
    
    if (this.properties.length === 0) {
    this.propertyListElement.innerHTML = `
    <div class="no-results">
    No properties found matching "${searchTerm}"
    </div>
    `;
    } else {
    this.renderProperties();
    }
    }
    }
    
    
    