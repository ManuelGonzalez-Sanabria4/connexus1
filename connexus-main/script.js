/* =========================================
   DATOS DE LAS 10 TARJETAS
   ========================================= */

const tarjetas = [
    {
        id: 1,
        par: "A",
        frente: "assets/carta01_frente.png",
        dorso: "assets/carta01_dorso.png"
    },
    {
        id: 2,
        par: "B",
        frente: "assets/carta02_frente.png",
        dorso: "assets/carta02_dorso.png"
    },
    {
        id: 3,
        par: "C",
        frente: "assets/carta03_frente.png",
        dorso: "assets/carta03_dorso.png"
    },
    {
        id: 4,
        par: "D",
        frente: "assets/carta04_frente.png",
        dorso: "assets/carta04_dorso.png"
    },
    {
        id: 5,
        par: "A",
        frente: "assets/carta05_frente.png",
        dorso: "assets/carta05_dorso.png"
    },
    {
        id: 6,
        par: "E",
        frente: "assets/carta06_frente.png",
        dorso: "assets/carta06_dorso.png"
    },
    {
        id: 7,
        par: "B",
        frente: "assets/carta07_frente.png",
        dorso: "assets/carta07_dorso.png"
    },
    {
        id: 8,
        par: "C",
        frente: "assets/carta08_frente.png",
        dorso: "assets/carta08_dorso.png"
    },
    {
        id: 9,
        par: "D",
        frente: "assets/carta09_frente.png",
        dorso: "assets/carta09_dorso.png"
    },
    {
        id: 10,
        par: "E",
        frente: "assets/carta10_frente.png",
        dorso: "assets/carta10_dorso.png"
    }
];


/* =========================================
   VARIABLES DEL JUEGO
   ========================================= */

let primeraTarjeta = null;
let segundaTarjeta = null;

let bloqueado = false;

let paresEncontrados = 0;

let ganaste = false;


/* =========================================
   CONTRASEÑA
   ========================================= */

const CONTRASENA = "CONNEXUS";


/* =========================================
   AUDIO
   ========================================= */

/*
 * Ambiente general del minijuego.
 * Se repite constantemente.
 */

const ambienteMinijuego = new Audio("audio/ambiente_minijuego.wav");
ambienteMinijuego.loop = true;
ambienteMinijuego.volume = 0.25;

const sonidoTarjeta = new Audio("audio/tarjeta.wav");
const sonidoPareja = new Audio("audio/pareja.wav");
const sonidoGanaste = new Audio("audio/ganaste.wav");

sonidoTarjeta.volume = 0.7;
sonidoPareja.volume = 0.8;
sonidoGanaste.volume = 0.9;

let ambienteIniciado = false;

function iniciarAmbiente() {
    if (ambienteIniciado) return;

    ambienteMinijuego.play()
        .then(function() {
            ambienteIniciado = true;
        })
        .catch(function() {
            // El navegador bloqueó el autoplay.
            // Se intentará nuevamente al interactuar.
        });
}

// Intentar iniciar apenas carga la página
iniciarAmbiente();

// Si el navegador bloqueó el autoplay,
// comenzar con la primera interacción.
document.addEventListener("click", iniciarAmbiente, { once: true });
document.addEventListener("touchstart", iniciarAmbiente, { once: true });


/* =========================================
   REPRODUCIR SONIDO DE TARJETA
   ========================================= */

function reproducirSonidoTarjeta() {

    /*
     * Reiniciamos el sonido para que
     * pueda volver a reproducirse
     * rápidamente.
     */

    sonidoTarjeta.currentTime = 0;

    sonidoTarjeta.play()
        .catch(function() {});
}


/* =========================================
   REPRODUCIR SONIDO DE PAREJA
   ========================================= */

function reproducirSonidoPareja() {

    sonidoPareja.currentTime = 0;

    sonidoPareja.play()
        .catch(function() {});
}


/* =========================================
   DATOS HTML
   ========================================= */

const inputContrasena =
    document.getElementById("input-contrasena");

const botonDesbloquear =
    document.getElementById("boton-desbloquear");

const popupContrasena =
    document.getElementById("popup-contrasena");

const contrasenaMostrada =
    document.getElementById("contrasena-mostrada");

const botonCopiar =
    document.getElementById("boton-copiar");

const botonCerrarPopup =
    document.getElementById("boton-cerrar-popup");

