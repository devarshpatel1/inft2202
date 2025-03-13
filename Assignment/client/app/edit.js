import productService from './product.service.js';

const urlParams = new URLSearchParams(window.location.search);
const productName = decodeURIComponent(urlParams.get('name'));

document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    clearValidation();
    
    const formData = new FormData(e.target);
    const product = {
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        description: formData.get('description')
    };

    if (validateProduct(product)) {
        try {
            await productService.updateProduct(productName, product);
            showSuccessAlert('Product updated successfully!');
            setTimeout(() => window.location.href = 'list.html', 1500);
        } catch (error) {
            showErrorAlert(error.message);
        }
    }
});

// Initial load
(async () => {
    try {
        const product = await productService.getProduct(productName);
        populateForm(product);
    } catch (error) {
        showErrorAlert('Product not found');
        setTimeout(() => window.location.href = 'list.html', 2000);
    }
})();

function populateForm(product) {
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('stock').value = product.stock;
    document.getElementById('description').value = product.description;
}

function validateProduct(product) {
    let isValid = true;

    if (isNaN(product.price) || product.price <= 0) {
        showValidationError('price', 'Valid price required');
        isValid = false;
    }

    if (isNaN(product.stock)) {
        showValidationError('stock', 'Valid stock quantity required');
        isValid = false;
    }

    return isValid;
}

function showValidationError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const feedback = field.nextElementSibling;
    field.classList.add('is-invalid');
    feedback.textContent = message;
}

function clearValidation() {
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
}

function showSuccessAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show mt-3';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.querySelector('main').prepend(alert);
}

function showErrorAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show mt-3';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.querySelector('main').prepend(alert);
}