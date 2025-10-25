const PRODUCTS_KEY = 'EmprendedorProductos';

// DOM Elements
const productForm = {
    nombre: document.querySelector('.producto-nombre'),
    categoria: document.querySelector('.producto-categoria'),
    precio: document.querySelector('.producto-precio'),
    imagen: document.querySelector('.producto-imagen'),
    descripcion: document.querySelector('.producto-descripcion'),
    btnGuardar: document.querySelector('.btn-guardar'),
    btnActualizar: document.querySelector('.btn-actualizar'),
    lista: document.querySelector('.productos-lista')
};

// Event Listeners
productForm.btnGuardar.addEventListener('click', saveProduct);
document.addEventListener('DOMContentLoaded', loadProducts);

// Save Product
function saveProduct() {
    const product = validateForm();
    if (product) {
        const products = getProducts();
        products.push(product);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        clearForm();
        refreshProductList();
        showNotification('Producto guardado exitosamente', 'success');
    }
}

// Form Validation
function validateForm() {
    if (!productForm.nombre.value || !productForm.categoria.value || 
        !productForm.precio.value || !productForm.imagen.value) {
        showNotification('Todos los campos son requeridos', 'error');
        return null;
    }

    return {
        nombre: productForm.nombre.value,
        categoria: productForm.categoria.value,
        precio: productForm.precio.value,
        imagen: productForm.imagen.value,
        descripcion: productForm.descripcion.value
    };
}

// Load Products
function loadProducts() {
    refreshProductList();
}

// Get Products from localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
}

// Refresh Products List
function refreshProductList() {
    const products = getProducts();
    productForm.lista.innerHTML = '';
    
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">${index + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">${product.nombre}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">${product.categoria}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">$${product.precio}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <img src="${product.imagen}" alt="${product.nombre}" class="h-10 w-10 rounded-full object-cover"/>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="editProduct(${index})" class="text-secondary hover:text-secondary-600 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteProduct(${index})" class="text-error hover:text-error-600">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        productForm.lista.appendChild(row);
    });
}

// Edit Product
function editProduct(index) {
    const products = getProducts();
    const product = products[index];
    
    productForm.nombre.value = product.nombre;
    productForm.categoria.value = product.categoria;
    productForm.precio.value = product.precio;
    productForm.imagen.value = product.imagen;
    productForm.descripcion.value = product.descripcion;
    
    productForm.btnGuardar.classList.add('hidden');
    productForm.btnActualizar.classList.remove('hidden');
    
    productForm.btnActualizar.onclick = () => updateProduct(index);
}

// Update Product
function updateProduct(index) {
    const product = validateForm();
    if (product) {
        const products = getProducts();
        products[index] = product;
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        
        clearForm();
        refreshProductList();
        productForm.btnActualizar.classList.add('hidden');
        productForm.btnGuardar.classList.remove('hidden');
        showNotification('Producto actualizado exitosamente', 'success');
    }
}

// Delete Product
function deleteProduct(index) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        const products = getProducts();
        products.splice(index, 1);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        refreshProductList();
        showNotification('Producto eliminado exitosamente', 'warning');
    }
}

// Clear Form
function clearForm() {
    productForm.nombre.value = '';
    productForm.categoria.value = '';
    productForm.precio.value = '';
    productForm.imagen.value = '';
    productForm.descripcion.value = '';
}

// Show Notification
function showNotification(message) {
    // Implement your notification system here
    alert(message);
}