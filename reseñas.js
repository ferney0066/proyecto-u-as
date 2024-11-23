// Selección de elementos
const reseñaForm = document.getElementById('reseña-form');
const reseñaTexto = document.getElementById('reseña-texto');
const listaReseñas = document.getElementById('reseñas');

// Función para cargar reseñas desde localStorage
function cargarReseñas() {
    const reseñasGuardadas = JSON.parse(localStorage.getItem('reseñas')) || [];
    reseñasGuardadas.forEach((texto) => {
        agregarReseña(texto, false); // No vuelvas a guardar al cargar
    });
}

// Función para guardar reseñas en localStorage
function guardarReseñas() {
    const reseñas = Array.from(listaReseñas.children).map((li) => 
        li.querySelector('span').textContent
    );
    localStorage.setItem('reseñas', JSON.stringify(reseñas));
}

// Función para agregar una reseña
function agregarReseña(texto, guardar = true) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${texto}</span>
        <button class="boton-borrar">Borrar</button>
    `;
    
    // Evento para eliminar reseña
    li.querySelector('.boton-borrar').addEventListener('click', () => {
        li.remove();
        guardarReseñas(); // Actualiza el almacenamiento al eliminar
    });
    
    listaReseñas.appendChild(li);

    // Guarda en localStorage solo si es una nueva reseña
    if (guardar) {
        guardarReseñas();
    }
}

// Evento para publicar reseñas
reseñaForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que se recargue la página
    
    const texto = reseñaTexto.value.trim();
    if (texto !== '') {
        agregarReseña(texto);
        reseñaTexto.value = ''; // Limpia el campo de texto
    }
});

// Cargar reseñas al iniciar la página
cargarReseñas();