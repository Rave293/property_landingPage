
class BayutAPI {
    constructor() {
    this.apiKey = '6b96633c3dmshb7df86d000e4099p1aa7cajsn93e584a03027'; // Replace with your actual API key
    this.baseURL = 'https://bayut.p.rapidapi.com';
    }
    
    async fetchProperties() {
    const options = {
    method: 'GET',
    headers: {
    'X-RapidAPI-Key': this.apiKey,
    'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
    };
    
    try {
    const response = await fetch(`${this.baseURL}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=25`, options);
    if (!response.ok) throw new Error('Failed to fetch properties');
    const data = await response.json();
    return data.hits;
    } catch (error) {
    throw new Error('Failed to fetch properties: ' + error.message);
    }
    }
    }
    