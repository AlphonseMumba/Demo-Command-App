// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Modal functionality
    const modal = document.getElementById('orderModal');
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    const closeModal = document.querySelector('.close');

    // Open modal when clicking restaurant cards
    restaurantCards.forEach(card => {
        card.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Quantity selector functionality
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyDisplay = document.querySelector('.qty');
    const addToOrderBtn = document.querySelector('.add-to-order-btn');

    let quantity = 1;
    const basePrice = 1500;

    if (minusBtn && plusBtn) {
        minusBtn.addEventListener('click', function() {
            if (quantity > 1) {
                quantity--;
                updateQuantityDisplay();
            }
        });

        plusBtn.addEventListener('click', function() {
            quantity++;
            updateQuantityDisplay();
        });
    }

    function updateQuantityDisplay() {
        if (qtyDisplay) {
            qtyDisplay.textContent = quantity;
        }
        if (addToOrderBtn) {
            const totalPrice = basePrice * quantity;
            addToOrderBtn.textContent = `Ajouter à la Commande • ${totalPrice} FC`;
        }
    }

    // Filter buttons functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would typically filter the restaurants
            // For now, we'll just log the filter
            console.log('Filter selected:', this.textContent);
        });
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar input');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // Here you would implement actual search functionality
                alert(`Recherche de: ${searchTerm}`);
            }
        });
    }

    // Enter key search
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    console.log('Searching for:', searchTerm);
                    alert(`Recherche de: ${searchTerm}`);
                }
            }
        });
    }

    // Load more restaurants
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Here you would load more restaurants
            console.log('Loading more restaurants...');
            alert('Chargement de plus de restaurants...');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add to cart functionality
    if (addToOrderBtn) {
        addToOrderBtn.addEventListener('click', function() {
            const selectedSide = document.querySelector('input[name="side"]:checked').value;
            console.log('Added to cart:', {
                item: 'Burger Classic Royal',
                quantity: quantity,
                side: selectedSide,
                totalPrice: basePrice * quantity
            });
            
            alert(`${quantity}x Burger Classic Royal ajouté à votre panier!`);
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Login button functionality
    const loginBtn = document.querySelector('.login-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('Fonctionnalité de connexion à implémenter');
        });
    }

    // Brand items hover effects
    const brandItems = document.querySelectorAll('.brand-item');
    
    brandItems.forEach(item => {
        item.addEventListener('click', function() {
            const brandName = this.querySelector('span').textContent;
            console.log('Selected brand:', brandName);
            alert(`Voir les restaurants ${brandName}`);
        });
    });

    // Notification system (placeholder)
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '90px',
            right: '20px',
            background: type === 'success' ? '#10b981' : '#e53e3e',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            zIndex: '9999',
            transform: 'translateX(300px)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.style.transform = 'translateX(300px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Demo: Show welcome notification after page load
    setTimeout(() => {
        showNotification('Bienvenue sur GullyDelivery Kinshasa! 🍕', 'success');
    }, 2000);

});
