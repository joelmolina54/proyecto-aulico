  // Menú móvil
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
        this.innerHTML = menu.classList.contains('hidden') ? 
            '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
    });