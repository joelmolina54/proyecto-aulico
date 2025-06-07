// ✅ Este archivo debe llamarse logros.js y cargarse después de js.js en index.html

// Función auxiliar para verificar si un logro está desbloqueado
function isAchievementUnlocked(id) {
  return localStorage.getItem(`achievement_${id}`) === 'unlocked';
}

// Sistema de logros por lección finalizada
const LESSON_ACHIEVEMENTS = {
  C_LESSON: {
    id: 'c_lesson',
    title: 'Lección completada: C',
    description: 'Terminaste la lección de la letra C',
    icon: '🅲',
    color: 'blue',
    condition: () => isAchievementUnlocked('c_lesson')
  },
  S_LESSON: {
    id: 's_lesson',
    title: 'Lección completada: S',
    description: 'Terminaste la lección de la letra S',
    icon: '🆂',
    color: 'blue',
    condition: () => isAchievementUnlocked('s_lesson')
  },
  Z_LESSON: {
    id: 'z_lesson',
    title: 'Lección completada: Z',
    description: 'Terminaste la lección de la letra Z',
    icon: '🆉',
    color: 'orange',
    condition: () => isAchievementUnlocked('z_lesson')
  },
  X_LESSON: {
    id: 'x_lesson',
    title: 'Lección completada: X',
    description: 'Terminaste la lección de la letra X',
    icon: '❌',
    color: 'orange',
    condition: () => isAchievementUnlocked('x_lesson')
  }
};

// Función para marcar un logro como desbloqueado
function unlockLessonAchievement(id) {
  const ach = LESSON_ACHIEVEMENTS[id];
  if (!ach || isAchievementUnlocked(id)) return;
  localStorage.setItem(`achievement_${id}`, 'unlocked');
  showLessonAchievementNotification(ach);
}

// Mostrar notificación visual
function showLessonAchievementNotification(ach) {
  const notif = document.createElement('div');
  notif.className = `fixed bottom-4 right-4 p-4 bg-${ach.color}-100 border-l-4 border-${ach.color}-500 text-${ach.color}-800 rounded shadow-lg z-50 max-w-xs animate-bounce`;
  notif.innerHTML = `
    <div class="flex items-start">
      <span class="text-2xl mr-3">${ach.icon}</span>
      <div>
        <h3 class="font-bold">${ach.title}</h3>
        <p class="text-sm">${ach.description}</p>
        <a href="html/logro.html" class="text-xs underline text-${ach.color}-600">Ver más</a>
      </div>
    </div>
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 5000);
}

// Escuchar eventos desde js.js
function setupLessonAchievementListeners() {
  document.addEventListener('lessonFinished', (e) => {
    const id = e.detail.lessonId;
    unlockLessonAchievement(id);
    updateAchievementsSection();
  });
}

// Mostrar barra de progreso (en el index)
function updateAchievementsSection() {
  const section = document.getElementById('badges-container');
  if (!section) return;

  section.innerHTML = '';
  const total = Object.keys(LESSON_ACHIEVEMENTS).length;
  let completed = 0;

  Object.values(LESSON_ACHIEVEMENTS).forEach(ach => {
    const unlocked = isAchievementUnlocked(ach.id);
    if (unlocked) completed++;
    section.innerHTML += `
      <div class="p-3 text-center border rounded-lg ${unlocked ? 'bg-green-100' : 'bg-gray-100 opacity-50'}">
        <div class="text-3xl">${unlocked ? ach.icon : '🔒'}</div>
        <h4 class="font-bold text-sm">${ach.title}</h4>
        <p class="text-xs">${unlocked ? ach.description : 'Logro bloqueado'}</p>
        ${unlocked ? '<a href="html/logro.html" class="text-xs underline text-blue-600">Ver más</a>' : ''}
      </div>`;
  });

  const percent = Math.round((completed / total) * 100);
  document.getElementById('achievement-progress')?.setAttribute('value', percent);
}

// Ejecutar cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  setupLessonAchievementListeners();
  updateAchievementsSection();
});

document.addEventListener('lessonFinished', (e) => {
  const id = e.detail.lessonId;
  unlockLessonAchievement(id); // desbloquea el logro correspondiente
  updateAchievementsSection(); // actualiza la vista de logros en index.html
});
