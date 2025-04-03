// Cambiar imágenes al seleccionar color
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        const productItem = this.closest('.product-item');
        const mainImage = productItem.querySelector('.main-product-image');
        const newImageSrc = this.getAttribute('data-image');
        
        // Quitar clase active de todas las opciones
        productItem.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Añadir clase active a la opción seleccionada
        this.classList.add('active');
        
        // Efecto de transición suave
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = newImageSrc;
            mainImage.style.opacity = '1';
        }, 200);
    });
});

// Scroll Reveal
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Inicializar para elementos visibles al cargar
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
});



// Efecto de fundido para la sudadera
document.querySelectorAll('.product-item')[1].addEventListener('mouseenter', function() {
    const images = this.querySelectorAll('.product-image-container img');
    images[0].style.opacity = '0';
    images[1].style.opacity = '1';
});

document.querySelectorAll('.product-item')[1].addEventListener('mouseleave', function() {
    const images = this.querySelectorAll('.product-image-container img');
    images[0].style.opacity = '1';
    images[1].style.opacity = '0';
});


// Efecto de iluminación al mover el ratón
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mousemove', function(e) {
        const x = e.pageX - this.getBoundingClientRect().left;
        const y = e.pageY - this.getBoundingClientRect().top;
        this.style.setProperty('--x', x + 'px');
        this.style.setProperty('--y', y + 'px');
    });
});

// Cambio de color de variantes
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        const parent = this.closest('.product-item');
        const mainImage = parent.querySelector('.main-product-image');
        const secondaryImage = parent.querySelector('.secondary-product-image');
        const newImage = this.getAttribute('data-image');
        const newImageBack = this.getAttribute('data-image-back');
        
        // Remover clase active de todas las opciones
        parent.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Añadir clase active a la opción seleccionada
        this.classList.add('active');
        
        // Cambiar imágenes con efecto de transición
        mainImage.style.opacity = '0';
        secondaryImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = newImage;
            secondaryImage.src = newImageBack;
            mainImage.style.opacity = '1';
            secondaryImage.style.opacity = '0';
        }, 300);
    });
});

// Vista rápida
document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const productItem = this.closest('.product-item');
        const productName = productItem.querySelector('h3').textContent;
        const productPrice = productItem.querySelector('.price').textContent;
        const productImage = productItem.querySelector('.main-product-image').src;
        
        // Aquí puedes implementar la lógica para mostrar el modal con los detalles del producto
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-image">
                    <img src="${productImage}" alt="${productName}">
                </div>
                <div class="modal-info">
                    <h3>${productName}</h3>
                    <p class="modal-price">${productPrice}</p>
                    <p class="modal-description">Descripción detallada del producto...</p>
                    <!-- Más detalles del producto -->
                    <button class="add-to-cart">Añadir al carrito</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Cerrar modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 500);
        });
    });
});

// Scroll reveal mejorado
function scrollReveal() {
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => {
        const elementPosition = el.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);

// Cambio de color de variantes
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        const parent = this.closest('.product-item');
        const mainImage = parent.querySelector('.main-product-image');
        const newImage = this.getAttribute('data-image');
        
        // Remover clase active de todas las opciones
        parent.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Añadir clase active a la opción seleccionada
        this.classList.add('active');
        
        // Cambiar imagen con efecto fade
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = newImage;
            mainImage.style.opacity = '1';
        }, 300);
    });
});


// Selecciona todas las opciones de color
const colorOptions = document.querySelectorAll('.color-option');

colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Obtiene la imagen asociada al color
        const newImageSrc = this.getAttribute('data-image');
        const productImage = this.closest('.product-image-container').querySelector('.main-product-image');
        
        // Aplica efecto de fade-out antes de cambiar la imagen
        productImage.style.opacity = '0';
        
        // Espera a que termine la transición para cambiar la imagen
        setTimeout(() => {
            productImage.src = newImageSrc;
            
            // Vuelve a hacer fade-in
            setTimeout(() => {
                productImage.style.opacity = '1';
            }, 50);
        }, 400); // Tiempo igual al de la transición CSS (0.4s)
        
        // Remueve la clase 'active' de todas las opciones
        colorOptions.forEach(opt => opt.classList.remove('active'));
        
        // Añade 'active' a la opción seleccionada
        this.classList.add('active');
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.querySelector('.load-more');
    const hiddenProducts = document.querySelectorAll('.hidden-product');
    let productsShown = 0;
    
    // Ocultar todos los productos adicionales al cargar
    hiddenProducts.forEach(product => {
        product.style.display = 'none';
    });
    
    loadMoreBtn.addEventListener('click', function() {
        // Mostrar los próximos 3 productos ocultos
        for (let i = productsShown; i < productsShown + 3 && i < hiddenProducts.length; i++) {
            hiddenProducts[i].style.display = 'flex'; // o 'block' dependiendo de tu layout
            hiddenProducts[i].classList.add('active'); // Para activar la animación scroll-reveal
        }
        
        productsShown += 3;
        
        // Ocultar el botón si no hay más productos por mostrar
        if (productsShown >= hiddenProducts.length) {
            loadMoreBtn.style.display = 'none';
        }
        
        // Desplazarse suavemente al último producto mostrado
        if (productsShown > 0 && productsShown <= hiddenProducts.length) {
            const lastVisibleProduct = hiddenProducts[productsShown - 1];
            lastVisibleProduct.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});


    document.getElementById('newsletter-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = e.target;
        const messageElement = document.getElementById('subscription-message');
        
        // Mostrar estado de carga
        messageElement.textContent = 'Processing...';
        messageElement.style.display = 'block';
        messageElement.style.opacity = '0.7';
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Éxito - mostrar mensaje
                messageElement.innerHTML = `
                    ✓ Thank you for subscribing.<br>
                    Check your email for exclusive access.
                `;
                messageElement.style.opacity = '1';
                
                // Resetear formulario
                form.reset();
                
                // Redirigir después de 3 segundos (opcional)
                setTimeout(() => {
                    window.location.href = "/subscribe/thank-you.html";
                }, 1500);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            messageElement.textContent = 'Error. Please try again.';
            messageElement.style.opacity = '0.7';
        }
    });
