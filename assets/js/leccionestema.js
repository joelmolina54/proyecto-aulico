    // Tema oscuro/claro
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Comprobar preferencias del sistema o localStorage
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');

    // Establecer tema inicial
    if (storedTheme === 'dark' || (!storedTheme && userPrefersDark)) {
    html.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
    } else {
    html.classList.remove('dark');
    themeToggle.innerHTML = '<i class="fas fa-moon text-gray-700 dark:text-purple-300"></i>';
    }

    // Escuchar cambios en el botón
    themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    
    if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
    }
    });

    // Escuchar cambios en las preferencias del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
        html.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
        } else {
        html.classList.remove('dark');
        themeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
        }
    }
    });