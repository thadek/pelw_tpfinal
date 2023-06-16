document.addEventListener('DOMContentLoaded', function () {

    const formulario = document.getElementById('formulario')
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const asunto = document.getElementById('asunto');
        const mensaje = document.getElementById('mensaje');

        const errorValidacion = validarCampos(nombre, email, asunto, mensaje);

        if (!errorValidacion) {
            const resultado = `Su mensaje ha sido enviado con éxito`;
            mostrarResultado(resultado);
        }
    })

    



})

