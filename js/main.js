document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Splitting.js para efectos de texto
    Splitting();

    // Animación de carga
    const loadingChars = document.querySelectorAll('.loading-sequence span');
    gsap.to(loadingChars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        onComplete: hideLoading
    });
    
    function hideLoading() {
        gsap.to('.loading-screen', {
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
                document.querySelector('.loading-screen').style.display = 'none';
                initAnimations();
            }
        });
    }
    
    // Animaciones iniciales mejoradas
    function initAnimations() {
        // Animación de caracteres con efecto rebote
        gsap.to('.hero-title .char', {
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.05,
            ease: "back.out(3)",
            delay: 0.3
        });
        
        // Sombra del título con delay
        gsap.to('.title-shadow .char', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.05,
            ease: "expo.out",
            delay: 0.5
        });
        
        // Subtítulo con efecto de escala
        gsap.to('.hero-subtitle .char', {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.02,
            ease: "elastic.out(1, 0.5)",
            delay: 1.2
        });
        
        // Grid items con efecto wave
        gsap.to('.grid-item', {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            stagger: {
                amount: 0.6,
                grid: [3, 3],
                from: "center"
            },
            ease: "elastic.out(1, 0.5)",
            delay: 1.5
        });
        
        // Efecto de scroll down
        gsap.to('.scroll-circle', {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 2.5
        });

        // Animación para las imágenes divididas
        gsap.from('.left-image', {
            x: '-50%',
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.2
        });

        gsap.from('.right-image', {
            x: '50%',
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.2
        });

        // Animaciones para los títulos separados
        gsap.to('.drop-title .char', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(3)",
            delay: 0.3
        });

        gsap.to('.summer-title .char', {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            ease: "elastic.out(1, 0.5)",
            delay: 0.5
        });

        // Animaciones para las sombras
        gsap.to('.drop-title .title-shadow .char', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: "expo.out",
            delay: 0.4
        });

        gsap.to('.summer-title .title-shadow .char', {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.03,
            ease: "expo.out",
            delay: 0.6
        });
        
        // Inicializar partículas
        if (document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 60, density: { enable: true, value_area: 800 } },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.3, width: 1 },
                    move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" }
                    }
                }
            });
        }
        
        // Efecto de parallax para el video de fondo
        if (document.querySelector('.hero-video-wrapper')) {
            gsap.to('.hero-video-wrapper', {
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: '20%',
                ease: 'none'
            });
        }
    }
    
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        
        if (mobileMenu.classList.contains('active')) {
            gsap.from('.mobile-link .char', {
                y: '100%',
                duration: 0.8,
                stagger: 0.03,
                ease: "expo.out"
            });
        }
    });
    
    // Cerrar menú al hacer clic en enlace
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Filtrado de drops - Modificado para mostrar Busy Summer primero
    const initialFilter = 'busy';
    filterProducts(initialFilter);
    document.querySelector(`.filter-btn[data-filter="${initialFilter}"]`).classList.add('active');

    // Configurar event listeners para los botones de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProducts(this.dataset.filter);
        });
    });

    function filterProducts(filter) {
    const items = document.querySelectorAll('.drop-item');
    
    items.forEach(item => {
        if (filter === 'all') {
            // Mostrar todos los productos
            gsap.to(item, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
                display: 'block'
            });
        } else {
            // Verificar si el producto pertenece a la categoría seleccionada
            const categories = item.dataset.drop.split(' ');
            const shouldShow = categories.includes(filter);
            
            if (shouldShow) {
                gsap.to(item, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    display: 'block'
                });
            } else {
                gsap.to(item, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.6,
                    ease: "power3.out",
                    display: 'none'
                });
            }
        }
    });

    // Reordenar los productos cuando se selecciona "Todo"
    if (filter === 'all') {
        const grid = document.querySelector('.drops-grid');
        const busyItems = Array.from(document.querySelectorAll('.drop-item[data-drop*="busy"]'));
        const bestItems = Array.from(document.querySelectorAll('.drop-item[data-drop*="best"]'));
        const otherItems = Array.from(document.querySelectorAll('.drop-item:not([data-drop*="busy"]):not([data-drop*="best"])'));
        
        // Limpiar el grid
        grid.innerHTML = '';
        
        // Agregar primero los de Busy Summer
        busyItems.forEach(item => {
            grid.appendChild(item);
            gsap.to(item, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
                display: 'block'
            });
        });
        
        // Luego los de Best Sellers
        bestItems.forEach(item => {
            // Evitar duplicados si ya está en Busy Summer
            if (!busyItems.includes(item)) {
                grid.appendChild(item);
                gsap.to(item, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    display: 'block'
                });
            }
        });
        
        // Finalmente los demás
        otherItems.forEach(item => {
            grid.appendChild(item);
            gsap.to(item, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
                display: 'block'
            });
        });
    }
}

    // Datos de productos (simulados)
    const products = {
        'love-lonely-tee': {
            title: 'LOVE LONELY TEE',
            tag: 'BUSY SUMMER',
            price: '€34.99',
            description: "For lonely hearts who don't give a f*ck. Heavyweight 240gsm cotton hits different - like your ex's new boo. Front & back prints scream 'I'm busy ghosting you'.",
            material: '100% Organic cotton 240 g/m² (thicker than your patience)',
            care: 'Machine wash cold. Don\'t bleach (like you bleach your feelings). Low iron (like your standards last night).',
            colors: ['Blackout', 'White Lie'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            images: [
                'imagenes/productos/busy_summer_drop/love_lonely_oversize/love_lonely_oversize_front.png',
                'imagenes/productos/busy_summer_drop/love_lonely_oversize/love_lonely_oversize_back.png'
            ]
        },
    
        'busy_and_lost': {
            title: 'BUSY AND LOST HOODIE',
            tag: 'BUSY SUMMER',
            price: '€54.99',
            description: "Lost in the sauce? This hoodie's your GPS. Pocket for your weed, attitude included. For those who get busy getting lost on purpose.",
            material: '100% Cotton (like 100% don’t-care attitude)',
            care: 'Wash cold unless you like shrinkage (pause). Hang dry - like your dreams before 9-to-5.',
            colors: ['Midnight Black', 'Depression Blue'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            images: [
                'imagenes/productos/busy_summer_drop/busy_and_lost_hoddie/busy_and_lost_hoddie_back.png',
                'imagenes/productos/busy_summer_drop/busy_and_lost_hoddie/busy_and_lost_hoddie_front.png'
            ]
        },
    
        'classic-ls-tee': {
            title: 'CLASSIC LS TEE',
            tag: 'BUSY SUMMER',
            price: '€29.99',
            description: "The OG heavyweight. 240gsm of 'I woke up like this' energy. For flexers who know classics never go outta style (unlike your TikTok fame).",
            material: '100% Cotton 240 g/m² (built like your ego)',
            care: 'Machine wash cold. Tumble dry low (like your motivation on Mondays).',
            colors: ['Black Magic', 'Bleach Trauma'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            images: [
                'imagenes/productos/busy_summer_drop/busy_summer_black_oversize/busy_summer_black_oversize.png'
            ]
        },
    
        'restless_souls_hoodie': {
            title: 'RESTLESS SOULS HOODIE',
            tag: 'BUSY SUMMER',
            price: '€54.99',
            description: "For souls that party with demons & brunch with angels. Hoodie so thick it blocks bad vibes & ex's texts. Pocket for your existential crisis.",
            material: '100% Cotton (like 100% of your problems)',
            care: 'Wash inside out (like your life choices). Hang dry (like your mental health).',
            colors: ['Sleepless Black', '3AM Blue'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            images: [
                'imagenes/productos/busy_summer_drop/restless_souls_hoodie/restless_souls_hoodie_front.png',
                'imagenes/productos/busy_summer_drop/restless_souls_hoodie/restless_souls_hoodie_back.png'
            ]
        },
    
        'busy_crop_top': {
            title: 'BUSY CROP TOP',
            tag: 'BUSY SUMMER',
            price: '€14.99',
            description: "Crop top so hot it needs NSFW tag. For bad bitches who snack on attention. Warning: May cause jealousy & DM slides.",
            material: '100% Cotton (100% bad decisions material)',
            care: 'Hand wash only (like your fragile ego). Lay flat to dry (like your dating standards).',
            colors: ['Basic White', 'Daddy Issues Black'],
            sizes: ['XS', 'S', 'M', 'L'],
            images: [
                'imagenes/productos/busy_summer_drop/busy_crop_top/busy_crop_top_white.png'
            ]
        },
    
        'talk-that-shit-tee': {
            title: 'TALK THAT S*TH TEE',
            tag: 'BUSY SUMMER',
            price: '€34.99',
            description: "240gsm of pure talk-shit energy. For those who back it up. Print so loud it mutes haters. Oversized fit = more room for audacity.",
            material: '100% Cotton 240 g/m² (thick-skinned edition)',
            care: 'Wash with similar colors (aka other savage pieces). Air dry (like your dirty laundry on Twitter).',
            colors: ['No Chill White', 'Zero F*cks Black'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            images: [
                'imagenes/productos/busy_summer_drop/talk_that_shit_oversize/white/talk_that_shit_oversize_front.png',
                'imagenes/productos/busy_summer_drop/talk_that_shit_oversize/white/talk_that_shit_oversize_back.png',
                'imagenes/productos/busy_summer_drop/talk_that_shit_oversize/black/talk_that_shit_oversize_front.png',
                'imagenes/productos/busy_summer_drop/talk_that_shit_oversize/black/talk_that_shit_oversize_back.png'
            ]
        },
    
        'churros_drip_tee': {
            title: 'CHURROS DRIP TEE',
            tag: 'BUSY SUMMER',
            price: '€29.99',
            description: "Sweet drip meets street cred. 240gsm cotton hits like your abuela's chancla. For snackers with sauce.",
            material: '100% Cotton 240 g/m² (sturdy like your grind)',
            care: 'Machine wash gentle (unlike your roasts). No bleach (unless you bleaching your past).',
            colors: ['Sugar High White', 'Diabetic Coma Black'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            images: [
                'imagenes/productos/busy_summer_drop/churros_drip_oversize/churros_drip_oversize_front.png',
                'imagenes/productos/busy_summer_drop/churros_drip_oversize/churros_drip_oversize_back.png'
            ]
        },
    
        'gloss-pants-summer': {
            title: 'GLOSS PANTS',
            tag: 'BUSY SUMMER',
            price: '€29.99',
            description: "Pants so fresh they reject basic vibes. For leg day skippers who still wanna flex. Pocket game stronger than your WhatsApp excuses.",
            material: '100% Cotton (breathable like your lies)',
            care: 'Wash cold (like your heart). Tumble dry low (like your battery at 1%).',
            colors: ['Blackout', 'Grandma’s Couch Gray'],
            sizes: ['34', '36', '38', '40', '42', '44', '46'],
            images: [
                'imagenes/productos/busy_summer_drop/pants_shorts_lost/gray.png',
                'imagenes/productos/busy_summer_drop/pants_shorts_lost/black.png'
            ]
        },
    
        'water-sprites-tee': {
            title: 'WATER SPRITES TEE',
            tag: 'BUSY SUMMER',
            price: '€34.99',
            description: "Mystic vibes only. 240gsm tee for spiritual gangsters. Print so hypnotic it cancels horoscopes.",
            material: '100% Cotton 240 g/m² (blessed fabric)',
            care: 'Wash with positive vibes only. Air dry under moonlight.',
            colors: ['Holy Water White'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            images: [
                'imagenes/productos/busy_summer_drop/sprites_summer_oversize/sprites_summer_oversize_front.png',
                'imagenes/productos/busy_summer_drop/sprites_summer_oversize/sprites_summer_oversize_back.png'
            ]
        },
    
        'coffee-solo-tee': {
            title: 'COFFEE SOLO TEE',
            tag: 'BUSY SUMMER',
            price: '€29.99',
            description: "For caffeine addicts with trust issues. 240gsm cotton stronger than your morning espresso. No sugar, no cap.",
            material: '100% Cotton 240 g/m² (dark roast edition)',
            care: 'Wash cold (like your coffee order). No bleach (like your soul).',
            colors: ['Espresso Black', 'Milk Stain White'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            images: [
                'imagenes/productos/busy_summer_drop/coffee_solo_oversize/coffee_solo_oversize_front.png',
                'imagenes/productos/busy_summer_drop/coffee_solo_oversize/coffee_solo_oversize_back.png'
            ]
        },
    
        'busy-body-summer': {
            title: 'BUSY BODY SUMMER',
            tag: 'BUSY SUMMER',
            price: '€19.99',
            description: "For gym rats who only do mirror workouts. Stretchy af to hide those cheat meals. DM slide-proof fabric.",
            material: '95% Cotton, 5% Spandex (like 95% effort, 5% f*cks)',
            care: 'Hand wash (like your reputation). Line dry (like your thirst traps).',
            colors: ['Nightclub Black', 'Beach Bod Blue'],
            sizes: ['XS', 'S', 'M', 'L'],
            images: [
                'imagenes/productos/busy_summer_drop/body_summer/black/body_black.png',
                'imagenes/productos/busy_summer_drop/body_summer/gray/body_gray.png',
                'imagenes/productos/busy_summer_drop/body_summer/white/body_white.png'
            ]
        },
    
        'saint_smoke_tee': {
            title: 'SAINT SMOKE TEE',
            tag: 'BUSY SUMMER',
            price: '€34.99',
            description: "Holy smoke, unholy flex. 240gsm cotton for sinners with style. Print so sacred it needs confession.",
            material: '100% Cotton 240 g/m² (anointed fabric)',
            care: 'Wash with holy water. Tumble dry on low heat (like hell).',
            colors: ['Confession Black', 'Angel Dust White'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            images: [
                'imagenes/productos/busy_summer_drop/saint_smoke_oversize/black/saint_smoke_oversize_back.jpeg',
                'imagenes/productos/busy_summer_drop/saint_smoke_oversize/black/saint_smoke_oversize_front.jpeg',
                'imagenes/productos/busy_summer_drop/saint_smoke_oversize/white/saint_smoke_oversize_back.jpeg',
                'imagenes/productos/busy_summer_drop/saint_smoke_oversize/white/saint_smoke_oversize_front.jpeg'
            ]
        },
    
        'chocolate-hot-tee': {
            title: 'CHOCOLATE HOT TEE',
            tag: 'BUSY SUMMER',
            price: '€34.99',
            description: "Sweet but psycho. 240gsm tee for toxic baddies. Melts haters like chocolate in July.",
            material: '100% Cotton 240 g/m² (smooth like your game)',
            care: 'Wash cold (like your revenge plans). No bleach (like your dark humor).',
            colors: ['Dark Cocoa', 'Milk Chocolate'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            images: [
                'imagenes/productos/busy_summer_drop/chocolate_oversize/choclate_over_front_png.png',
                'imagenes/productos/busy_summer_drop/chocolate_oversize/choclate_over_back_png.png'
            ]
        },
    
        'saint_smoke': {
            title: 'ANGELS DEMONS TEE',
            tag: 'BUSY SUMMER',
            price: '€34.99',
            description: "240gsm of identity crisis. For angels by day, demons by Uber ride. Shoulder devil included.",
            material: '100% Cotton 240 g/m² (divine intervention)',
            care: 'Wash separately (like your personalities). Air dry (like your tears).',
            colors: ['Heaven White', 'Hellfire Black'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            images: [
                'imagenes/productos/busy_summer_drop/angels_demons_oversize/angels_demons_oversize_front.png',
                'imagenes/productos/busy_summer_drop/angels_demons_oversize/angels_demons_oversize_back.png'
            ]
        },
    
        'busy_stars': {
            title: 'BUSY STARS CT',
            tag: 'BUSY SUMMER',
            price: '€23.99',
            description: "Crop top for main characters only. Star quality or GTFO. Warning: May attract paparazzi & broke niggas.",
            material: '100% Cotton (100% main character energy)',
            care: 'Hand wash (like your brand). Air dry (like your business).',
            colors: ['Hollywood Black', 'Bougie White'],
            sizes: ['XS', 'S', 'M', 'L'],
            images: [
                'imagenes/productos/busy_summer_drop/busy_stars_crop_top/busy_stars_crop_top_black.png',
                'imagenes/productos/busy_summer_drop/busy_stars_crop_top/busy_stars_crop_top_white.png'
            ]
        },
    
        'busy_and_lost_tee': {
            title: 'BUSY AND LOST TEE',
            tag: 'BUSY SUMMER',
            price: '€34.99',
            description: "240gsm of existential drip. For those lost in the sauce but found in the fit. GPS not included.",
            material: '100% Cotton 240 g/m² (directionally challenged)',
            care: 'Wash cold (like your soul). Tumble dry low (like your expectations).',
            colors: ['Midlife Crisis Black', 'Quarter Life Crisis White'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            images: [
                'imagenes/productos/busy_summer_drop/busy_and_lost_oversize/busy_and_lost_oversize_front.png',
                'imagenes/productos/busy_summer_drop/busy_and_lost_oversize/busy_and_lost_oversize_back.png'
            ]
        },
    
        'lost-the-sex': {
            title: 'LOST THE SEX',
            tag: 'BUSY SUMMER',
            price: '€11.99',
            description: "For players who lost the game. XL? Go buy Durex clown. Comes with free disappointment.",
            material: 'Latex (like your personality)',
            care: 'Keep away from sharp objects (like your ex). Store in dark place (like your secrets).',
            colors: ['Regret White', 'Walk of Shame Black'],
            sizes: ['ONE SIZE'],
            images: [
                'imagenes/productos/busy_summer_drop/condoms_white/condones_nuevos_png.png'
            ]
        },
    
        'summer-bikini-busy': {
            title: 'SUMMER BIKINI BUSY',
            tag: 'BUSY SUMMER',
            price: '€14.99',
            description: "Bikini so hot it should come with fire extinguisher. For bad bitches who tan with SPF 100 (melanin is busy).",
            material: '82% Nylon, 18% Spandex (82% looks, 18% stretch)',
            care: 'Hand wash only (like your heart). Lay flat to dry (like your standards).',
            colors: ['Sunburn Red', 'Beach Please Blue'],
            sizes: ['XS', 'S', 'M', 'L'],
            images: [
                'imagenes/productos/busy_summer_drop/bikini_busy/bikini_busy.png'
            ]
        },
    
        'sandy_souls': {
            title: 'SANDY SOULS',
            tag: 'BUSY SUMMER',
            price: '€9.99',
            description: "Beach bag for souls who hate sand but love flex. Fits: 1 towel, 2 lies, 3 abandoned resolutions.",
            material: 'Canvas (sturdy like your summer fling promises)',
            care: 'Shake out sand (like you shake off haters). Air dry (like your trauma).',
            colors: ['Basic Beige', 'Extra Black', 'Karen White'],
            sizes: ['ONE SIZE'],
            images: [
                'imagenes/productos/busy_summer_drop/sandy_souls_beach_bag/sandy_souls_black.png',
                'imagenes/productos/busy_summer_drop/sandy_souls_beach_bag/sandy_souls_white.png',
                'imagenes/productos/busy_summer_drop/sandy_souls_beach_bag/sandy_souls_beige.png'
            ]
        },
    
        'ls-plush-toys': {
            title: 'LS Plush Toy\'s',
            tag: 'BUSY SUMMER',
            price: '€11.99',
            description: "For grown-ass adults who still sleep with stuffed animals. No judgment (we saw your search history).",
            material: '100% Polyester (100% emotional support)',
            care: 'Hand wash (like your childhood trauma). Air dry (like your tears).',
            colors: ['Sleep Paralysis Demon Black', 'Guardian Angel White'],
            sizes: ['ONE SIZE'],
            images: [
                'imagenes/productos/busy_summer_drop/peluches/Halo_Buddy.png',
                'imagenes/productos/busy_summer_drop/peluches/Saint_Puff.png'
            ]
        }
    };
    
   // Actualizar la función para abrir el modal con animaciones mejoradas
document.querySelectorAll('.drop-item').forEach((item, index) => {
    item.addEventListener('click', function() {
        const productTitle = this.querySelector('h3').textContent.trim();
        const productId = Object.keys(products).find(key => 
            products[key].title.toLowerCase() === productTitle.toLowerCase()
        );
        currentProduct = products[productId];
        basePrice = parseFloat(currentProduct.price.replace('€', ''));
        const product = products[productId];
        const modal = document.getElementById('productModal');

        // Configurar tallas dinámicamente
       const sizesContainer = document.querySelector('.sizes');
sizesContainer.innerHTML = ''; // Limpiar tallas existentes

// Seleccionar la primera talla por defecto si no hay M
let defaultSelected = false;
product.sizes.forEach(size => {
    const sizeBtn = document.createElement('button');
    sizeBtn.className = 'size-option';
    sizeBtn.textContent = size;
    
    // Seleccionar talla M por defecto si existe, sino la primera disponible
    if ((size === 'M' || !defaultSelected) && !document.querySelector('.size-option.active')) {
        sizeBtn.classList.add('active');
        selectedSize = size; // Actualizar la talla seleccionada
        defaultSelected = true;
    }
    
    sizeBtn.addEventListener('click', function() {
        sizesContainer.querySelectorAll('.size-option').forEach(opt => {
            opt.classList.remove('active');
        });
        this.classList.add('active');
        selectedSize = size; // Actualizar la talla seleccionada al hacer clic
    });
    
    sizesContainer.appendChild(sizeBtn);
});
        
        // Llenar modal con datos del producto
        document.getElementById('modalTitle').textContent = product.title;
        document.getElementById('modalTag').textContent = product.tag;
        document.getElementById('modalPrice').textContent = product.price;
        document.getElementById('modalDescription').textContent = product.description;
        document.getElementById('modalMaterial').textContent = product.material;
        document.getElementById('modalCare').textContent = product.care;
        
        // Configurar imágenes
        const mainImage = document.getElementById('modalMainImage');
        const thumbnailsContainer = document.getElementById('thumbnails');
        
        thumbnailsContainer.innerHTML = '';
        
        product.images.forEach((imgSrc, i) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.alt = `${product.title} ${i + 1}`;
            
            if (i === 0) {
                thumb.classList.add('active');
                mainImage.src = imgSrc;
                mainImage.alt = product.title;
                
                // Precargar imagen principal para evitar parpadeo
                const imgPreload = new Image();
                imgPreload.src = imgSrc;
            }
            
            thumb.addEventListener('click', () => {
                // Animación de transición suave
                gsap.to(mainImage, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        mainImage.src = imgSrc;
                        mainImage.alt = `${product.title} ${i + 1}`;
                        gsap.to(mainImage, {
                            opacity: 1,
                            duration: 0.3
                        });
                    }
                });
                
                document.querySelectorAll('.thumbnails img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            
            thumbnailsContainer.appendChild(thumb);
        });
        
        // Mostrar modal con animación
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Animación de entrada mejorada
        gsap.fromTo(modal.querySelector('.modal-content'), 
            { y: 50, opacity: 0, scale: 0.98 },
            { 
                y: 0, 
                opacity: 1, 
                scale: 1,
                duration: 0.8, 
                ease: "back.out(1.7)" 
            }
        );
        
        // Desplazar al principio del modal
        modal.scrollTo(0, 0);
    });
});

// Cerrar modal con animación mejorada
function closeModal() {
    const modal = document.getElementById('productModal');
    
    gsap.to(modal.querySelector('.modal-content'), {
        y: 50,
        opacity: 0,
        scale: 0.98,
        duration: 0.6,
        ease: "power3.in",
        onComplete: () => {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
            
            // Resetear el modal para la próxima apertura
            gsap.set(modal.querySelector('.modal-content'), {
                y: 0,
                opacity: 1,
                scale: 1
            });
        }
    });
}
    
    // Cerrar modal al hacer clic fuera
    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });


    document.querySelector('.close-modal').addEventListener('click', closeModal);

    function closeModal() {
    const modal = document.getElementById('productModal');
    const modalContent = modal.querySelector('.modal-content');

    // Detener cualquier animación anterior de GSAP para evitar conflictos
    gsap.killTweensOf(modalContent);

    // Inicia la animación pero oculta el modal sin esperar
    gsap.to(modalContent, {
        y: 50,
        opacity: 0,
        scale: 0.98,
        duration: 0.3, // más corto para parecer inmediato
        ease: "power3.in"
    });

    // Oculta el modal inmediatamente (o tras un pequeño timeout)
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');

    // Restaurar el estado del contenido para la próxima vez
    gsap.set(modalContent, {
        y: 0,
        opacity: 1,
        scale: 1
    });
}

    
    // Seleccionar talla
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('size-option')) {
            const container = e.target.closest('.sizes');
            container.querySelectorAll('.size-option').forEach(opt => {
                opt.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });
    
    // Seleccionar color
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('color-dot')) {
            const container = e.target.closest('.color-options');
            container.querySelectorAll('.color-dot').forEach(dot => {
                dot.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });
    
    // Efecto scroll navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
            gsap.to('.logo', {
                scale: 0.8,
                duration: 0.6,
                ease: "power3.out"
            });
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
            gsap.to('.logo', {
                scale: 1,
                duration: 0.6,
                ease: "power3.out"
            });
        }
    });

    // Cambio de imagen con hover
    document.querySelectorAll('[data-hover-src]').forEach(img => {
        const originalSrc = img.src;
        const hoverSrc = img.dataset.hoverSrc;
        
        img.parentElement.addEventListener('mouseenter', () => {
            img.src = hoverSrc;
        });
        
        img.parentElement.addEventListener('mouseleave', () => {
            img.src = originalSrc;
        });
    });

    // Precarga imágenes hover
    document.querySelectorAll('[data-hover-src]').forEach(img => {
        const hoverImage = new Image();
        hoverImage.src = img.dataset.hoverSrc;
    });

    // JavaScript para controlar la proporción de las imágenes
    // Puedes ajustar estos valores para cambiar la proporción
    const leftImageRatio = 0.4; // 40%
    const rightImageRatio = 0.6; // 60%
    
    const leftImage = document.querySelector('.left-image');
    const rightImage = document.querySelector('.right-image');
    
    leftImage.style.flex = leftImageRatio;
    rightImage.style.flex = rightImageRatio;
    
    // Efecto hover suave para las imágenes
    const heroSection = document.querySelector('.hero-section');
    
    heroSection.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        
        // Ajustamos el movimiento basado en la proporción
        const leftMove = -5 * (1 - leftImageRatio);
        const rightMove = 5 * (1 - rightImageRatio);
        
        leftImage.style.transform = `scale(1.02) translateX(${x * leftMove}px)`;
        rightImage.style.transform = `scale(1.02) translateX(${x * rightMove}px)`;
    });
    
    heroSection.addEventListener('mouseleave', () => {
        leftImage.style.transform = '';
        rightImage.style.transform = '';
    });
    
    // Efecto de parpadeo aleatorio
    const flickerTitles = document.querySelectorAll('.flicker-title, .flicker-subtitle');
    
    function randomFlicker() {
        flickerTitles.forEach(title => {
            if (Math.random() > 0.8) {
                title.style.animation = 'none';
                void title.offsetWidth;
                title.style.animation = 'flickerAnimation 1s forwards';
            }
        });
        setTimeout(randomFlicker, 3000);
    }
    setTimeout(randomFlicker, 3000);
});

// Añade esto al final de tu main.js
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de revelado para el texto
    gsap.utils.toArray('.about-text p, .about-text h4, .highlight-box').forEach((el, i) => {
        ScrollTrigger.create({
            trigger: el,
            start: "top 80%",
            onEnter: () => {
                gsap.from(el, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: i * 0.1
                });
            }
        });
    });

    // Efecto de parallax para la imagen
    const aboutImage = document.querySelector('.about-image img');
    if (aboutImage) {
        ScrollTrigger.create({
            trigger: '.about-section',
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                aboutImage.style.transform = `scale(${1 + self.progress * 0.1})`;
            }
        });
    }
});


