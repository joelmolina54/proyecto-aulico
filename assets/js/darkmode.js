    // darkmode.js
    document.addEventListener('DOMContentLoaded', function() {
    // Elementos del toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
    
    // Función para cambiar el tema
    function toggleDarkMode() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        updateDarkModeIcons();
        updateNavbarColors(isDark);
    }
    
    // Actualizar iconos
    function updateDarkModeIcons() {
        const isDark = document.documentElement.classList.contains('dark');
        const icons = document.querySelectorAll('.dark-mode-icon');
        
        icons.forEach(icon => {
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun', 'text-yellow-300');
        } else {
            icon.classList.remove('fa-sun', 'text-yellow-300');
            icon.classList.add('fa-moon');
        }
        });
    }
    
    // Ajustar colores del navbar
    function updateNavbarColors(isDark) {
        const nav = document.querySelector('nav');
        if (!nav) return;
        
        if (isDark) {
        nav.classList.remove('gradient-bg');
        nav.classList.add('dark:bg-gradient-to-r', 'dark:from-purple-900', 'dark:to-purple-800');
        } else {
        nav.classList.add('gradient-bg');
        nav.classList.remove('dark:bg-gradient-to-r', 'dark:from-purple-900', 'dark:to-purple-800');
        }
    }
    
    // Event listeners
    if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDarkMode);
    if (darkModeToggleMobile) darkModeToggleMobile.addEventListener('click', toggleDarkMode);
    
    // Cargar preferencia inicial
    function loadColorScheme() {
        // 1. Verificar localStorage
        if (localStorage.getItem('darkMode') === 'enabled') {
        document.documentElement.classList.add('dark');
        } else if (localStorage.getItem('darkMode') === 'disabled') {
        document.documentElement.classList.remove('dark');
        } 
        // 2. Si no hay preferencia guardada, usar la del sistema
        else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
        }
        
        updateDarkModeIcons();
        updateNavbarColors(document.documentElement.classList.contains('dark'));
    }
    
    loadColorScheme();
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('darkMode') === null) {
        if (e.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        updateDarkModeIcons();
        updateNavbarColors(e.matches);
        }
    });
    });