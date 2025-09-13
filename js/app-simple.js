// Simplified Main Application File for Mitsubishi ASX 2011 Helper
// Basic functionality without complex module dependencies

class MitsubishiASXApp {
    constructor() {
        this.currentSection = 'home';
        this.init();
    }

    init() {
        console.log('Initializing Mitsubishi ASX 2011 Helper App...');
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('App initialization complete');
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
        if (container && container.innerHTML.trim() === '') {
            container.innerHTML = `
                <div class="loading-message">
                    <h3>Коды ошибок</h3>
                    <p>Загрузка данных о кодах ошибок...</p>
                    <p>Эта функция будет доступна после полной загрузки модулей.</p>
                </div>
            `;
        }
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
        if (container && container.innerHTML.trim() === '') {
            container.innerHTML = `
                <div class="loading-message">
                    <h3>Каталог запчастей</h3>
                    <p>Загрузка каталога запчастей...</p>
                    <p>Эта функция будет доступна после полной загрузки модулей.</p>
                </div>
            `;
        }
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