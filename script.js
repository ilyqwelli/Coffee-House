

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


// MENU //

    let menuItems = [];
    const menuButtons = document.querySelectorAll('.menu-button');
    const menuSection = document.querySelector('.menu-section');
    const loadMoreBtn = document.querySelector('.menu-load-more');

    let currentCategory = 'coffee';
    let visibleCount = 4;

    fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        menuItems = data;
        renderMenu(currentCategory); //
    })
    .catch(error => console.error('Ошибка загрузки JSON:', error));

    function renderMenu(category) {
        currentCategory = category;
        visibleCount = 4;

        menuSection.innerHTML = '';
        loadMoreBtn.style.display = 'none';

        // фильтрация по категориям
        const items = menuItems.filter(item => item.category === category);

        items.slice(0, visibleCount).forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card';

            const imgPath = `./media/${category}-${index + 1}.png`;

            card.innerHTML = `
            <img src="${imgPath}"
                alt="${item.name}"
                class="menu-card-image">
            <div class="menu-card-content">
                <h3>${item.name}</h3>
                <p class="menu-card-text">${item.description}</p>
                <p class="menu-card-price">$${item.price}</p>
            </div>
            `;

            menuSection.appendChild(card);
        });

    if (items.length > visibleCount) {
        loadMoreBtn.style.display = 'block';
        }
    }

// при клике на кнопку Load more
    loadMoreBtn.addEventListener('click', () => {
        const items = menuItems.filter(item => item.category === currentCategory);
        const nextItems = items.slice(visibleCount, visibleCount + 4);

        nextItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card';

            const imgIndex = visibleCount + index + 1;
            const imgPath = `./media/${currentCategory}-${imgIndex}.png`;

            card.innerHTML = `
            <img src="${imgPath}" alt="${item.name}" class="menu-card-image">
            <div class="menu-card-content">
                <h3>${item.name}</h3>
                <p class="menu-card-text">${item.description}</p>
                <p class="menu-card-price">$${item.price}</p>
            </div>
            `;

            menuSection.appendChild(card);
        });

    visibleCount += 4;

    // если все показаны, скрыть кнопку
    if (visibleCount >= items.length) {
        loadMoreBtn.style.display = 'none';
        }
    });

    // переключение категорий
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            menuButtons.forEach(btn => btn.classList.remove('menu-button-active'));
            button.classList.add('menu-button-active');
            renderMenu(button.textContent.toLowerCase());
        });
});

