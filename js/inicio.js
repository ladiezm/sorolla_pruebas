function toggleContent(element) {
    const info = element.querySelector('.info');
  
    // Mostrar la información al hacer clic
    if (!element.classList.contains('show-info')) {
      element.classList.add('show-info');
      info.style.display = 'block'; // Muestra la información
  
      // Después de 10 segundos, ocultar la información automáticamente
      setTimeout(() => {
        element.classList.remove('show-info');
        info.style.display = 'none'; // Oculta la información
      }, 5000); // 10000 milisegundos = 10 segundos
    }
  }
  
// JavaScript para togglear el menú en dispositivos móviles
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});