// Cargar imágenes con retraso para móviles
if (window.innerWidth <= 768) {
    document.querySelectorAll('.hero-image').forEach(img => {
        img.onload = function() {
            this.classList.add('loaded');
        };
        // Forzar carga si ya está en caché
        if (img.complete) img.onload();
    });
}


 document.addEventListener("DOMContentLoaded", function () {
        const dropItems = document.querySelectorAll(".drop-item");

        dropItems.forEach(item => {
            const dropData = item.getAttribute("data-drop");
            if (dropData && dropData.toLowerCase().includes("best")) {
                const imageContainer = item.querySelector(".drop-image-container");

                // Solo añade la etiqueta si no existe ya
                if (!imageContainer.querySelector(".best-seller-tag")) {
                    const tag = document.createElement("div");
                    tag.classList.add("best-seller-tag");
                    tag.textContent = "BEST SELLER";
                    imageContainer.insertBefore(tag, imageContainer.firstChild);
                }
            }
        });
    });


    // Añadir al final del main.js, antes de las últimas llaves de cierre

// Sistema de descuentos
const discountCodes = {
    'BUSYSUMMER15': { type: 'percentage', value: 15, minOrder: 0, description: '15% de descuento en tu primera compra' },
    'ENVIO50': { type: 'shipping', value: 100, minOrder: 50, description: 'Envío gratis en pedidos superiores a 40€' },
    'LOST10': { type: 'percentage', value: 10, minOrder: 0, description: '10% de descuento por tu primera compra' },
    'BESTIE_CHRIS_LS60': { type: 'percentage', value: 60, minOrder: 0, description: '60% de descuento por ser amigo de Christian' },
};

