// Simple TypeScript App for Mitsubishi ASX 2011 Helper
class MitsubishiASXApp {
    private isDarkMode: boolean = false;

    constructor() {
        this.init();
    }

    private init(): void {
        console.log('Initializing Mitsubishi ASX 2011 Helper App...');
        
        // Load saved theme
        this.loadTheme();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize PWA
        this.initPWA();
        
        console.log('App initialization complete');
    }

    private setupEventListeners(): void {
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href')?.substring(1);
                if (targetSection) {
                    this.showSection(targetSection);
                }
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Quick action cards
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', () => {
                const section = card.getAttribute('onclick')?.match(/showSection\('([^']+)'\)/);
                if (section && section[1]) {
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
    }

    private showSection(sectionId: string): void {
        // Hide all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active');
            }
        });

        // Scroll to top
        this.scrollToTop();
    }

    private toggleTheme(): void {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark', this.isDarkMode);
        
        // Save theme preference
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
        
        // Update theme toggle icon
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = this.isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    private loadTheme(): void {
        const savedTheme = localStorage.getItem('theme');
        this.isDarkMode = savedTheme === 'dark';
        
        if (this.isDarkMode) {
            document.body.classList.add('dark');
        }
        
        // Update theme toggle icon
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = this.isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    private updateBackToTopButton(): void {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;
        
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    private scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    private initPWA(): void {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('Service Worker registered successfully:', registration);
                })
                .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                });
        }

        // Add PWA install prompt
        let deferredPrompt: any;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button if needed
            this.showInstallButton(deferredPrompt);
        });

        // Handle app installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.hideInstallButton();
        });
    }

    private showInstallButton(deferredPrompt: any): void {
        // Create install button if it doesn't exist
        let installBtn = document.getElementById('install-btn');
        if (!installBtn) {
            installBtn = document.createElement('button');
            installBtn.id = 'install-btn';
            installBtn.className = 'install-btn';
            installBtn.innerHTML = '<i class="fas fa-download"></i> Установить приложение';
            installBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: var(--color-primary);
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 25px;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 1000;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.3s ease;
            `;
            
            installBtn.addEventListener('click', () => {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult: any) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    deferredPrompt = null;
                    this.hideInstallButton();
                });
            });
            
            document.body.appendChild(installBtn);
        }
    }

    private hideInstallButton(): void {
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.remove();
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MitsubishiASXApp();
});

// Global functions for onclick handlers
(window as any).showSection = (sectionId: string) => {
    const app = new MitsubishiASXApp();
    (app as any).showSection(sectionId);
};

(window as any).showTroubleshootingCategory = (category: string) => {
    console.log('Show troubleshooting category:', category);
    // Add troubleshooting category logic here
};

(window as any).showRepairCategory = (category: string) => {
    console.log('Show repair category:', category);
    // Add repair category logic here
};