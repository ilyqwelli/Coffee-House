

document.addEventListener('DOMContentLoaded', () => {
//Favorites section

// Массив, чтобы менять содержимое слайдера
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

// Эти переменные ссылаются на HTML-элементы слайдера
const slideImage = document.querySelector('.favorite-slide-image');
const slideTitle = document.querySelector('.favorite-slide h3');
const slideText = document.querySelector('.favorite-slide-text');
const slidePrice = document.querySelector('.favorite-slide-price');
const slideContainer = document.querySelector('.favorite-slide');

const leftArrow = document.querySelector('.favorite-arrow-left');
const rightArrow = document.querySelector('.favorite-arrow-right');
const controls = document.querySelectorAll('.favorite-slide-control');

// Индекс текцщего слайдера
let currentIndex = 0;

// Функция
function updateSlide(index) {
    const slide = slides[index];

    // fade-out
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

        // fade-in
        slideContainer.classList.remove('fade-out');
    }, 500);
}

leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide(currentIndex);
});

rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide(currentIndex);
});

// Инициализация
updateSlide(currentIndex);
});

//Menu section

document.addEventListener('DOMContentLoaded', () => {
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
        { image: './media/tea-4.png', title: 'Cranberry', text: 'Invigorating black tea with cranberry and honey', price: '$5.00' }
        ],
        Desert: [
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
            <img class="menu-card-image" src="${item.image}" loading="lazy">
            <div class="menu-card-content">
            <h3>${item.title}</h3>
            <p class="menu-card-text">${item.text}</p>
            <p class="menu-card-price">${item.price}</p>
            </div>
        `;
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

    // Инициализация: по умолчанию Coffee
    renderMenu('Coffee');
});