// Variables globales para el pedido
let currentProduct = null;
let selectedSize = 'M';
let appliedDiscount = null;
let basePrice = 0;




// Mostrar formulario de compra
document.getElementById('proceedToCheckout').addEventListener('click', function() {
    // Obtener talla seleccionada (asegurarse de que hay una seleccionada)
    const selectedSizeBtn = document.querySelector('.size-option.active');
    
    if (!selectedSizeBtn) {
        alert('Por favor selecciona una talla antes de continuar');
        return;
    }
    
    selectedSize = selectedSizeBtn.textContent;
    
    // Actualizar resumen del pedido con la talla
    document.getElementById('summaryProduct').textContent = `${currentProduct.title} - Talla: ${selectedSize}`;
    document.getElementById('summaryPrice').textContent = currentProduct.price;
    updateOrderSummary();
    
    // Mostrar formulario
    document.getElementById('checkoutForm').style.display = 'block';
    this.style.display = 'none';
    
    // Desplazar al formulario
    document.querySelector('.modal-info').scrollTo({
        top: document.getElementById('checkoutForm').offsetTop - 20,
        behavior: 'smooth'
    });
});

// Aplicar descuento
document.getElementById('applyDiscount').addEventListener('click', function() {
    const code = document.getElementById('discountCode').value.trim().toUpperCase();
    const messageEl = document.getElementById('discountMessage');
    
    if (discountCodes[code]) {
        const discount = discountCodes[code];
        
        // Verificar mínimo de pedido si es necesario
        if (discount.minOrder > 0 && basePrice < discount.minOrder) {
            messageEl.textContent = `Este código requiere un pedido mínimo de €${discount.minOrder}`;
            messageEl.className = 'discount-message discount-error';
            appliedDiscount = null;
        } else {
            appliedDiscount = discount;
            messageEl.textContent = `Descuento aplicado: ${discount.description}`;
            messageEl.className = 'discount-message discount-success';
        }
    } else {
        messageEl.textContent = 'Código no válido o caducado';
        messageEl.className = 'discount-message discount-error';
        appliedDiscount = null;
    }
    
    // Actualizar resumen
    updateOrderSummary();
});

