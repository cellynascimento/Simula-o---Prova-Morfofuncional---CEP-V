// === CONFIGURAÇÃO DO TEMPO ===
// 30 minutos = 1800 segundos  (altere se quiser mais tempo)
let tempoRestante = 1800; 
let contagem; 

// === CRONÔMETRO ===
function iniciarCronometro() {
  const timerEl = document.getElementById('timer');

  contagem = setInterval(() => {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;

    // Atualiza o texto na tela
    timerEl.textContent = `⏱️ Tempo restante: ${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    // Quando o tempo acabar
    if (tempoRestante <= 0) {
      clearInterval(contagem);
      finalizarAutomaticamente();
    } else {
      tempoRestante--;
    }
  }, 1000);
}

// === FUNÇÃO DE FINALIZAÇÃO AUTOMÁTICA ===
function finalizarAutomaticamente() {
  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  document.getElementById('result').textContent = "⏰ Tempo esgotado! Suas respostas foram bloqueadas.";
}

// === CARREGAR PERGUNTAS ===
fetch('questions.json')
  .then(response => response.json())
  .then(perguntas => {
    const container = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit-btn');
    const result = document.getElementById('result');

    // Cria as perguntas dinamicamente
    perguntas.forEach((q, i) => {
      const div = document.createElement('div');
      div.classList.add('question');

      let html = `<h3>${q.pergunta}</h3>`;

      // Se houver imagem, adiciona
      if (q.imagem) {
        html += `<img src="${q.imagem}" alt="Imagem da questão" style="max-width: 100%; border-radius: 8px; margin: 10px 0;">`;
      }

      // Alternativas
      q.alternativas.forEach((alt, index) => {
        html += `
          <label>
            <input type="radio" name="q${i}" value="${index}">
            ${alt}
          </label><br>
        `;
      });

      div.innerHTML = html;
      container.appendChild(div);
    });

    // Botão Enviar
    submitBtn.addEventListener('click', () => {
      clearInterval(contagem); // Para o cronômetro ao enviar
      let acertos = 0;

      perguntas.forEach((q, i) => {
        const selecionada = document.querySelector(`input[name="q${i}"]:checked`);
        if (selecionada && parseInt(selecionada.value) === q.correta) {
          acertos++;
        }
      });

      result.textContent = `✅ Você acertou ${acertos} de ${perguntas.length} questões.`;
      submitBtn.disabled = true;
    });

    // Inicia o cronômetro assim que o simulado carregar
    iniciarCronometro();
  })
  .catch(error => {
    document.getElementById('quiz-container').innerHTML = '<p>Erro ao carregar as perguntas.</p>';
    console.error(error);
  });
