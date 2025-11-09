document.addEventListener('DOMContentLoaded', () => {
    // =======================
    // FAVORITES SECTION
    // =======================

    const slides = [
        {
            image: './media/coffee-slider-1.png',
            title: "S’mores Frappuccino",
            text: "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
            price: "$5.50"
        },
        {
            image: './media/coffee-slider-2.png',
            title: "Caramel Macchiato",
            text: "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
            price: "$5.00"
        },
        {
            image: './media/coffee-slider-3.png',
            title: "Ice coffee",
            text: "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
            price: "$4.50"
        }
    ];

    const slideImage = document.querySelector('.favorite-slide-image');
    const slideTitle = document.querySelector('.favorite-slide h3');
    const slideText = document.querySelector('.favorite-slide-text');
    const slidePrice = document.querySelector('.favorite-slide-price');
    const slideContainer = document.querySelector('.favorite-slide');

    const leftArrow = document.querySelector('.favorite-arrow-left');
    const rightArrow = document.querySelector('.favorite-arrow-right');
    const controls = document.querySelectorAll('.favorite-slide-control');

    let currentIndex = 0;
    let autoSlideInterval;

    function updateSlide(index) {
        const slide = slides[index];

        // анимация исчезновения
        slideContainer.classList.add('fade-out');

        setTimeout(() => {
            slideImage.src = slide.image;
            slideTitle.textContent = slide.title;
            slideText.textContent = slide.text;
            slidePrice.textContent = slide.price;

            // обновляем индикаторы
            controls.forEach((ctrl, i) => {
                ctrl.classList.toggle('is-current', i === index);
            });

            // анимация появления
            slideContainer.classList.remove('fade-out');
        }, 500);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide(currentIndex);
    }

    // Автопереключение каждые 5 секунд
    function startAutoSlide() {
        stopAutoSlide(); // очищаем, если уже был запущен
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Клики по стрелкам
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide(currentIndex);
    });

    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide(currentIndex);
    });

    // Свайпы на мобильных устройствах
let touchStartX = 0;
let touchEndX = 0;

slideContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

slideContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
}, false);

function handleGesture() {
    const swipeDistance = touchEndX - touchStartX;

    // Чувствительность свайпа (в пикселях)
    if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance < 0) {
            nextSlide(); // свайп влево — следующий слайд
        } else {
            prevSlide(); // свайп вправо — предыдущий слайд
        }
        startAutoSlide(); // сброс автопрокрутки после свайпа
    }
}

    updateSlide(currentIndex);
    startAutoSlide();
});

document.addEventListener('DOMContentLoaded', () => {
    // =======================
    // MENU SECTION
    // =======================

    const menuButtons = document.querySelectorAll('.menu-button');
    const menuSection = document.querySelector('.menu-section');

    const menus = {
        Coffee: [
            { image: './media/coffee-1.jpg', title: 'Irish coffee', text: 'Fragrant black coffee with Jameson Irish whiskey and whipped milk', price: '$7.00' },
            { image: './media/coffee-2.jpg', title: 'Kahlua coffee', text: 'Classic coffee with milk and Kahlua liqueur under a cap of frothed milk', price: '$7.00' },
            { image: './media/coffee-3.jpg', title: 'Ice cappuccino', text: 'Cappuccino with soft thick foam in summer version with ice', price: '$5.00' },
            { image: './media/coffee-4.jpg', title: 'Honey raf', text: 'Espresso with frothed milk, cream and aromatic honey', price: '$5.50' }
        ],
        Tea: [
            { image: './media/tea-1.png', title: 'Moroccan', text: 'Fragrant black tea with tangerine, cinnamon, honey, lemon and mint', price: '$4.50' },
            { image: './media/tea-2.png', title: 'Ginger', text: 'Original black tea with fresh ginger, lemon and honey', price: '$5.00' },
            { image: './media/tea-3.png', title: 'Cranberry', text: 'Invigorating black tea with cranberry and honey', price: '$5.00' },
            { image: './media/tea-4.png', title: 'Sea buckthorn', text: 'Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon', price: '$5.50' }
        ],
        Dessert: [
            { image: './media/dessert-1.png', title: 'Marble cheesecake', text: 'Philadelphia cheese with lemon zest on a light sponge cake and red currant jam', price: '$3.50' },
            { image: './media/dessert-2.png', title: 'Red velvet', text: 'Layer cake with cream cheese frosting', price: '$4.00' },
            { image: './media/dessert-3.png', title: 'Cheesecake', text: 'Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar', price: '$4.50' },
            { image: './media/dessert-4.png', title: 'Creme brulee', text: 'Delicate creamy dessert in a caramel basket with wild berries', price: '$4.00' }
        ]
    };

    function renderMenu(menuName) {
        const items = menus[menuName];
        menuSection.innerHTML = ''; // очищаем предыдущие карточки

        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('menu-card');
            card.innerHTML = `
                <img class="menu-card-image" src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="menu-card-content">
                    <h3>${item.title}</h3>
                    <p class="menu-card-text">${item.text}</p>
                    <p class="menu-card-price">${item.price}</p>
                </div>
            `;

            card.addEventListener('click', () => {
                openModal(item.title, item.image);
    });

            menuSection.appendChild(card);
        });
    }

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            menuButtons.forEach(btn => btn.classList.remove('menu-button-active'));
            button.classList.add('menu-button-active');
            renderMenu(button.textContent);
        });
    });

    let productsData = [];

async function loadProducts() {
    try {
        const response = await fetch('./products.json'); // путь к твоему JSON
        productsData = await response.json();
    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
    }
}

function openModal(productName, imageSrc) {
    const product = productsData.find(p => p.name === productName);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const modalImg = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDesc = modal.querySelector('.modal-description');
    const modalPrice = modal.querySelector('.modal-price');
    const modalSizes = modal.querySelector('.modal-sizes');
    const modalAdditives = modal.querySelector('.modal-additives');

    modalImg.src = imageSrc;
    modalImg.alt = product.name;
    modalTitle.textContent = product.name;
    modalDesc.textContent = product.description;
    modalPrice.textContent = `$${product.price}`;

    // размеры
    modalSizes.innerHTML = `
        <h4>Sizes:</h4>
        <ul>
        ${Object.entries(product.sizes)
            .map(([key, val]) => `<li>${key.toUpperCase()} — ${val.size} (+$${val["add-price"]})</li>`)
            .join('')}
        </ul>
    `;

    // добавки
    modalAdditives.innerHTML = `
        <h4>Additives:</h4>
        <ul>
            ${product.additives
            .map(add => `<li>${add.name} (+$${add["add-price"]})</li>`)
            .join('')}
        </ul>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) {
        closeModal();
    }
});

// Инициализация: по умолчанию Coffee
    loadProducts().then(() => {
    renderMenu('Coffee'); // или твоя категория по умолчанию
    });
});



    // =======================
// MODAL LOGIC
// =======================


document.addEventListener('DOMContentLoaded', () => {
    // =======================
    // BURGER MENU
    // =======================

    const burger = document.querySelector('.burger');
    const popupNav = document.querySelector('.popup-nav');

    if (burger && popupNav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            popupNav.classList.toggle('open');
        });
    }
});