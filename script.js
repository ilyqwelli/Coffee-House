
// BURGER-MENU //

const burger = document.querySelector ('.burger');
const menu = document.querySelector('.popup-nav');
const menuLinks = document.querySelectorAll('.popup-nav .header-nav-link');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
});

menuLinks.forEach(link => {
    link.addEventListener ('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('open');
        document.body.classList.remove('menu-open');
    })
})

// FAVORITE //

    let slides = [];

// Элементы
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

// Обновление отображения
    function updateSlide(index) {
        const slide = slides[index];

        slideContainer.classList.add('fade-out');

        setTimeout(() => {
            slideImage.src = slide.image;
            slideTitle.textContent = slide.title;
            slideText.textContent = slide.text;
            slidePrice.textContent = slide.price;

            controls.forEach((ctrl, i) => {
                ctrl.classList.toggle('is-current', i === index);
            });

            slideContainer.classList.remove('fade-out');
        }, 500);
    }

// Смена слайда
    function changeSlide(step) {
        currentIndex = (currentIndex + step + slides.length) % slides.length;
        updateSlide(currentIndex);
    }

// Автопрокрутка
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => changeSlide(1), 10000);
    }

    slideContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slideContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

// Нажатие на стрелки
    leftArrow.addEventListener('click', () => changeSlide(-1));
    rightArrow.addEventListener('click', () => changeSlide(1));

// Свайпы на мобильных устройствах
    let touchStartX = 0;

    slideContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slideContainer.addEventListener('touchend', (e) => {
        const swipeDistance = e.changedTouches[0].screenX - touchStartX;

        if (Math.abs(swipeDistance) > 50) {
            changeSlide(swipeDistance < 0 ? 1 : -1);
            startAutoSlide();
        }
    });

//Остановка автоперелючения
    const slider = document.querySelector('.favorite-slide');


// Загрузка JSON слайдов
    async function loadSlides() {
        try {
            const response = await fetch('./favorite.json');
            slides = await response.json();

            // Инициализация после загрузки!
            updateSlide(currentIndex);
            startAutoSlide();

        } catch (error) {
            console.error('Ошибка загрузки slides.json:', error);
        }
    }

    loadSlides();

// document.addEventListener('DOMContentLoaded', () => {
//     // =======================
//     // MENU SECTION
//     // =======================

//     const menuButtons = document.querySelectorAll('.menu-button');
//     const menuSection = document.querySelector('.menu-section');

//     const menus = {
//         Coffee: [
//             { image: './media/coffee-1.jpg', title: 'Irish coffee', text: 'Fragrant black coffee with Jameson Irish whiskey and whipped milk', price: '$7.00' },
//             { image: './media/coffee-2.jpg', title: 'Kahlua coffee', text: 'Classic coffee with milk and Kahlua liqueur under a cap of frothed milk', price: '$7.00' },
//             { image: './media/coffee-3.jpg', title: 'Ice cappuccino', text: 'Cappuccino with soft thick foam in summer version with ice', price: '$5.00' },
//             { image: './media/coffee-4.jpg', title: 'Honey raf', text: 'Espresso with frothed milk, cream and aromatic honey', price: '$5.50' }
//         ],
//         Tea: [
//             { image: './media/tea-1.png', title: 'Moroccan', text: 'Fragrant black tea with tangerine, cinnamon, honey, lemon and mint', price: '$4.50' },
//             { image: './media/tea-2.png', title: 'Ginger', text: 'Original black tea with fresh ginger, lemon and honey', price: '$5.00' },
//             { image: './media/tea-3.png', title: 'Cranberry', text: 'Invigorating black tea with cranberry and honey', price: '$5.00' },
//             { image: './media/tea-4.png', title: 'Sea buckthorn', text: 'Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon', price: '$5.50' }
//         ],
//         Dessert: [
//             { image: './media/dessert-1.png', title: 'Marble cheesecake', text: 'Philadelphia cheese with lemon zest on a light sponge cake and red currant jam', price: '$3.50' },
//             { image: './media/dessert-2.png', title: 'Red velvet', text: 'Layer cake with cream cheese frosting', price: '$4.00' },
//             { image: './media/dessert-3.png', title: 'Cheesecake', text: 'Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar', price: '$4.50' },
//             { image: './media/dessert-4.png', title: 'Creme brulee', text: 'Delicate creamy dessert in a caramel basket with wild berries', price: '$4.00' }
//         ]
//     };

