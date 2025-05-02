function initializeCarousel(carouselWrapper) {
    const carousel = carouselWrapper.querySelector(".carousel");
    const prevBtn = carouselWrapper.querySelector(".prev");
    const nextBtn = carouselWrapper.querySelector(".next");
    const indicatorsContainer = carouselWrapper.querySelector(".indicators");
    const cards = carouselWrapper.querySelectorAll(".card-cartas");

    let index = 0;

    // Crear indicadores de posición
    cards.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        indicatorsContainer.appendChild(dot);
    });

    const dots = carouselWrapper.querySelectorAll(".dot");

    function updateCarousel() {
        // Obtenemos el ancho de las tarjetas
        const cardWidth = cards[0].offsetWidth;

        // Obtenemos el margen entre las cartas (puede ser diferente en cada dispositivo)
        const cardStyle = getComputedStyle(cards[0]);
        const cardMargin = parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);

        // Calculamos el desplazamiento teniendo en cuenta el margen entre las cartas
        const totalCardWidth = cardWidth + cardMargin;

        // Actualizamos la posición del carrusel
        carousel.style.transform = `translateX(-${index * totalCardWidth}px)`;

        // Actualizamos los indicadores
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
        if (index < cards.length - 1) {
            index++;
        } else {
            index = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        if (index > 0) {
            index--;
        } else {
            index = cards.length - 1;
        }
        updateCarousel();
    });

    // Opcional: Navegación con los indicadores
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            updateCarousel();
        });
    });
}

// Inicializar ambos carruseles
document.querySelectorAll(".carousel-wrapper").forEach(initializeCarousel);

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

/*exposicion*/
document.getElementById("algarrobo").addEventListener("shown.bs.collapse", function () {
    this.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    document.getElementById("comiendo").addEventListener("shown.bs.collapse", function () {
    this.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    document.getElementById("cosiendo").addEventListener("shown.bs.collapse", function () {
    this.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    document.getElementById("caleta").addEventListener("shown.bs.collapse", function () {
    this.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    document.getElementById("viento").addEventListener("shown.bs.collapse", function () {
    this.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    document.getElementById("triste").addEventListener("shown.bs.collapse", function () {
    this.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".btn-custom").forEach(button => {
            button.addEventListener("click", function () {
                if (this.innerText === "Mostrar más") {
                    this.innerText = "Mostrar menos";
                } else {
                    this.innerText = "Mostrar más";
                }
            });
        });
    });
/*-------------------------------------------------------------------------------------------------------- */
const cards = document.querySelectorAll('.card_m');
const container = document.querySelector('.contenedor_m');
let highestZIndex = 1;

cards.forEach(card => {
    card.style.zIndex = highestZIndex;
    
    card.addEventListener('mousedown', (e) => {
        // Traer al frente
        highestZIndex += 1;
        card.style.zIndex = highestZIndex;
        
        // Calcular el offset CORRECTAMENTE
        const cardRect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Posición actual de la tarjeta (convertida a píxeles)
        const currentLeft = parseFloat(getComputedStyle(card).left) || 0;
        const currentTop = parseFloat(getComputedStyle(card).top) || 0;
        
       // Diferencia exacta entre el clic y la esquina de la tarjeta
       const offsetX = e.clientX - currentLeft;
       const offsetY = e.clientY - currentTop;
        
        function moveCard(e) {
            // Nueva posición (ajustada al contenedor)
            let newX = e.clientX - containerRect.left - offsetX;
            let newY = e.clientY - containerRect.top - offsetY;
            console.log(newX);
            
            // 2. Calcular límites HORIZONTALES (X)
            //const maxX = containerRect.width - cardRect.width;
            //newX = Math.max(0, Math.min(newX, maxX));
            
            // 3. Calcular límites VERTICALES (Y)
            //const maxY = containerRect.height - cardRect.height;
            //newY = Math.max(0, Math.min(newY, maxY));
            
            card.style.left = `${newX}px`;
            card.style.top = `${newY}px`;
        }
        
        function stopDrag() {
            document.removeEventListener('mousemove', moveCard);
            document.removeEventListener('mouseup', stopDrag);
        }
        
        document.addEventListener('mousemove', moveCard);
        document.addEventListener('mouseup', stopDrag);
        
        e.preventDefault();
    });
});

document.querySelectorAll('.cuadro').forEach(cuadro => {
    cuadro.addEventListener('click', () => {
        // Alterna la clase "active" en el cuadro clicado
        cuadro.classList.toggle('active');
    });
});
document.querySelectorAll('.cuadroc2').forEach(cuadro => {
    cuadro.addEventListener('click', () => {
        // Alterna la clase "active" en el cuadro clicado
        cuadro.classList.toggle('active');
    });
});
document.querySelectorAll('.cuadroc3').forEach(cuadro => {
    cuadro.addEventListener('click', () => {
        // Alterna la clase "active" en el cuadro clicado
        cuadro.classList.toggle('active');
    });
});
document.querySelectorAll('.cuadroc4').forEach(cuadro => {
    cuadro.addEventListener('click', () => {
        // Alterna la clase "active" en el cuadro clicado
        cuadro.classList.toggle('active');
    });
});
document.querySelectorAll('.cuadroc5').forEach(cuadro => {
    cuadro.addEventListener('click', () => {
        // Alterna la clase "active" en el cuadro clicado
        cuadro.classList.toggle('active');
    });
});
