// 1. Definición de conceptos y sus respectivas parejas (definición o ejemplo)
const conceptos = [
    { id: 1, texto: "while", tipo: "concepto" },
    { id: 1, texto: "Bucle que se ejecuta mientras una condición sea True", tipo: "pareja" },
    
    { id: 2, texto: "for", tipo: "concepto" },
    { id: 2, texto: "Bucle usado para iterar sobre una secuencia (listas, rangos)", tipo: "pareja" },
    
    { id: 3, texto: "if", tipo: "concepto" },
    { id: 3, texto: "Estructura condicional para ejecutar código si se cumple algo", tipo: "pareja" },
    
    { id: 4, texto: "and", tipo: "concepto" },
    { id: 4, texto: "Operador lógico: True solo si AMBAS condiciones son verdaderas", tipo: "pareja" },
    
    { id: 5, texto: "or", tipo: "concepto" },
    { id: 5, texto: "Operador lógico: True si AL MENOS UNA condición es verdadera", tipo: "pareja" },
    
    { id: 6, texto: "not", tipo: "concepto" },
    { id: 6, texto: "Operador lógico que invierte el valor booleano", tipo: "pareja" },
    
    { id: 7, texto: "print", tipo: "concepto" },
    { id: 7, texto: "Función para mostrar mensajes en la consola", tipo: "pareja" },
    
    { id: 8, texto: "input", tipo: "concepto" },
    { id: 8, texto: "Función para recibir datos del usuario desde la consola", tipo: "pareja" },
    
    { id: 9, texto: "integer (int)", tipo: "concepto" },
    { id: 9, texto: "Tipo de dato para números enteros (ej. 5, -10)", tipo: "pareja" },
    
    { id: 10, texto: "bool", tipo: "concepto" },
    { id: 10, texto: "Tipo de dato que solo acepta True o False", tipo: "pareja" },
    
    { id: 11, texto: "float", tipo: "concepto" },
    { id: 11, texto: "Tipo de dato para números con decimales (ej. 3.14)", tipo: "pareja" },
    
    { id: 12, texto: "len", tipo: "concepto" },
    { id: 12, texto: "Función que devuelve la longitud de una cadena o lista", tipo: "pareja" },
    
    { id: 13, texto: "string (str)", tipo: "concepto" },
    { id: 13, texto: "Tipo de dato para cadenas de texto (ej. 'Hola')", tipo: "pareja" }
];

let cartasVolteadas = [];
let intentos = 0;
let aciertos = 0;
let bloqueado = false; // Evita clics rápidos mientras se comprueban cartas

const grid = document.getElementById('grid');
const intentosTxt = document.getElementById('intentos');
const aciertosTxt = document.getElementById('aciertos');
const restartBtn = document.getElementById('restart-btn');

// 2. Función para barajar el array (Algoritmo Fisher-Yates)
function barajar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 3. Crear el tablero de juego
function iniciarJuego() {
    grid.innerHTML = "";
    cartasVolteadas = [];
    intentos = 0;
    aciertos = 0;
    bloqueado = false;
    intentosTxt.textContent = intentos;
    aciertosTxt.textContent = aciertos;

    const cartasBarajadas = barajar([...conceptos]);

    cartasBarajadas.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = item.id; // Guardamos el ID para verificar parejas

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-back">?</div>
                <div class="card-front">${item.texto}</div>
            </div>
        `;

        card.addEventListener('click', voltearCarta);
        grid.appendChild(card);
    });
}

// 4. Lógica al hacer clic en una carta
function voltearCarta() {
    if (bloqueado) return;
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    cartasVolteadas.push(this);

    if (cartasVolteadas.length === 2) {
        intentos++;
        intentosTxt.textContent = intentos;
        comprobarPareja();
    }
}

// 5. Comprobar si las dos cartas elegidas coinciden
function comprobarPareja() {
    const [carta1, carta2] = cartasVolteadas;

    if (carta1.dataset.id === carta2.dataset.id) {
        // ¡Coincidencia!
        carta1.classList.add('matched');
        carta2.classList.add('matched');
        aciertos++;
        aciertosTxt.textContent = aciertos;
        cartasVolteadas = [];

        if (aciertos === conceptos.length / 2) {
            setTimeout(() => alert(`¡Felicidades! Completaste el memorama en ${intentos} intentos. 🎉`), 500);
        }
    } else {
        // No coinciden, las volteamos de nuevo tras 1.2 segundos
        bloqueado = true;
        setTimeout(() => {
            carta1.classList.remove('flipped');
            carta2.classList.remove('flipped');
            cartasVolteadas = [];
            bloqueado = false;
        }, 1200);
    }
}

// Escuchar botón de reinicio
restartBtn.addEventListener('click', iniciarJuego);

// Arrancar el juego por primera vez
iniciarJuego();
