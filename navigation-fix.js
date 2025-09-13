// Simple navigation fix for immediate functionality
console.log('Navigation fix loaded');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready, setting up navigation...');
    
    // Function to show a section
    function showSection(sectionId) {
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
            console.log('Section shown successfully:', sectionId);
        } else {
            console.error('Section not found:', sectionId);
        }
        
        // Update navigation active state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active');
            }
        });
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Set up navigation event listeners
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Found navigation links:', navLinks.length);
    
    navLinks.forEach((link, index) => {
        console.log(`Setting up link ${index}:`, link.getAttribute('href'));
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const targetSection = href.substring(1); // Remove the #
            console.log('Navigation clicked:', targetSection);
            showSection(targetSection);
        });
    });
    
    // Set up quick action cards
    const actionCards = document.querySelectorAll('.action-card');
    console.log('Found action cards:', actionCards.length);
    
    actionCards.forEach((card, index) => {
        console.log(`Setting up action card ${index}`);
        
        card.addEventListener('click', function() {
            // Extract section from onclick attribute or data attribute
            const onclickAttr = this.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/showSection\('([^']+)'\)/);
                if (match) {
                    const targetSection = match[1];
                    console.log('Action card clicked:', targetSection);
                    showSection(targetSection);
                }
            }
        });
    });
    
    // Make showSection globally available
    window.showSection = showSection;
    
    console.log('Navigation setup complete!');
});

// Also set up navigation immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    console.log('Document still loading, waiting for DOMContentLoaded...');
} else {
    console.log('Document already loaded, setting up navigation immediately...');
    // Trigger the setup immediately
    document.dispatchEvent(new Event('DOMContentLoaded'));
}