const tablero =
    document.getElementById("memotest");


/* =========================================
   MEZCLAR TARJETAS
   ========================================= */

function mezclar(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
            [array[j], array[i]];
    }
}


/* =========================================
   CREAR TABLERO
   ========================================= */

function crearTablero() {

    bloqueado = true;

    mezclar(tarjetas);

    tarjetas.forEach(function(datos) {

        const tarjeta =
            document.createElement("div");

        tarjeta.classList.add("tarjeta");

        tarjeta.dataset.par =
            datos.par;


        /* ---------------------------------
           INTERIOR
           --------------------------------- */

        const tarjetaInner =
            document.createElement("div");

        tarjetaInner.classList.add(
            "tarjeta-inner"
        );


        /* ---------------------------------
           DORSO
           --------------------------------- */

        const dorso =
            document.createElement("div");

        dorso.classList.add(
            "cara",
            "dorso"
        );


        const imagenDorso =
            document.createElement("img");

        imagenDorso.src =
            datos.dorso;

        imagenDorso.alt =
            "Carta";


        dorso.appendChild(
            imagenDorso
        );


        /* ---------------------------------
           FRENTE
           --------------------------------- */

        const frente =
            document.createElement("div");

        frente.classList.add(
            "cara",
            "frente"
        );


        const imagenFrente =
            document.createElement("img");

        imagenFrente.src =
            datos.frente;

        imagenFrente.alt =
            "Carta descubierta";


        frente.appendChild(
            imagenFrente
        );


        /* ---------------------------------
           ARMAR TARJETA
           --------------------------------- */

        tarjetaInner.appendChild(
            dorso
        );

        tarjetaInner.appendChild(
            frente
        );

        tarjeta.appendChild(
            tarjetaInner
        );

        tablero.appendChild(
            tarjeta
        );


        /* ---------------------------------
           CLICK
           --------------------------------- */

        tarjeta.addEventListener(
            "click",
            function() {

                seleccionarTarjeta(
                    tarjeta
                );

            }
        );

    });


    mostrarPreviewInicial();
}


/* =========================================
   PREVIEW INICIAL
   ========================================= */

function mostrarPreviewInicial() {

    const todasLasTarjetas =
        document.querySelectorAll(
            ".tarjeta"
        );


    /*
     * Las cartas se descubren
     * progresivamente.
     */

    todasLasTarjetas.forEach(
        function(tarjeta, indice) {

            setTimeout(
                function() {

                    tarjeta.classList.add(
                        "girada"
                    );

                },
                indice * 70
            );

        }
    );


    const tiempoDescubrimiento =
        (todasLasTarjetas.length - 1) * 70
        + 500;


    /*
     * Después de mostrarlas,
     * esperamos un momento y
     * comenzamos a ocultarlas.
     */

    setTimeout(
        function() {

            todasLasTarjetas.forEach(
                function(tarjeta, indice) {

                    setTimeout(
                        function() {

                            tarjeta.classList.remove(
                                "girada"
                            );

                        },
                        indice * 50
                    );

                }
            );


            /*
             * Habilitamos el juego
             * cuando termina el preview.
             */

            setTimeout(
                function() {

                    bloqueado = false;

                },
                todasLasTarjetas.length * 50
                + 500
            );

        },
        tiempoDescubrimiento + 700
    );
}


/* =========================================
   SELECCIONAR TARJETA
   ========================================= */

function seleccionarTarjeta(tarjeta) {

    if (bloqueado) return;

    if (
        tarjeta.classList.contains(
            "encontrada"
        )
    ) {
        return;
    }

    if (tarjeta === primeraTarjeta) {
        return;
    }


    /*
     * La primera interacción del jugador
     * inicia el ambiente.
     */

    iniciarAmbiente();


    /*
     * Sonido de carta.
     */

    reproducirSonidoTarjeta();


    /*
     * Giramos la carta.
     */

    mostrarFrente(
        tarjeta
    );


    /*
     * Primera carta.
     */

    if (primeraTarjeta === null) {

        primeraTarjeta =
            tarjeta;

        return;
    }


    /*
     * Segunda carta.
     */

    segundaTarjeta =
        tarjeta;


    comprobarPareja();
}


/* =========================================
   MOSTRAR FRENTE
   ========================================= */

function mostrarFrente(tarjeta) {

    tarjeta.classList.add(
        "girada"
    );
}


