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
          <button class="close-lesson px-2 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300">✕ Cerrar</button>
          <button class="end-lesson" data-lesson="c_lesson">Terminar Lección</button>
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
        `,
  2: `<div class="lesson-container">
        <div class="flex justify-between items-center mb-4">
          <h3>Módulo 1 - Lección 2: La letra 'S'</h3>
          <button class="close-lesson px-2 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300">✕ Cerrar</button>
         <button class="end-lesson" data-lesson="s_lesson">Terminar Lección</button> 
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
       `,

  3: `<div class="lesson-container">
        <div class="flex justify-between items-center mb-4">
          <h3>Módulo 2 - Lección 1: La letra 'Z'</h3>
          <button class="close-lesson px-2 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300">✕ Cerrar</button>
         <button class="end-lesson" data-lesson="z_lesson">Terminar Lección</button>

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
         
        `,

  4: `<div class="lesson-container">
        <div class="flex justify-between items-center mb-4">
          <h3>Módulo 2 - Lección 1: La letra 'X'</h3>
          <button class="close-lesson px-2 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300">✕ Cerrar</button>
          <button class="end-lesson" data-lesson="x_lesson">Terminar Lección</button>
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
        `,
  };





  // --- Practice Section (Modified Feedback) ---
  const practiceWords = {
    casa: {
      grapheme: "c",
      reason:
        "Porque 'casa' empieza con el sonido /k/, que se representa con la letra 'c'.",
    },
    sopa: {
      grapheme: "s",
      reason:
        "Porque 'sopa' empieza con el sonido /s/, que se representa con la letra 's'.",
    },
    zorro: {
      grapheme: "z",
      reason:
        "Porque 'zorro' empieza con el sonido /θ/ (en España) o /s/ (en Latinoamérica), que se representa con la letra 'z'.",
    },
    taxi: {
      grapheme: "x",
      reason:
        "Porque 'taxi' empieza con el sonido /ks/, que se representa con la letra 'x'.",
    },
    cielo: {
      grapheme: "c",
      reason:
        "Porque 'cielo' empieza con el sonido /θj/ o /sj/, que se representa con la letra 'c' cuando va seguida de 'i' o 'e'.",
    },
    sol: {
      grapheme: "s",
      reason:
        "Porque 'sol' empieza con el sonido /s/, que se representa con la letra 's'.",
    },
    zapato: {
      grapheme: "z",
      reason:
        "Porque 'zapato' empieza con el sonido /θ/ (en España) o /s/ (en Latinoamérica), que se representa con la letra 'z'.",
    },
    examen: {
      grapheme: "x",
      reason:
        "Porque 'examen' empieza con el sonido /eɡˈsamen/, que se representa con la letra 'x'.",
    },
  };

  let currentPracticeWord = "";
  let currentPracticeGrapheme = "";
  let practiceAttempts = 0;

 // Modifica la función loadPracticeQuestion para móviles
function loadPracticeQuestion() {
  const wordList = Object.keys(practiceWords);
  currentPracticeWord = wordList[Math.floor(Math.random() * wordList.length)];
  currentPracticeGrapheme = practiceWords[currentPracticeWord].grapheme;

  let practiceHTML = `<p>¿Con qué grafema empieza la palabra <strong>${currentPracticeWord}</strong>?</p><div class="flex flex-wrap gap-2">`;
  practiceHTML += `<button class="practice-choice px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-800 transition" data-grapheme="c">C</button>`;
  practiceHTML += `<button class="practice-choice px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-800 transition" data-grapheme="s">S</button>`;
  practiceHTML += `<button class="practice-choice px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-800 transition" data-grapheme="z">Z</button>`;
  practiceHTML += `<button class="practice-choice px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-800 transition" data-grapheme="x">X</button></div>`;
  $("#practice-area").html(practiceHTML);
  practiceAttempts++;

  $(".practice-choice").click(function() {
    const selectedGrapheme = $(this).data("grapheme");
    if (selectedGrapheme === currentPracticeGrapheme) {
          correctAnswers++;
       // Disparar evento de respuesta correcta
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

// Actualiza la función loadEvaluationQuestion para móviles
function loadEvaluationQuestion() {
  if (currentQuestionIndex < evaluationQuestions.length) {
    const question = evaluationQuestions[currentQuestionIndex];
    let evaluationHTML = `<p class="mb-4">${question.question}</p><div class="flex flex-wrap gap-2 mb-4">`;
    question.choices.forEach((choice) => {
      evaluationHTML += `<button class="evaluation-choice px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-800 transition" data-choice="${choice}">${choice.toUpperCase()}</button>`;
    });
    evaluationHTML += `</div><p class="text-sm text-gray-600">Pregunta ${currentQuestionIndex + 1} de ${evaluationQuestions.length}</p>`;
    $("#evaluation-area").html(evaluationHTML);

    $(".evaluation-choice").click(function() {
      const selectedChoice = $(this).data("choice");
      if (selectedChoice === question.correctAnswer) {
        evaluationScore++;
      }
      currentQuestionIndex++;
      loadEvaluationQuestion();
    });
  } else {
    // Evaluation Finished
    const percentage = Math.round((evaluationScore / evaluationQuestions.length) * 100);
    $("#evaluation-area").html(`
      <div class="p-4 mb-4 rounded-lg ${percentage >= 70 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
        <h3 class="font-bold text-lg">Evaluación completada</h3>
        <p>Tu puntuación: ${evaluationScore} / ${evaluationQuestions.length} (${percentage}%)</p>
      </div>
      <div class="flex gap-2">
        <button id="retry-evaluation-btn" class="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-purple-800 transition">
          Intentar de Nuevo
        </button>
      </div>
    `);
    
    $("#retry-evaluation-btn").click(function() {
      currentQuestionIndex = 0;
      evaluationScore = 0;
      loadEvaluationQuestion();
    });
    
    // Guardar resultado para el gráfico
    evaluationScores.push(percentage);
    updateProgressChart();
  }
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

  function loadEvaluationQuestion() {
    if (evaluationTimer) clearInterval(evaluationTimer);

    if (currentQuestionIndex < evaluationQuestions.length) {
      const q = evaluationQuestions[currentQuestionIndex];
      let remainingTime = timePerQuestion;

      let html = `
  <div class="mb-4">
    <h3 class="text-lg font-bold mb-2">${q.question}</h3>
    <div class="time-remaining mb-2 bg-yellow-100 p-2 rounded text-center">
      <span class="font-bold">El tiempo se agota en:</span> 
      <span id="timer-display" class="font-bold text-red-600 text-lg">${remainingTime}s</span>
    </div>
    <div class="grid grid-cols-2 gap-2 mb-4" id="choices-container">`;


q.choices.forEach((c) => {
  html += `
    <button class="evaluation-choice px-4 py-2 bg-primary text-white rounded transition" data-choice="${c}">
      ${c.toUpperCase()}
    </button>`;
});

      html += `</div>
    <div class="flex justify-between items-center text-sm">
      <span>Pregunta ${currentQuestionIndex + 1} / ${evaluationQuestions.length}</span>
    </div>
    <!-- ¡Nuevo! Barra de progreso en tiempo real -->
    <div class="mt-3">
      <div class="flex justify-between mb-1">
        <span class="font-medium">Progreso: ${evaluationScore}/100 puntos</span>
        <span class="font-medium">${evaluationScore}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${evaluationScore}%"></div>
      </div>
    </div>
  </div>`;

      $("#evaluation-area").html(html);

      // Temporizador visual
      evaluationTimer = setInterval(() => {
        remainingTime--;
        const $timer = $("#timer-display");
        $timer.text(`${remainingTime}s`);

        if (remainingTime <= 5) {
          $timer.removeClass("text-yellow-600").addClass("text-red-600 animate-pulse");
        } else if (remainingTime <= 10) {
          $timer.removeClass("text-green-600").addClass("text-yellow-600");
        }

        if (remainingTime <= 0) {
          clearInterval(evaluationTimer);
          handleTimeOut(q);
        }
      }, 1000);

      $(".evaluation-choice").click(function() {
        clearInterval(evaluationTimer);
        const selected = $(this).data("choice");
        const isCorrect = selected === q.correctAnswer;

        $(this).addClass(isCorrect ? "bg-green-500" : "bg-red-500");
        $(".evaluation-choice").prop("disabled", true).addClass("opacity-50");

        $("#choices-container").after(`
          <div class="mt-2 p-2 rounded text-sm ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
            ${isCorrect ? "¡Correcto! +25 puntos" : "Incorrecto: 0 puntos"}: ${q.explanation}
          </div>
        `);

        if (isCorrect) {
           document.dispatchEvent(new CustomEvent('correctAnswer', {
      detail: {
        question: q.question,
        correctAnswer: q.correctAnswer
      }
    }));
    evaluationScore += 25;
  }

        setTimeout(() => {
          currentQuestionIndex++;
          loadEvaluationQuestion();
        }, 1500);
      });

    } else {
      showEvaluationResults();
    }
  }

  function handleTimeOut(q) {
    $(".evaluation-choice").prop("disabled", true).addClass("opacity-50");
    $("#choices-container").after(`
      <div class="mt-2 p-2 rounded bg-yellow-100 text-yellow-800 text-sm">
        ⏱ ¡Tiempo agotado! 0 puntos. Respuesta correcta: <strong>${q.correctAnswer.toUpperCase()}</strong><br>${q.explanation}
      </div>
    `);

    setTimeout(() => {
      currentQuestionIndex++;
      loadEvaluationQuestion();
    }, 2000);
  }

  function showEvaluationResults() {
    // El porcentaje ahora es igual a la puntuación (ya que 100 puntos = 100%)
    const percentage = evaluationScore;
    
    $("#evaluation-area").html(`
      <div class="text-center mb-4">
        <h3 class="text-xl font-bold mb-2">Evaluación completada</h3>
        <p class="mb-2">Tu puntuación: ${evaluationScore} / 100 puntos</p>
        <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div class="bg-primary h-4 rounded-full" style="width: ${percentage}%"></div>
        </div>
        <p class="mb-4">${percentage}% de aciertos</p>
        <div class="flex flex-col sm:flex-row justify-center gap-3">
          <button id="retry-eval" class="px-4 py-2 bg-secondary text-white rounded hover:bg-purple-700">Reintentar</button>
          <button id="submit-eval" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Enviar puntuación</button>
        </div>
      </div>
    `);

    $("#retry-eval").click(() => {
      currentQuestionIndex = 0;
      evaluationScore = 0;
      loadEvaluationQuestion();
    });

    $("#submit-eval").click(() => {
      evaluationAttempt++;
      evaluationScores.push(percentage);
      updateProgressChart();
    });
  }


  // Iniciar evaluación
  $("#evaluation-area").html(`<button id="start-eval" class="px-4 py-2 bg-primary text-white rounded">Comenzar Evaluación</button>`);
  $("#start-eval").click(() => loadEvaluationQuestion());

  // Chart.js - gráfico de progreso
  function updateProgressChart() {
    const ctx = document.getElementById("progress-chart")?.getContext("2d");
    if (!ctx) return;

    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: evaluationScores.map((_, i) => `Intento ${i + 1}`),
        datasets: [{
          label: "Progreso",
          data: evaluationScores,
          borderColor: "rgb(111, 223, 223)",
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

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