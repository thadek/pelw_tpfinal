function renderizarCaptcha() {
    grecaptcha.render('recaptcha', {
        'sitekey': "6Lcw0HMmAAAAAOoLxltnaQdT1888d891b4f2OOLW",
        'theme': 'dark',
        'callback': function (response) {
            if (response.length > 0) {
                const elemento = document.getElementById("errorReCaptcha");
                elemento.innerHTML = "";
            }
        }

    });
}

function validarCaptcha() {
    let response = true;
    if (grecaptcha.getResponse().length === 0) {
        const elemento = document.getElementById("errorReCaptcha");
        elemento.innerHTML = "Por favor, valide el captcha"; 
        response = false;
    }
    return response;
}


document.addEventListener('DOMContentLoaded', function () {

    const formulario = document.getElementById('formulario')
    const camposPlaceHolder = { nombre: "Nombre", email: "Email", asunto: "Asunto", mensaje: "Dejanos tu mensaje...", celular: "Celular" }



    const validarCampos = (nombre, email, asunto, mensaje, celular) => {
        let respuesta = {
            error: false,
            campos: [],
            mensajes: []
        };

        if (nombre.value == "") {
            respuesta.error = true;
            respuesta.campos.push("nombre");
            respuesta.mensajes.push("El nombre es obligatorio.");
        }

        if (email.value == "") {
            respuesta.error = true;
            respuesta.campos.push("email");
            respuesta.mensajes.push("El email es obligatorio.");
        }

        if (asunto.value == "") {

            respuesta.error = true;
            respuesta.campos.push("asunto");
            respuesta.mensajes.push("El asunto es obligatorio.");
        }

        if (mensaje.value == "") {
            respuesta.error = true;
            respuesta.campos.push("mensaje");
            respuesta.mensajes.push("El mensaje es obligatorio.");
        }

        if (celular.value == "") {
            respuesta.error = true;
            respuesta.campos.push("celular");
            respuesta.mensajes.push("El celular es obligatorio.");
        }

        return respuesta;
    }


    const cambiarColorErrores = (respuesta) => {
        const campos = respuesta.campos;

        for (let i = 0; i < campos.length; i++) {
            const campo = campos[i];
            const elemento = document.getElementById(campo);
            elemento.classList.add("error");
            elemento.classList.add("placeholderErr");
            elemento.placeholder = respuesta.mensajes[i];
            const listener = elemento.addEventListener("change", function () {
                elemento.classList.remove("error");
                elemento.classList.remove("placeholderErr");
                elemento.placeholder = `${camposPlaceHolder[campo]}`;
                elemento.removeEventListener("change", listener);
            });

        }
    }


    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre');
        const asunto = document.getElementById('asunto');
        const celular = document.getElementById('celular');
        const mensaje = document.getElementById('mensaje');
        const email = document.getElementById('email');

        const validarVacios = validarCampos(nombre, email, asunto, mensaje, celular);

      const validacionCaptcha =  validarCaptcha();

        if (validarVacios.error || !validacionCaptcha) {
            cambiarColorErrores(validarVacios);
            return false;
        }


        const nodo = document.getElementById("contact_contenido");
        nodo.removeChild(formulario);
        const div = document.createElement("div");
        div.classList.add("contacto__mensaje");
        div.innerHTML = `
        <h2>¡Gracias por contactarnos!</h2>
        <i class="fa fa-solid fa-paper-plane fa-bounce"></i>
        <p>En breve nos comunicaremos con usted.</p>
        `;
        nodo.appendChild(div);

        






    })





})