/* =========================================
   MOSTRAR DORSO
   ========================================= */

function mostrarDorso(tarjeta) {

    tarjeta.classList.remove(
        "girada"
    );
}


/* =========================================
   COMPROBAR PAREJA
   ========================================= */

function comprobarPareja() {

    const parPrimera =
        primeraTarjeta.dataset.par;

    const parSegunda =
        segundaTarjeta.dataset.par;


    /* =====================================
       PAREJA CORRECTA
       ===================================== */

    if (
        parPrimera === parSegunda
    ) {

        primeraTarjeta.classList.add(
            "encontrada"
        );

        segundaTarjeta.classList.add(
            "encontrada"
        );


        /*
         * Animación de pareja.
         */

        primeraTarjeta.classList.add(
            "pareja-encontrada"
        );

        segundaTarjeta.classList.add(
            "pareja-encontrada"
        );


        /*
         * Sonido de pareja.
         */

        reproducirSonidoPareja();


        /*
         * Sumamos la pareja.
         */

        paresEncontrados++;


        /*
         * Comprobamos victoria.
         */

        comprobarVictoria();


        /*
         * Limpiamos selección.
         */

        resetearSeleccion();

    }


    /* =====================================
       PAREJA INCORRECTA
       ===================================== */

    else {

        bloqueado = true;


        /*
         * Animación de error.
         */

        primeraTarjeta.classList.add(
            "error"
        );

        segundaTarjeta.classList.add(
            "error"
        );


        setTimeout(
            function() {

                primeraTarjeta.classList.remove(
                    "error"
                );

                segundaTarjeta.classList.remove(
                    "error"
                );


                mostrarDorso(
                    primeraTarjeta
                );

                mostrarDorso(
                    segundaTarjeta
                );


                resetearSeleccion();

            },
            1000
        );
    }
}


/* =========================================
   RESETEAR SELECCIÓN
   ========================================= */

function resetearSeleccion() {

    primeraTarjeta =
        null;

    segundaTarjeta =
        null;

    bloqueado =
        false;
}


/* =========================================
   VICTORIA
   ========================================= */

function comprobarVictoria() {

    if (
        paresEncontrados === 5
    ) {

        ganaste =
            true;


        console.log(
            "¡Ganaste el memotest!"
        );

        console.log(
            "ganaste =",
            ganaste
        );


        /* ---------------------------------
           DETENER AMBIENTE
           --------------------------------- */

        ambienteMinijuego.pause();

        ambienteMinijuego.currentTime = 0;


        /* ---------------------------------
           REPRODUCIR MÚSICA DE VICTORIA
           --------------------------------- */

        sonidoGanaste.currentTime = 0;

        sonidoGanaste.play()
            .catch(function() {});


        /* ---------------------------------
           DESBLOQUEAR CONTRASEÑA
           --------------------------------- */

        inputContrasena.disabled =
            false;

        botonDesbloquear.disabled =
            false;


        contrasenaMostrada.textContent =
            CONTRASENA;


        popupContrasena.classList.add(
            "visible"
        );
    }
}


/* =========================================
   COPIAR CONTRASEÑA
   ========================================= */

botonCopiar.addEventListener(
    "click",
    function() {

        navigator.clipboard.writeText(
            CONTRASENA
        );


        botonCopiar.textContent =
            "¡Copiada!";


        setTimeout(
            function() {

                botonCopiar.textContent =
                    "Copiar contraseña";

            },
            1500
        );
    }
);


/* =========================================
   CERRAR POPUP
   ========================================= */

botonCerrarPopup.addEventListener(
    "click",
    function() {

        popupContrasena.classList.remove(
            "visible"
        );

    }
);


/* =========================================
   DESBLOQUEAR
   ========================================= */

botonDesbloquear.addEventListener(
    "click",
    function() {

        if (!ganaste) return;


        const respuesta =
            inputContrasena.value;


        if (
            respuesta === CONTRASENA
        ) {

            document.body.classList.add(
                "fade-out"
            );


            setTimeout(
                function() {

                    window.location.href = "web.html";

                },
                600
            );

        }

        else {

            alert(
                "Contraseña incorrecta."
            );

            inputContrasena.value =
                "";
        }

    }
);


/* =========================================
   INICIAR JUEGO
   ========================================= */

crearTablero();

window.addEventListener("pageshow", function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});