//     function renderMenu(menuName) {
//         const items = menus[menuName];
//         menuSection.innerHTML = ''; // очищаем предыдущие карточки

//         items.forEach(item => {
//             const card = document.createElement('div');
//             card.classList.add('menu-card');
//             card.innerHTML = `
//                 <img class="menu-card-image" src="${item.image}" alt="${item.title}" loading="lazy">
//                 <div class="menu-card-content">
//                     <h3>${item.title}</h3>
//                     <p class="menu-card-text">${item.text}</p>
//                     <p class="menu-card-price">${item.price}</p>
//                 </div>
//             `;

//             card.addEventListener('click', () => {
//                 openModal(item.title, item.image);
//     });

//             menuSection.appendChild(card);
//         });
//     }

//     menuButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             menuButtons.forEach(btn => btn.classList.remove('menu-button-active'));
//             button.classList.add('menu-button-active');
//             renderMenu(button.textContent);
//         });
//     });

//     let productsData = [];

// async function loadProducts() {
//     try {
//         const response = await fetch('./products.json'); // путь к твоему JSON
//         productsData = await response.json();
//     } catch (error) {
//         console.error('Ошибка загрузки JSON:', error);
//     }
// }

// function openModal(productName, imageSrc) {
//     const product = productsData.find(p => p.name === productName);
//     if (!product) return;

//     const modal = document.getElementById('product-modal');
//     const modalImg = modal.querySelector('.modal-image');
//     const modalTitle = modal.querySelector('.modal-title');
//     const modalDesc = modal.querySelector('.modal-description');
//     const modalPrice = modal.querySelector('.modal-price');
//     const modalSizes = modal.querySelector('.modal-sizes');
//     const modalAdditives = modal.querySelector('.modal-additives');

//     modalImg.src = imageSrc;
//     modalImg.alt = product.name;
//     modalTitle.textContent = product.name;
//     modalDesc.textContent = product.description;
//     modalPrice.textContent = `$${product.price}`;

//     // размеры
//     modalSizes.innerHTML = `
//         <h4>Sizes:</h4>
//         <ul>
//         ${Object.entries(product.sizes)
//             .map(([key, val]) => `<li>${key.toUpperCase()} — ${val.size} (+$${val["add-price"]})</li>`)
//             .join('')}
//         </ul>
//     `;

//     // добавки
//     modalAdditives.innerHTML = `
//         <h4>Additives:</h4>
//         <ul>
//             ${product.additives
//             .map(add => `<li>${add.name} (+$${add["add-price"]})</li>`)
//             .join('')}
//         </ul>
//     `;

//     modal.classList.add('active');
//     document.body.style.overflow = 'hidden';
// }

// function closeModal() {
//     const modal = document.getElementById('product-modal');
//     modal.classList.remove('active');
//     document.body.style.overflow = '';
// }

// document.addEventListener('click', (e) => {
//     if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) {
//         closeModal();
//     }
// });

// // Инициализация: по умолчанию Coffee
//     loadProducts().then(() => {
//     renderMenu('Coffee'); // или твоя категория по умолчанию
//     });
// });



//     // =======================
// // MODAL LOGIC
// // =======================


// document.addEventListener('DOMContentLoaded', () => {
//     // =======================
//     // BURGER MENU
//     // =======================

//     const burger = document.querySelector('.burger');
//     const popupNav = document.querySelector('.popup-nav');

//     if (burger && popupNav) {
//         burger.addEventListener('click', () => {
//             burger.classList.toggle('active');
//             popupNav.classList.toggle('open');
//         });
//     }
// });