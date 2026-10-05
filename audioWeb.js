/* =========================================
   AMBIENTE DE LA PÁGINA WEB
   ========================================= */

const ambienteWeb = new Audio("audio/ambiente_web.wav");

ambienteWeb.loop = true;
ambienteWeb.volume = 0.25;

let ambienteWebIniciado = false;

function iniciarAmbienteWeb() {
    if (ambienteWebIniciado) return;

    ambienteWeb.play()
        .then(function() {
            ambienteWebIniciado = true;
        })
        .catch(function() {
            // El navegador bloqueó el autoplay.
        });
}

// Intentar iniciar apenas carga la página
iniciarAmbienteWeb();

// Si el navegador bloqueó el autoplay,
// iniciar con la primera interacción.
document.addEventListener("click", iniciarAmbienteWeb, { once: true });
document.addEventListener("touchstart", iniciarAmbienteWeb, { once: true });