// Parts Component for Mitsubishi ASX 2011
// Handles parts catalog and ordering with real-time pricing

import { partsCatalog, suppliers } from '../data/partsCatalog.js';
import { searchItems, filterByCategory, formatCurrency } from '../utils/helpers.js';
import PriceScraper from '../services/priceScraper.js';

export class PartsComponent {
    constructor() {
        this.container = null;
        this.currentFilter = '';
        this.currentCategory = '';
        this.cart = this.loadCart();
        this.allParts = this.getAllParts();
        this.priceScraper = new PriceScraper();
        this.realTimePrices = new Map();
        this.isLoadingPrices = false;
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
            <div class="parts-controls">
                <button class="btn btn-primary" onclick="window.partsComponent.loadRealTimePrices()" ${this.isLoadingPrices ? 'disabled' : ''}>
                    <i class="fas fa-sync-alt ${this.isLoadingPrices ? 'fa-spin' : ''}"></i>
                    ${this.isLoadingPrices ? 'Загрузка...' : 'Загрузить актуальные цены'}
                </button>
                <button class="btn btn-secondary" onclick="window.partsComponent.refreshAllPrices()">
                    <i class="fas fa-refresh"></i>
                    Обновить все цены
                </button>
            </div>
            <div class="parts-grid">
                ${filteredParts.map(part => this.renderPartCard(part)).join('')}
            </div>
        `;
    }

    renderPartCard(part) {
        const difficultyClass = part.difficulty.toLowerCase();
        const inStockClass = part.inStock ? 'in-stock' : 'out-of-stock';
        const realTimePrice = this.realTimePrices.get(part.partNumber);
        const hasRealTimePrice = realTimePrice && realTimePrice.prices && realTimePrice.prices.length > 0;
        
        // Get best price from real-time data or use fallback
        const bestPrice = hasRealTimePrice ? 
            realTimePrice.prices.reduce((best, current) => current.price < best.price ? current : best) : 
            null;
        
        const displayPrice = bestPrice ? bestPrice.price : part.price;
        const displaySupplier = bestPrice ? bestPrice.supplier : part.supplier;
        const supplierInfo = bestPrice ? bestPrice.supplierInfo : suppliers[part.supplier];
        
        return `
            <div class="part-card ${inStockClass}">
                <div class="part-header">
                    <i class="${part.icon}"></i>
                    <h4>${part.name}</h4>
                    <span class="stock-status ${inStockClass}">
                        ${part.inStock ? 'В наличии' : 'Нет в наличии'}
                    </span>
                    ${hasRealTimePrice ? '<span class="real-time-badge"><i class="fas fa-sync-alt"></i> Актуальная цена</span>' : ''}
                </div>
                
                <div class="part-details">
                    <p class="part-number">Артикул: ${part.partNumber}</p>
                    <p class="supplier">Поставщик: ${displaySupplier}</p>
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
                        <div class="price-container">
                            <span class="price">${formatCurrency(displayPrice, part.currency)}</span>
                            ${bestPrice && bestPrice.originalPrice && bestPrice.originalPrice > displayPrice ? 
                                `<span class="original-price">${formatCurrency(bestPrice.originalPrice, part.currency)}</span>` : ''}
                            ${bestPrice && bestPrice.discount > 0 ? 
                                `<span class="discount">-${bestPrice.discount}%</span>` : ''}
                        </div>
                        
                        <div class="price-actions">
                            <button 
                                class="add-to-cart-btn" 
                                onclick="window.partsComponent.addToCart('${part.partNumber}')"
                                ${!part.inStock ? 'disabled' : ''}
                            >
                                <i class="fas fa-cart-plus"></i>
                                ${part.inStock ? 'В корзину' : 'Нет в наличии'}
                            </button>
                            
                            ${supplierInfo && supplierInfo.website ? `
                                <button 
                                    class="visit-supplier-btn" 
                                    onclick="window.partsComponent.visitSupplier('${part.partNumber}', '${displaySupplier}')"
                                    title="Перейти на сайт поставщика"
                                >
                                    <i class="fas fa-external-link-alt"></i>
                                    Купить
                                </button>
                            ` : ''}
                            
                            <button 
                                class="compare-prices-btn" 
                                onclick="window.partsComponent.comparePrices('${part.partNumber}', '${part.name}')"
                                title="Сравнить цены"
                            >
                                <i class="fas fa-balance-scale"></i>
                                Сравнить
                            </button>
                        </div>
                    </div>
                    
                    ${hasRealTimePrice && realTimePrice.prices.length > 1 ? `
                        <div class="price-alternatives">
                            <small>Другие поставщики:</small>
                            ${realTimePrice.prices.slice(1, 4).map(price => `
                                <span class="alt-price" onclick="window.partsComponent.visitSupplier('${part.partNumber}', '${price.supplier}')">
                                    ${price.supplier}: ${formatCurrency(price.price, part.currency)}
                                </span>
                            `).join('')}
                        </div>
                    ` : ''}
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

    // Real-time pricing methods
    async loadRealTimePrices() {
        if (this.isLoadingPrices) return;
        
        this.isLoadingPrices = true;
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'price-loading';
        loadingIndicator.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Загрузка актуальных цен...';
        this.container.appendChild(loadingIndicator);

        try {
            const filteredParts = this.getFilteredParts();
            const promises = filteredParts.slice(0, 10).map(part => 
                this.priceScraper.scrapePartPrice(part.partNumber, part.name)
            );

            const results = await Promise.allSettled(promises);
            
            results.forEach((result, index) => {
                if (result.status === 'fulfilled' && result.value) {
                    this.realTimePrices.set(filteredParts[index].partNumber, result.value);
                }
            });

            this.render(); // Re-render with updated prices
        } catch (error) {
            console.error('Error loading real-time prices:', error);
        } finally {
            this.isLoadingPrices = false;
            if (loadingIndicator.parentNode) {
                loadingIndicator.parentNode.removeChild(loadingIndicator);
            }
        }
    }

    async comparePrices(partNumber, partName) {
        try {
            const comparison = await this.priceScraper.comparePrices(partNumber, partName);
            
            if (comparison.prices.length === 0) {
                this.showNotification('Цены не найдены', 'warning');
                return;
            }

            // Show price comparison modal
            this.showPriceComparisonModal(comparison);
        } catch (error) {
            console.error('Error comparing prices:', error);
            this.showNotification('Ошибка при сравнении цен', 'error');
        }
    }

    showPriceComparisonModal(comparison) {
        const modal = document.createElement('div');
        modal.className = 'price-comparison-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Сравнение цен: ${comparison.partName}</h3>
                    <button class="close-modal" onclick="this.closest('.price-comparison-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="price-comparison">
                        ${comparison.prices.map((price, index) => `
                            <div class="price-option ${index === 0 ? 'best-price' : ''}">
                                <div class="supplier-info">
                                    <h4>${price.supplier}</h4>
                                    <p class="supplier-address">${price.supplierInfo.address}</p>
                                    <p class="supplier-phone">${price.supplierInfo.phone}</p>
                                </div>
                                <div class="price-info">
                                    <div class="price-value">${formatCurrency(price.price, 'EUR')}</div>
                                    <div class="delivery-time">Доставка: ${price.deliveryTime}</div>
                                    <div class="availability ${price.availability ? 'available' : 'unavailable'}">
                                        ${price.availability ? 'В наличии' : 'Нет в наличии'}
                                    </div>
                                </div>
                                <div class="price-actions">
                                    <button class="btn btn-primary" onclick="window.partsComponent.visitSupplier('${comparison.partNumber}', '${price.supplier}')">
                                        <i class="fas fa-external-link-alt"></i>
                                        Перейти к покупке
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="comparison-summary">
                        <p><strong>Средняя цена:</strong> ${formatCurrency(comparison.averagePrice, 'EUR')}</p>
                        <p><strong>Экономия:</strong> ${formatCurrency(comparison.mostExpensive.price - comparison.cheapest.price, 'EUR')}</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    visitSupplier(partNumber, supplierName) {
        const supplier = this.priceScraper.suppliers[supplierName];
        if (!supplier) {
            this.showNotification('Информация о поставщике не найдена', 'error');
            return;
        }

        // Open supplier website with part search
        const searchUrl = `${supplier.searchUrl}${encodeURIComponent(partNumber)}`;
        window.open(searchUrl, '_blank');
        
        this.showNotification(`Переход на сайт ${supplier.name}`, 'info');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Method to refresh all prices
    async refreshAllPrices() {
        this.realTimePrices.clear();
        await this.loadRealTimePrices();
    }
}