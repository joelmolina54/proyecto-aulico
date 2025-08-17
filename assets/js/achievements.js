// Definición de todos los logros disponibles
const allAchievements = {
    'first_visit': {
        id: 'first_visit',
        title: 'Primera Visita',
        description: 'Visita la aplicación por primera vez',
        icon: 'fa-check',
        color: 'green',
        unlocked: false,
        date: null
        },
            'start_learning': {
            id: 'start_learning',
            title: 'Iniciando el Aprendizaje',
            description: 'Completa tu primera lección',
            icon: 'fa-book',
            color: 'blue',
            unlocked: false,
            date: null
        },
        'five_lessons': {  // Nota: Cambié el ID para que coincida con "five_lessons" en otros lugares
            id: 'five_lessons',
            title: 'Aprendiz Constante',
            description: 'Completa 4 lecciones',
            icon: 'fa-graduation-cap',
            color: 'purple',
            unlocked: false,
            date: null
        },
    'perfect_score': {
        id: 'perfect_score',
        title: 'Puntuación Perfecta',
        description: 'Obtén 100% en una evaluación',
        icon: 'fa-star',
        color: 'yellow',
        unlocked: false,
        date: null
    },
    'daily_streak': {
        id: 'daily_streak',
        title: 'Racha Diaria',
        description: 'Usa la aplicación 3 días seguidos',
        icon: 'fa-calendar',
        color: 'red',
        unlocked: false,
        date: null
    }
};

// Función para registrar una lección completada
function completeLesson() {
    let lessonsCompleted = parseInt(localStorage.getItem('lessonsCompleted')) || 0;
    lessonsCompleted++;
    localStorage.setItem('lessonsCompleted', lessonsCompleted.toString());
    
    // Verifica logros inmediatamente
    checkLessonAchievements(lessonsCompleted);
}

// Función para verificar logros de lecciones (Actualizada)
function checkLessonAchievements(count) {
    const achievements = loadAchievements();
    
    // Logro "Primera lección"
    if (count >= 1 && achievements['start_learning'] && !achievements['start_learning'].unlocked) {
        if(unlockAchievement('start_learning')) {
            console.log('Logro "start_learning" desbloqueado');
        }
    }
    
    // Logro "4 lecciones"
    if (count >= 4 && achievements['five_lessons'] && !achievements['five_lessons'].unlocked) {
        if(unlockAchievement('five_lessons')) {
            console.log('Logro "five_lessons" desbloqueado');
        }
    }
}

// Cargar logros desde LocalStorage
function loadAchievements() {
    const saved = localStorage.getItem('userAchievements');
    return saved ? JSON.parse(saved) : {...allAchievements};
}

// Guardar logros en LocalStorage
function saveAchievements(achievements) {
    localStorage.setItem('userAchievements', JSON.stringify(achievements));
}


// Desbloquear un logro
function unlockAchievement(achievementId) {
    try {
        const achievements = loadAchievements();
        
        if (!achievements[achievementId]) {
            console.error(`El logro ${achievementId} no existe`);
            return false;
        }

        if (!achievements[achievementId].unlocked) {
            // Actualizar el logro
            achievements[achievementId] = {
                ...achievements[achievementId],
                unlocked: true,
                date: new Date().toISOString()
            };

            // Guardar cambios
            saveAchievements(achievements);
            
            console.log(`Logro ${achievementId} desbloqueado correctamente`);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al desbloquear logro:', error);
        return false;
    }
}

// Versión mejorada de completeLesson
function completeLesson() {
    try {
        let lessonsCompleted = parseInt(localStorage.getItem('lessonsCompleted')) || 0;
        lessonsCompleted++;
        localStorage.setItem('lessonsCompleted', lessonsCompleted.toString());
        
        // Verificar logros
        checkLessonAchievements(lessonsCompleted);
        return true;
    } catch (error) {
        console.error('Error al completar lección:', error);
        return false;
    }
}

// Inicialización de logros
function initializeAchievements() {
    if (!localStorage.getItem('firstVisit')) {
        localStorage.setItem('firstVisit', 'true');
        unlockAchievement('first_visit');
    }
    
    // Inicializar contador de lecciones si no existe
    if (!localStorage.getItem('lessonsCompleted')) {
        localStorage.setItem('lessonsCompleted', '0');
    }
    
    checkDailyStreak();
}
// Verificar racha diaria
function checkDailyStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastVisit = localStorage.getItem('lastVisitDate');
    let streak = parseInt(localStorage.getItem('visitStreak')) || 0;

    if (!lastVisit) {
        localStorage.setItem('lastVisitDate', today);
        localStorage.setItem('visitStreak', '1');
        return;
    }

    if (lastVisit === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastVisit === yesterdayStr) {
        streak++;
        if (streak >= 3) unlockAchievement('daily_streak');
    } else {
        streak = 1;
    }

    localStorage.setItem('lastVisitDate', today);
    localStorage.setItem('visitStreak', streak.toString());
}

// Obtener progreso
function getAchievementProgress() {
    const achievements = loadAchievements();
    const total = Object.keys(achievements).length;
    const unlocked = Object.values(achievements).filter(a => a.unlocked).length;
    
    return {
        unlocked,
        total,
        percentage: Math.round((unlocked / total) * 100)
    };
}


// Al final de achievements.js
window.achievements = {
    allAchievements,
    loadAchievements,
    saveAchievements,
    unlockAchievement,
    getAchievementProgress,
    initializeAchievements,
    completeLesson,  // Añade esta línea
    checkLessonAchievements
};

// Inicializar logros al cargar
document.addEventListener('DOMContentLoaded', initializeAchievements);