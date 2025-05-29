$(document).ready(function () {
  // --- Lesson Content (Combined) ---
  const lessonContent = {
    1: `<h3>Módulo 1 - Lección 1: La letra 'C'</h3>
        <p><strong>Objetivo:</strong> Comprender el uso correcto de la letra 'C'.</p>
        <p>La letra 'C' representa dos sonidos:</p>
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
    2: `<h3>Módulo 1 - Lección 2: La letra 'S'</h3>
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

    3: `<h3>Módulo 2 - Lección 1: La letra 'Z'</h3>
        <p><strong>Objetivo:</strong> Conocer cómo y cuándo usar la letra 'Z'.</p>
        <p>La 'Z' suena como:</p>
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
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0UXDUbWOQjs?si=W4yY5mStLbOgyLCk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
         `,

    4: `<h3>Módulo 2 - Lección 2: La letra 'X'</h3>
        <p><strong>Objetivo:</strong> Identificar los diferentes sonidos de la 'X'.</p>
        <p>La 'X' puede sonar como:</p>
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

  function loadPracticeQuestion() {
    const wordList = Object.keys(practiceWords);
    currentPracticeWord = wordList[Math.floor(Math.random() * wordList.length)];
    currentPracticeGrapheme = practiceWords[currentPracticeWord].grapheme;

    let practiceHTML = `<p>¿Con qué grafema empieza la palabra <strong>${currentPracticeWord}</strong>?</p>`;
    practiceHTML += `<button class="practice-choice" data-grapheme="c">C</button>`;
    practiceHTML += `<button class="practice-choice" data-grapheme="s">S</button>`;
    practiceHTML += `<button class="practice-choice" data-grapheme="z">Z</button>`;
    practiceHTML += `<button class="practice-choice" data-grapheme="x">X</button>`;
    $("#practice-area").html(practiceHTML);
    practiceAttempts++;

    $(".practice-choice").click(function () {
      const selectedGrapheme = $(this).data("grapheme");
      if (selectedGrapheme === currentPracticeGrapheme) {
        alert("¡Correcto!");
        loadPracticeQuestion();
      } else {
        const reason = practiceWords[currentPracticeWord].reason;
        alert(`¡Incorrecto! ${reason}`); // Display the reason
      }
    });
  }

  loadPracticeQuestion(); // Initial load

  // --- Evaluation Section (Modified for retry) ---
  const evaluationQuestions = [
    {
      question: "¿'Casa' empieza con qué grafema?",
      correctAnswer: "c",
      choices: ["c", "s", "z", "x"],
    },
    {
      question: "¿'Zorro' empieza con qué grafema?",
      correctAnswer: "z",
      choices: ["c", "s", "z", "x"],
    },
    {
      question: "¿'Sopa' empieza con qué grafema?",
      correctAnswer: "s",
      choices: ["c", "s", "z", "x"],
    },
    {
      question: "¿'Taxi' empieza con qué grafema?",
      correctAnswer: "x",
      choices: ["c", "s", "z", "x"],
    },
  ];

  let currentQuestionIndex = 0;
  let evaluationScore = 0;
  let evaluationAttempt = 0;

  function loadEvaluationQuestion() {
    if (currentQuestionIndex < evaluationQuestions.length) {
      const question = evaluationQuestions[currentQuestionIndex];
      let evaluationHTML = `<p>${question.question}</p>`;
      question.choices.forEach((choice) => {
        evaluationHTML += `<button class="evaluation-choice" data-choice="${choice}">${choice}</button>`;
      });
      $("#evaluation-area").html(evaluationHTML);

      $(".evaluation-choice").click(function () {
        const selectedChoice = $(this).data("choice");
        if (selectedChoice === question.correctAnswer) {
          evaluationScore++;
        }
        currentQuestionIndex++;
        loadEvaluationQuestion();
      });

      $("#submit-evaluation").hide(); // Hide submit button
    } else {
      // Evaluation Finished
      $("#evaluation-area")
        .html(`<p>Evaluación completada. Tu puntuación: ${evaluationScore} / ${evaluationQuestions.length}</p>
                                         <button id="retry-evaluation-btn">Intentar de Nuevo</button>`);
      $("#submit-evaluation").show();

      $("#retry-evaluation-btn").click(function () {
        currentQuestionIndex = 0;
        evaluationScore = 0;
        loadEvaluationQuestion();
        $("#submit-evaluation").hide();
      });
    }
  }

  // Evaluation submit handler
  $("#submit-evaluation").click(function () {
    evaluationAttempt++; // Increment the attempt

    let scorePercentage = (evaluationScore / evaluationQuestions.length) * 100;
    evaluationScores.push(scorePercentage);

    updateProgressChart();

    alert(
      `Evaluación enviada (Intento #${evaluationAttempt}). Tu puntuación se ha registrado.`
    );
  });

  // Evaluation start handler
  $("#evaluation-area").html(
    `<button id="start-evaluation-btn">Comenzar Evaluación</button>`
  );

  $("#start-evaluation-btn").click(function () {
    currentQuestionIndex = 0;
    evaluationScore = 0;
    evaluationAttempt = 0;
    loadEvaluationQuestion();
    $("#submit-evaluation").hide();
  });

  // --- Chart logic (Modified labels) ---
  let evaluationScores = [];
  let myChart;

  function updateProgressChart() {
    const ctx = document.getElementById("progress-chart").getContext("2d");

    if (myChart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: evaluationScores.map((score, index) => `Intento #${index + 1}`),
        datasets: [
          {
            label: "Puntuación de Evaluación",
            data: evaluationScores,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });
  }
  // Combined .start-lesson click handler
let currentLessonId = null;

$('.start-lesson').on('click', function () {
    const lessonId = $(this).data('lesson');

    if (currentLessonId === lessonId) {
        // Si se hace clic de nuevo en la misma lección, ocúltala
        $('#lesson-content-area').html('');
        currentLessonId = null;
    } else {
        // Mostrar la nueva lección
        const content = lessonContent[lessonId];
        $('#lesson-content-area').html(content);
        currentLessonId = lessonId;
    }
});


  // Initial load
  updateProgressChart();
});
