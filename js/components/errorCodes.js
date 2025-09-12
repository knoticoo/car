// Error Codes Component for Mitsubishi ASX 2011
// Handles display and filtering of error codes

import { errorCodes } from '../data/errorCodes.js';
import { searchItems, filterByCategory, getDifficultyClass, getSeverityClass } from '../utils/helpers.js';

export class ErrorCodesComponent {
    constructor() {
        this.container = null;
        this.currentFilter = '';
        this.currentCategory = '';
        this.allCodes = this.getAllCodes();
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
}