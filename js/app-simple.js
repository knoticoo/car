// Simplified Main Application File for Mitsubishi ASX 2011 Helper
// Basic functionality with working database integration

class MitsubishiASXApp {
    constructor() {
        this.currentSection = 'home';
        this.errorCodes = null;
        this.partsCatalog = null;
        this.suppliers = null;
        this.init();
    }

    async init() {
        console.log('Initializing Mitsubishi ASX 2011 Helper App...');
        
        // Load data
        await this.loadData();
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('App initialization complete');
    }

    async loadData() {
        try {
            // Load error codes
            const errorCodesModule = await import('./data/errorCodes.js');
            this.errorCodes = errorCodesModule.errorCodes;
            console.log('Error codes loaded:', Object.keys(this.errorCodes).length, 'categories');

            // Load parts catalog
            const partsModule = await import('./data/partsCatalog.js');
            this.partsCatalog = partsModule.partsCatalog;
            this.suppliers = partsModule.suppliers;
            console.log('Parts catalog loaded:', Object.keys(this.partsCatalog).length, 'categories');
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    setupEventListeners() {
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        console.log('Found nav links:', navLinks.length);
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                console.log('Nav link clicked:', targetSection);
                this.showSection(targetSection);
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Quick action cards
        const actionCards = document.querySelectorAll('.action-card');
        console.log('Found action cards:', actionCards.length);
        
        actionCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const onclickAttr = card.getAttribute('onclick');
                if (onclickAttr) {
                    const match = onclickAttr.match(/showSection\('([^']+)'\)/);
                    if (match) {
                        const targetSection = match[1];
                        console.log('Action card clicked:', targetSection);
                        this.showSection(targetSection);
                    }
                }
            });
        });

        // Back to top button
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                this.scrollToTop();
            });
        }

        // Scroll events
        window.addEventListener('scroll', () => {
            this.updateBackToTopButton();
        });
    }

    showSection(sectionId) {
        console.log('Showing section:', sectionId);
        
        // Hide all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            console.log('Section shown successfully:', sectionId);
        } else {
            console.error('Section not found:', sectionId);
        }

        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active');
            }
        });

        // Load section-specific content
        this.loadSectionContent(sectionId);

        // Scroll to top
        this.scrollToTop();
    }

    loadSectionContent(sectionId) {
        console.log('Loading content for section:', sectionId);
        
        switch(sectionId) {
            case 'error-codes':
                this.loadErrorCodes();
                break;
            case 'troubleshooting':
                this.loadTroubleshooting();
                break;
            case 'parts':
                this.loadParts();
                break;
            case 'maintenance':
                this.loadMaintenance();
                break;
            case 'repairs':
                this.loadRepairs();
                break;
        }
    }

    loadErrorCodes() {
        const container = document.getElementById('error-codes-list');
        if (!container) return;

        if (!this.errorCodes) {
            container.innerHTML = `
                <div class="loading-message">
                    <h3>Коды ошибок</h3>
                    <p>Загрузка данных о кодах ошибок...</p>
                </div>
            `;
            return;
        }

        let html = '<div class="error-codes-container">';
        
        // Get search and filter values
        const searchTerm = document.getElementById('error-search')?.value?.toLowerCase() || '';
        const categoryFilter = document.getElementById('error-category')?.value || '';

        // Flatten all error codes
        let allErrorCodes = [];
        Object.keys(this.errorCodes).forEach(category => {
            if (!categoryFilter || category === categoryFilter) {
                this.errorCodes[category].forEach(errorCode => {
                    allErrorCodes.push({...errorCode, category});
                });
            }
        });

        // Filter by search term
        if (searchTerm) {
            allErrorCodes = allErrorCodes.filter(errorCode => 
                errorCode.code.toLowerCase().includes(searchTerm) ||
                errorCode.title.toLowerCase().includes(searchTerm) ||
                errorCode.description.toLowerCase().includes(searchTerm)
            );
        }

        // Display error codes
        allErrorCodes.forEach(errorCode => {
            html += `
                <div class="error-code-card" data-category="${errorCode.category}">
                    <div class="error-code-header">
                        <h3 class="error-code">${errorCode.code}</h3>
                        <span class="severity ${errorCode.severity}">${errorCode.severity === 'high' ? 'Высокая' : errorCode.severity === 'medium' ? 'Средняя' : 'Низкая'}</span>
                    </div>
                    <h4 class="error-title">${errorCode.title}</h4>
                    <p class="error-description">${errorCode.description}</p>
                    
                    <div class="error-details">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Время: ${errorCode.time}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-tools"></i>
                            <span>Сложность: ${errorCode.difficulty}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-euro-sign"></i>
                            <span>Стоимость: ${errorCode.cost}</span>
                        </div>
                    </div>

                    <div class="error-symptoms">
                        <h5>Симптомы:</h5>
                        <ul>
                            ${errorCode.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="error-solutions">
                        <h5>Решения:</h5>
                        <ol>
                            ${errorCode.solutions.map(solution => `<li>${solution}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        if (allErrorCodes.length === 0) {
            html = '<div class="no-results"><p>Коды ошибок не найдены</p></div>';
        }

        container.innerHTML = html;

        // Add search functionality
        this.setupErrorCodeSearch();
    }

    loadTroubleshooting() {
        const container = document.getElementById('troubleshooting-content');
        if (container && container.innerHTML.trim() === '') {
            container.innerHTML = `
                <div class="loading-message">
                    <h3>Диагностика проблем</h3>
                    <p>Загрузка данных диагностики...</p>
                    <p>Эта функция будет доступна после полной загрузки модулей.</p>
                </div>
            `;
        }
    }

    loadParts() {
        const container = document.getElementById('parts-grid');
        if (!container) return;

        if (!this.partsCatalog) {
            container.innerHTML = `
                <div class="loading-message">
                    <h3>Каталог запчастей</h3>
                    <p>Загрузка каталога запчастей...</p>
                </div>
            `;
            return;
        }

        let html = '<div class="parts-container">';
        
        // Get search and filter values
        const searchTerm = document.getElementById('parts-search')?.value?.toLowerCase() || '';
        const categoryFilter = document.getElementById('parts-category')?.value || '';

        // Flatten all parts
        let allParts = [];
        Object.keys(this.partsCatalog).forEach(category => {
            if (!categoryFilter || category === categoryFilter) {
                this.partsCatalog[category].forEach(part => {
                    allParts.push({...part, category});
                });
            }
        });

        // Filter by search term
        if (searchTerm) {
            allParts = allParts.filter(part => 
                part.name.toLowerCase().includes(searchTerm) ||
                part.partNumber.toLowerCase().includes(searchTerm) ||
                part.description.toLowerCase().includes(searchTerm) ||
                part.supplier.toLowerCase().includes(searchTerm)
            );
        }

        // Display parts
        allParts.forEach(part => {
            const stockStatus = part.inStock ? 'В наличии' : 'Нет в наличии';
            const stockClass = part.inStock ? 'in-stock' : 'out-of-stock';
            
            html += `
                <div class="part-card" data-category="${part.category}">
                    <div class="part-header">
                        <h3 class="part-name">${part.name}</h3>
                        <span class="stock-status ${stockClass}">${stockStatus}</span>
                    </div>
                    
                    <div class="part-details">
                        <div class="part-number">
                            <strong>Артикул:</strong> ${part.partNumber}
                        </div>
                        <div class="part-supplier">
                            <strong>Поставщик:</strong> ${part.supplier}
                        </div>
                        <div class="part-description">
                            ${part.description}
                        </div>
                    </div>

                    <div class="part-pricing">
                        <div class="price">
                            <span class="price-value">${part.price.toFixed(2)}</span>
                            <span class="currency">${part.currency}</span>
                        </div>
                        <div class="rating">
                            <div class="stars">
                                ${'★'.repeat(Math.floor(part.rating))}${'☆'.repeat(5 - Math.floor(part.rating))}
                            </div>
                            <span class="rating-value">${part.rating}/5</span>
                        </div>
                    </div>

                    <div class="part-info">
                        <div class="info-item">
                            <i class="fas fa-tools"></i>
                            <span>Сложность: ${part.difficulty}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <span>Время: ${part.time}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-tag"></i>
                            <span>Категория: ${this.getCategoryName(part.category)}</span>
                        </div>
                    </div>

                    <div class="part-actions">
                        <button class="btn btn-primary" onclick="app.showPartDetails('${part.partNumber}')">
                            <i class="fas fa-info-circle"></i> Подробнее
                        </button>
                        <button class="btn btn-secondary" onclick="app.comparePrices('${part.partNumber}')">
                            <i class="fas fa-balance-scale"></i> Сравнить цены
                        </button>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        if (allParts.length === 0) {
            html = '<div class="no-results"><p>Запчасти не найдены</p></div>';
        }

        container.innerHTML = html;

        // Add search functionality
        this.setupPartsSearch();
    }

    loadMaintenance() {
        console.log('Loading maintenance content...');
    }

    loadRepairs() {
        const content = document.getElementById('repair-content');
        if (content && content.innerHTML.trim() === '') {
            content.innerHTML = `
                <div class="loading-message">
                    <h3>Инструкции по ремонту</h3>
                    <p>Загрузка инструкций по ремонту...</p>
                    <p>Эта функция будет доступна после полной загрузки модулей.</p>
                </div>
            `;
        }
    }

    toggleTheme() {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    updateBackToTopButton() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;
        
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Helper methods
    getCategoryName(category) {
        const categoryNames = {
            'engine': 'Двигатель',
            'brakes': 'Тормоза',
            'suspension': 'Подвеска',
            'electrical': 'Электрика',
            'transmission': 'Трансмиссия',
            'body': 'Кузов',
            'interior': 'Салон',
            'exhaust': 'Выхлопная система',
            'cooling': 'Охлаждение'
        };
        return categoryNames[category] || category;
    }

    setupErrorCodeSearch() {
        const searchInput = document.getElementById('error-search');
        const categorySelect = document.getElementById('error-category');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.loadErrorCodes();
            });
        }
        
        if (categorySelect) {
            categorySelect.addEventListener('change', () => {
                this.loadErrorCodes();
            });
        }
    }

    setupPartsSearch() {
        const searchInput = document.getElementById('parts-search');
        const categorySelect = document.getElementById('parts-category');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.loadParts();
            });
        }
        
        if (categorySelect) {
            categorySelect.addEventListener('change', () => {
                this.loadParts();
            });
        }
    }

    // Public methods for part actions
    showPartDetails(partNumber) {
        if (!this.partsCatalog) return;
        
        // Find the part
        let foundPart = null;
        Object.values(this.partsCatalog).forEach(categoryParts => {
            const part = categoryParts.find(p => p.partNumber === partNumber);
            if (part) foundPart = part;
        });

        if (foundPart) {
            alert(`Детали запчасти:\n\nНазвание: ${foundPart.name}\nАртикул: ${foundPart.partNumber}\nЦена: ${foundPart.price} ${foundPart.currency}\nПоставщик: ${foundPart.supplier}\nОписание: ${foundPart.description}`);
        }
    }

    comparePrices(partNumber) {
        alert(`Функция сравнения цен для ${partNumber} будет доступна в следующей версии.`);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing simple app...');
    window.app = new MitsubishiASXApp();
    
    // Make showSection globally available for onclick handlers
    window.showSection = (sectionId) => {
        if (window.app) {
            window.app.showSection(sectionId);
        }
    };
});

// Export for global access
export default MitsubishiASXApp;