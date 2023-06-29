document.addEventListener('DOMContentLoaded', function () {

    const formulario = document.getElementById('formulario')
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        const peso = document.getElementById('peso');
        const estatura = document.getElementById('estatura');

        const errorValidacion = validarCampos(peso, estatura);

        if (!errorValidacion) {
            const estaturaNormalizada = estatura.value / 100;
            const imc = peso.value / (estaturaNormalizada * estaturaNormalizada);
            const clasificacion = clasificarIMC(imc);
            const resultado = `Su IMC es: ${imc.toFixed(2)}`;
            mostrarResultado(resultado, clasificacion);
        }
    })



    const clasificarIMC = (imc) => {
        let clasificacion = '';
        if (imc < 18.5) {
            if (imc < 5) {
                clasificacion = {
                    mensaje: "💀 Vamos a suponer que es un error de tipeo 💀",
                    color: "red"
                };
            } else if (imc < 16) {
                clasificacion = {mensaje:'Delgadez severa', color: 'red'};
            } else if (imc >= 16 && imc <= 16.99) {
                clasificacion = {mensaje:'Delgadez moderada', color: 'red'};
            } else if (imc >= 17 && imc <= 18.49) {
                clasificacion = {mensaje:'Delgadez aceptable', color: 'red'};
            }
        } else if (imc >= 18.5 && imc <= 24.9) {
            clasificacion = {mensaje:'Peso Normal', color: 'green'};
        } else if (imc >= 25 && imc <= 26.9) {
            clasificacion = {mensaje:'Sobrepeso grado I', color: 'yellow'};
        } else if (imc >= 27 && imc <= 29.9) {
            clasificacion = {mensaje:'Sobrepeso grado II (preobesidad)', color: 'yellow'};
        } else if (imc >= 30 && imc <= 34.9) {
            clasificacion = {mensaje:'Obesidad de tipo I', color: 'red'};
        } else if (imc >= 35 && imc <= 39.9) {
            clasificacion = {mensaje:'Obesidad de tipo II', color: 'red'};
        } else if (imc >= 40 && imc <= 49.9) {
            clasificacion = {mensaje:'Obesidad de tipo III (mórbida)', color: 'red'};
        } else if (imc >= 50) {
            clasificacion = {mensaje:'Obesidad de tipo IV (extrema)', color: 'red'};
        }
        return clasificacion;
    }


    const mostrarResultado = (resultado, clasificacion) => {
       document.getElementById('resultado').innerHTML = `<p>${resultado} <br>${clasificacion.mensaje} </p>`;
       document.querySelector("#resultado p").classList.add(clasificacion.color);
    }


    /**
     * Valida los 2 campos del formulario, cambia de color lo que este incorrecto y retorna boolean.
     * @param Number peso 
     * @param Number estatura 
     * @returns boolean Error de validacion
     */
    const validarCampos = (peso, estatura) => {

        let error = false;
        if (peso.value == '' || peso.value == 0 || peso.value < 0 || peso.value > 500 || peso.value < 2) {
            peso.classList.add('error');
            const span = document.querySelector(".validation-errPeso");
            if (peso.value == "") {
                span.innerHTML = "El campo peso es obligatorio";
            } else if (peso.value == 0) {
                span.innerHTML = "El campo peso no puede ser 0";
            } else if (peso.value < 0) {
                span.innerHTML = "El campo peso no puede ser negativo";
            } else if (peso.value > 500) {
                span.innerHTML = "El campo peso no puede ser mayor a 500kg";
            } else if (peso.value < 5) {
                span.innerHTML = "El campo peso no puede ser menor a 2kg";
            }

            span.classList.add("mostrar");
            error = true;
            const listener = peso.addEventListener('focus', function () {
                if (peso.classList.contains('error')) {
                    peso.classList.remove('error');
                    const span = document.querySelector(".validation-errPeso");
                    span.classList.remove("mostrar");
                }
                peso.removeEventListener('focus', listener);

            });
        }

        if (estatura.value == '' || estatura.value == 0 || estatura.value < 0 || estatura.value > 300 || estatura.value < 35) {
            estatura.classList.add('error');
            const span = document.querySelector('.validation-errEstatura')
            if (estatura.value == "") {
                span.innerHTML = "El campo estatura es obligatorio";
            } else if (estatura.value == 0) {
                span.innerHTML = "El campo estatura no puede ser 0";
            } else if (estatura.value < 0) {
                span.innerHTML = "El campo estatura no puede ser negativo";
            } else if (estatura.value > 300) {
                span.innerHTML = "El campo estatura no puede ser mayor a 300 cm ";
            } else if (estatura.value < 50) {
                span.innerHTML = "El campo estatura no puede ser menor a 35 cm";
            }
            span.classList.add("mostrar");
            error = true;
            const listener = estatura.addEventListener('focus', function () {
                if (estatura.classList.contains('error')) {
                    estatura.classList.remove('error');
                    const span = document.querySelector(".validation-errEstatura");
                    span.classList.remove("mostrar");
                }
                estatura.removeEventListener('focus', listener);
            });
        }

        return error;
    };



});



