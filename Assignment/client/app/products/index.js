import productService from "../product.service.js";

const loadingElement = document.getElementById('loading');
// Get the product name from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('name');


// Fetch the product data and populate the form
async function loadProductData() {
    if (!productName) {
        alert('Product is not found in API, Please Try Again.');
        return;
        
    }

    try {
        loadingElement.classList.remove('d-none'); // Show loading
        const product = await productService.findProduct(productName);
        document.getElementById('name').value = product[0].name;
        document.getElementById('price').value = product[0].price;
        document.getElementById('stock').value = product[0].stock;
        document.getElementById('description').value = product[0].description;
    } catch (error) {
        console.error('Error loading product data:', error);
        alert('Failed to load product data. Please try again.');
    }finally {
        loadingElement.classList.add('d-none'); // Hide loading
    }
}

// Handle form submission
document.getElementById('product-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const productObject = {
        name: document.getElementById('name').value,
        price: Number(document.getElementById('price').value),
        stock: Number(document.getElementById('stock').value),
        description: document.getElementById('description').value
    };

    try {
        await productService.updateProduct(productName, productObject);
        alert('Product updated successfully!');
        window.location.href = './list.html';
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product. Please try again.');
    }
});

// Load product data when the page loads
loadProductData();