// ========== FUNCIONALIDAD TEMA OSCURO ========== //
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    // Alternar clase dark
    html.classList.toggle('dark', !isDark);
    
    // Guardar preferencia
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    
    // Actualizar icono
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.getElementById('theme-toggle').querySelector('i');
    const isDark = document.documentElement.classList.contains('dark');
    
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
    icon.classList.toggle('text-gray-700', !isDark);
    icon.classList.toggle('text-yellow-300', isDark);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    }
    updateThemeIcon();
}

// ========== FUNCIONALIDAD MENÚ MÓVIL ========== //
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const button = document.getElementById('mobile-menu-button');
    
    menu.classList.toggle('hidden');
    button.innerHTML = menu.classList.contains('hidden') ? 
        '<i class="fas fa-bars"></i>' : 
        '<i class="fas fa-times"></i>';
}

// ========== INICIALIZACIÓN ========== //
document.addEventListener('DOMContentLoaded', function() {
    // Configurar tema
    loadTheme();
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Configurar listener para cambios del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.classList.toggle('dark', e.matches);
            updateThemeIcon();
        }
    });
    
    // Configurar menú móvil
    document.getElementById('mobile-menu-button').addEventListener('click', toggleMobileMenu);
});