$(document).ready(function() {
  // Estado inicial
  let allLessonsVisible = false;
  $(".lesson-content").hide();
  $("#lesson-content-area").hide();
  $(".lesson-toggle .arrow").text("▲");
  $("#toggle-all-lessons").text("Mostrar Todas");

  // 1. Control para mostrar/ocultar TODAS las lecciones
  $("#toggle-all-lessons").click(function() {
    allLessonsVisible = !allLessonsVisible;
    
    if (allLessonsVisible) {
      $(".lesson-content").slideDown(300);
      $(".lesson-toggle .arrow").text("▼");
    } else {
      $(".lesson-content").slideUp(300);
      $("#lesson-content-area").slideUp(300); 
      $(".lesson-toggle .arrow").text("▲");
    }
    
    $(this).text(allLessonsVisible ? "Ocultar Todas" : "Mostrar Todas");
  });

  // 2. Control INDIVIDUAL para cada lección
  $(".lesson-toggle").click(function(e) {
    e.stopPropagation();
    
    const content = $(this).next(".lesson-content");
    const arrow = $(this).find(".arrow");
    
    content.slideToggle(300, function() {
      arrow.text(content.is(":visible") ? "▼" : "▲");
      updateButtonState();
    });
  });

  // 3. Función para actualizar estado
  function updateButtonState() {
    const visibleCount = $(".lesson-content:visible").length;
    const totalCount = $(".lesson-content").length;
    
    if (visibleCount === totalCount) {
      allLessonsVisible = true;
      $("#toggle-all-lessons").text("Ocultar Todas");
    } else if (visibleCount === 0) {
      allLessonsVisible = false;
      $("#toggle-all-lessons").text("Mostrar Todas");
    }
  }

  // 4. Control para lecciones de contenido
  $(".start-lesson").click(function(e) {
    e.stopPropagation();
    const lessonId = $(this).data("lesson");
    $("#lesson-content-area").html(lessonContent[lessonId]).slideDown(300);
    
    $('html, body').animate({
      scrollTop: $("#lesson-content-area").offset().top - 100
    }, 300);
  });

  // 5. Cerrar lección
  $(document).on("click", ".close-lesson", function(e) {
    e.stopPropagation();
    $("#lesson-content-area").slideUp(300);
    document.dispatchEvent(new CustomEvent('lessonCompleted', {
      detail: {
        lessonId: $(this).find(".lesson-container").data("lesson-id")
      }
    }));
});

// Mostrar contenido de lección (modificado)
$(".start-lesson").click(function() {
  const lessonId = $(this).data("lesson");
  $("#lesson-content-area").html(lessonContent[lessonId]);
  $("#lesson-content-area").slideDown(300);
  
  
  $('html, body').animate({
    scrollTop: $("#lesson-content-area").offset().top - 100
  }, 300);
});


  // --- Lesson Content (Combined) ---
  const lessonContent = {
  1: `<div class="lesson-container">
        <div class="flex justify-between items-center mb-4">
          <h3>Módulo 1 - Lección 1: La letra 'C'</h3>
          <button class="close-lesson bg-red-200 hover:bg-red-300 text-red-800 font-medium px-4 py-1 rounded-lg shadow-sm transition duration-200 ease-in-out">
            ❌ Cerrar
          </button>
            <button class="end-lesson bg-purple-500 hover:bg-purple-600 text-white font-medium px-4 py-1 rounded-lg shadow-sm transition duration-200 ease-in-out">
            📘 Terminar Lección
          </button>
        </div>
        <ul>
            <li><strong>/k/</strong> con a, o, u → <em>casa, color, cuchillo</em>.</li>
            <li><strong>/s/</strong> con e, i (en Latinoamérica) → <em>cielo, cereza</em>.</li>
        </ul>
        <p><strong>¿Por qué se usa así?</strong> Porque en su evolución desde el latín, la 'C' cambió según la vocal siguiente.</p>
        <p><strong>Reglas ortográficas:</strong></p>
        <ul>
            <li>Diminutivos: -cito, -ecillo → <em>panecillo, pececito</em>.</li>
        </ul>
        <h4>Video educativo</h4>
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/f70wOCc7DEg?si=EwAqWtfIHLYdKXPC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <button onclick="window.location.href='html/leccion-c.html'" class="go-to-page px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
           Ir a la página completa
        </button>
        `,
  2: `<div class="lesson-container">
        <div class="flex justify-between items-center mb-4">
          <h3>Módulo 1 - Lección 2: La letra 'S'</h3>
          <button class="close-lesson bg-red-200 hover:bg-red-300 text-red-800 font-medium px-4 py-1 rounded-lg shadow-sm transition duration-200 ease-in-out">
            ❌ Cerrar
          </button>
         <button class="end-lesson bg-purple-500 hover:bg-purple-600 text-white font-medium px-4 py-1 rounded-lg shadow-sm transition duration-200 ease-in-out">
            📘 Terminar Lección
          </button>
        </div>
        <p><strong>Objetivo:</strong> Aprender cuándo se usa la letra 'S' y sus diferencias con la 'C'.</p>
        <p>La letra 'S' siempre suena /s/: <em>silla, sol, sonrisa</em>.</p>
        <p><strong>¿Por qué se usa así?</strong> Porque en español su sonido es muy estable y claro desde el latín.</p>
        <p><strong>Reglas ortográficas:</strong></p>
        <ul>
            <li>Gentilicios terminados en -ense: <em>canadiense, costarricense</em>.</li>
        </ul>
        <p><strong>Curiosidad:</strong> En algunas zonas la 'S' se aspira o se pierde al final de sílaba.</p>
        <h4>Video educativo</h4>
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/DybSazkSpUo?si=HznDramDF1sLNrmZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <button onclick="window.location.href='html/leccion-s.html'" class="go-to-page px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
           Ir a la página completa
        </button>
       `,

  3: `<div class="lesson-container">
        <div class="flex justify-between items-center mb-4">
          <h3>Módulo 2 - Lección 1: La letra 'Z'</h3>
          <button class="close-lesson bg-red-200 hover:bg-red-300 text-red-800 font-medium px-4 py-1 rounded-lg shadow-sm transition duration-200 ease-in-out">
            ❌ Cerrar
          </button>
           <button class="end-lesson bg-purple-500 hover:bg-purple-600 text-white font-medium px-4 py-1 rounded-lg shadow-sm transition duration-200 ease-in-out">
            📘 Terminar Lección
          </button>
        </div>
        <ul>
            <li><strong>/θ/</strong> en España y <strong>/s/</strong> en Latinoamérica → <em>zapato, zorro</em>.</li>
        </ul>
        <p><strong>¿Por qué se usa así?</strong> Proviene del latín y se fue adaptando al español según regiones.</p>
        <p><strong>Reglas ortográficas:</strong></p>
        <ul>
            <li>Palabras abstractas: <em>belleza, rapidez</em>.</li>
            <li>Singulares con plural en -ces: <em>pez → peces</em>.</li>
        </ul>
        <h4>Video educativo</h4>
        <iframe width="560" height="315"
         src="https://www.youtube-nocookie.com/embed/0UXDUbWOQjs?si=W4yY5mStLbOgyLCk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
         <button onclick="window.location.href='html/leccion-z.html'" class="go-to-page px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
           Ir a la página completa
        </button>
        `,

  4: `<div class="lesson-container">
        <div class="flex justify-between items-center mb-4">
          <h3>Módulo 2 - Lección 1: La letra 'X'</h3>
          <button class="close-lesson bg-red-200 hover:bg-red-300 text-red-800 font-medium px-4 py-1 rounded-lg shadow-sm transition duration-200 ease-in-out">
            ❌ Cerrar
          </button>
             <button class="end-lesson bg-purple-500 hover:bg-purple-600 text-white font-medium px-4 py-1 rounded-lg shadow-sm transition duration-200 ease-in-out">
            📘 Terminar Lección
          </button>
        </div>
        <ul>
            <li><strong>/ks/</strong>: <em>examen, taxi</em>.</li>
            <li><strong>/s/</strong>: <em>oxígeno, México</em>.</li>
            <li><strong>/x/</strong>: en palabras indígenas: <em>Xochitl</em>.</li>
        </ul>
        <p><strong>¿Por qué se usa así?</strong> Su origen griego y su adaptación en América con lenguas indígenas causaron estas variaciones.</p>
        <p><strong>Reglas ortográficas:</strong></p>
        <ul>
            <li>Palabras con ex- como prefijo: <em>examen, extender, exilio</em>.</li>
        </ul>
        <h4>Video educativo</h4>
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/_ula_OAqUYA?si=XOTQWFPtZpbX2XrY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <button onclick="window.location.href='html/leccion-x.html'" class="go-to-page px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
           Ir a la página completa
        </button>
        `,
  };



  // --- Practice Section (Modified Feedback) ---
  const practiceWords = {
    casa: {
      grapheme: "c",
      reason:
        "Porque 'casa' empieza con el sonido /k/, que se representa con la letra 'c'.",
         image: "images/casa.webp"
    },
    sopa: {
      grapheme: "s",
      reason:
        "Porque 'sopa' empieza con el sonido /s/, que se representa con la letra 's'.",
         image: "images/sopa.webp"
    },
    zorro: {
      grapheme: "z",
      reason:
        "Porque 'zorro' empieza con el sonido /θ/ (en España) o /s/ (en Latinoamérica), que se representa con la letra 'z'.",
        image: "images/zorro.webp"
    },
    taxi: {
      grapheme: "x",
      reason:
        "Porque 'taxi' empieza con el sonido /ks/, que se representa con la letra 'x'.",
         image: "images/taxi.webp"
    },
    cielo: {
      grapheme: "c",
      reason:
        "Porque 'cielo' empieza con el sonido /θj/ o /sj/, que se representa con la letra 'c' cuando va seguida de 'i' o 'e'.",
         image: "images/cielo.webp"
    },
    sol: {
      grapheme: "s",
      reason:
        "Porque 'sol' empieza con el sonido /s/, que se representa con la letra 's'.",
        image: "images/sol.webp"
    },
    zapato: {
      grapheme: "z",
      reason:
        "Porque 'zapato' empieza con el sonido /θ/ (en España) o /s/ (en Latinoamérica), que se representa con la letra 'z'.",
        image: "images/zapatos.webp"
    },
    examen: {
      grapheme: "x",
      reason:
        "Porque 'examen' empieza con el sonido /eɡˈsamen/, que se representa con la letra 'x'.",
        image: "images/examen.png"
    },
  };

  let currentPracticeWord = "";
  let currentPracticeGrapheme = "";
  let practiceAttempts = 0;
  let usedPracticeWords = [];


function loadPracticeQuestion() {
  const wordList = Object.keys(practiceWords);
  // Si ya se usaron todas las palabras, reiniciar la lista
  if (usedPracticeWords.length === wordList.length) {
    usedPracticeWords = [];
  }
  // Filtrar palabras que aún no han sido usadas
  const availableWords = wordList.filter(word => !usedPracticeWords.includes(word));
  // Elegir una palabra aleatoria de las disponibles
  currentPracticeWord = availableWords[Math.floor(Math.random() * availableWords.length)];
  usedPracticeWords.push(currentPracticeWord); // Marcarla como usada
  currentPracticeGrapheme = practiceWords[currentPracticeWord].grapheme;
  const imageUrl = practiceWords[currentPracticeWord].image;
  const missingWord = currentPracticeWord.replace(currentPracticeGrapheme, '__');
  let practiceHTML = `
    <div class="mb-4">
      <img src="${imageUrl}" alt="${currentPracticeWord}" class="w-40 h-40 object-contain mx-auto mb-2">
      <p class="text-center text-lg">Según la imagen, ¿qué grafema falta en la palabra: <br> <strong>${missingWord.toUpperCase()} </strong>?</p>
    </div>
    <div class="flex flex-wrap gap-2 justify-center">
      <button class="practice-choice px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-800 transition" data-grapheme="c">C</button>
      <button class="practice-choice px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-800 transition" data-grapheme="s">S</button>
      <button class="practice-choice px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-800 transition" data-grapheme="z">Z</button>
      <button class="practice-choice px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-800 transition" data-grapheme="x">X</button>
    </div>
  `;

  $("#practice-area").html(practiceHTML);
  practiceAttempts++;

 $(".practice-choice").click(function () {
    const selectedGrapheme = $(this).data("grapheme");
    if (selectedGrapheme === currentPracticeGrapheme) {
      correctAnswers++;
      document.dispatchEvent(new CustomEvent('correctAnswer', {
        detail: {
          word: currentPracticeWord,
          grapheme: currentPracticeGrapheme
        }
      }));
      $("#practice-area").prepend('<div class="mb-2 p-2 bg-green-100 text-green-800 rounded">¡Correcto!</div>');
      setTimeout(() => loadPracticeQuestion(), 1000);
    } else {
      const reason = practiceWords[currentPracticeWord].reason;
      $("#practice-area").prepend(`<div class="mb-2 p-2 bg-red-100 text-red-800 rounded">¡Incorrecto! ${reason}</div>`);
    }
  });
}

 

  // Menú móvil
  $("#mobile-menu-button").click(function(e) {
    e.stopPropagation(); // Evita que el evento se propague
    $(this).toggleClass("active");
    $("#mobile-menu").slideToggle(300);
  });

  // Cierra el menú al tocar fuera
  $(document).click(function() {
    $("#mobile-menu").slideUp(300);
    $("#mobile-menu-button").removeClass("active");
  });

  // Evita que el menú se cierre al tocar dentro
  $("#mobile-menu").click(function(e) {
    e.stopPropagation();
  });

// Manejar redimensionamiento de pantalla para el gráfico
$(window).resize(function() {
  if (myChart) {
    myChart.resize();
  }
});

  loadPracticeQuestion(); // Initial load

  // --- Evaluation Section (Modified for retry) ---
  const evaluationQuestions = [
    {
      question: "¿'Casa' empieza con qué grafema?",
      correctAnswer: "c",
      choices: ["c", "s", "z", "x"],
      explanation: "Se usa 'c' con a, o, u para representar el sonido /k/.",
    },
    {
      question: "¿'Zorro' empieza con qué grafema?",
      correctAnswer: "z",
      choices: ["c", "s", "z", "x"],
      explanation: "En Latinoamérica 'z' suena /s/, como en 'zorro'.",
    },
    {
      question: "¿'Sopa' empieza con qué grafema?",
      correctAnswer: "s",
      choices: ["c", "s", "z", "x"],
      explanation: "'Sopa' suena /s/, representado por la letra 's'.",
    },
    {
      question: "¿'Taxi' empieza con qué grafema?",
      correctAnswer: "x",
      choices: ["c", "s", "z", "x"],
      explanation: "Contiene el sonido /ks/, representado con 'x'.",
    },
  ];
  let lessonsCompleted = 0;
  let correctAnswers = 0;
  let timePerQuestion = 15;
  let evaluationTimer;
  let currentQuestionIndex = 0;
  let evaluationScore = 0; // Ahora cada pregunta correcta suma 25 puntos
  let evaluationScores = [];
  let evaluationAttempt = 0;
  let myChart;

$(document).on("click", ".end-lesson", function () {
  const lessonId = $(this).data("lesson");

  if (localStorage.getItem(`achievement_${lessonId}`) === "unlocked") return;

  localStorage.setItem(`achievement_${lessonId}`, "unlocked");

  document.dispatchEvent(new CustomEvent("lessonFinished", {
    detail: { lessonId }
  }));

  $(this).replaceWith(`
    <span class="inline-block bg-green-100 text-green-800 font-semibold px-4 py-1 rounded shadow">
      ✔ Lección completada
    </span>
  `);
});
});