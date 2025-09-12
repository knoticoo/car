// Main Application File for Mitsubishi ASX 2011 Helper
// Modular application structure

import { ErrorCodesComponent } from './components/errorCodes.js';
import { isMobileDevice, storage, notificationManager } from './utils/helpers.js';

class MitsubishiASXApp {
    constructor() {
        this.currentSection = 'home';
        this.isMobile = false;
        this.components = {};
        this.init();
    }

    init() {
        console.log('Initializing Mitsubishi ASX 2011 Helper App...');
        
        // Check if mobile
        this.isMobile = isMobileDevice();
        
        // Initialize components
        this.initializeComponents();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup mobile features
        this.setupMobileFeatures();
        
        // Load initial data
        this.loadInitialData();
        
        console.log('App initialization complete');
    }

    initializeComponents() {
        // Initialize Error Codes Component
        this.components.errorCodes = new ErrorCodesComponent();
        this.components.errorCodes.init('error-codes-list');
    }

    setupEventListeners() {
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.showSection(targetSection);
                
                // Close mobile nav if open
                if (this.isMobile) {
                    this.toggleMobileNav(false);
                }
            });
        });

        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle) {
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileNav();
            });
        }

        // Quick action cards
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const section = card.onclick?.toString().match(/showSection\('([^']+)'\)/);
                if (section) {
                    this.showSection(section[1]);
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

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            const nav = document.querySelector('.nav');
            const navToggle = document.getElementById('nav-toggle');
            
            if (this.isMobile && nav && nav.classList.contains('mobile-open')) {
                if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                    this.toggleMobileNav(false);
                }
            }
        });
    }

    setupMobileFeatures() {
        if (this.isMobile) {
            document.body.classList.add('mobile');
            
            // Add swipe gestures for navigation
            this.setupSwipeGestures();
        } else {
            document.body.classList.remove('mobile');
            this.toggleMobileNav(false);
        }
    }

    setupSwipeGestures() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.navigateToNextSection();
                } else {
                    this.navigateToPreviousSection();
                }
            }
        });
    }

    showSection(sectionId) {
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
        switch(sectionId) {
            case 'error-codes':
                this.components.errorCodes.render();
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

    loadTroubleshooting() {
        const content = document.getElementById('troubleshooting-content');
        if (!content) return;

        content.innerHTML = `
            <div class="troubleshooting-intro">
                <h3>Диагностика проблем</h3>
                <p>Выберите категорию проблемы для получения пошаговой инструкции по диагностике и решению.</p>
            </div>
        `;
    }

    loadParts() {
        const container = document.getElementById('parts-grid');
        if (!container) return;

        container.innerHTML = `
            <div class="parts-intro">
                <h3>Каталог запчастей</h3>
                <p>Поиск и заказ запчастей для Mitsubishi ASX 2011 от проверенных поставщиков в Латвии.</p>
            </div>
        `;
    }

    loadMaintenance() {
        const container = document.querySelector('.maintenance-schedule');
        if (!container) return;

        container.innerHTML = `
            <h3>График обслуживания</h3>
            <p>Регулярное техническое обслуживание поможет поддерживать ваш автомобиль в отличном состоянии.</p>
        `;
    }

    loadRepairs() {
        const content = document.getElementById('repair-content');
        if (!content) return;

        content.innerHTML = `
            <div class="repairs-intro">
                <h3>Инструкции по ремонту</h3>
                <p>Подробные пошаговые инструкции по ремонту различных систем автомобиля.</p>
            </div>
        `;
    }

    loadInitialData() {
        // Load any initial data needed
        console.log('Loading initial data...');
    }

    toggleMobileNav(force = null) {
        const nav = document.querySelector('.nav');
        const navToggle = document.getElementById('nav-toggle');
        
        if (!nav || !navToggle) return;
        
        const isOpen = nav.classList.contains('mobile-open');
        const shouldOpen = force !== null ? force : !isOpen;
        
        if (shouldOpen) {
            nav.classList.add('mobile-open');
            navToggle.classList.add('active');
            navToggle.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden';
        } else {
            nav.classList.remove('mobile-open');
            navToggle.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    }

    navigateToNextSection() {
        const sections = ['home', 'error-codes', 'troubleshooting', 'maintenance', 'repairs', 'parts'];
        const currentIndex = sections.indexOf(this.currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        this.showSection(sections[nextIndex]);
    }

    navigateToPreviousSection() {
        const sections = ['home', 'error-codes', 'troubleshooting', 'maintenance', 'repairs', 'parts'];
        const currentIndex = sections.indexOf(this.currentSection);
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        this.showSection(sections[prevIndex]);
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

    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = isMobileDevice();
        
        if (wasMobile !== this.isMobile) {
            this.setupMobileFeatures();
        }
    }

    // Public API methods
    searchErrorCode(code) {
        if (this.components.errorCodes) {
            this.showSection('error-codes');
            this.components.errorCodes.searchCode(code);
        }
    }

    getErrorCode(code) {
        if (this.components.errorCodes) {
            return this.components.errorCodes.getErrorCode(code);
        }
        return null;
    }

    showNotification(message, type = 'info') {
        notificationManager.show(message, type);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MitsubishiASXApp();
});

// Export for global access
export default MitsubishiASXApp;