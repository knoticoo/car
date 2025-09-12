// Parts Component for Mitsubishi ASX 2011
// Handles parts catalog and ordering

import { partsCatalog, suppliers } from '../data/partsCatalog.js';
import { searchItems, filterByCategory, formatCurrency } from '../utils/helpers.js';

export class PartsComponent {
    constructor() {
        this.container = null;
        this.currentFilter = '';
        this.currentCategory = '';
        this.cart = this.loadCart();
        this.allParts = this.getAllParts();
    }

    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Parts container not found');
            return;
        }

        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('parts-search');
        const categorySelect = document.getElementById('parts-category');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilter = e.target.value;
                this.render();
            });
        }

        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.currentCategory = e.target.value;
                this.render();
            });
        }
    }

    getAllParts() {
        let allParts = [];
        Object.keys(partsCatalog).forEach(category => {
            partsCatalog[category].forEach(part => {
                allParts.push({...part, category});
            });
        });
        return allParts;
    }

    getFilteredParts() {
        let filtered = this.allParts;

        // Filter by search term
        if (this.currentFilter) {
            filtered = searchItems(filtered, this.currentFilter, ['name', 'partNumber', 'description', 'supplier']);
        }

        // Filter by category
        if (this.currentCategory) {
            filtered = filterByCategory(filtered, this.currentCategory);
        }

        return filtered;
    }

    render() {
        const filteredParts = this.getFilteredParts();
        
        if (filteredParts.length === 0) {
            this.container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>Запчасти не найдены</h3>
                    <p>Попробуйте изменить поисковый запрос или категорию</p>
                </div>
            `;
            return;
        }

        this.container.innerHTML = `
            <div class="parts-grid">
                ${filteredParts.map(part => this.renderPartCard(part)).join('')}
            </div>
        `;
    }

    renderPartCard(part) {
        const difficultyClass = part.difficulty.toLowerCase();
        const inStockClass = part.inStock ? 'in-stock' : 'out-of-stock';
        
        return `
            <div class="part-card ${inStockClass}">
                <div class="part-header">
                    <i class="${part.icon}"></i>
                    <h4>${part.name}</h4>
                    <span class="stock-status ${inStockClass}">
                        ${part.inStock ? 'В наличии' : 'Нет в наличии'}
                    </span>
                </div>
                
                <div class="part-details">
                    <p class="part-number">Артикул: ${part.partNumber}</p>
                    <p class="supplier">Поставщик: ${part.supplier}</p>
                    <p class="description">${part.description}</p>
                    
                    <div class="part-info">
                        <span class="difficulty ${difficultyClass}">
                            <i class="fas fa-wrench"></i>
                            ${part.difficulty}
                        </span>
                        <span class="time">
                            <i class="fas fa-clock"></i>
                            ${part.time}
                        </span>
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            ${part.rating}/5
                        </span>
                    </div>
                    
                    <div class="part-price">
                        <span class="price">${formatCurrency(part.price, part.currency)}</span>
                        <button 
                            class="add-to-cart-btn" 
                            onclick="window.partsComponent.addToCart('${part.partNumber}')"
                            ${!part.inStock ? 'disabled' : ''}
                        >
                            <i class="fas fa-cart-plus"></i>
                            ${part.inStock ? 'В корзину' : 'Нет в наличии'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addToCart(partNumber) {
        const part = this.allParts.find(p => p.partNumber === partNumber);
        if (!part) return;

        if (!part.inStock) {
            this.showNotification('Запчасть недоступна', 'warning');
            return;
        }

        if (!this.cart.find(item => item.partNumber === partNumber)) {
            this.cart.push({
                partNumber: part.partNumber,
                name: part.name,
                price: part.price,
                currency: part.currency,
                supplier: part.supplier,
                quantity: 1
            });
            this.saveCart();
            this.showNotification('Запчасть добавлена в корзину', 'success');
            this.updateCartDisplay();
        } else {
            this.showNotification('Запчасть уже в корзине', 'warning');
        }
    }

    removeFromCart(partNumber) {
        this.cart = this.cart.filter(item => item.partNumber !== partNumber);
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Запчасть удалена из корзины', 'info');
    }

    updateCartQuantity(partNumber, quantity) {
        const item = this.cart.find(item => item.partNumber === partNumber);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(partNumber);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    loadCart() {
        const saved = localStorage.getItem('asx_parts_cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('asx_parts_cart', JSON.stringify(this.cart));
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    renderCart() {
        if (this.cart.length === 0) {
            return `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Корзина пуста</h3>
                    <p>Добавьте запчасти для заказа</p>
                </div>
            `;
        }

        return `
            <div class="cart-items">
                <h3>Корзина (${this.cart.length} товаров)</h3>
                ${this.cart.map(item => this.renderCartItem(item)).join('')}
                <div class="cart-total">
                    <strong>Итого: ${formatCurrency(this.getCartTotal())}</strong>
                </div>
                <div class="cart-actions">
                    <button class="btn btn-primary" onclick="window.partsComponent.checkout()">
                        <i class="fas fa-credit-card"></i>
                        Оформить заказ
                    </button>
                    <button class="btn btn-secondary" onclick="window.partsComponent.clearCart()">
                        <i class="fas fa-trash"></i>
                        Очистить корзину
                    </button>
                </div>
            </div>
        `;
    }

    renderCartItem(item) {
        return `
            <div class="cart-item">
                <div class="item-info">
                    <h5>${item.name}</h5>
                    <p>Артикул: ${item.partNumber}</p>
                    <p>Поставщик: ${item.supplier}</p>
                </div>
                <div class="item-controls">
                    <div class="quantity-controls">
                        <button onclick="window.partsComponent.updateCartQuantity('${item.partNumber}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="window.partsComponent.updateCartQuantity('${item.partNumber}', ${item.quantity + 1})">+</button>
                    </div>
                    <div class="item-price">
                        ${formatCurrency(item.price * item.quantity, item.currency)}
                    </div>
                    <button class="remove-btn" onclick="window.partsComponent.removeFromCart('${item.partNumber}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Корзина пуста', 'warning');
            return;
        }

        // Group by supplier
        const ordersBySupplier = {};
        this.cart.forEach(item => {
            if (!ordersBySupplier[item.supplier]) {
                ordersBySupplier[item.supplier] = [];
            }
            ordersBySupplier[item.supplier].push(item);
        });

        // Generate order summary
        let orderSummary = 'Сводка заказа:\n\n';
        Object.keys(ordersBySupplier).forEach(supplier => {
            const supplier = suppliers[supplier];
            orderSummary += `Поставщик: ${supplier.name}\n`;
            orderSummary += `Адрес: ${supplier.address}\n`;
            orderSummary += `Телефон: ${supplier.phone}\n`;
            orderSummary += `Email: ${supplier.email}\n\n`;
            
            orderSummary += 'Запчасти:\n';
            ordersBySupplier[supplier].forEach(item => {
                orderSummary += `- ${item.name} (${item.partNumber}) x${item.quantity} = ${formatCurrency(item.price * item.quantity, item.currency)}\n`;
            });
            
            const supplierTotal = ordersBySupplier[supplier].reduce((sum, item) => sum + (item.price * item.quantity), 0);
            orderSummary += `Итого: ${formatCurrency(supplierTotal)}\n\n`;
        });

        // Copy to clipboard or show modal
        if (navigator.clipboard) {
            navigator.clipboard.writeText(orderSummary).then(() => {
                this.showNotification('Сводка заказа скопирована в буфер обмена', 'success');
            });
        } else {
            alert(orderSummary);
        }
    }

    clearCart() {
        if (confirm('Очистить корзину?')) {
            this.cart = [];
            this.saveCart();
            this.updateCartDisplay();
            this.showNotification('Корзина очищена', 'info');
        }
    }

    showNotification(message, type) {
        // This would use the notification manager
        console.log(`${type.toUpperCase()}: ${message}`);
    }

    // Method to get parts by category
    getPartsByCategory(category) {
        return this.allParts.filter(part => part.category === category);
    }

    // Method to get parts by supplier
    getPartsBySupplier(supplier) {
        return this.allParts.filter(part => part.supplier === supplier);
    }

    // Method to search parts
    searchParts(query) {
        this.currentFilter = query;
        const searchInput = document.getElementById('parts-search');
        if (searchInput) {
            searchInput.value = query;
        }
        this.render();
    }
}