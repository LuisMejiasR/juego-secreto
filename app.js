let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function insertarTextoElemento(etiqueta, texto) {
    let elementoHTML = document.querySelector(etiqueta);
    elementoHTML.innerHTML = texto;
}

function obtenerNumeroAleatorio() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    // si ya sorteamos todos los números posibles, se muestra un mensaje
    if (listaNumerosSorteados.length === numeroMaximo) {
        insertarTextoElemento('p', 'Ya no hay más números para adivinar');
    } else {
        // si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            // se vuelve a llamar a la función para obtener un nuevo número
            return obtenerNumeroAleatorio();
        } else {
            // si el número no está incluido en la lista, se añade a la lista
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        // el usuario acertó
        insertarTextoElemento('p', `¡Adivinaste el número secreto en ${intentos} ${intentos === 1 ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // el usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            insertarTextoElemento('p', 'El número secreto es menor');
        } else {
            insertarTextoElemento('p', 'El número secreto es mayor');
        }
        limpiarCaja();
        intentos++;
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function condicionesIniciales() {
    insertarTextoElemento('h1', 'Juego del número secreto');
    insertarTextoElemento('p', `Adivina un número entre 1 y ${numeroMaximo}`);
    numeroSecreto = obtenerNumeroAleatorio();
    intentos = 1;
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();