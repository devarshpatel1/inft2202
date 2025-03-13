/*
 *  Service Instance Export
 */
export default new ProductService({
    host: 'https://inft2202-server.onrender.com/',
    //host: 'http://localhost:3091',
    user: '100943425'
});

/*
 *  Constructor Function
 */
function ProductService({ host, user }) {
    this.host = host;
    this.headers = new Headers({
        'Content-Type': 'application/json',
        user
    });
}

/*
 *  Get All Products
 */
ProductService.prototype.getProducts = async function() {
    try {
        const res = await fetch(new URL(`/api/products`, this.host), {
            headers: this.headers,
            method: 'GET',
        });
        return res.json();
    } catch (err) {
        throw new Error('Failed to fetch products');
    }
}


//  Get Single Product by Name
ProductService.prototype.findProduct = async function(name) {
   try {
       const res = await fetch(new URL(`/api/products/${encodeURIComponent(name)}`, this.host), {
           headers: this.headers,
           method: 'GET',
       });
       if (!res.ok) throw new Error('Product not found');
       return res.json();
   } catch (err) {
       throw new Error('Failed to fetch product');
   }
}

/*
*  Update Existing Product
*/
ProductService.prototype.updateProduct = async function(name, product) {
   try {
       const res = await fetch(new URL(`/api/products/${encodeURIComponent(name)}`, this.host), {
           headers: this.headers,
           method: 'PUT',
           body: JSON.stringify(product)
       });
       if (!res.ok) throw new Error('Failed to update product');
       return res.json();
   } catch (err) {
       throw new Error(err.message || 'Failed to update product');
   }
}



/*
 *  Get Paginated Products
 */
ProductService.prototype.getProductPage = async function({ page = 1, perPage = 15 }) 
{
    const params = new URLSearchParams({ page, perPage });
    const url = new URL(`/api/products?${params.toString()}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        return false;
    }
}

    

/*
 *  Create New Product
 */
ProductService.prototype.saveProduct = async function(product) {
    try {
        const res = await fetch(new URL('/api/products', this.host), {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(product)
        });
        if (!res.ok) throw new Error('Failed to create product');
        return res.json();
    } catch (err) {
        throw new Error(err.message || 'Failed to save product');
    }
}

/*
 *  Delete Product
 */
ProductService.prototype.deleteProduct = async function(name) {
    try {
        const res = await fetch(new URL(`/api/products/${encodeURIComponent(name)}`, this.host), {
            headers: this.headers,
            method: 'DELETE',
        });
        if (res.status === 204) return true;
        throw new Error('Failed to delete product');
    } catch (err) {
        throw new Error(err.message || 'Failed to delete product');
    }
};