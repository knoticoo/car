// Error Codes Component for Mitsubishi ASX 2011
// Handles display and filtering of error codes

import { errorCodes } from '../data/errorCodes.js';
import { searchItems, filterByCategory, getDifficultyClass, getSeverityClass, formatCurrency } from '../utils/helpers.js';
import PriceScraper from '../services/priceScraper.js';

export class ErrorCodesComponent {
    constructor() {
        this.container = null;
        this.currentFilter = '';
        this.currentCategory = '';
        this.allCodes = this.getAllCodes();
        this.priceScraper = new PriceScraper();
        this.realTimePrices = new Map();
    }

    getAllCodes() {
        let allCodes = [];
        Object.keys(errorCodes).forEach(category => {
            errorCodes[category].forEach(code => {
                allCodes.push({...code, category});
            });
        });
        return allCodes;
    }

    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Error codes container not found');
            return;
        }

        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('error-search');
        const categorySelect = document.getElementById('error-category');

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

    getFilteredCodes() {
        let filtered = this.allCodes;

        // Filter by search term
        if (this.currentFilter) {
            filtered = searchItems(filtered, this.currentFilter, ['code', 'title', 'description']);
        }

        // Filter by category
        if (this.currentCategory) {
            filtered = filterByCategory(filtered, this.currentCategory);
        }

        return filtered;
    }

    render() {
        const filteredCodes = this.getFilteredCodes();
        
        if (filteredCodes.length === 0) {
            this.container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>Коды ошибок не найдены</h3>
                    <p>Попробуйте изменить поисковый запрос или категорию</p>
                </div>
            `;
            return;
        }

        this.container.innerHTML = filteredCodes.map(code => this.renderErrorCode(code)).join('');
    }

    renderErrorCode(code) {
        const difficultyClass = getDifficultyClass(code.difficulty);
        const severityClass = getSeverityClass(code.severity);
        
        return `
            <div class="error-code-item" data-code="${code.code}">
                <div class="error-code-header">
                    <div class="error-code-title">
                        <i class="${code.icon || 'fas fa-exclamation-triangle'}"></i>
                        <h3>${code.code} - ${code.title}</h3>
                        <span class="severity ${severityClass}">${this.getSeverityText(code.severity)}</span>
                    </div>
                </div>
                
                <div class="error-code-content">
                    <p class="description">${code.description}</p>
                    
                    <div class="symptoms">
                        <h4><i class="fas fa-exclamation-circle"></i> Симптомы:</h4>
                        <ul>
                            ${code.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="solutions">
                        <h4><i class="fas fa-tools"></i> Решения:</h4>
                        <ul>
                            ${code.solutions.map(solution => `<li>${solution}</li>`).join('')}
                        </ul>
                    </div>
                    
                    ${code.requiredParts && code.requiredParts.length > 0 ? `
                        <div class="required-parts">
                            <h4><i class="fas fa-shopping-cart"></i> Необходимые запчасти:</h4>
                            <div class="parts-list">
                                ${code.requiredParts.map(part => this.renderRequiredPart(part)).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${code.tools && code.tools.length > 0 ? `
                        <div class="required-tools">
                            <h4><i class="fas fa-toolbox"></i> Необходимые инструменты:</h4>
                            <div class="tools-list">
                                ${code.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="code-info">
                        <span class="difficulty ${difficultyClass}">
                            <i class="fas fa-wrench"></i>
                            Сложность: ${code.difficulty}
                        </span>
                        <span class="time">
                            <i class="fas fa-clock"></i>
                            Время: ${code.time}
                        </span>
                        <span class="cost">
                            <i class="fas fa-euro-sign"></i>
                            Стоимость: ${code.cost}
                        </span>
                        <span class="category">
                            <i class="fas fa-tag"></i>
                            ${this.getCategoryName(code.category)}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    getSeverityText(severity) {
        const severityMap = {
            'low': 'Низкая',
            'medium': 'Средняя',
            'high': 'Высокая',
            'critical': 'Критическая'
        };
        return severityMap[severity] || 'Средняя';
    }

    getCategoryName(category) {
        const categoryMap = {
            'engine': 'Двигатель',
            'transmission': 'Трансмиссия',
            'electrical': 'Электрика',
            'brakes': 'Тормоза',
            'suspension': 'Подвеска'
        };
        return categoryMap[category] || category;
    }

    // Method to highlight a specific error code
    highlightCode(code) {
        const element = this.container.querySelector(`[data-code="${code}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            element.style.backgroundColor = '#fff3cd';
            element.style.border = '2px solid #ffc107';
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                element.style.backgroundColor = '';
                element.style.border = '';
            }, 3000);
        }
    }

    // Method to search for a specific code
    searchCode(code) {
        this.currentFilter = code;
        const searchInput = document.getElementById('error-search');
        if (searchInput) {
            searchInput.value = code;
        }
        this.render();
        this.highlightCode(code);
    }

    // Method to get error code by code
    getErrorCode(code) {
        return this.allCodes.find(errorCode => errorCode.code === code);
    }

    // Method to get error codes by category
    getErrorCodesByCategory(category) {
        return this.allCodes.filter(errorCode => errorCode.category === category);
    }

    // Method to get error codes by severity
    getErrorCodesBySeverity(severity) {
        return this.allCodes.filter(errorCode => errorCode.severity === severity);
    }

    renderRequiredPart(part) {
        const necessityClass = part.necessity === 'required' ? 'required' : 
                              part.necessity === 'recommended' ? 'recommended' : 'optional';
        const necessityText = part.necessity === 'required' ? 'Обязательно' : 
                             part.necessity === 'recommended' ? 'Рекомендуется' : 'Возможно';
        
        // Escape quotes in part name and part number for onclick handlers
        const safePartName = part.name.replace(/'/g, "\\'");
        const safePartNumber = part.partNumber.replace(/'/g, "\\'");
        
        return `
            <div class="part-item ${necessityClass}">
                <div class="part-info">
                    <h5>${part.name}</h5>
                    <p class="part-number">Артикул: ${part.partNumber}</p>
                    <p class="part-description">${part.description}</p>
                    <span class="necessity-badge ${necessityClass}">${necessityText}</span>
                </div>
                <div class="part-price">
                    <span class="price">${formatCurrency(part.price, part.currency)}</span>
                    <div class="part-actions">
                        <button class="btn btn-sm btn-primary" onclick="window.errorCodesComponent.buyPart('${safePartNumber}', '${safePartName}')">
                            <i class="fas fa-shopping-cart"></i>
                            Купить
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="window.errorCodesComponent.comparePartPrices('${safePartNumber}', '${safePartName}')">
                            <i class="fas fa-balance-scale"></i>
                            Сравнить
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    async buyPart(partNumber, partName) {
        try {
            // Show loading notification
            this.showNotification('Поиск цен...', 'info');
            
            // Get real-time prices for the part
            const priceData = await this.priceScraper.scrapePartPrice(partNumber, partName);
            
            if (priceData && priceData.prices && priceData.prices.length > 0) {
                // Show price comparison modal
                this.showPartPurchaseModal(partNumber, partName, priceData);
            } else {
                // Fallback to parts catalog
                this.showNotification('Цены не найдены, переход в каталог запчастей', 'warning');
                this.redirectToPartsCatalog(partNumber);
            }
        } catch (error) {
            console.error('Error getting part prices:', error);
            this.showNotification('Ошибка при получении цен, переход в каталог запчастей', 'error');
            this.redirectToPartsCatalog(partNumber);
        }
    }

    async comparePartPrices(partNumber, partName) {
        try {
            // Show loading notification
            this.showNotification('Сравнение цен...', 'info');
            
            const comparison = await this.priceScraper.comparePrices(partNumber, partName);
            
            if (comparison && comparison.prices && comparison.prices.length > 0) {
                this.showPriceComparisonModal(partNumber, partName, comparison);
            } else {
                this.showNotification('Цены для сравнения не найдены', 'warning');
            }
        } catch (error) {
            console.error('Error comparing prices:', error);
            this.showNotification('Ошибка при сравнении цен', 'error');
        }
    }

    showPartPurchaseModal(partNumber, partName, priceData) {
        const modal = document.createElement('div');
        modal.className = 'part-purchase-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Покупка: ${partName}</h3>
                    <button class="close-modal" onclick="this.closest('.part-purchase-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="part-details">
                        <p><strong>Артикул:</strong> ${partNumber}</p>
                        <p><strong>Название:</strong> ${partName}</p>
                    </div>
                    <div class="suppliers-list">
                        <h4>Доступные поставщики:</h4>
                        ${priceData.prices.map((price, index) => `
                            <div class="supplier-option ${index === 0 ? 'best-price' : ''}">
                                <div class="supplier-info">
                                    <h5>${price.supplier}</h5>
                                    <p>${price.supplierInfo.address}</p>
                                    <p>${price.supplierInfo.phone}</p>
                                </div>
                                <div class="price-info">
                                    <div class="price">${formatCurrency(price.price, 'EUR')}</div>
                                    <div class="delivery">Доставка: ${price.deliveryTime}</div>
                                    <div class="availability ${price.availability ? 'available' : 'unavailable'}">
                                        ${price.availability ? 'В наличии' : 'Нет в наличии'}
                                    </div>
                                </div>
                                <div class="supplier-actions">
                                    <button class="btn btn-primary" onclick="window.errorCodesComponent.visitSupplier('${partNumber}', '${price.supplier}')">
                                        <i class="fas fa-external-link-alt"></i>
                                        Перейти к покупке
                                    </button>
                                </div>
                            </div>
                        `).join('')}
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

    showPriceComparisonModal(partNumber, partName, comparison) {
        const modal = document.createElement('div');
        modal.className = 'price-comparison-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Сравнение цен: ${partName}</h3>
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
                                    <button class="btn btn-primary" onclick="window.errorCodesComponent.visitSupplier('${partNumber}', '${price.supplier}')">
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

    redirectToPartsCatalog(partNumber) {
        // Switch to parts section and search for the part
        if (window.app && window.app.showSection) {
            window.app.showSection('parts');
            // Trigger search in parts section
            setTimeout(() => {
                const searchInput = document.getElementById('parts-search');
                if (searchInput) {
                    searchInput.value = partNumber;
                    searchInput.dispatchEvent(new Event('input'));
                }
            }, 500);
        }
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
}