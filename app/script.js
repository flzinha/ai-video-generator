const promptInput = document.getElementById("prompt");
const formatInput = document.getElementById("format");
const durationInput = document.getElementById("duration");
const generateButton = document.getElementById("generateButton");
const status = document.getElementById("status");
const preview = document.getElementById("preview");

generateButton.addEventListener("click", generateVideo);

function generateVideo() {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    status.textContent = "⚠️ Escreva uma descrição para o vídeo primeiro.";
    promptInput.focus();
    return;
  }

  const format = formatInput.value;
  const duration = durationInput.value;

  generateButton.disabled = true;
  generateButton.textContent = "⏳ Preparando...";
  
  status.textContent = "Analisando seu prompt...";

  preview.innerHTML = `
    <div class="preview-placeholder">
      <span>🤖</span>
      <p>Preparando geração...</p>
    </div>
  `;

  setTimeout(() => {

    status.textContent =
      `Prompt recebido • ${duration}s • formato ${format}`;

    preview.innerHTML = `
      <div class="preview-placeholder">
        <span>🎬</span>
        <p>Motor de vídeo ainda não conectado.</p>
        <small>
          Sua ideia foi recebida com sucesso.
        </small>
      </div>
    `;

    generateButton.disabled = false;
    generateButton.textContent = "✨ Gerar vídeo";

  }, 1500);
}