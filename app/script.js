const promptInput = document.getElementById("prompt");
const formatInput = document.getElementById("format");
const durationInput = document.getElementById("duration");

const generateButton = document.getElementById("generateButton");
const status = document.getElementById("status");
const preview = document.getElementById("preview");

const referenceImagesInput =
  document.getElementById("referenceImages");

const imagePreview =
  document.getElementById("imagePreview");

let referenceImages = [];


/*
 * SELEÇÃO DE IMAGENS
 */

referenceImagesInput.addEventListener("change", handleImageSelection);


function handleImageSelection(event) {

  const files = Array.from(event.target.files);

  if (!files.length) {
    return;
  }

  const validFiles = files.filter(file =>
    file.type.startsWith("image/")
  );

  referenceImages = [
    ...referenceImages,
    ...validFiles
  ];

  renderImagePreview();

  referenceImagesInput.value = "";
}


/*
 * MOSTRAR MINIATURAS
 */

function renderImagePreview() {

  imagePreview.innerHTML = "";

  referenceImages.forEach((file, index) => {

    const reader = new FileReader();

    reader.onload = function(event) {

      const item = document.createElement("div");

      item.className = "image-preview-item";

      item.innerHTML = `
        <img
          src="${event.target.result}"
          alt="Imagem de referência ${index + 1}"
        >

        <button
          type="button"
          class="remove-image"
          data-index="${index}"
        >
          ×
        </button>

        <span>
          ${index + 1}
        </span>
      `;

      imagePreview.appendChild(item);

      const removeButton =
        item.querySelector(".remove-image");

      removeButton.addEventListener("click", () => {

        removeImage(index);

      });

    };

    reader.readAsDataURL(file);

  });

}


/*
 * REMOVER IMAGEM
 */

function removeImage(index) {

  referenceImages.splice(index, 1);

  renderImagePreview();

}


/*
 * GERAR VÍDEO
 */

generateButton.addEventListener("click", generateVideo);


function generateVideo() {

  const prompt = promptInput.value.trim();

  if (!prompt) {

    status.textContent =
      "⚠️ Escreva uma descrição para o vídeo primeiro.";

    promptInput.focus();

    return;
  }


  const format = formatInput.value;

  const duration = durationInput.value;


  generateButton.disabled = true;

  generateButton.textContent =
    "⏳ Preparando...";


  status.textContent =
    "Analisando seu prompt e imagens...";


  preview.innerHTML = `
    <div class="preview-placeholder">

      <span>🤖</span>

      <p>
        Preparando geração...
      </p>

    </div>
  `;


  setTimeout(() => {

    status.textContent =
      `Prompt recebido • ${referenceImages.length} imagem(ns) • ${duration}s • formato ${format}`;


    preview.innerHTML = `
      <div class="preview-placeholder">

        <span>🎬</span>

        <p>
          Motor de vídeo ainda não conectado.
        </p>

        <small>
          ${referenceImages.length}
          imagem(ns) de referência recebida(s).
        </small>

      </div>
    `;


    generateButton.disabled = false;

    generateButton.textContent =
      "✨ Gerar vídeo";


  }, 1500);

}