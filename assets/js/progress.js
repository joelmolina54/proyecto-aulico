    // Cargar progreso al iniciar
    document.addEventListener('DOMContentLoaded', function() {
    actualizarProgresoEnTarjetas();
    });

    function actualizarProgresoEnTarjetas() {
    // Para cada grafema
    ['c', 's', 'z', 'x'].forEach(letra => {
        const progreso = localStorage.getItem(`progreso-${letra}`) || 0;
        document.getElementById(`progreso-${letra}-text`).textContent = `${progreso}%`;
        document.getElementById(`progreso-${letra}-bar`).style.width = `${progreso}%`;
        
        // Cambiar texto del botón si está completado
        if(progreso == 100) {
        const boton = document.querySelector(`a[href="html/lecciones/leccion-${letra}.html"]`);
        if(boton) {
            boton.innerHTML = '<i class="fas fa-check mr-2"></i> Completado';
            boton.classList.remove('bg-success', 'hover:bg-emerald-700');
            boton.classList.add('bg-purple-600', 'hover:bg-purple-700');
        }
        }
    });
    }

    function reiniciarProgreso(letra) {
    if(confirm(`¿Estás seguro que quieres reiniciar tu progreso en la lección ${letra.toUpperCase()}?`)) {
        localStorage.setItem(`progreso-${letra}`, 0);
        actualizarProgresoEnTarjetas();
    }
    }

    // Función para usar dentro de las lecciones
    function completarLeccion(letra) {
    localStorage.setItem(`progreso-${letra}`, 100);
    // Redirigir o mostrar mensaje de éxito
    }