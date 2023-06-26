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
            clasificacion = 'Peso insuficiente';
        } else if (imc >= 18.5 && imc <= 24.9) {
            clasificacion = 'Peso Normal';
        } else if (imc >= 25 && imc <= 26.9) {
            clasificacion = 'Sobrepeso grado I';
        } else if (imc >= 27 && imc <= 29.9) {
            clasificacion = 'Sobrepeso grado II (preobesidad)';
        } else if (imc >= 30 && imc <= 34.9) {
            clasificacion = 'Obesidad de tipo I';
        } else if (imc >= 35 && imc <= 39.9) {
            clasificacion = 'Obesidad de tipo II';
        } else if (imc >= 40 && imc <= 49.9) {
            clasificacion = 'Obesidad de tipo III (mórbida)';
        } else if (imc >= 50) {
            clasificacion = 'Obesidad de tipo IV (extrema)';
        }
        return clasificacion;
    }


    const mostrarResultado = (resultado, clasificacion) => {
        document.getElementById('resultado').innerHTML = resultado;
        document.getElementById('clasificacion').innerHTML = clasificacion;
    }


    /**
     * Valida los 2 campos del formulario, cambia de color lo que este incorrecto y retorna boolean.
     * @param Number peso 
     * @param Number estatura 
     * @returns boolean Error de validacion
     */
    const validarCampos = (peso, estatura) => {

        let error = false;
        if (peso.value == '') {
            peso.classList.add('error');
            const span = document.querySelector(".validation-errPeso");
            span.innerHTML = "El campo peso es obligatorio";
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
        if (estatura.value == '') {
            estatura.classList.add('error');
            const span = document.querySelector('.validation-errEstatura')
            span.innerHTML = "El campo estatura es obligatorio";
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



