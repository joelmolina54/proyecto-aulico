// Función para cambiar tema
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

// Función para actualizar icono
function updateThemeIcon() {
    const icon = document.getElementById('theme-toggle').querySelector('i');
    const isDark = document.documentElement.classList.contains('dark');
    
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
    icon.classList.toggle('text-gray-700', !isDark);
    icon.classList.toggle('text-yellow-300', isDark);
}

// Cargar tema guardado al inicio
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    }
    updateThemeIcon();
}

// Event listeners
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.classList.toggle('dark', e.matches);
        updateThemeIcon();
    }
});

// Inicializar tema al cargar
loadTheme();