// Función para calcular el total
function updateOrderSummary() {
    const discountLine = document.querySelector('.discount-line');
    const discountEl = document.getElementById('summaryDiscount');
    const totalEl = document.getElementById('summaryTotal');
    
    let total = basePrice;
    let discountAmount = 0;
    
    // Aplicar descuento si existe
    if (appliedDiscount) {
        if (appliedDiscount.type === 'percentage') {
            discountAmount = basePrice * (appliedDiscount.value / 100);
        } else if (appliedDiscount.type === 'shipping') {
            // En este ejemplo, asumimos que el descuento de envío se aplicará después
            discountAmount = 0; // Se manejará en el mensaje de WhatsApp
        }
        
        total -= discountAmount;
        discountEl.textContent = `-€${discountAmount.toFixed(2)}`;
        discountLine.style.display = 'flex';
    } else {
        discountLine.style.display = 'none';
    }
    
    totalEl.textContent = `€${total.toFixed(2)}`;
}
// Enviar pedido por WhatsApp (versión mejorada)
// Enviar pedido por WhatsApp (versión mejorada)
document.getElementById('whatsappCheckout').addEventListener('click', function() {
    // Validar que hay una talla seleccionada
    if (!selectedSize) {
        alert('Por favor selecciona una talla antes de continuar');
        return;
    }

    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const notes = document.getElementById('customerNotes').value.trim();
    const discountCode = appliedDiscount ? document.getElementById('discountCode').value.trim().toUpperCase() : 'Ninguno';
    
    // Validación de campos requeridos
    if (!name || !email || !phone || !address) {
        alert('Por favor completa todos los campos marcados como obligatorios (*)');
        return;
    }
    
    // Crear mensaje estructurado para WhatsApp
    const productInfo = `*${currentProduct.title}* - Talla: ${selectedSize} - ${currentProduct.price}`;
    const total = parseFloat(document.getElementById('summaryTotal').textContent.replace('€', ''));
    
    let message = `¡Hola Lost Saints!%0A%0A`;
    message += `Quiero hacer el siguiente pedido:%0A%0A`;
    message += `*Producto:* ${productInfo}%0A`;
    message += `*Código descuento:* ${discountCode}%0A`;
    message += `*Total:* €${total.toFixed(2)}%0A%0A`;
    message += `*Datos de envío:*%0A`;
    message += `Nombre: ${name}%0A`;
    message += `Email: ${email}%0A`;
    message += `Teléfono: ${phone}%0A`;
    message += `Dirección: ${address}%0A`;
    message += `Notas: ${notes || 'Ninguna'}%0A%0A`;
    message += `Por favor, confírmame la disponibilidad y los pasos para completar el pago. ¡Gracias!`;
    
    // Redirigir a WhatsApp con el mensaje predefinido
    window.open(`https://wa.me/34661509584?text=${message}`, '_blank');
    
    // Cerrar el modal después de 1 segundo
    setTimeout(() => {
        closeModal();
        resetCheckoutForm();
    }, 1000);
});

// Función para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Resetear formulario al cerrar
function resetCheckoutForm() {
    document.getElementById('checkoutForm').style.display = 'none';
    document.getElementById('proceedToCheckout').style.display = 'block';
    document.getElementById('customerName').value = '';
    document.getElementById('customerEmail').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('customerNotes').value = '';
    document.getElementById('discountCode').value = '';
    document.getElementById('discountMessage').textContent = '';
    appliedDiscount = null;
}

// Mejorar la experiencia de selección de talla
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('size-option')) {
        const container = e.target.closest('.sizes');
        container.querySelectorAll('.size-option').forEach(opt => {
            opt.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Animación de selección
        gsap.fromTo(e.target, 
            { scale: 0.9 },
            { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 }
        );
    }
});
