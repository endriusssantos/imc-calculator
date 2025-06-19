const form = document.getElementById("form");
const inputWeight = document.getElementById("weight");
const inputHeight = document.getElementById("height");
const btnRestart = document.getElementById("btn-restart");
const resultContainer = document.getElementById("result-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const weight = parseFloat(inputWeight.value.trim().replace(",", "."));
  let height = parseFloat(inputHeight.value.trim().replace(",", "."));
  if (height > 3) height = height / 100;

  if (isNaN(weight) || isNaN(height) || height <= 0) {
    showError("Insira números válidos ou preencha todos os campos!");
    return;
  }

  const imcValue = weight / (height * height);
  const imcFixed = imcValue.toFixed(2);
  const phrase = getIMCMessage(imcValue);

  showResult(imcFixed, phrase);
});

btnRestart.addEventListener("click", () => {
  clearInputs();
  resultContainer.innerHTML = "";
});

function clearInputs() {
  inputWeight.value = "";
  inputHeight.value = "";
}

function showResult(imcFixed, phrase) {
  resultContainer.innerHTML = `
  <h2 class="title-result">Seu IMC é:</h2>
  <p class="result">${imcFixed}</p>
  <p class="phrase-result">${phrase}</p>
  `;
}

function showError(msg) {
  resultContainer.innerHTML = `<p class="phrase-result" style="color:red; text-align:center">${msg}</p>`;
}

function getIMCMessage(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso normal ✅";
  if (imc < 30) return "Sobrepeso ⚠️";
  if (imc < 35) return "Obesidade grau 1 ⚠️";
  if (imc < 40) return "Obesidade grau 2 ⚠️";
  return "Obesidade grau 3 ❗";
}
