const preguntasPorGrafema = {
  C: [
    { pregunta: "¿Cuál contiene el grafema C?", opciones: ["Sapo", "Casa", "Zanahoria"], correcta: 1 },
    { pregunta: "¿Qué palabra lleva C?", opciones: ["Sal", "Cielo", "Zapato"], correcta: 1 }
  ],
  S: [
    { pregunta: "¿Dónde hay S?", opciones: ["Casa", "Cebra", "Silla"], correcta: 2 },
    { pregunta: "¿Palabra con S?", opciones: ["Taza", "Sopa", "Cielo"], correcta: 1 }
  ],
  Z: [
    { pregunta: "¿Cuál tiene Z?", opciones: ["Zorro", "Perro", "Casa"], correcta: 0 },
    { pregunta: "¿Dónde hay Z?", opciones: ["Mesa", "Zapato", "Cama"], correcta: 1 }
  ],
  X: [
    { pregunta: "¿Cuál tiene X?", opciones: ["Examen", "Camino", "Zanahoria"], correcta: 0 },
    { pregunta: "¿Dónde hay X?", opciones: ["Taxi", "Taza", "Casa"], correcta: 0 }
  ]
};

let preguntasActuales = [];
let indicePregunta = 0;
let puntos = 0;
let tiempoRestante = 15;
let timer;
let grafemaActual = "";
let puntuacionesPorGrafema = { C: [], S: [], Z: [], X: [] };
let myChart;

function playAnimation(container) {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center space-y-4">
      <div class="relative w-24 h-24">
        <div class="absolute top-0 left-0 w-full h-full animate-spin-slow rounded-full border-t-4 border-[#7952b3]"></div>
        <div class="absolute inset-0 flex items-center justify-center font-bold text-3xl text-[#7952b3]">
          📖
        </div>
      </div>
      <div class="text-center animate-bounce text-xl text-[#7952b3] font-semibold">
        COMENZANDO CON LA PRUEBA DE GRAFEMAS...
      </div>
    </div>
  `;
}



function iniciarEvaluacion(grafema) {
  grafemaActual = grafema;
  preguntasActuales = [...preguntasPorGrafema[grafema]];
  indicePregunta = 0;
  puntos = 0;
  document.getElementById("grafema-selection").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  mostrarPregunta();
}

function mostrarPregunta() {
  if (indicePregunta >= preguntasActuales.length) {
    mostrarResultado();
    return;
  }

  const pregunta = preguntasActuales[indicePregunta];
  document.getElementById("question-text").textContent = pregunta.pregunta;

  const opcionesContainer = document.getElementById("options");
  opcionesContainer.innerHTML = "";
  pregunta.opciones.forEach((op, i) => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.className = "block w-full text-left px-4 py-2 border rounded bg-white hover:bg-purple-100 transition";
    btn.style.borderColor = "#7952b3";
    btn.addEventListener("click", () => verificarRespuesta(i));
    opcionesContainer.appendChild(btn);
  });

  iniciarTemporizador();
}

function iniciarTemporizador() {
  tiempoRestante = 15;
  actualizarTimer();
  clearInterval(timer);
  timer = setInterval(() => {
    tiempoRestante--;
    actualizarTimer();
    if (tiempoRestante <= 0) {
      clearInterval(timer);
      mostrarFeedback(false, "⏰ Tiempo agotado. No ganaste puntos.");
    }
  }, 1000);
}

function actualizarTimer() {
  const timerEl = document.getElementById("timer");
  timerEl.textContent = `⏱️ Tiempo: ${tiempoRestante}s`;

  if (tiempoRestante <= 5) {
    timerEl.classList.add("text-red-600", "font-bold", "animate-pulse");
  } else {
    timerEl.classList.remove("text-red-600", "font-bold", "animate-pulse");
  }
}

function verificarRespuesta(seleccion) {
  clearInterval(timer);
  const correcta = preguntasActuales[indicePregunta].correcta;
  if (seleccion === correcta) {
    puntos += 25;
    mostrarFeedback(true, "✅ ¡Correcto! Has ganado 25 puntos.");
  } else {
    mostrarFeedback(false, "❌ Incorrecto. No ganaste puntos.");
  }
}

function mostrarFeedback(acierto, mensaje) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = mensaje;
  feedback.className = acierto ? "text-green-600" : "text-red-600";
  setTimeout(() => {
    indicePregunta++;
    feedback.textContent = "";
    mostrarPregunta();
  }, 1500);
}

function mostrarResultado() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");
 document.getElementById("final-score").innerHTML = `
  🎉 <strong>¡Evaluación finalizada!</strong><br>
  Obtuviste <span class="text-[#7952b3] text-2xl font-bold">${puntos} puntos</span> en el grafema <span class="uppercase">${grafemaActual}</span>.
`;
document.getElementById("start-eval-btn").classList.remove("hidden");

}

document.getElementById("send-score-btn").addEventListener("click", () => {
  puntuacionesPorGrafema[grafemaActual].push({
    puntos,
    fecha: new Date().toLocaleString()
  });
  updateProgressChart();
  document.getElementById("result-box").classList.add("hidden");

  // ✅ Mostramos el botón para que pueda volver a evaluar
  document.getElementById("start-eval-btn").classList.remove("hidden");
});


function updateProgressChart() {
  const ctx = document.getElementById("progress-chart")?.getContext("2d");
if (!ctx) return;

  if (myChart) myChart.destroy();

  const datasets = Object.keys(puntuacionesPorGrafema).map(grafema => ({
    label: `Grafema ${grafema}`,
    data: puntuacionesPorGrafema[grafema].map(p => p.puntos),
    borderColor: grafema === "C" ? "#7952b3" :
                 grafema === "S" ? "#f39c12" :
                 grafema === "Z" ? "#e74c3c" : "#1abc9c",
    fill: false,
    tension: 0.3
  }));

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from({length: Math.max(...Object.values(puntuacionesPorGrafema).map(arr => arr.length))}, (_, i) => `Intento ${i + 1}`),
      datasets
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const animationContainer = document.getElementById("animation-container");
  const grafemaSelection = document.getElementById("grafema-selection");
  const threeContainer = document.getElementById("three-container");
  const evaluationSection = document.getElementById("evaluation-area");

  const startBtn = document.createElement("button");
  startBtn.textContent = "Comenzar Evaluación";
  startBtn.id = "start-eval-btn"; // ✅ AGREGA ESTE ID
  startBtn.className = "bg-[#7952b3] hover:bg-purple-800 text-white px-6 py-3 rounded-lg text-lg font-semibold mb-4";
  startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden"); // ⬅️ Ocultamos el botón
    animationContainer.classList.remove("hidden");
    playAnimation(animationContainer);
    setTimeout(() => {
      animationContainer.classList.add("hidden");
      grafemaSelection.classList.remove("hidden");
    }, 3000);
  });

  evaluationSection.insertBefore(startBtn, animationContainer);

  document.querySelectorAll(".grafema-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const grafema = e.target.dataset.grafema;
      iniciarEvaluacion(grafema);
    });
  });


});
