  // Mobile menu toggle
  document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    const icon = this.querySelector('i');
    
    menu.classList.toggle('hidden');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // Sync mobile progress bar with main one
  function updateProgressBars(percent) {
    document.getElementById('progress-bar').style.width = `${percent}%`;
    document.getElementById('progress-bar-mobile').style.width = `${percent}%`;
  }

  // Dark mode toggle for both buttons
  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }
  
  document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
  document.getElementById('dark-mode-toggle-mobile').addEventListener('click', toggleDarkMode);
  