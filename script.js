

// BURGER-MENU //

const burger = document.querySelector ('.burger');
const menu = document.querySelector('.popup-nav');
const menuLinks = document.querySelectorAll('.popup-nav .header-nav-link');

if (burger && menu) {
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
        });
    });
}

// FAVORITE //
    const slideContainer = document.querySelector('.favorite-slide');

    if (slideContainer) {
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
    }

// MENU //
    const menuSection = document.querySelector('.menu-section');

    if (menuSection) {
        let menuItems = [];
        const menuButtons = document.querySelectorAll('.menu-button');
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

                card.addEventListener('click', () => {
                    openModal(item, imgPath);
                });
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

                card.addEventListener('click', () => {
                    openModal(item, imgPath);
                });

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
}

// MODAL PRODUCTS //

    const productModal = document.getElementById('product-modal');
    const modalOverlay = productModal.querySelector('.modal-overlay');
    const modalClose = productModal.querySelector('.modal-close');

    const modalImage = productModal.querySelector('.modal-image');
    const modalTitle = productModal.querySelector('.modal-title');
    const modalDescription = productModal.querySelector('.modal-description');
    const modalPrice = productModal.querySelector('.modal-price');

    const modalSizes = productModal.querySelector('.modal-sizes');
    const modalAdditives = productModal.querySelector('.modal-additives');

    let currentProduct = null;
    let selectedSize = 's';
    let selectedAdditives = [];

    // открытие модального окна
    function openModal(product, imgPath) {
        currentProduct = product;

        modalImage.src = imgPath;
        modalTitle.textContent = product.name;
        modalDescription.textContent = product.description;

        selectedSize = 's';
        selectedAdditives = [];

        renderSizes();
        renderAdditives();
        updatePrice();

        productModal.classList.add('active');
    }

    //
    function renderSizes() {
        modalSizes.innerHTML = '';

        Object.entries(currentProduct.sizes).forEach(([key, info]) => {
            const btn = document.createElement('button');
            btn.className = 'modal-size-btn';
            btn.textContent = info.size;

            if (key === selectedSize) btn.classList.add('active');

            btn.addEventListener('click', () => {
                selectedSize = key;
                renderSizes();
                updatePrice();
            });

            modalSizes.appendChild(btn);
        });
    }

    function renderAdditives() {
        modalAdditives.innerHTML = '';

        currentProduct.additives.forEach((additive, index) => {
            const btn = document.createElement('button');
            btn.className = 'modal-additive-btn';
            btn.textContent = `${additive.name}`;

            btn.addEventListener('click', () => {
                const exists = selectedAdditives.includes(additive);
                if (exists) {
                    selectedAdditives = selectedAdditives.filter(a => a !== additive);
                    btn.classList.remove('active');
                } else {
                    selectedAdditives.push(additive);
                    btn.classList.add('active');
                }
                updatePrice();
            });

            modalAdditives.appendChild(btn);
        });
    }

    function updatePrice() {
        const basePrice = Number(currentProduct.price);
        const sizeAdd = Number(currentProduct.sizes[selectedSize]["add-price"]);
        const additivesAdd = selectedAdditives.reduce((acc, add) => {
            return acc + Number(add["add-price"]);
        }, 0);

        const total = basePrice + sizeAdd + additivesAdd;

        modalPrice.textContent = `Total: $${total.toFixed(2)}`;
    }

    modalClose.addEventListener('click', () => {
        productModal.classList.remove('active');
    });

    modalOverlay.addEventListener('click', () => {
        productModal.classList.remove('active');
    });
