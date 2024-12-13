
async function initializeApp() {
    const api = new BayutAPI();
    const propertyList = new PropertyList();
    
    try {
    propertyList.showLoading();
    const properties = await api.fetchProperties();
    propertyList.properties = properties;
    propertyList.allProperties = [...properties];
    propertyList.hideLoading();
    propertyList.renderProperties();
    } catch (error) {
    propertyList.showError(error.message);
    }
    }
    
    document.addEventListener('DOMContentLoaded', initializeApp);