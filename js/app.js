// Main Application File for Mitsubishi ASX 2011 Helper
// Modular application structure

import { ErrorCodesComponent } from './components/errorCodes.js';
import { TroubleshootingComponent } from './components/troubleshooting.js';
import { MaintenanceComponent } from './components/maintenance.js';
import { PartsComponent } from './components/parts.js';
import { isMobileDevice, storage, notificationManager } from './utils/helpers.js';
import CarAPI from './services/api.js';
import PartsScraper from './utils/scraper.js';

class MitsubishiASXApp {
    constructor() {
        this.currentSection = 'home';
        this.isMobile = false;
        this.components = {};
        this.api = CarAPI;
        this.scraper = PartsScraper;
        this.init();
    }

    async init() {
        console.log('Initializing Mitsubishi ASX 2011 Helper App...');
        
        // Check if mobile
        this.isMobile = isMobileDevice();
        
        // Initialize API
        try {
            await this.api.initialize();
            console.log('API initialized successfully');
        } catch (error) {
            console.error('Failed to initialize API:', error);
        }
        
        // Initialize components
        this.initializeComponents();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup mobile features
        this.setupMobileFeatures();
        
        // Load initial data
        await this.loadInitialData();
        
        console.log('App initialization complete');
    }

    initializeComponents() {
        // Initialize Error Codes Component
        this.components.errorCodes = new ErrorCodesComponent();
        this.components.errorCodes.init('error-codes-list');
        
        // Initialize Troubleshooting Component
        this.components.troubleshooting = new TroubleshootingComponent();
        this.components.troubleshooting.init('troubleshooting-content');
        
        // Initialize Maintenance Component
        this.components.maintenance = new MaintenanceComponent();
        this.components.maintenance.init('maintenance-schedule');
        
        // Initialize Parts Component
        this.components.parts = new PartsComponent();
        this.components.parts.init('parts-grid');
        
        // Make components globally accessible
        window.partsComponent = this.components.parts;
        window.errorCodesComponent = this.components.errorCodes;
    }

    setupEventListeners() {
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.showSection(targetSection);
                
                // Navigation handled by header links
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');

        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
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

        // Mobile navigation removed for PWA
    }

    toggleTheme() {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    setupMobileFeatures() {
        if (this.isMobile) {
            document.body.classList.add('mobile');
            
            // Add swipe gestures for navigation
            this.setupSwipeGestures();
        } else {
            document.body.classList.remove('mobile');
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
        if (this.components.troubleshooting) {
            this.components.troubleshooting.render();
        }
    }

    loadParts() {
        if (this.components.parts) {
            this.components.parts.render();
        }
    }

    loadMaintenance() {
        if (this.components.maintenance) {
            this.components.maintenance.render();
        }
    }

    loadRepairs() {
        const content = document.getElementById('repair-content');
        if (!content) return;

        content.innerHTML = `
            <div class="repairs-intro">
                <h3>Инструкции по ремонту</h3>
                <p>Подробные пошаговые инструкции по ремонту различных систем автомобиля.</p>
                <div class="repair-categories">
                    <div class="repair-category" onclick="showRepairCategory('engine')">
                        <i class="fas fa-cog"></i>
                        <h3>Двигатель</h3>
                        <span class="difficulty easy">Легко</span>
                    </div>
                    <div class="repair-category" onclick="showRepairCategory('transmission')">
                        <i class="fas fa-cogs"></i>
                        <h3>Трансмиссия</h3>
                        <span class="difficulty medium">Средне</span>
                    </div>
                    <div class="repair-category" onclick="showRepairCategory('electrical')">
                        <i class="fas fa-bolt"></i>
                        <h3>Электрика</h3>
                        <span class="difficulty easy">Легко</span>
                    </div>
                    <div class="repair-category" onclick="showRepairCategory('brakes')">
                        <i class="fas fa-circle"></i>
                        <h3>Тормоза</h3>
                        <span class="difficulty medium">Средне</span>
                    </div>
                </div>
            </div>
        `;
    }

    async loadInitialData() {
        // Load any initial data needed
        console.log('Loading initial data...');
        
        try {
            // Preload commonly used data
            await this.api.preloadData();
            
            // Load dashboard data
            const dashboardData = await this.api.getDashboardData();
            this.dashboardData = dashboardData;
            
            console.log('Initial data loaded successfully');
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    }

    // Mobile navigation removed for PWA

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

    // Enhanced API methods
    async searchAll(query) {
        try {
            return await this.api.searchAll(query);
        } catch (error) {
            console.error('Search error:', error);
            return null;
        }
    }

    async getPartDetails(partNumber) {
        try {
            return await this.api.getPartDetails(partNumber);
        } catch (error) {
            console.error('Error getting part details:', error);
            return null;
        }
    }

    async getErrorCodeDetails(code) {
        try {
            return await this.api.getErrorCodeDetails(code);
        } catch (error) {
            console.error('Error getting error code details:', error);
            return null;
        }
    }

    async comparePrices(partNumber) {
        try {
            return await this.scraper.comparePrices(partNumber);
        } catch (error) {
            console.error('Error comparing prices:', error);
            return null;
        }
    }

    async getAvailabilityStatus(partNumber) {
        try {
            return await this.scraper.getAvailabilityStatus(partNumber);
        } catch (error) {
            console.error('Error getting availability status:', error);
            return null;
        }
    }

    async addMaintenanceRecord(record) {
        try {
            return await this.api.addMaintenanceRecord(record);
        } catch (error) {
            console.error('Error adding maintenance record:', error);
            return null;
        }
    }

    async getRepairGuide(title) {
        try {
            return await this.api.getRepairGuide(title);
        } catch (error) {
            console.error('Error getting repair guide:', error);
            return null;
        }
    }

    async getMaintenanceStats() {
        try {
            return await this.api.getMaintenanceStats();
        } catch (error) {
            console.error('Error getting maintenance stats:', error);
            return null;
        }
    }

    async getPartsStats() {
        try {
            return await this.api.getPartsStats();
        } catch (error) {
            console.error('Error getting parts stats:', error);
            return null;
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MitsubishiASXApp();
});

// Export for global access
export default MitsubishiASXApp;