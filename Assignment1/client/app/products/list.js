// Name: Devarsh Patel
// Description: INFT 2202: Product Inventory System

/* list.js */

import productService from "../product.service.js";

console.log('We are on the product list page');

// Cache DOM elements
const eleEmpty = document.getElementById('empty-message');
const eleTable = document.getElementById('product-list');
const paginationElement = document.getElementById('pagination');

(async function() {
    const params = new URL(document.location).searchParams;
    
    // Handle test data creation
    let recCount = params.get("records");
    if (recCount !== null) {
        let index = 0;
        while (recCount-- > 0) {
            await productService.saveProduct({
                name: `Product ${index++}`,
                price: 10,
                description: "Sample product description.",
                sound: "default-sound"
            });
        }
    }

    const recordPage = {
        page: Number(params.get('page') ?? 1),
        perPage: Number(params.get('perPage') ?? 5)
    };
    
    try {
        const response = await productService.getProductPage(recordPage);
        const { records, pagination } = response;

        if (!records || !records.length) {
            showEmptyState();
        } else {
            showProductTable();
            drawProductTable(records);
            drawPagination(pagination);
        }
    } catch (error) {
        console.error('Error loading products:', error);
        showEmptyState();
    }
})();

function showEmptyState() {
    eleEmpty.classList.remove('d-none');
    eleTable.classList.add('d-none');
    paginationElement.classList.add('d-none');
}

function showProductTable() {
    eleEmpty.classList.add('d-none');
    eleTable.classList.remove('d-none');
    paginationElement.classList.remove('d-none');
}

function drawPagination(paginationData) {
    paginationElement.innerHTML = '';
    const { page, perPage, pages } = paginationData;
    
    if (pages > 1) {
        const ul = document.createElement("ul");
        ul.classList.add('pagination');
        
        // Previous button
        ul.insertAdjacentHTML('beforeend', `
            <li class="page-item ${page === 1 ? 'disabled' : ''}">
                <a class="page-link" href="./list.html?page=${page - 1}&perPage=${perPage}">Previous</a>
            </li>
        `);

        // Page numbers
        for (let i = 1; i <= pages; i++) {
            ul.insertAdjacentHTML('beforeend', `
                <li class="page-item ${i === page ? 'active' : ''}">
                    <a class="page-link" href="./list.html?page=${i}&perPage=${perPage}">${i}</a>
                </li>
            `);
        }

        // Next button
        ul.insertAdjacentHTML('beforeend', `
            <li class="page-item ${page === pages ? 'disabled' : ''}">
                <a class="page-link" href="./list.html?page=${page + 1}&perPage=${perPage}">Next</a>
            </li>
        `);

        paginationElement.append(ul);
    }
}

function drawProductTable(products) {
    eleTable.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = eleTable.querySelector('tbody');
    
    products.forEach(product => {
        const row = tbody.insertRow();
        row.insertCell().textContent = product.name;
        row.insertCell().textContent = `$${product.price}`;
        row.insertCell().textContent = product.description || 'N/A';
        row.insertCell().textContent = product.stock || 'N/A';

        const actionCell = row.insertCell();
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger mx-1';
        deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
        deleteBtn.addEventListener('click', async () => {
            try {
                if(confirm(`Are you sure you want to delete ${product.name}?`)) {
                    await productService.deleteProduct(product.name);
                    window.location.reload();
                }
            } catch (error) {
                console.error('Delete failed:', error);
                alert('Failed to delete product. Please check console for details.');
            }
        });
        
        // Edit button
        const editBtn = document.createElement('a');
        editBtn.className = 'btn btn-primary mx-1';
        editBtn.innerHTML = '<i class="fa fa-edit"></i>';
        editBtn.href = `./product.html?name=${encodeURIComponent(product.name)}`;

        actionCell.append(deleteBtn, editBtn);
    });
}