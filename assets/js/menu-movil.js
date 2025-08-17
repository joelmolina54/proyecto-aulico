document.getElementById('mobile-menu-button').addEventListener('click', function() {
 function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', isDark);

  // actualizar íconos en ambos botones
  updateDarkIcons(isDark);
}

function updateDarkIcons(isDark) {
  const icons = document.querySelectorAll('#dark-mode-toggle i, #dark-mode-toggle-mobile i');
  icons.forEach(icon => {
    icon.classList.remove('fa-moon', 'fa-sun');
    if (isDark) {
      icon.classList.add('fa-sun'); // modo oscuro → mostrar sol
    } else {
      icon.classList.add('fa-moon'); // modo claro → mostrar luna
    }
  });
}

// eventos en ambos botones
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
document.getElementById('dark-mode-toggle-mobile').addEventListener('click', toggleDarkMode);

// estado inicial al cargar
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
  updateDarkIcons(true);
} else {
  updateDarkIcons(false);
}

// Al cargar la página, restaurar estado
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
}

  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
  this.innerHTML = menu.classList.contains('hidden') ? 
    '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
});