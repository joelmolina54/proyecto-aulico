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
    iniciarAnimacion3D(); 
  }, 1500);
}

function mostrarResultado() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");
 document.getElementById("final-score").innerHTML = `
  🎉 <strong>¡Evaluación finalizada!</strong><br>
  Obtuviste <span class="text-[#7952b3] text-2xl font-bold">${puntos} puntos</span> en el grafema <span class="uppercase">${grafemaActual}</span>.
`;

}

document.getElementById("send-score-btn").addEventListener("click", () => {
  puntuacionesPorGrafema[grafemaActual].push(puntos);
  updateProgressChart();
  document.getElementById("result-box").classList.add("hidden");
});

function updateProgressChart() {
  const ctx = document.getElementById("progress-chart")?.getContext("2d");
if (!ctx) return;

  if (myChart) myChart.destroy();

  const datasets = Object.keys(puntuacionesPorGrafema).map(grafema => ({
    label: `Grafema ${grafema}`,
    data: puntuacionesPorGrafema[grafema],
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
  const evaluationSection = document.getElementById("evaluation-area");

  const startBtn = document.createElement("button");
  startBtn.textContent = "Comenzar Evaluación";
  startBtn.className = "bg-[#7952b3] hover:bg-purple-800 text-white px-6 py-3 rounded-lg text-lg font-semibold mb-4";
  startBtn.addEventListener("click", () => {
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
// ⬇️ Deja esta función afuera para que pueda ser llamada desde cualquier parte del script
function iniciarAnimacion3D() {
  const container = document.getElementById("three-animation");
  container.innerHTML = "";

  if (container.clientWidth === 0 || container.clientHeight === 0) {
    container.style.width = "100%";
    container.style.height = "300px";
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(10, 10, 10);
  scene.add(light);

  const letras = ["C", "S", "Z", "X"];
  const letras3D = [];

  const fontLoader = new THREE.FontLoader();
  fontLoader.load("https://threejs.org/examples/fonts/helvetiker_bold.typeface.json", function (font) {
    letras.forEach((letra, index) => {
      const geometry = new THREE.TextGeometry(letra, {
        font: font,
        size: 3,
        height: 0.4,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 5,
      });

      const material = new THREE.MeshStandardMaterial({ color: 0x7952b3 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (index - 1.5) * 6;
      mesh.position.y = 0;
      letras3D.push(mesh);
      scene.add(mesh);
    });

    animate();
  });

  camera.position.z = 20;

  function animate() {
    requestAnimationFrame(animate);
    letras3D.forEach((letra) => {
      letra.rotation.x += 0.01;
      letra.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
  }
}
