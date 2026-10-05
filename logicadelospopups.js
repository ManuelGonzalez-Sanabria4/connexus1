document.addEventListener('DOMContentLoaded', () => {
    const btnQuienes = document.getElementById('btn-quienes');
    const btnInvitacion = document.getElementById('btn-invitacion');
    const modalQuienes = document.getElementById('modal-quienes');
    const modalInvitacion = document.getElementById('modal-invitacion');
    const botonesSalir = document.querySelectorAll('.btn-cerrar-modal');

    // Abre "Quiénes Somos"
    btnQuienes.addEventListener('click', () => {
        modalQuienes.classList.add('activo');
    });

    // Abre "Invitación"
    btnInvitacion.addEventListener('click', () => {
        modalInvitacion.classList.add('activo');
    });

    // Cierra cualquier ventana al tocar "Salir"
    botonesSalir.forEach(boton => {
        boton.addEventListener('click', () => {
            modalQuienes.classList.remove('activo');
            modalInvitacion.classList.remove('activo');
        });
    });
});