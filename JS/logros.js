// logro.js - Versión simplificada y optimizada
const ACHIEVEMENTS = {
  // Logros básicos
  FIRST_VISIT: {
    id: 'firstVisit',
    title: 'Bienvenido',
    description: 'Visita el sitio por primera vez',
    icon: '👋',
    color: 'green',
    condition: () => !localStorage.getItem('firstVisit')
  },
  
  // Progreso en lecciones
  LESSON_STARTER: {
    id: 'lessonStarter',
    title: 'Iniciando el Aprendizaje',
    description: 'Completa tu primera lección',
    icon: '📖',
    color: 'blue',
    condition: () => parseInt(localStorage.getItem('lessonsCompleted') || 0) >= 1
  },
  
  // Progreso en práctica
  PRACTICE_MASTER: {
    id: 'practiceMaster',
    title: 'Maestro de Práctica',
    description: 'Responde 10 preguntas correctamente',
    icon: '💪',
    color: 'purple',
    condition: () => parseInt(localStorage.getItem('correctAnswers') || 0) >= 10
  }
};

// Inicializar sistema de logros
function initAchievements() {
  checkFirstVisit();
  updateAllAchievements();
  setupAchievementListeners();
}

// Verificar primera visita
function checkFirstVisit() {
  if (!localStorage.getItem('firstVisit')) {
    localStorage.setItem('firstVisit', new Date().toISOString());
    unlockAchievement('FIRST_VISIT');
  }
}

// Desbloquear logro
function unlockAchievement(achievementKey) {
  const achievement = ACHIEVEMENTS[achievementKey];
  if (!achievement || isAchievementUnlocked(achievement.id)) return;
  
  localStorage.setItem(`achievement_${achievement.id}`, 'unlocked');
  localStorage.setItem(`achievement_${achievement.id}_date`, new Date().toISOString());
  showAchievementNotification(achievement);
}

// Mostrar notificación
function showAchievementNotification(achievement) {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 bg-${achievement.color}-100 border-l-4 border-${achievement.color}-500 text-${achievement.color}-800 rounded shadow-lg z-50 flex items-center`;
  notification.innerHTML = `
    <span class="text-2xl mr-3">${achievement.icon}</span>
    <div>
      <h4 class="font-bold">${achievement.title}</h4>
      <p>${achievement.description}</p>
    </div>
  `;
  
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

// Verificar todos los logros
function updateAllAchievements() {
  Object.keys(ACHIEVEMENTS).forEach(key => {
    if (ACHIEVEMENTS[key].condition()) {
      unlockAchievement(key);
    }
  });
}

// Configurar listeners
function setupAchievementListeners() {
  document.addEventListener('lessonCompleted', () => {
    const completed = parseInt(localStorage.getItem('lessonsCompleted') || 0);
    localStorage.setItem('lessonsCompleted', completed + 1);
    updateAllAchievements();
  });
  
  document.addEventListener('correctAnswer', () => {
    const correct = parseInt(localStorage.getItem('correctAnswers') || 0);
    localStorage.setItem('correctAnswers', correct + 1);
    updateAllAchievements();
  });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', initAchievements);