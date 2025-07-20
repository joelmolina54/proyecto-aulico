  let correctas = 0;

  function evaluar(btnsId, correctIndex, feedbackId, retryId, clickedIndex) {
    const botones = document.querySelectorAll(`#${btnsId} button`);
    const feedback = document.getElementById(feedbackId);
    const retry = document.getElementById(retryId);

    botones.forEach((btn, i) => {
      btn.disabled = true;
      btn.classList.remove('bg-green-500', 'bg-red-500');
      btn.innerHTML = btn.textContent; // Limpiar íconos previos
    });

    // Marcar la opción correcta
    botones[correctIndex].classList.add('bg-green-500');
    botones[correctIndex].innerHTML = `✔️ ${botones[correctIndex].textContent}`;

    if (clickedIndex === correctIndex) {
      feedback.innerHTML = "<span class='text-green-600'>¡Correcto! ✔️</span>";
      retry.classList.add("hidden");
      correctas++;
      if (correctas === 2) {
        document.getElementById("felicitacion").classList.remove("hidden");
      }
    } else {
      // Marcar la opción incorrecta
      botones[clickedIndex].classList.add('bg-red-500');
      botones[clickedIndex].innerHTML = `❌ ${botones[clickedIndex].textContent}`;
      feedback.innerHTML = "<span class='text-red-600'>No es la respuesta correcta. ❌</span>";
      retry.classList.remove("hidden");
    }
  }

  // Eventos para Actividad 1
  document.querySelectorAll('#actividad1 button').forEach((btn, i) => {
    btn.addEventListener('click', () => evaluar('actividad1', 2, 'feedback1', 'retry1', i));
  });

  // Eventos para Actividad 2
  document.querySelectorAll('#actividad2 button').forEach((btn, i) => {
    btn.addEventListener('click', () => evaluar('actividad2', 2, 'feedback2', 'retry2', i));
  });

function reiniciar(num) {
  const actId = `actividad${num}`;
  const retryId = `retry${num}`;
  const feedbackId = `feedback${num}`;

  document.querySelectorAll(`#${actId} button`).forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('bg-green-500', 'bg-red-500');
    // Restaurar el texto sin los iconos
    btn.textContent = btn.textContent.replace("✔️", "").replace("❌", "").trim();
  });

  document.getElementById(feedbackId).innerHTML = "";
  document.getElementById(retryId).classList.add("hidden");
}

