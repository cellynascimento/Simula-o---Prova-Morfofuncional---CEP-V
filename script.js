// Carrega o arquivo questions.json
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

      // Se a questão tiver imagem, mostra
      if (q.imagem) {
        html += `<img src="${q.imagem}" alt="Imagem da questão" style="max-width: 100%; border-radius: 8px; margin: 10px 0;">`;
      }

      // Cria as alternativas
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

    // Evento do botão Enviar
    submitBtn.addEventListener('click', () => {
      let acertos = 0;

      perguntas.forEach((q, i) => {
        const selecionada = document.querySelector(`input[name="q${i}"]:checked`);
        if (selecionada && parseInt(selecionada.value) === q.correta) {
          acertos++;
        }
      });

      result.textContent = `Você acertou ${acertos} de ${perguntas.length} questões.`;
    });
  })
  .catch(error => {
    document.getElementById('quiz-container').innerHTML = '<p>Erro ao carregar as perguntas.</p>';
    console.error(error);
  });
