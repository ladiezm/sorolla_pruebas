//cuadros
document.querySelectorAll('.cuadro').forEach(cuadro => {
    cuadro.addEventListener('click', () => {
        // Alterna la clase "active" en el cuadro clicado
        cuadro.classList.toggle('active');
    });
});

//numeros
const elements = document.querySelectorAll('.slide-top');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.5 }); // Activar cuando el 50% del elemento es visible

elements.forEach(element => {
    observer.observe(element);
});

//titulos
window.addEventListener('resize', () => {
    const h1 = document.querySelector('.cabecera');
    if (window.innerWidth <= 576) {
        h1.outerHTML = `<h3 class="${h1.className}">${h1.innerHTML}</h3>`;
    } else if (h1.tagName === 'H3') {
        h1.outerHTML = `<h1 class="${h1.className}">${h1.innerHTML}</h1>`;
    }

    let h5 = document.querySelector('.subcabecera');
    if (window.innerWidth <= 576) {
        if (h5.tagName === 'H5') { // Verificamos que sea un H4 antes de reemplazar
            h5.outerHTML = `<p class="${h5.className}">${h5.innerHTML}</p>`;
            h5 = document.querySelector('.subcabecera'); // Reasignamos para el nuevo elemento
        }
    } else if (h5.tagName === 'P') {
        h5.outerHTML = `<h4 class="${h5.className}">${h5.innerHTML}</h4>`;
        h5 = document.querySelector('.subcabecera'); // Reasignamos para el nuevo elemento
    }
   // Seleccionar todos los elementos de texto en los dos cuadros
    let texto1 = document.querySelectorAll('.cuadro1 .texto');
    let texto2 = document.querySelectorAll('.cuadro2 .texto');
    let texto3 = document.querySelectorAll('.cuadro3 .texto');
    let texto4 = document.querySelectorAll('.cuadro4 .texto');

    texto1.forEach(texto => {
        if (window.innerWidth <= 576 && texto.tagName === 'H6') {
            texto.outerHTML = `<p class="${texto.className}">${texto.innerHTML}</p>`;
        } else if (window.innerWidth > 576 && texto.tagName === 'P') {
            texto.outerHTML = `<h6 class="${texto.className}">${texto.innerHTML}</h6>`;
        }
    });

    texto2.forEach(texto => {
        if (window.innerWidth <= 576 && texto.tagName === 'H6') {
            texto.outerHTML = `<p class="${texto.className}">${texto.innerHTML}</p>`;
        } else if (window.innerWidth > 576 && texto.tagName === 'P') {
            texto.outerHTML = `<h6 class="${texto.className}">${texto.innerHTML}</h6>`;
        }
    });

    texto3.forEach(texto => {
        if (window.innerWidth <= 576 && texto.tagName === 'H6') {
            texto.outerHTML = `<p class="${texto.className}">${texto.innerHTML}</p>`;
        } else if (window.innerWidth > 576 && texto.tagName === 'P') {
            texto.outerHTML = `<h6 class="${texto.className}">${texto.innerHTML}</h6>`;
        }
    });

    texto4.forEach(texto => {
        if (window.innerWidth <= 576 && texto.tagName === 'H6') {
            texto.outerHTML = `<p class="${texto.className}">${texto.innerHTML}</p>`;
        } else if (window.innerWidth > 576 && texto.tagName === 'P') {
            texto.outerHTML = `<h6 class="${texto.className}">${texto.innerHTML}</h6>`;
        }
    });
});
//imagenes
function expandCard(card,sectionId) {
    const cards = document.querySelectorAll('.menu-item');
    
     // Verificar si la tarjeta ya está expandida
     if (card.style.width === '60vw') {
        // Si está expandida, redirigir a la sección específica
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        return; // Detener la ejecución del resto de la función
    }

    // Restablece todas las tarjetas al tamaño original y la clase rounded-pill
    cards.forEach(c => {
        c.style.width = '10vw'; // Restablece la anchura de todas las tarjetas
        c.querySelector('.text').classList.add('d-none'); // Oculta el texto
        c.querySelector('.text').classList.remove('d-block');
        c.classList.remove('rounded-5'); // Elimina la clase rounded-5
        c.classList.add('rounded-pill'); // Vuelve a agregar la clase rounded-pill
    });

    // Cambia la anchura de la tarjeta seleccionada
    card.style.width = '60vw';
    card.querySelector('.text').classList.remove('d-none'); // Muestra el texto
    card.querySelector('.text').classList.add('d-block');
    // Cambia la clase a rounded-5 para la tarjeta seleccionada
    card.classList.remove('rounded-pill');
    card.classList.add('rounded-5');
}