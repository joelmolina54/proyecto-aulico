    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        console.log('Botón de dark mode clicado'); // Agrega esta línea
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
        
        // Cambiar icono
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        
        // Feedback visual
        this.classList.toggle('bg-white');
        this.classList.toggle('bg-opacity-20');
        this.classList.toggle('dark:bg-purple-800/30');
    });
    