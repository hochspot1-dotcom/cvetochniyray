import fs from 'fs';
import { products } from './src/productsData.js';

const bestsellers = products.filter(p => p.isBestseller);

// Helper: Generate Clean Modern Product Card matching Screenshot 1
function generateCardHtml(prod, isBestseller = false) {
  const badgeHtml = prod.badge ? `<span class="card-badge badge">${prod.badge}</span>` : '';
  const catsAttr = (prod.allCategories || [prod.category]).join('|');
  const cardClass = isBestseller ? 'bestseller-card' : 'product-card';
  const ratingVal = prod.rating || '5';
  const reviewsCount = prod.reviews || 6;

  return `            <article class="${cardClass}" data-id="${prod.id}" data-category="${prod.category}" data-all-categories="${catsAttr}" data-price="${prod.priceNum}" data-rating="${ratingVal}" data-reviews="${reviewsCount}">
              <div class="card-img-box">
                ${badgeHtml}
                <img class="card-thumb-img bestseller-card__image product-card__image" src="${prod.image}" alt="${prod.title}" loading="lazy" draggable="false" />
              </div>
              <div class="card-content bestseller-card__info product-card__info">
                <h3 class="card-name card-title bestseller-card__title product-card__title" title="${prod.title}">${prod.title}</h3>
                <div class="card-bottom-row bestseller-card__footer product-card__footer">
                  <div class="card-rating-block bestseller-card__meta product-card__meta">
                    <span class="card-star">★</span>
                    <strong class="card-rating-score">${ratingVal}</strong>
                    <span class="card-reviews-count">(${reviewsCount} отзывов)</span>
                  </div>
                  <div class="card-price-badge bestseller-card__price product-card__price">${prod.price}</div>
                </div>
              </div>
            </article>`;
}

// 1. Generate Bestsellers Cards HTML
const bestsellersCardsHtml = bestsellers.map(prod => generateCardHtml(prod, true)).join('\n');

// 2. Generate Full Catalog Product Cards HTML
const allCardsHtml = products.map(prod => generateCardHtml(prod, false)).join('\n');

const gorlovkaZonesScript = fs.readFileSync('./public/gorlovka_zones.js', 'utf8');

// API-ключи интерактивных карт и геосаджеста
const YANDEX_MAPS_API_KEY = '1329f98b-8d18-4ba7-bcdf-b260ce11741d';
const YANDEX_SUGGEST_API_KEY = 'dd76a4ab-ce03-4cfd-8660-10b9d8df6419';

let indexHtml = `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <meta name="HandheldFriendly" content="True" />
    <meta name="MobileOptimized" content="320" />
    <title>Цветочный Рай — Доставка цветов и подарков в Горловке</title>
    <link rel="preload" as="image" href="./hero.png" fetchpriority="high" />
    <!-- Yandex Maps API & Native SuggestView with Official Keys -->
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${YANDEX_MAPS_API_KEY}&suggest_apikey=${YANDEX_SUGGEST_API_KEY}" type="text/javascript" defer></script>
    <script type="text/javascript" defer>
${gorlovkaZonesScript}
    </script>
    <link rel="stylesheet" href="./src/style.css" />
  </head>
  <body>
    <!-- Ambient Botanical Floral Background Wallpaper (Whole Intact HD Botanical Art) -->
    <div class="site-floral-bg" id="site-floral-bg" aria-hidden="true">
      <img src="./floral/flower_1.png" class="floral-decor-item" style="top: 2%; left: 25px; width: 230px; transform: rotate(-10deg);" alt="" />
      <img src="./floral/flower_2.png" class="floral-decor-item" style="top: 8%; right: 30px; width: 240px; transform: rotate(15deg);" alt="" />
      <img src="./floral/flower_3.png" class="floral-decor-item" style="top: 20%; left: 35px; width: 220px; transform: rotate(8deg);" alt="" />
      <img src="./floral/flower_4.png" class="floral-decor-item" style="top: 15%; left: 45%; width: 140px; transform: rotate(25deg); opacity: 0.12;" alt="" />
      <img src="./floral/flower_5.png" class="floral-decor-item" style="top: 28%; right: 35px; width: 250px; transform: rotate(-15deg);" alt="" />
      <img src="./floral/flower_6.png" class="floral-decor-item" style="top: 38%; left: 30px; width: 230px; transform: rotate(18deg);" alt="" />
      <img src="./floral/flower_7.png" class="floral-decor-item" style="top: 48%; right: 30px; width: 235px; transform: rotate(-12deg);" alt="" />
      <img src="./floral/flower_8.png" class="floral-decor-item" style="top: 42%; left: 50%; width: 170px; transform: rotate(-18deg); opacity: 0.12;" alt="" />
      <img src="./floral/flower_9.png" class="floral-decor-item" style="top: 60%; left: 35px; width: 240px; transform: rotate(12deg);" alt="" />
      <img src="./floral/flower_10.png" class="floral-decor-item" style="top: 70%; right: 30px; width: 245px; transform: rotate(-22deg);" alt="" />
      <img src="./floral/flower_1.png" class="floral-decor-item" style="top: 80%; left: 25px; width: 230px; transform: rotate(15deg);" alt="" />
      <img src="./floral/flower_2.png" class="floral-decor-item" style="top: 65%; left: 46%; width: 180px; transform: rotate(8deg); opacity: 0.12;" alt="" />
      <img src="./floral/flower_5.png" class="floral-decor-item" style="top: 90%; right: 35px; width: 240px; transform: rotate(-12deg);" alt="" />
      <img src="./floral/flower_7.png" class="floral-decor-item" style="top: 95%; left: 18%; width: 220px; transform: rotate(30deg);" alt="" />
    </div>

    <!-- Full-Page Semi-Transparent Frosted Veil Backdrop for Catalog Flyout -->
    <div class="catalog-flyout-backdrop" id="catalog-flyout-backdrop"></div>

    <!-- Search Overlay Modal -->
    <div class="header-search-overlay" id="header-search-overlay">
      <div class="header-search-modal">
        <div class="search-modal-head">
          <svg class="search-modal-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" class="search-modal-input" id="main-search-input" placeholder="Поиск цветов, букетов, подарков..." autocomplete="off" />
          <button class="search-modal-close" id="btn-search-modal-close" title="Закрыть">✕</button>
        </div>
        <div class="header-search-results" id="search-live-results" style="display: none;"></div>
      </div>
    </div>

    <!-- Floating Greenish Capsule Header -->
    <div class="header-outer-wrapper">
      <header class="header cvetov-header">
        <div class="cvetov-header-bar">
          
          <!-- LEFT: Brand Logo & Catalog Button -->
          <div class="header-left-group">
            <a href="#" class="cvetov-logo" id="logo-link" title="Цветочный Рай — На главную">
              <img src="./logo-header.png" alt="Цветочный Рай" class="cvetov-logo-img" />
            </a>

            <!-- Catalog Flyout Trigger Button (Immediately after logo) -->
            <div class="header__catalog-wrap">
              <button class="header-icon-btn header-catalog-btn" id="btn-catalog" title="Каталог категорий" aria-label="Каталог">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                </svg>
              </button>

              <!-- 2-Column Luxury Mega-Menu Flyout -->
              <div class="catalog-flyout" id="catalog-flyout">
                <div class="catalog-flyout-inner">
                  
                  <!-- Left Column: Main Category List -->
                  <div class="flyout-left-pane">
                    <div class="flyout-cat-item active" data-cat="Букеты" data-has-sub="true">
                      <span>Букеты</span>
                      <span class="flyout-chevron">›</span>
                    </div>
                    <div class="flyout-cat-item" data-cat="Композиции" data-has-sub="true">
                      <span>Композиции</span>
                      <span class="flyout-chevron">›</span>
                    </div>
                    <div class="flyout-cat-item" data-cat="Подарки и декор">
                      <span>Подарки и декор</span>
                    </div>
                    <div class="flyout-cat-item" data-cat="Гелиевые шары">
                      <span>Гелиевые шары</span>
                    </div>
                    <div class="flyout-cat-item" data-cat="Свадебная флористика" data-has-sub="true">
                      <span>Свадебная флористика</span>
                      <span class="flyout-chevron">›</span>
                    </div>
                    <div class="flyout-cat-item" data-cat="Оформление и декор мероприятий">
                      <span>Оформление и декор мероприятий</span>
                    </div>
                    <div class="flyout-cat-item" data-cat="Комнатные растения">
                      <span>Комнатные растения</span>
                    </div>
                    <div class="flyout-cat-item" data-cat="Сезонные композиции">
                      <span>Сезонные композиции</span>
                    </div>
                  </div>

                  <!-- Right Column: Dynamic Submenu -->
                  <div class="flyout-right-pane" id="flyout-right-pane">
                    <!-- Default: Букеты -->
                    <a href="#catalog?cat=Монобукеты" data-cat="Монобукеты" class="flyout-sub-item">Монобукеты</a>
                    <a href="#catalog?cat=Сборные букеты размер S" data-cat="Сборные букеты размер S" class="flyout-sub-item">Сборные букеты размер S</a>
                    <a href="#catalog?cat=Сборные букеты размер M" data-cat="Сборные букеты размер M" class="flyout-sub-item">Сборные букеты размер M</a>
                    <a href="#catalog?cat=Сборные букеты размер L" data-cat="Сборные букеты размер L" class="flyout-sub-item">Сборные букеты размер L</a>
                    <a href="#catalog?cat=WOW-букеты" data-cat="WOW-букеты" class="flyout-sub-item">WOW-букеты</a>
                  </div>

                </div>

                <!-- Bottom Action Banner -->
                <div class="flyout-bottom-bar">
                  <a href="#catalog?cat=all" data-cat="all" class="flyout-all-btn" id="btn-flyout-all">
                    <span>Смотреть весь каталог →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- CENTER: Store Info Items (Address, Schedule, Phone) -->
          <div class="header-store-info-capsule">
            <div class="store-info-pill store-info-addr" title="Адрес салона">
              <div class="store-pill-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <span class="store-pill-text">Горловка, пл. Победы</span>
            </div>

            <div class="store-info-pill store-info-hours" title="График работы">
              <div class="store-pill-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <span class="store-pill-text">7:00 – 20:00</span>
            </div>

            <a href="tel:+79494826160" class="store-info-pill store-info-phone" title="Позвонить нам">
              <div class="store-pill-icon phone-pulse">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <span class="store-pill-text phone-bold">+7 (949) 482-61-60</span>
            </a>
          </div>

          <!-- RIGHT: Favorites, Search and Cart Buttons -->
          <div class="header-actions-group">
            
            <!-- Favorites Button with Badge (Left of Search) -->
            <button class="header-icon-btn header-fav-btn" id="btn-header-fav" title="Избранные товары" aria-label="Избранное">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span class="header-cart-badge header-fav-badge" id="fav-badge" style="display: none;">0</span>
            </button>

            <!-- Search Trigger Button -->
            <button class="header-icon-btn" id="btn-search-trigger" title="Поиск цветов и подарков" aria-label="Поиск">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </button>

            <!-- Shopping Cart Button with Badge -->
            <button class="header-icon-btn header-cart-btn" id="btn-header-cart" title="Корзина" aria-label="Корзина">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span class="header-cart-badge" id="cart-badge" style="display: none;">0</span>
            </button>

          </div>

        </div>
      </header>
    </div>

    <main class="main-content" id="main-catalog-content">
      
      <!-- =========================================================
           VIEW 1: HOME PAGE VIEW
      ========================================================= -->
      <div id="home-view" class="page-view active">
        
        <!-- 2. Full-Bleed Hero Showcase Banner spanning 100% width and top edge of viewport -->
        <section class="cvetov-hero-section full-bleed">
          <div class="hero-showcase">
            <img src="./hero.png" alt="Цветочный Рай Горловка" class="hero-showcase__bg-img" />
            <div class="hero-showcase__overlay"></div>
            <div class="hero-scroll-dim-overlay" id="hero-scroll-dim-overlay"></div>
            <div class="hero-showcase__content">
              <a href="#category-hub-section" class="hero-showcase__btn" id="btn-hero-action">Выбрать букет</a>
            </div>
          </div>
        </section>

        <div class="container">
          <!-- SCREEN 1: CATEGORY HUB PANELS (Horizontal Row with Drag & Arrows) -->
          <section class="category-hub-section" id="category-hub-section">
            <div class="category-hub-track-wrap">
              
              <!-- Left Floating Navigation Arrow -->
              <button class="hub-nav-arrow prev" id="btn-hub-prev" aria-label="Предыдущие панели" title="Листать влево">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><path d="m15 18-6-6 6-6"/></svg>
              </button>

              <div class="category-hub-track" id="category-hub-track">
                
                <!-- Panel 1: Цветы и букеты -->
                <div class="hub-card" data-category="Цветы">
                  <div class="hub-card__header" data-cat="Цветы">
                    <h3 class="hub-card__title">Цветы и букеты</h3>
                    <svg class="hub-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <div class="hub-card__grid">
                    <div class="hub-cell" data-cat="Сборные букеты размер M">
                      <span class="hub-cell__label">Авторские букеты</span>
                      <img src="./3d/3d_author.png" alt="Авторские букеты" class="hub-cell__img" />
                    </div>
                    <div class="hub-cell hub-cell--tall" data-cat="Монобукеты">
                      <span class="hub-cell__label">Монобукеты</span>
                      <img src="./3d/3d_mono.png" alt="Монобукеты" class="hub-cell__img" />
                    </div>
                    <div class="hub-cell" data-cat="В коробках">
                      <span class="hub-cell__label">Цветы в коробках</span>
                      <img src="./3d/3d_flower_box.png" alt="Композиции" class="hub-cell__img" />
                    </div>
                    <button class="hub-cell__more-btn" data-cat="Цветы">
                      <span>Смотреть всё</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>

                <!-- Panel 2: Оформление и декор мероприятий -->
                <div class="hub-card" data-category="Оформление и декор мероприятий">
                  <div class="hub-card__header" data-cat="Оформление и декор мероприятий">
                    <h3 class="hub-card__title">Оформление и декор</h3>
                    <svg class="hub-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <div class="hub-card__grid">
                    <div class="hub-cell" data-cat="Оформление свадебной арки">
                      <span class="hub-cell__label">Свадебные арки</span>
                      <img src="./3d/3d_wedding_arch.png" alt="Свадебные арки" class="hub-cell__img" />
                    </div>
                    <div class="hub-cell hub-cell--tall" data-cat="Декор президиума">
                      <span class="hub-cell__label">Декор залов и столов</span>
                      <img src="./3d/3d_hall_decor.png" alt="Декор залов" class="hub-cell__img" />
                    </div>
                    <div class="hub-cell" data-cat="Оформление фотозоны">
                      <span class="hub-cell__label">Фотозоны</span>
                      <img src="./3d/3d_photozone.png" alt="Фотозоны" class="hub-cell__img" />
                    </div>
                    <button class="hub-cell__more-btn" data-cat="Оформление и декор мероприятий">
                      <span>Смотреть всё</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>

                <!-- Panel 3: Подарки и декор -->
                <div class="hub-card" data-category="Подарки и декор">
                  <div class="hub-card__header" data-cat="Подарки и декор">
                    <h3 class="hub-card__title">Подарки и игрушки</h3>
                    <svg class="hub-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <div class="hub-card__grid">
                    <div class="hub-cell" data-cat="Мягкие игрушки">
                      <span class="hub-cell__label">Мягкие игрушки</span>
                      <img src="./3d/3d_toys.png" alt="Мягкие игрушки" class="hub-cell__img" />
                    </div>
                    <div class="hub-cell hub-cell--tall" data-cat="Подарочные наборы">
                      <span class="hub-cell__label">Подарочные наборы</span>
                      <img src="./3d/3d_gift_box.png" alt="Подарочные наборы" class="hub-cell__img" />
                    </div>
                    <div class="hub-cell" data-cat="Открытки">
                      <span class="hub-cell__label">Открытки</span>
                      <img src="./3d/3d_card.png" alt="Открытки" class="hub-cell__img" />
                    </div>
                    <button class="hub-cell__more-btn" data-cat="Подарки и декор">
                      <span>Смотреть всё</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>

                <!-- Panel 4: Воздушные шары -->
                <div class="hub-card" data-category="Гелиевые шары">
                  <div class="hub-card__header" data-cat="Гелиевые шары">
                    <h3 class="hub-card__title">Воздушные шары</h3>
                    <svg class="hub-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <div class="hub-card__grid">
                    <div class="hub-cell" data-cat="Шары в коробке">
                      <span class="hub-cell__label">Шары в коробке</span>
                      <img src="./3d/3d_balloons_box.png" alt="Шары в коробке" class="hub-cell__img" />
                    </div>
                    <div class="hub-cell hub-cell--tall" data-cat="Наборы шаров">
                      <span class="hub-cell__label">Наборы и фонтаны</span>
                      <img src="./3d/3d_balloons_set.png" alt="Наборы шаров" class="hub-cell__img" />
                    </div>
                    <div class="hub-cell" data-cat="Шары с надписями">
                      <span class="hub-cell__label">Шары с надписями</span>
                      <img src="./3d/3d_balloon_single.png" alt="Шары с надписями" class="hub-cell__img" />
                    </div>
                    <button class="hub-cell__more-btn" data-cat="Гелиевые шары">
                      <span>Смотреть всё</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>

              </div>

              <!-- Right Floating Navigation Arrow -->
              <button class="hub-nav-arrow next" id="btn-hub-next" aria-label="Следующие панели" title="Листать вправо">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </section>

          <!-- Bestsellers Section with Category Tabs and Smooth Navigation -->
          <section class="bestsellers-section" id="bestsellers-section">
            <div class="bestsellers-header">
              <div class="bestsellers-title-wrap">
                <h2 class="bestsellers-title">Наши бестселлеры в Горловке</h2>
                <span class="bestsellers-subtitle">Самые популярные букеты и композиции с быстрой доставкой по Горловке и районам</span>
              </div>

              <div class="bestsellers-header-right">
                <div class="bestsellers-cat-tabs" id="bestsellers-cat-tabs">
                  <button class="best-tab active" data-cat="all">Все (24)</button>
                  <button class="best-tab" data-cat="Цветы">Цветы и букеты</button>
                  <button class="best-tab" data-cat="Монобукеты">Монобукеты</button>
                  <button class="best-tab" data-cat="Композиции">В коробках и корзинах</button>
                  <button class="best-tab" data-cat="WOW-букеты">WOW-букеты</button>
                </div>

                <button class="btn-open-catalog-pill" id="btn-bestsellers-catalog">
                  <span>Весь каталог (260) →</span>
                </button>
              </div>
            </div>

            <div class="bestsellers-track-wrapper">
              <button class="floating-carousel-arrow prev" id="btn-best-prev" aria-label="Предыдущие букеты" title="Листать влево">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><path d="m15 18-6-6 6-6"/></svg>
              </button>

              <div class="bestsellers-track" id="bestsellers-track">
${bestsellersCardsHtml}
              </div>

              <button class="floating-carousel-arrow next" id="btn-best-next" aria-label="Следующие букеты" title="Листать вправо">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </section>
        </div>
      </div>

      <!-- =========================================================
           VIEW 2: DEDICATED FULL CATALOG PAGE VIEW
      ========================================================= -->
      <div id="catalog-view" class="page-view" style="display: none;">
        <div class="container catalog-page-container">
          
          <!-- Top Navigation Bar (Single Clean Back to Home Button) -->
          <div class="catalog-page-topbar">
            <a href="#" class="btn-return-home" id="btn-return-home" title="Вернуться на главную страницу">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
              <span>← На главную</span>
            </a>
          </div>

          <!-- Catalog Page Header with Search & Info -->
          <div class="catalog-page-header">
            <div class="catalog-page-header-info">
              <div class="catalog-page-title-row">
                <h1 class="catalog-page-title" id="catalog-page-title">Цветы и букеты</h1>
              </div>
              <p class="catalog-page-desc" id="catalog-page-desc">Свежие авторские и монобукеты, шляпные коробки и корзины с бережной доставкой по Горловке</p>
            </div>

            <!-- Page Live Search -->
            <div class="catalog-page-search-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="page-search-icon"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="text" class="catalog-page-search-input" id="page-catalog-search-input" placeholder="Поиск по разделу..." autocomplete="off" />
              <button class="catalog-page-search-clear" id="btn-page-search-clear" style="display: none;">✕</button>
            </div>
          </div>

          <!-- Subcategory Ribbon Filter Bar -->
          <div class="catalog-ribbon-wrapper">
            <button class="ribbon-nav-arrow prev" id="btn-page-ribbon-prev" aria-label="Предыдущие категории" title="Листать влево">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <!-- Dynamic Ribbon Track -->
            <div class="catalog-ribbon-track" id="page-ribbon-track"></div>

            <button class="ribbon-nav-arrow next" id="btn-page-ribbon-next" aria-label="Следующие категории" title="Листать вправо">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          <!-- Sort Toolbar -->
          <div class="catalog-toolbar">
            <div class="catalog-toolbar-left">
              <span class="toolbar-label">Сортировка:</span>
              <div class="catalog-sort-group" id="page-sort-group">
                <button class="sort-chip active" data-sort="popular">По популярности</button>
                <button class="sort-chip" data-sort="price-asc">Сначала дешевле</button>
                <button class="sort-chip" data-sort="price-desc">Сначала дороже</button>
                <button class="sort-chip" data-sort="rating">★ По рейтингу</button>
              </div>
            </div>
          </div>

          <!-- Product Grid on Dedicated Catalog Page -->
          <div class="catalog-page-grid" id="catalog-page-grid">
${allCardsHtml}
          </div>

          <!-- Empty Search State -->
          <div class="catalog-empty-state" id="catalog-empty-state" style="display: none;">
            <h3>По вашему запросу ничего не найдено</h3>
            <p>Попробуйте выбрать другую категорию или сбросить фильтры поиска</p>
            <button class="btn-reset-filter" id="btn-reset-filter">Показать все товары</button>
          </div>

        </div>
      </div>

    </main>

    <!-- ========================================== -->
    <!-- DEDICATED FULL CHECKOUT PAGE -->
    <!-- ========================================== -->
    <section class="checkout-page-section" id="checkout-page-section" style="display: none;">
      <div class="container checkout-container">
        
        <!-- Top Checkout Header & Stepper -->
        <div class="checkout-header-bar">
          <button type="button" class="checkout-back-link" id="btn-checkout-back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Вернуться в каталог</span>
          </button>
          
          <div class="checkout-stepper">
            <div class="co-step-item completed" id="co-step-1">
              <span class="co-step-num">1</span>
              <span class="co-step-label">Корзина</span>
            </div>
            <div class="co-step-divider active"></div>
            <div class="co-step-item active" id="co-step-2">
              <span class="co-step-num">2</span>
              <span class="co-step-label">Оформление</span>
            </div>
            <div class="co-step-divider"></div>
            <div class="co-step-item" id="co-step-3">
              <span class="co-step-num">3</span>
              <span class="co-step-label">Заказ принят</span>
            </div>
          </div>
        </div>

        <!-- 1. MAIN CHECKOUT FORM & SUMMARY -->
        <div class="checkout-grid" id="checkout-main-grid">
          
          <!-- LEFT COLUMN: All Order Forms -->
          <div class="checkout-form-col">
            
            <!-- Block 1: Contact Information -->
            <div class="checkout-card">
              <div class="checkout-card-header">
                <div class="checkout-card-icon">1</div>
                <h3 class="checkout-card-title">Контактные данные</h3>
              </div>
              <div class="checkout-card-body">
                <div class="co-inputs-grid-2">
                  <div class="co-field-wrap">
                    <label class="co-label" for="co-customer-name">Ваше имя <span class="co-req">*</span></label>
                    <input type="text" class="co-input" id="co-customer-name" placeholder="Как к вам обращаться?" required />
                  </div>
                  <div class="co-field-wrap">
                    <label class="co-label" for="co-customer-phone">Номер телефона <span class="co-req">*</span></label>
                    <input type="tel" class="co-input" id="co-customer-phone" inputmode="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" required />
                  </div>
                </div>

                <!-- Recipient Toggle -->
                <div class="co-recipient-toggle-wrap">
                  <div class="co-segmented-control" id="co-recipient-type-tabs">
                    <button type="button" class="co-segment-btn active" data-type="self">
                      <span>Заказ для себя</span>
                    </button>
                    <button type="button" class="co-segment-btn" data-type="gift">
                      <span>🎁 В подарок другому человеку</span>
                    </button>
                  </div>
                </div>

                <!-- Recipient Extra Fields -->
                <div class="co-gift-recipient-box" id="co-gift-recipient-box" style="display: none;">
                  <div class="co-gift-badge-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
                    <span>Данные получателя букета</span>
                  </div>
                  <div class="co-inputs-grid-2">
                    <div class="co-field-wrap">
                      <label class="co-label" for="co-recipient-name">Имя получателя</label>
                      <input type="text" class="co-input" id="co-recipient-name" placeholder="Имя того, кому дарите" />
                    </div>
                    <div class="co-field-wrap">
                      <label class="co-label" for="co-recipient-phone">Телефон получателя</label>
                      <input type="tel" class="co-input" id="co-recipient-phone" inputmode="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" />
                    </div>
                  </div>
                  <label class="co-checkbox-label">
                    <input type="checkbox" id="co-anonymous-delivery" />
                    <span class="co-checkbox-custom"></span>
                    <span class="co-checkbox-text"><strong>Анонимная доставка</strong> — не говорить получателю, от кого букет (сюрприз)</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Block 2: Delivery vs Pickup Method -->
            <div class="checkout-card">
              <div class="checkout-card-header">
                <div class="checkout-card-icon">2</div>
                <h3 class="checkout-card-title">Способ получения заказа</h3>
              </div>
              <div class="checkout-card-body">
                <div class="co-segmented-control co-segmented-control--large" id="co-delivery-method-tabs">
                  <button type="button" class="co-segment-btn active" data-method="courier">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    <span>Курьерская доставка</span>
                  </button>
                  <button type="button" class="co-segment-btn" data-method="pickup">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    <span>Самовывоз из магазина</span>
                  </button>
                </div>

                <!-- Courier Delivery Content -->
                <div class="co-method-content" id="co-courier-section">
                  <div class="co-address-preview-card">
                    <div class="co-address-card-info">
                      <span class="co-address-badge-label">Адрес доставки в Горловке:</span>
                      <div class="co-address-title" id="co-selected-address-text">Горловка, пр. Победы, 35</div>
                      <div class="co-address-meta" id="co-selected-zone-text">
                        <span class="co-zone-pill" id="co-zone-pill">Район: ЦГР</span>
                        <span class="co-price-pill" id="co-price-pill">Доставка: 250 ₽</span>
                        <span class="co-time-pill" id="co-time-pill">30–45 мин</span>
                      </div>
                    </div>
                    <button type="button" class="co-btn-open-map" id="btn-co-change-map-address">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span>Выбрать на карте</span>
                    </button>
                  </div>

                  <!-- Private house checkbox on top -->
                  <label class="co-checkbox-label" style="margin-bottom: 14px;">
                    <input type="checkbox" id="co-private-house-check" />
                    <span class="co-checkbox-custom"></span>
                    <span class="co-checkbox-text">Частный сектор / отдельный дом</span>
                  </label>

                  <!-- Apartment and Entrance Grid (hidden when Private House is checked) -->
                  <div class="co-subaddress-grid" id="co-subaddress-grid">
                    <div class="co-field-wrap">
                      <input type="text" class="co-input" id="co-flat" placeholder="Квартира" />
                    </div>
                    <div class="co-field-wrap">
                      <input type="text" class="co-input" id="co-entrance" placeholder="Подъезд" />
                    </div>
                  </div>
                </div>

                <!-- Pickup Content -->
                <div class="co-method-content" id="co-pickup-section" style="display: none;">
                  <div class="co-pickup-info-card">
                    <div class="co-pickup-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    </div>
                    <div class="co-pickup-details">
                      <h4 class="co-pickup-name">Магазин цветов и подарков «Цветочный Рай»</h4>
                      <p class="co-pickup-addr">г. Горловка, ул. Пушкинская, 36а (Центрально-Городской район)</p>
                      <div class="co-pickup-meta">
                        <span class="co-tag-green">Ежедневно: 08:00 – 20:00</span>
                        <span class="co-tag-gold">Самовывоз: Бесплатно (0 ₽)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Block 3: Date and Time of Delivery -->
            <div class="checkout-card">
              <div class="checkout-card-header">
                <div class="checkout-card-icon">3</div>
                <h3 class="checkout-card-title">Когда доставить заказ</h3>
              </div>
              <div class="checkout-card-body">
                <div class="co-segmented-control" id="co-time-mode-tabs">
                  <button type="button" class="co-segment-btn active" data-time-mode="asap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    <span>Как можно скорее (40–60 мин)</span>
                  </button>
                  <button type="button" class="co-segment-btn" data-time-mode="scheduled">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span>Выбрать дату и время</span>
                  </button>
                </div>

                <div class="co-schedule-options" id="co-schedule-options" style="display: none;">
                  <div class="co-schedule-grid">
                    <div class="co-field-wrap">
                      <label class="co-label" for="co-delivery-date">Дата доставки</label>
                      <input type="date" class="co-input co-date-input" id="co-delivery-date" />
                    </div>
                    <div class="co-field-wrap">
                      <label class="co-label" for="co-delivery-time-slot">Интервал времени (до 20:00)</label>
                      <select class="co-select" id="co-delivery-time-slot">
                        <option value="08:00 - 10:00">08:00 – 10:00</option>
                        <option value="10:00 - 12:00">10:00 – 12:00</option>
                        <option value="12:00 - 14:00">12:00 – 14:00</option>
                        <option value="14:00 - 16:00">14:00 – 16:00</option>
                        <option value="16:00 - 18:00">16:00 – 18:00</option>
                        <option value="18:00 - 20:00">18:00 – 20:00</option>
                        <option value="К точному времени (до 20:00)">К точному времени (до 20:00)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Block 4: Free Gift Postcard & Comment -->
            <div class="checkout-card">
              <div class="checkout-card-header">
                <div class="checkout-card-icon">4</div>
                <h3 class="checkout-card-title">Бесплатная открытка и пожелания к заказу</h3>
              </div>
              <div class="checkout-card-body">
                <div class="co-field-wrap">
                  <label class="co-label" for="co-postcard-text">Текст открытки к букету (бесплатно)</label>
                  <textarea class="co-textarea" id="co-postcard-text" rows="3" placeholder="Напишите тёплые слова, и наш флорист от руки подпишет фирменную открытку..."></textarea>
                </div>
                <div class="co-field-wrap" style="margin-top: 14px;">
                  <label class="co-label" for="co-order-comment">Комментарий к заказу для флориста или курьера</label>
                  <textarea class="co-textarea" id="co-order-comment" rows="3" placeholder="Ориентир для курьера или пожелания по упаковке и доставке..."></textarea>
                </div>
              </div>
            </div>

            <!-- Block 5: Payment Method -->
            <div class="checkout-card">
              <div class="checkout-card-header">
                <div class="checkout-card-icon">5</div>
                <h3 class="checkout-card-title">Способ оплаты</h3>
              </div>
              <div class="checkout-card-body">
                <div class="co-payment-grid" id="co-payment-methods">
                  <label class="co-pay-option active">
                    <input type="radio" name="co-payment" value="card_online" checked />
                    <span class="co-pay-card">
                      <span class="co-pay-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                      </span>
                      <span class="co-pay-text-wrap">
                        <span class="co-pay-title">Картой онлайн / Перевод</span>
                        <span class="co-pay-desc">Сбербанк, ПСБ, Тинькофф, МИР</span>
                      </span>
                      <span class="co-pay-check">✓</span>
                    </span>
                  </label>

                  <label class="co-pay-option">
                    <input type="radio" name="co-payment" value="sbp" />
                    <span class="co-pay-card">
                      <span class="co-pay-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                      </span>
                      <span class="co-pay-text-wrap">
                        <span class="co-pay-title">СБП (QR-код)</span>
                        <span class="co-pay-desc">Моментальная оплата в любом банке</span>
                      </span>
                      <span class="co-pay-check">✓</span>
                    </span>
                  </label>

                  <label class="co-pay-option">
                    <input type="radio" name="co-payment" value="cash" />
                    <span class="co-pay-card">
                      <span class="co-pay-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                      </span>
                      <span class="co-pay-text-wrap">
                        <span class="co-pay-title">Наличными при получении</span>
                        <span class="co-pay-desc">Курьеру или в магазине при самовывозе</span>
                      </span>
                      <span class="co-pay-check">✓</span>
                    </span>
                  </label>
                </div>

                <div class="co-cash-change-wrap" id="co-cash-change-wrap" style="display: none;">
                  <label class="co-label" for="co-cash-change-input">Подготовить сдачу с суммы:</label>
                  <input type="text" class="co-input" id="co-cash-change-input" placeholder="Например, с 5000 ₽ или Без сдачи" />
                </div>

                <label class="co-checkbox-label" style="margin-top: 14px;">
                  <input type="checkbox" id="co-no-call" />
                  <span class="co-checkbox-custom"></span>
                  <span class="co-checkbox-text">Не перезванивать для подтверждения (если все цветы есть в наличии)</span>
                </label>
              </div>
            </div>

          </div>

          <!-- RIGHT COLUMN: Sticky Order Summary Sidebar -->
          <div class="checkout-summary-col">
            <div class="checkout-summary-card">
              <div class="co-summary-header">
                <h3 class="co-summary-title">Ваш заказ</h3>
                <button type="button" class="co-btn-edit-cart" id="btn-co-edit-cart">Изменить</button>
              </div>

              <!-- List of Items in Order -->
              <div class="co-items-list" id="co-summary-items-list"></div>

              <!-- Promo Code Input -->
              <div class="co-promo-box">
                <div class="co-promo-input-wrap">
                  <input type="text" class="co-promo-input" id="co-promo-input" placeholder="ПРОМОКОД" />
                  <button type="button" class="co-promo-btn" id="btn-co-apply-promo">Применить</button>
                </div>
                <div class="co-promo-msg" id="co-promo-msg" style="display: none;"></div>
              </div>

              <!-- Summary Totals -->
              <div class="co-totals-box">
                <div class="co-totals-row">
                  <span>Сумма заказа:</span>
                  <span id="co-sum-subtotal">0 ₽</span>
                </div>
                <div class="co-totals-row" id="co-sum-discount-row" style="display: none; color: #2D6A4F; font-weight: 700;">
                  <span>Скидка по промокоду:</span>
                  <span id="co-sum-discount">-0 ₽</span>
                </div>
                <div class="co-totals-row">
                  <span>Доставка:</span>
                  <span id="co-sum-delivery" style="font-weight: 700; color: #2D6A4F;">250 ₽</span>
                </div>
                <div class="co-totals-divider"></div>
                <div class="co-totals-final-row">
                  <span>Итого к оплате:</span>
                  <span class="co-final-price" id="co-sum-final-total">0 ₽</span>
                </div>
              </div>

              <!-- Submit Button -->
              <button type="button" class="btn-co-finish-order" id="btn-co-submit-order">
                <span>Подтвердить и оформить заказ</span>
              </button>

              <!-- Trust Badges Under Submit Button -->
              <div class="co-trust-badges">
                <div class="co-trust-item">
                  <span class="co-trust-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M12 22a3 3 0 0 0 3-3v-1a3 3 0 0 0-6 0v1a3 3 0 0 0 3 3z"/><path d="M2 12a3 3 0 0 0 3 3h1a3 3 0 0 0 0-6H5a3 3 0 0 0-3 3z"/><path d="M22 12a3 3 0 0 0-3-3h-1a3 3 0 0 0 0 6h1a3 3 0 0 0 3-3z"/><path d="m5 5 2.1 2.1"/><path d="m19 19-2.1-2.1"/><path d="m19 5-2.1 2.1"/><path d="m5 19 2.1-2.1"/></svg>
                  </span>
                  <span>100% свежесть цветов с гарантией</span>
                </div>
                <div class="co-trust-item">
                  <span class="co-trust-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  </span>
                  <span>Фото букета перед доставкой</span>
                </div>
                <div class="co-trust-item">
                  <span class="co-trust-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  </span>
                  <span>Быстрая бережная доставка по Горловке</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 2. SUCCESS SCREEN (When Order is Placed) -->
        <div class="checkout-success-wrap" id="checkout-success-view" style="display: none;">
          <div class="co-success-card">
            <div class="co-success-icon-wrap">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 class="co-success-title">Спасибо за заказ!</h2>
            <div class="co-success-order-num" id="co-success-num">Заказ № GR-84920</div>
            <p class="co-success-subtitle">Флористы «Цветочного Рая» в Горловке уже начали собирать ваш букет из свежих цветов.</p>

            <div class="co-success-details-grid">
              <div class="co-success-detail-item">
                <span class="co-succ-label">Способ получения:</span>
                <span class="co-succ-val" id="co-succ-method">Курьерская доставка</span>
              </div>
              <div class="co-success-detail-item">
                <span class="co-succ-label">Адрес доставки:</span>
                <span class="co-succ-val" id="co-succ-address">Горловка, пр. Победы, 35</span>
              </div>
              <div class="co-success-detail-item">
                <span class="co-succ-label">Время доставки:</span>
                <span class="co-succ-val" id="co-succ-time">Как можно скорее (40-60 мин)</span>
              </div>
              <div class="co-success-detail-item">
                <span class="co-succ-label">Способ оплаты:</span>
                <span class="co-succ-val" id="co-succ-payment">Картой онлайн / перевод</span>
              </div>
              <div class="co-success-detail-item co-succ-highlight">
                <span class="co-succ-label">Сумма к оплате:</span>
                <span class="co-succ-val co-succ-price" id="co-succ-total">0 ₽</span>
              </div>
            </div>

            <div class="co-success-actions">
              <button type="button" class="btn-co-return-catalog" id="btn-co-return-catalog">В каталог товаров</button>
              <button type="button" class="btn-co-return-home" id="btn-co-return-home">На главную</button>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Footer Matching Screenshot -->
    <footer class="footer-section">
      <div class="container footer-container">
        <div class="footer-grid">
          <!-- Col 1: Brand Info -->
          <div class="footer-col footer-col-brand">
            <div class="footer-brand-logo-wrap">
              <img src="./logo-footer.png" alt="Цветочный Рай" class="footer-brand-logo-img" />
            </div>
            <p class="footer-brand-desc">Мы создаем не просто букеты — мы помогаем выражать эмоции и превращаем важные моменты в истории.</p>
            <div class="footer-copy">© 2026 «Цветочный Рай». Все права защищены.</div>
          </div>

          <!-- Col 2: Клиентам -->
          <div class="footer-col">
            <h4 class="footer-heading">Клиентам</h4>
            <ul class="footer-links">
              <li><a href="#catalog?cat=Букеты" class="footer-link">Букеты</a></li>
              <li><a href="#catalog?cat=Композиции" class="footer-link">Композиции</a></li>
              <li><a href="#catalog?cat=Подарки и декор" class="footer-link">Подарки и декор</a></li>
              <li><a href="#catalog?cat=Гелиевые шары" class="footer-link">Гелиевые шары</a></li>
              <li><a href="#catalog?cat=Комнатные растения" class="footer-link">Комнатные растения</a></li>
              <li><a href="#catalog?cat=Свадебная флористика" class="footer-link">Свадебная флористика</a></li>
              <li><a href="#catalog?cat=Сезонные композиции" class="footer-link">Сезонные композиции</a></li>
            </ul>
          </div>

          <!-- Col 3: Компания -->
          <div class="footer-col">
            <h4 class="footer-heading">Компания</h4>
            <ul class="footer-links">
              <li><a href="#catalog?cat=Оформление и декор мероприятий" class="footer-link">Оформление и декор мероприятий</a></li>
              <li><a href="#about" class="footer-link">О Нас</a></li>
              <li><a href="#delivery" class="footer-link">Доставка и оплата</a></li>
              <li><a href="#contacts" class="footer-link">Контакты</a></li>
              <li><a href="#privacy" class="footer-link">Политика конфиденциальности</a></li>
            </ul>
          </div>

          <!-- Col 4: Контакты -->
          <div class="footer-col footer-col-contacts">
            <h4 class="footer-heading">Контакты</h4>
            <a href="tel:+79494826160" class="footer-phone">
              <svg class="footer-phone-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+7 (949) 482-61-60</span>
            </a>
            <p class="footer-info-text">Адрес: г. Горловка, площадь Победы</p>
            <p class="footer-info-text">Ежедневно с 07:00 до 20:00</p>
            
            <div class="footer-social-circles">
              <a href="#" class="footer-social-circle" aria-label="Instagram" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" class="footer-social-circle" aria-label="VK" title="VK">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.07 2H8.93C4.33 2 2 4.33 2 8.93v6.14C2 19.67 4.33 22 8.93 22h6.14c4.6 0 6.93-2.33 6.93-6.93V8.93C22 4.33 19.67 2 15.07 2zm3.38 13.91h-1.44c-.54 0-.71-.43-1.68-1.41-.85-.83-1.22-.94-1.44-.94-.29 0-.38.09-.38.51v1.28c0 .35-.11.56-1.04.56-1.54 0-3.24-.94-4.44-2.68-1.82-2.58-2.32-4.52-2.32-4.92 0-.22.09-.43.51-.43h1.44c.38 0 .52.17.67.58.74 2.14 1.98 4.02 2.49 4.02.19 0 .28-.09.28-.58V10.1c-.06-.9-.53-.98-.53-1.3 0-.15.13-.3.34-.3h2.27c.32 0 .44.17.44.56v3.05c0 .32.14.43.24.43.19 0 .35-.11.71-.47 1.1-1.24 1.88-3.14 1.88-3.14.1-.22.28-.43.66-.43h1.44c.45 0 .55.23.45.56-.18.83-1.92 3.28-2.02 3.44-.2.32-.28.46 0 .83.19.26.83.81 1.25 1.3 1.19 1.34 1.54 1.94 1.58 2.05.04.1.04.31-.38.31z"/></svg>
              </a>
              <a href="#" class="footer-social-circle" aria-label="Telegram" title="Telegram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </a>
              <a href="#" class="footer-social-circle" aria-label="MAX" title="MAX">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative Botanical Floral Line-Art in Corner -->
      <div class="footer-decor-corner" aria-hidden="true">
        <svg width="240" height="180" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity: 0.18;">
          <path d="M220 180C220 120 170 80 120 70C70 60 40 20 30 0" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
          <path d="M120 70C140 40 180 30 210 40C240 50 230 90 200 100C170 110 140 90 120 70Z" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M70 60C50 40 20 40 5 60C-10 80 10 110 40 100C70 90 80 70 70 60Z" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M170 110C190 120 200 150 190 170" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M140 90C160 110 160 140 140 160" stroke="#FFFFFF" stroke-width="1.5"/>
        </svg>
      </div>
    </footer>
    <!-- MODERNIZED MOBILE BOTTOM APP NAVIGATION BAR -->
    <nav class="mobile-bottom-nav" id="mobile-bottom-nav" aria-label="Мобильная навигация">
      <button class="mobile-nav-item active" id="mob-nav-home" title="Главная" aria-label="Главная">
        <div class="mob-nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <span>Главная</span>
      </button>
      <button class="mobile-nav-item" id="mob-nav-catalog" title="Каталог" aria-label="Каталог">
        <div class="mob-nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
        </div>
        <span>Каталог</span>
      </button>
      <button class="mobile-nav-item" id="mob-nav-search" title="Поиск" aria-label="Поиск">
        <div class="mob-nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
        <span>Поиск</span>
      </button>
      <button class="mobile-nav-item" id="mob-nav-fav" title="Избранное" aria-label="Избранное">
        <div class="mob-nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          <span class="mob-nav-badge mob-fav-badge" id="mob-fav-badge" style="display: none;">0</span>
        </div>
        <span>Избранное</span>
      </button>
      <button class="mobile-nav-item" id="mob-nav-cart" title="Корзина" aria-label="Корзина">
        <div class="mob-nav-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <span class="mob-nav-badge mob-cart-badge" id="mob-cart-badge" style="display: none;">0</span>
        </div>
        <span>Корзина</span>
      </button>
    </nav>

    <!-- FAVORITES DRAWER MODAL -->
    <div class="cart-drawer-wrap fav-drawer-wrap" id="fav-drawer-wrap">
      <div class="cart-drawer-backdrop" id="fav-backdrop"></div>
      <div class="cart-drawer fav-drawer" id="fav-drawer">
        <div class="cart-header">
          <div class="cart-header-title-wrap">
            <h2 class="cart-header-title">Избранные товары</h2>
          </div>
          <div class="cart-header-actions">
            <button class="cart-clear-btn" id="btn-clear-fav" title="Очистить избранное">Очистить</button>
            <button class="cart-close-btn" id="btn-close-fav" title="Закрыть (Esc)">✕</button>
          </div>
        </div>

        <div class="cart-body fav-body" id="fav-body">
          <div class="cart-empty-state" id="fav-empty-state">
            <div class="cart-empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" stroke-width="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3 class="cart-empty-title">В избранном пока пусто</h3>
            <p class="cart-empty-desc">Нажимайте на сердечко у понравившихся букетов, чтобы не потерять их</p>
            <button class="cart-empty-btn" id="btn-fav-to-catalog">Перейти в каталог</button>
          </div>

          <div class="cart-items-list" id="fav-items-list"></div>
        </div>

        <div class="cart-footer fav-footer" id="fav-footer" style="display: none;">
          <button class="btn-checkout-submit" id="btn-fav-add-all">
            <span>Добавить всё в корзину</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- FULL CART DRAWER MODAL -->
    <div class="cart-drawer-wrap" id="cart-drawer-wrap">
      <div class="cart-drawer-backdrop" id="cart-backdrop"></div>
      <div class="cart-drawer" id="cart-drawer">
        <div class="cart-header">
          <div class="cart-header-title-wrap">
            <h2 class="cart-header-title">Ваша корзина</h2>
          </div>
          <div class="cart-header-actions">
            <button class="cart-clear-btn" id="btn-clear-cart" title="Очистить корзину">Очистить</button>
            <button class="cart-close-btn" id="btn-close-cart" title="Закрыть (Esc)">✕</button>
          </div>
        </div>

        <div class="cart-body" id="cart-body">
          <div class="cart-empty-state" id="cart-empty-state">
            <div class="cart-empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" stroke-width="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <h3 class="cart-empty-title">Ваша корзина пока пуста</h3>
            <p class="cart-empty-desc">Выберите понравившиеся букеты или подарки в каталоге с быстрой доставкой по Горловке</p>
            <button class="cart-empty-btn" id="btn-cart-to-catalog">Перейти в каталог</button>
          </div>

          <div class="cart-items-list" id="cart-items-list"></div>
        </div>

        <div class="cart-footer" id="cart-footer" style="display: none;">
          <div class="cart-total-row">
            <span class="cart-total-label">Сумма заказа:</span>
            <span class="cart-total-sum" id="summary-total">0 ₽</span>
          </div>
          <button class="btn-checkout-submit" id="btn-submit-order">
            <span>Оформить заказ</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- YANDEX MAPS DELIVERY ADDRESS MODAL -->
    <div class="address-modal-wrap" id="address-modal-wrap">
      <div class="address-modal-backdrop" id="address-modal-backdrop"></div>
      <div class="address-modal-container delivery-modal-vertical">
        <div class="address-modal-header">
          <div class="address-modal-header-info">
            <h2 class="address-modal-title">Доставка в Горловке</h2>
            <span class="address-modal-subtitle">Кликните на дом на карте или выберите адрес из подсказок</span>
          </div>
          <button class="address-modal-close" id="btn-close-address-modal" title="Закрыть (Esc)">✕</button>
        </div>

        <div class="address-modal-body delivery-modal-body-vertical">
          <!-- 1. Main Search Input -->
          <div class="delivery-search-section">
            <div class="delivery-main-input-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="delivery-input-icon"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <input type="text" class="delivery-main-input" id="map-address-input" placeholder="Введите улицу и дом" value="Горловка, пр. Победы, 35" autocomplete="off" />
            </div>
            <div class="address-suggestions" id="address-suggestions" style="display: none;"></div>
          </div>

          <!-- 2. Private House Toggle Switch -->
          <div class="private-house-row">
            <label class="custom-switch" for="private-house-toggle">
              <input type="checkbox" id="private-house-toggle" />
              <span class="switch-slider"></span>
            </label>
            <label for="private-house-toggle" class="switch-label-text">Частный сектор / отдельный дом</label>
          </div>

          <!-- 3. Subinputs Row: Kvartira, Podiezd -->
          <div class="delivery-subinputs-row" id="delivery-subinputs-row">
            <input type="text" class="delivery-pill-input" id="addr-flat" placeholder="Квартира" />
            <input type="text" class="delivery-pill-input" id="addr-entrance" placeholder="Подъезд" />
          </div>

          <!-- Full Width Map Container -->
          <div class="delivery-modal-map-box">
            <div id="yandex-delivery-map" class="yandex-map-full"></div>
            <button class="map-geo-btn map-geo-btn-floating" id="btn-geolocation" title="Определить мое местоположение в Горловке">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              <span>Мое местоположение</span>
            </button>
          </div>

          <!-- Footer Actions: Close & Confirm Address Button -->
          <div class="delivery-modal-footer">
            <button class="btn-modal-cancel" id="btn-close-modal-alt">
              <span>Закрыть</span>
            </button>
            <button class="btn-modal-confirm" id="btn-apply-address">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span id="btn-apply-text">Подтвердить адрес • 250 ₽</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================================================
         PRODUCT QUICK VIEW MODAL (Exact match to Screenshot 2 tailored for Цветочный Рай)
         =================================================== -->
    <div class="product-modal-wrap" id="product-modal-wrap" style="display: none;">
      <div class="product-modal-backdrop" id="product-modal-backdrop"></div>
      
      <div class="product-modal-container" id="product-modal-container">
        <!-- CORNER BADGE CLOSE BUTTON (PEEKING OVER TOP-RIGHT CORNER) -->
        <button type="button" class="modal-corner-badge-btn" id="modal-btn-close" title="Закрыть окно (Esc)" aria-label="Закрыть окно">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <!-- LEFT COLUMN: Image Media & Perks -->
        <div class="modal-left-col">
          <div class="modal-main-img-wrap">
            <img src="" alt="" id="modal-product-img" class="modal-product-img" />
            <span class="modal-badge" id="modal-product-badge" style="display: none;">Хит</span>
            
            <!-- Floating Perks Overlay on Image -->
            <div class="modal-img-perks">
              <div class="modal-img-perk-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                <span>Открытка в подарок</span>
              </div>
              <div class="modal-img-perk-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <span>Фото готового букета</span>
              </div>
              <div class="modal-img-perk-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <span>Доставка от 2-х часов</span>
              </div>
              <div class="modal-img-perk-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>Кэшбек с каждого заказа</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Details & Order Config -->
        <div class="modal-right-col">
          <!-- Top Row: Title & Fav Button -->
          <div class="modal-header-row">
            <div class="modal-title-wrap">
              <h2 class="modal-title" id="modal-title">Название букета</h2>
              <div class="modal-meta-line">
                <div class="modal-rating">
                  <span class="star-icon" style="color: #F59E0B;">★</span>
                  <strong id="modal-rating-val">5</strong>
                  <span id="modal-reviews-val" class="modal-reviews-text">(6 отзывов)</span>
                </div>
                <span class="modal-sku" id="modal-sku">Арт. 8744</span>
              </div>
            </div>
            <div class="modal-top-actions">
              <button type="button" class="modal-btn-fav" id="modal-btn-fav" title="В избранное" aria-label="Добавить в избранное">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
          </div>

          <!-- Size Selector -->
          <div class="modal-size-section">
            <div class="modal-section-label">Размер:</div>
            <div class="modal-size-chips" id="modal-size-chips">
              <button type="button" class="modal-size-chip active" data-size="Обычный" data-mult="1.0">
                <span>Обычный</span>
              </button>
              <button type="button" class="modal-size-chip" data-size="Большой" data-mult="1.45">
                <span>Большой</span>
              </button>
              <button type="button" class="modal-size-chip" data-size="Огромный" data-mult="1.9">
                <span>Огромный</span>
              </button>
            </div>
          </div>

          <!-- Price & Bonus -->
          <div class="modal-price-section">
            <div class="modal-price-row">
              <div class="modal-price-val" id="modal-price-val">4 395 р.</div>
            </div>
            <div class="modal-bonus-row">
              <span class="modal-bonus-tag" id="modal-bonus-tag">+ бонус 220р.</span>
              <span class="modal-bonus-info" title="Бонусы начисляются на ваш счёт за каждую покупку">ⓘ</span>
            </div>
          </div>

          <!-- Action Buttons (Primary & Buy Now) -->
          <div class="modal-actions-row">
            <button type="button" class="modal-btn-cart" id="modal-btn-cart">
              <span>В корзину</span>
            </button>
            <button type="button" class="modal-btn-buynow" id="modal-btn-buynow">
              <span>Купить сейчас</span>
            </button>
          </div>

          <!-- Promo Banner -->
          <div class="modal-promo-box">
            <div class="modal-promo-left">
              <span class="modal-promo-discount">-5% на первый заказ</span>
              <span class="modal-promo-code">— промокод <strong>START5</strong></span>
            </div>
            <button type="button" class="modal-promo-copy" id="modal-btn-copy-promo" title="Скопировать промокод">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>

          <!-- Fulfillment Info Section -->
          <div class="modal-fulfillment-box">
            <div class="modal-fulfill-title">Способы получения заказа:</div>
            
            <div class="modal-fulfill-item">
              <div class="modal-fulfill-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div class="modal-fulfill-text">
                <div class="modal-fulfill-header"><strong style="color: #2D6A4F;">Самовывоз</strong> за 15–30 минут (ул. Пушкинская, 36а)</div>
                <div class="modal-fulfill-sub">Ежедневно 08:00 – 20:00 • Бесплатно</div>
              </div>
            </div>

            <div class="modal-fulfill-item">
              <div class="modal-fulfill-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <div class="modal-fulfill-text">
                <div class="modal-fulfill-header"><strong style="color: #2D6A4F;">Экспресс-доставка</strong> в течение 2-х часов</div>
                <div class="modal-fulfill-sub">Бережная доставка курьером по Горловке</div>
              </div>
            </div>
          </div>

          <!-- Composition & Description -->
          <div class="modal-composition-box">
            <div class="modal-composition-header">
              <span>Состав:</span>
              <span class="modal-comp-badge">Гарантия свежести</span>
            </div>
            <p class="modal-composition-desc" id="modal-product-desc">
              Наши флористы собирают уникальные букеты, учитывая ваши пожелания. В составе букетов присутствуют сезонные цветы, матовая дизайнерская упаковка и фирменная открытка.
            </p>
          </div>

        </div>
      </div>
    </div>

    <!-- Floating Toast Notification -->
    <div class="toast-notification" id="cart-toast">
      <span class="toast-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" stroke-width="2.8"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
      <span class="toast-text" id="toast-text">Товар добавлен в корзину!</span>
    </div>

    <!-- Core App Logic -->
    <script>
      (function() {
        // --- 1. Products Map & Cart State ---
        var productsData = ${JSON.stringify(products)};
        var productsMap = {};
        productsData.forEach(function(p) { productsMap[p.id] = p; });

        var deliveryInfo = {
          address: 'Горловка, пр. Победы, 35',
          district: 'Центрально-Городской район',
          price: 0,
          time: '30-45 мин',
          flat: '',
          entrance: '',
          floor: '',
          doorphone: ''
        };

        try {
          var savedAddr = localStorage.getItem('cvetov_address_info');
          if (savedAddr) deliveryInfo = JSON.parse(savedAddr);
        } catch(e) {}

        var cart = [];
        try {
          var savedCart = localStorage.getItem('cvetov_cart');
          if (savedCart) cart = JSON.parse(savedCart);
        } catch(e) {}

        function saveCart() {
          try { localStorage.setItem('cvetov_cart', JSON.stringify(cart)); } catch(e) {}
          updateCartUI();
        }

        var promoDiscountPercent = 0;

        function updateCartUI() {
          var totalCount = 0;
          var subtotal = 0;

          cart.forEach(function(item) {
            totalCount += item.count;
            subtotal += item.priceNum * item.count;
          });

          var badge = document.getElementById('cart-badge');
          if (badge) {
            badge.textContent = totalCount;
            badge.style.display = totalCount > 0 ? 'inline-flex' : 'none';
          }

          var mobBadge = document.getElementById('mob-cart-badge');
          if (mobBadge) {
            mobBadge.textContent = totalCount;
            mobBadge.style.display = totalCount > 0 ? 'inline-flex' : 'none';
          }

          var countText = document.getElementById('cart-items-count-text');
          if (countText) countText.style.display = 'none';

          var summaryItemsCount = document.getElementById('summary-items-count');
          if (summaryItemsCount) summaryItemsCount.textContent = totalCount;

          var discountAmount = Math.round(subtotal * (promoDiscountPercent / 100));
          var finalTotal = Math.max(0, subtotal - discountAmount);

          var subtotalEl = document.getElementById('summary-subtotal');
          if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);

          var totalEl = document.getElementById('summary-total');
          if (totalEl) totalEl.textContent = formatPrice(finalTotal);

          var btnSubmitPrice = document.getElementById('btn-submit-price');
          if (btnSubmitPrice) btnSubmitPrice.textContent = formatPrice(finalTotal);

          renderCartItems(subtotal, totalCount);
        }

        function renderCartItems(subtotal, totalCount) {
          var itemsContainer = document.getElementById('cart-items-list');
          var emptyState = document.getElementById('cart-empty-state');
          var footerSection = document.getElementById('cart-footer');

          if (!itemsContainer || !emptyState || !footerSection) return;

          if (cart.length === 0) {
            emptyState.style.display = 'flex';
            itemsContainer.style.display = 'none';
            footerSection.style.display = 'none';
            itemsContainer.innerHTML = '';
            return;
          }

          emptyState.style.display = 'none';
          itemsContainer.style.display = 'flex';
          itemsContainer.style.flexDirection = 'column';
          itemsContainer.style.width = '100%';
          footerSection.style.display = 'block';

          itemsContainer.innerHTML = cart.map(function(item) {
            return '<div class="cart-item-row" data-id="' + item.id + '">' +
              '<img src="' + item.image + '" alt="' + item.title + '" class="cart-item-img" />' +
              '<div class="cart-item-info">' +
                '<h4 class="cart-item-title">' + item.title + '</h4>' +
                '<span class="cart-item-single-price">' + formatPrice(item.priceNum) + ' / шт.</span>' +
              '</div>' +
              '<div class="cart-item-controls">' +
                '<div class="cart-qty-picker">' +
                  '<button class="cart-qty-btn btn-qty-minus" data-id="' + item.id + '">−</button>' +
                  '<span class="cart-qty-val">' + item.count + '</span>' +
                  '<button class="cart-qty-btn btn-qty-plus" data-id="' + item.id + '">+</button>' +
                '</div>' +
                '<span class="cart-item-row-total">' + formatPrice(item.priceNum * item.count) + '</span>' +
                '<button class="cart-item-remove-btn" data-id="' + item.id + '" title="Удалить товар">✕</button>' +
              '</div>' +
            '</div>';
          }).join('');

          itemsContainer.querySelectorAll('.btn-qty-plus').forEach(function(btn) {
            btn.addEventListener('click', function() { changeCartQty(btn.getAttribute('data-id'), 1); });
          });
          itemsContainer.querySelectorAll('.btn-qty-minus').forEach(function(btn) {
            btn.addEventListener('click', function() { changeCartQty(btn.getAttribute('data-id'), -1); });
          });
          itemsContainer.querySelectorAll('.cart-item-remove-btn').forEach(function(btn) {
            btn.addEventListener('click', function() { removeFromCart(btn.getAttribute('data-id')); });
          });
        }

        function addToCart(productId) {
          var product = productsMap[productId];
          if (!product) return;
          var existing = cart.find(function(item) { return String(item.id) === String(productId) || (item.id === product.id && item.title === product.title); });
          if (existing) { existing.count += 1; } else {
            cart.push({ id: product.id, title: product.title, price: product.price, priceNum: product.priceNum, image: product.image, count: 1 });
          }
          saveCart();
          showToast('«' + product.title + '» добавлен в корзину!');
        }

        function changeCartQty(productId, delta) {
          var item = cart.find(function(i) { return String(i.id) === String(productId); });
          if (!item) return;
          item.count += delta;
          if (item.count <= 0) { removeFromCart(productId); } else { saveCart(); }
        }

        function removeFromCart(productId) {
          cart = cart.filter(function(i) { return String(i.id) !== String(productId); });
          saveCart();
          showToast('Товар удален из корзины');
        }

        function clearCart() {
          cart = [];
          promoDiscountPercent = 0;
          saveCart();
        }

        window.addToCart = addToCart;
        window.openCheckoutPage = openCheckoutPage;

        function formatPrice(num) {
          return num.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ") + " ₽";
        }

        function getPluralGoods(n) {
          var rem10 = n % 10;
          var rem100 = n % 100;
          if (rem100 >= 11 && rem100 <= 19) return 'товаров';
          if (rem10 === 1) return 'товар';
          if (rem10 >= 2 && rem10 <= 4) return 'товара';
          return 'товаров';
        }

        var toastTimeout = null;
        function showToast(msg) {
          var toast = document.getElementById('cart-toast');
          var toastText = document.getElementById('toast-text');
          if (!toast || !toastText) return;
          toastText.textContent = msg;
          toast.classList.add('is-visible');
          clearTimeout(toastTimeout);
          toastTimeout = setTimeout(function() { toast.classList.remove('is-visible'); }, 2800);
        }

        // --- FAVORITES SYSTEM ---
        var favorites = [];
        try {
          var savedFavs = localStorage.getItem('cvetov_favorites');
          if (savedFavs) favorites = JSON.parse(savedFavs);
        } catch(e) {}

        function saveFavorites() {
          try {
            localStorage.setItem('cvetov_favorites', JSON.stringify(favorites));
          } catch(e) {}
          updateFavoritesUI();
        }

        function isFavorite(id) {
          return favorites.some(function(fid) { return String(fid) === String(id); });
        }

        function toggleFavorite(id) {
          var strId = String(id);
          var idx = favorites.findIndex(function(fid) { return String(fid) === strId; });
          var prod = productsMap[id];
          var title = prod ? prod.title : 'Букет';
          if (idx !== -1) {
            favorites.splice(idx, 1);
            showToast('«' + title + '» удален из избранного');
          } else {
            favorites.push(id);
            showToast('«' + title + '» добавлен в избранное ♡');
          }
          saveFavorites();
        }

        function updateFavoritesUI() {
          var badge = document.getElementById('fav-badge');
          var mobBadge = document.getElementById('mob-fav-badge');
          if (badge) {
            badge.textContent = favorites.length;
            badge.style.display = favorites.length > 0 ? 'inline-flex' : 'none';
          }
          if (mobBadge) {
            mobBadge.textContent = favorites.length;
            mobBadge.style.display = favorites.length > 0 ? 'inline-flex' : 'none';
          }

          if (btnModalFav && currentModalProduct) {
            btnModalFav.classList.toggle('active', isFavorite(currentModalProduct.id));
          }

          renderFavoritesList();
        }

        function renderFavoritesList() {
          var itemsList = document.getElementById('fav-items-list');
          var emptyState = document.getElementById('fav-empty-state');
          var footerEl = document.getElementById('fav-footer');
          if (!itemsList || !emptyState) return;

          if (favorites.length === 0) {
            emptyState.style.display = 'flex';
            itemsList.style.display = 'none';
            if (footerEl) footerEl.style.display = 'none';
            itemsList.innerHTML = '';
            return;
          }

          emptyState.style.display = 'none';
          itemsList.style.display = 'flex';
          itemsList.style.flexDirection = 'column';
          itemsList.style.width = '100%';
          if (footerEl) footerEl.style.display = 'block';

          var favProds = favorites.map(function(id) { return productsMap[id]; }).filter(Boolean);
          itemsList.innerHTML = favProds.map(function(item) {
            return '<div class="cart-item-row fav-item-row" data-id="' + item.id + '">' +
              '<img src="' + item.image + '" alt="' + item.title + '" class="cart-item-img" />' +
              '<div class="cart-item-info">' +
                '<h4 class="cart-item-title">' + item.title + '</h4>' +
                '<span class="cart-item-single-price">' + (typeof item.price === 'number' ? formatPrice(item.price) : item.price) + '</span>' +
              '</div>' +
              '<div class="cart-item-controls">' +
                '<button type="button" class="fav-item-cart-btn btn-buy-single" data-id="' + item.id + '" title="В корзину">' +
                  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' +
                  '<span>В корзину</span>' +
                '</button>' +
                '<button type="button" class="cart-item-remove-btn btn-remove-fav" data-id="' + item.id + '" title="Удалить из избранного">✕</button>' +
              '</div>' +
            '</div>';
          }).join('');

          itemsList.querySelectorAll('.btn-remove-fav').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
              e.stopPropagation();
              var id = btn.getAttribute('data-id');
              toggleFavorite(id);
            });
          });

          itemsList.querySelectorAll('.fav-item-cart-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
              e.stopPropagation();
              var id = parseInt(btn.getAttribute('data-id'), 10);
              addToCart(id);
            });
          });
        }

        // Favorites Drawer Triggers
        var btnHeaderFav = document.getElementById('btn-header-fav');
        var favDrawerWrap = document.getElementById('fav-drawer-wrap');
        var favDrawer = document.getElementById('fav-drawer');
        var btnCloseFav = document.getElementById('btn-close-fav');
        var favBackdrop = document.getElementById('fav-backdrop');
        var btnClearFav = document.getElementById('btn-clear-fav');
        var btnFavToCatalog = document.getElementById('btn-fav-to-catalog');
        var btnFavAddAll = document.getElementById('btn-fav-add-all');

        function lockBodyScroll(locked) {
          // On Desktop (width > 768px): NEVER touch body/html styles!
          // Modals and drawers already have overscroll-behavior: contain.
          // Touching body/html on desktop is what causes the background page to jump!
          if (window.innerWidth > 768) {
            return;
          }

          if (locked) {
            document.body.classList.add('scroll-locked');
            document.documentElement.style.overflow = 'hidden';
          } else {
            setTimeout(function() {
              var pModal = document.getElementById('product-modal-wrap');
              var sOverlay = document.getElementById('header-search-overlay');
              var cDrawer = document.getElementById('cart-drawer-wrap');
              var fDrawer = document.getElementById('fav-drawer-wrap');
              var aModal = document.getElementById('address-modal-wrap');

              var isProductModalOpen = pModal && pModal.style.display === 'flex';
              var isSearchOpen = sOverlay && sOverlay.classList.contains('active');
              var isCartOpen = cDrawer && cDrawer.classList.contains('is-open');
              var isFavOpen = fDrawer && fDrawer.classList.contains('is-open');
              var isAddressOpen = aModal && aModal.classList.contains('is-open');

              if (!isProductModalOpen && !isSearchOpen && !isCartOpen && !isFavOpen && !isAddressOpen) {
                document.body.classList.remove('scroll-locked');
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
              }
            }, 30);
          }
        }

        // Prevent background wheel scrolling through backdrops on desktop
        ['cart-drawer-backdrop', 'fav-drawer-backdrop', 'address-modal-backdrop', 'modal-overlay'].forEach(function(id) {
          var el = document.getElementById(id);
          if (el) {
            el.addEventListener('wheel', function(e) {
              e.preventDefault();
            }, { passive: false });
            el.addEventListener('touchmove', function(e) {
              e.preventDefault();
            }, { passive: false });
          }
        });

        function openFavoritesDrawer() {
          if (favDrawerWrap && favDrawer) {
            favDrawerWrap.classList.add('is-open');
            favDrawer.classList.add('is-open');
            updateFavoritesUI();
            lockBodyScroll(true);
          }
        }

        function closeFavoritesDrawer() {
          if (favDrawerWrap && favDrawer) {
            favDrawerWrap.classList.remove('is-open');
            favDrawer.classList.remove('is-open');
            lockBodyScroll(false);
          }
        }

        if (btnHeaderFav) btnHeaderFav.addEventListener('click', openFavoritesDrawer);
        if (btnCloseFav) btnCloseFav.addEventListener('click', closeFavoritesDrawer);
        if (favBackdrop) favBackdrop.addEventListener('click', closeFavoritesDrawer);
        if (btnClearFav) {
          btnClearFav.addEventListener('click', function() {
            favorites = [];
            saveFavorites();
            showToast('Избранное очищено');
          });
        }
        if (btnFavToCatalog) {
          btnFavToCatalog.addEventListener('click', function() {
            closeFavoritesDrawer();
            navigateToView('catalog', 'all');
          });
        }
        if (btnFavAddAll) {
          btnFavAddAll.addEventListener('click', function() {
            favorites.forEach(function(id) { addToCart(parseInt(id, 10)); });
            closeFavoritesDrawer();
            openCartDrawer();
          });
        }

        // --- PRODUCT QUICK VIEW MODAL CONTROLLER ---
        var currentModalProduct = null;
        var currentModalSize = 'Обычный';
        var currentModalMultiplier = 1.0;

        var productModalWrap = document.getElementById('product-modal-wrap');
        var productModalBackdrop = document.getElementById('product-modal-backdrop');
        var btnCloseProductModal = document.getElementById('modal-btn-close');
        var btnModalFav = document.getElementById('modal-btn-fav');
        var btnModalCart = document.getElementById('modal-btn-cart');
        var btnModalBuyNow = document.getElementById('modal-btn-buynow');
        var btnCopyPromo = document.getElementById('modal-btn-copy-promo');

        function openProductModal(productId) {
          var product = productsMap[productId];
          if (!product) return;

          currentModalProduct = product;
          currentModalSize = 'Обычный';
          currentModalMultiplier = 1.0;

          var modalImg = document.getElementById('modal-product-img');
          var modalTitle = document.getElementById('modal-title');
          var modalSku = document.getElementById('modal-sku');
          var modalRatingVal = document.getElementById('modal-rating-val');
          var modalReviewsVal = document.getElementById('modal-reviews-val');
          var modalDesc = document.getElementById('modal-product-desc');
          var modalBadge = document.getElementById('modal-product-badge');

          if (modalImg) modalImg.src = product.image;
          if (modalTitle) modalTitle.textContent = product.title;
          if (modalSku) modalSku.textContent = 'Арт. ' + product.id;
          if (modalRatingVal) modalRatingVal.textContent = product.rating || '5';
          if (modalReviewsVal) modalReviewsVal.textContent = '(' + (product.reviews || 6) + ' отзывов)';
          if (modalDesc) modalDesc.textContent = product.description || 'Наши флористы собирают уникальные букеты, учитывая ваши пожелания. В составе букетов присутствуют сезонные цветы, матовая дизайнерская упаковка и фирменная открытка.';

          if (modalBadge) {
            if (product.badge) {
              modalBadge.textContent = product.badge;
              modalBadge.style.display = 'block';
            } else {
              modalBadge.style.display = 'none';
            }
          }

          var chips = document.querySelectorAll('.modal-size-chip');
          chips.forEach(function(chip, idx) {
            if (idx === 0) chip.classList.add('active');
            else chip.classList.remove('active');
          });

          if (btnModalFav) {
            btnModalFav.classList.toggle('active', isFavorite(product.id));
          }

          updateModalPrice();

          if (productModalWrap) {
            productModalWrap.style.display = 'flex';
            lockBodyScroll(true);
          }
        }

        function closeProductModal() {
          if (productModalWrap) {
            productModalWrap.style.display = 'none';
            lockBodyScroll(false);
          }
        }

        function updateModalPrice() {
          if (!currentModalProduct) return;
          var price = Math.round(currentModalProduct.priceNum * currentModalMultiplier);
          var modalPriceVal = document.getElementById('modal-price-val');
          var modalBonusTag = document.getElementById('modal-bonus-tag');
          if (modalPriceVal) modalPriceVal.textContent = formatPrice(price).replace(' ₽', ' р.');
          if (modalBonusTag) modalBonusTag.textContent = '+ бонус ' + Math.round(price * 0.05) + 'р.';
        }

        // Size chips listener
        document.querySelectorAll('.modal-size-chip').forEach(function(chip) {
          chip.addEventListener('click', function() {
            document.querySelectorAll('.modal-size-chip').forEach(function(c) { c.classList.remove('active'); });
            chip.classList.add('active');
            currentModalSize = chip.getAttribute('data-size') || 'Обычный';
            currentModalMultiplier = parseFloat(chip.getAttribute('data-mult') || '1.0');
            updateModalPrice();
          });
        });

        // Close modal triggers
        if (btnCloseProductModal) btnCloseProductModal.addEventListener('click', closeProductModal);
        if (productModalBackdrop) productModalBackdrop.addEventListener('click', closeProductModal);

        // Favorite toggle in modal
        if (btnModalFav) {
          btnModalFav.addEventListener('click', function() {
            if (currentModalProduct) {
              toggleFavorite(currentModalProduct.id);
              btnModalFav.classList.toggle('active', isFavorite(currentModalProduct.id));
            }
          });
        }

        // Copy promo code
        if (btnCopyPromo) {
          btnCopyPromo.addEventListener('click', function() {
            if (navigator.clipboard) {
              navigator.clipboard.writeText('START5');
            }
            showToast('Промокод START5 скопирован!');
          });
        }

        // Add to cart from modal
        function addCurrentModalItemToCart() {
          if (!currentModalProduct) return;
          var sizeSuffix = currentModalSize && currentModalSize !== 'Обычный' ? ' (' + currentModalSize + ')' : '';
          var itemTitle = currentModalProduct.title + sizeSuffix;
          var itemPriceNum = Math.round(currentModalProduct.priceNum * currentModalMultiplier);
          var customId = currentModalProduct.id + '_' + currentModalSize;

          var existing = cart.find(function(it) { return it.id === customId || (it.id === currentModalProduct.id && it.title === itemTitle); });
          if (existing) {
            existing.count += 1;
          } else {
            cart.push({
              id: customId,
              title: itemTitle,
              price: formatPrice(itemPriceNum),
              priceNum: itemPriceNum,
              image: currentModalProduct.image,
              count: 1
            });
          }
          saveCart();
          showToast('«' + itemTitle + '» добавлен в корзину!');
        }

        if (btnModalCart) {
          btnModalCart.addEventListener('click', function() {
            addCurrentModalItemToCart();
          });
        }

        if (btnModalBuyNow) {
          btnModalBuyNow.addEventListener('click', function() {
            addCurrentModalItemToCart();
            closeProductModal();
            openCheckoutPage();
          });
        }

        // Card Click Listener (Delegate for ALL cards across the site)
        document.addEventListener('click', function(e) {
          var card = e.target.closest('.bestseller-card, .product-card, .search-live-item');
          if (card && !e.target.closest('.btn-buy, .modal-btn-cart, .modal-btn-buynow, .modal-btn-fav, .modal-btn-close, .modal-size-chip, .modal-promo-copy, .btn-remove-fav, .fav-item-cart-btn')) {
            var id = parseInt(card.getAttribute('data-id'), 10);
            if (id) {
              e.preventDefault();
              openProductModal(id);
            }
          }

          var buyBtn = e.target.closest('.btn-buy');
          if (buyBtn) {
            e.preventDefault();
            e.stopPropagation();
            var buyId = parseInt(buyBtn.getAttribute('data-id'), 10);
            addToCart(buyId);
            var originalHtml = buyBtn.innerHTML;
            buyBtn.classList.add('is-added');
            buyBtn.innerHTML = '<span>В корзине ✓</span>';
            setTimeout(function() { buyBtn.classList.remove('is-added'); buyBtn.innerHTML = originalHtml; }, 1400);
          }
        });

        window.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            closeProductModal();
            closeFavoritesDrawer();
            if (addressModal) addressModal.classList.remove('is-open');
            var cartDrawer = document.getElementById('cart-drawer');
            if (cartDrawer) cartDrawer.classList.remove('is-open');
          }
        });

        // Initialize Favorites UI on load
        updateFavoritesUI();

        // --- 2. Delivery Address System & Yandex Maps for Gorlovka ---
        var addressModal = document.getElementById('address-modal-wrap');
        var btnAddressHeader = document.getElementById('btn-address');
        var btnCloseAddressModal = document.getElementById('btn-close-address-modal');
        var addressModalBackdrop = document.getElementById('address-modal-backdrop');
        var mapAddressInput = document.getElementById('map-address-input');
        var addressSuggestions = document.getElementById('address-suggestions');
        var btnApplyAddress = document.getElementById('btn-apply-address');
        var btnGeolocation = document.getElementById('btn-geolocation');
        var headerAddressText = document.getElementById('header-address-text');
        var timeValEl = document.getElementById('cvetov-time-val');
        var calcPriceText = document.getElementById('calc-price-text');
        var calcTimeText = document.getElementById('calc-time-text');
        var calcZoneName = document.getElementById('calc-zone-name');
        var clientPin = document.getElementById('map-client-pin');
        var clientPinTooltip = document.getElementById('client-pin-tooltip');

        function openAddressModal() {
          if (!addressModal) return;
          addressModal.classList.add('is-open');
          if (mapAddressInput) mapAddressInput.value = deliveryInfo.address;
          updateModalCalcView();
          initYandexMapGorlovka();
          lockBodyScroll(true);
          if (window.gorlovkaYandexMapInstance) {
            setTimeout(function() {
              window.gorlovkaYandexMapInstance.container.fitToViewport();
            }, 120);
          }
        }

        function closeAddressModal() {
          if (!addressModal) return;
          addressModal.classList.remove('is-open');
          lockBodyScroll(false);
        }

        if (btnAddressHeader) btnAddressHeader.addEventListener('click', openAddressModal);
        if (btnCloseAddressModal) btnCloseAddressModal.addEventListener('click', closeAddressModal);
        if (addressModalBackdrop) addressModalBackdrop.addEventListener('click', closeAddressModal);
        var btnCloseModalAlt = document.getElementById('btn-close-modal-alt');
        if (btnCloseModalAlt) btnCloseModalAlt.addEventListener('click', closeAddressModal);

        var privateHouseToggle = document.getElementById('private-house-toggle');
        var subinputsRow = document.getElementById('delivery-subinputs-row');
        if (privateHouseToggle && subinputsRow) {
          privateHouseToggle.addEventListener('change', function() {
            if (this.checked) {
              subinputsRow.classList.add('is-hidden');
              deliveryInfo.isPrivateHouse = true;
            } else {
              subinputsRow.classList.remove('is-hidden');
              deliveryInfo.isPrivateHouse = false;
            }
          });
        }

        function applyDeliveryInfoToSite() {
          var priceLabel = deliveryInfo.price === 0 ? 'Бесплатно' : deliveryInfo.price + ' ₽';
          if (headerAddressText) {
            headerAddressText.innerHTML = '<strong>' + deliveryInfo.address + '</strong> • ' + priceLabel + ' (' + deliveryInfo.time + ')';
          }
          if (timeValEl) timeValEl.textContent = deliveryInfo.time;
          document.querySelectorAll('.card-delivery-time').forEach(function(el) {
            el.textContent = 'Горловка: ' + deliveryInfo.time;
          });
          try { localStorage.setItem('cvetov_address_info', JSON.stringify(deliveryInfo)); } catch(e) {}
          updateCartUI();
          showToast('Адрес доставки сохранен: ' + deliveryInfo.address + ' (' + priceLabel + ')');
        }

        function updateModalCalcView() {
          var priceStr = deliveryInfo.price === 0 ? 'Бесплатно (0 ₽)' : deliveryInfo.price + ' ₽';
          if (calcPriceText) calcPriceText.textContent = priceStr;
          if (calcTimeText) calcTimeText.textContent = deliveryInfo.time;
          if (calcZoneName) calcZoneName.textContent = deliveryInfo.district + ' (' + priceStr + ')';
          if (clientPinTooltip) clientPinTooltip.textContent = deliveryInfo.address + ' • ' + priceStr;
          var btnApplyText = document.getElementById('btn-apply-text');
          if (btnApplyText) btnApplyText.textContent = 'Подтвердить адрес • ' + priceStr;
        }

        function pointInPolygon(point, vs) {
          var x = point[0], y = point[1];
          var inside = false;
          for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];
            var intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
          }
          return inside;
        }

        var GORLOVKA_STREET_REGISTRY = [
          // ЦГР (250 ₽)
          { street: 'пр. Победы', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3032, 38.0245] },
          { street: 'пр. Ленина', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3078, 38.0163] },
          { street: 'ул. Пушкинская', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3056, 38.0289] },
          { street: 'ул. Рудакова', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3092, 38.0210] },
          { street: 'ул. Гагарина', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3045, 38.0180] },
          { street: 'б-р Димитрова', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3015, 38.0298] },
          { street: 'ул. Димитрова', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3015, 38.0298] },
          { street: 'ул. Бессонова', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3120, 38.0315] },
          { street: 'ул. Горького', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3080, 38.0250] },
          { street: 'ул. Кирова', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3110, 38.0195] },
          { street: 'ул. Первомайская', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3065, 38.0220] },
          { street: 'ул. Нестерова', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3105, 38.0330] },
          { street: 'ул. Интернациональная', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3020, 38.0150] },
          { street: 'ул. Дзержинского', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3090, 38.0175] },
          { street: 'ул. Советская', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3050, 38.0120] },
          { street: 'ул. Чернышевского', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3010, 38.0220] },
          { street: 'ул. Шевченко', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3040, 38.0310] },
          { street: 'ул. Карла Маркса', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3070, 38.0260] },
          { street: 'ул. Молодёжная', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3035, 38.0190] },
          { street: 'ул. Красноармейская', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3060, 38.0140] },
          { street: 'ул. Петровского', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3085, 38.0270] },
          { street: 'ул. Чкалова', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3130, 38.0210] },
          { street: 'ул. Розы Люксембург', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3095, 38.0300] },
          { street: 'ул. Клокова', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3025, 38.0260] },
          { street: 'ул. Касьяна', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3048, 38.0230] },
          { street: 'ул. Костенко', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3082, 38.0240] },
          { street: 'ул. Свердлова', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3068, 38.0335] },
          { street: 'ул. Судейко', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3030, 38.0305] },
          { street: 'ул. Мориса Тореза', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3075, 38.0290] },
          { street: 'ул. Катушева', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3052, 38.0165] },
          { street: 'ул. Павленко', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3098, 38.0185] },
          { street: 'ул. Леваневского', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3115, 38.0235] },
          { street: 'ул. Богуна', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3042, 38.0275] },
          { street: 'ул. 40 лет Октября', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3088, 38.0315] },
          { street: 'ул. Снайпера', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3018, 38.0240] },
          { street: 'ул. Гоголя', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3062, 38.0205] },
          { street: 'ул. Некрасова', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3072, 38.0215] },
          { street: 'ул. Толстого', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3083, 38.0225] },
          { street: 'ул. Орджоникидзе', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3055, 38.0135] },
          { street: 'ул. Чайковского', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3090, 38.0280] },
          { street: 'ул. Маяковского', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3060, 38.0295] },
          { street: 'ул. Крылова', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3075, 38.0155] },
          { street: 'ул. Бабушкина', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3100, 38.0145] },
          { street: 'ул. Кузнецова-Зубарева', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3038, 38.0282] },
          { street: 'ул. Менделеева', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3086, 38.0320] },
          { street: 'ул. Ломоносова', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3094, 38.0335] },
          { street: 'Театральная площадь', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3050, 38.0240] },
          { street: 'пл. Ленина', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3070, 38.0170] },
          { street: 'пл. Победы', dist: 'ЦГР', price: 250, time: '30 мин', coords: [48.3030, 38.0250] },

          // Короленко (300 ₽)
          { street: 'ул. Короленко', dist: 'Короленко', price: 300, time: '30 мин', coords: [48.2920, 38.0350] },
          { street: 'ул. Минина и Пожарского', dist: 'Короленко', price: 300, time: '30 мин', coords: [48.2950, 38.0380] },
          { street: 'ул. Братьев Мазиковых', dist: 'Короленко', price: 300, time: '30 мин', coords: [48.2910, 38.0320] },
          { street: 'ул. Олега Кошевого', dist: 'Короленко', price: 300, time: '30 мин', coords: [48.2940, 38.0310] },
          { street: 'ул. Спартака', dist: 'Короленко', price: 300, time: '30 мин', coords: [48.2930, 38.0360] },
          { street: 'ул. Тимирязева', dist: 'Короленко', price: 300, time: '30 мин', coords: [48.2960, 38.0340] },
          { street: '245-й квартал', dist: 'Короленко', price: 300, time: '30 мин', coords: [48.2945, 38.0390] },
          { street: 'ул. Соколовского', dist: 'Короленко', price: 300, time: '30 мин', coords: [48.2970, 38.0370] },
          { street: 'ул. Белорусская', dist: 'Короленко', price: 300, time: '30 мин', coords: [48.2905, 38.0340] },

          // пос. Победы (300 ₽)
          { street: 'пос. Победы', dist: 'пос. Победы', price: 300, time: '30 мин', coords: [48.2880, 38.0150] },
          { street: 'ул. Победы', dist: 'пос. Победы', price: 300, time: '30 мин', coords: [48.2890, 38.0160] },
          { street: 'ул. Краснофлотская', dist: 'пос. Победы', price: 300, time: '30 мин', coords: [48.2870, 38.0140] },
          { street: 'ул. Матросова', dist: 'пос. Победы', price: 300, time: '30 мин', coords: [48.2860, 38.0180] },
          { street: 'ул. 25-летия Октября', dist: 'пос. Победы', price: 300, time: '30 мин', coords: [48.2875, 38.0195] },

          // Северная проходная (300 ₽)
          { street: 'Северная проходная', dist: 'Северная проходная', price: 300, time: '40 мин', coords: [48.3220, 38.0260] },
          { street: 'ул. Железнодорожная', dist: 'Северная проходная', price: 300, time: '40 мин', coords: [48.3200, 38.0240] },
          { street: 'ул. Станционная', dist: 'Северная проходная', price: 300, time: '40 мин', coords: [48.3240, 38.0280] },

          // 88-й квартал (330 ₽)
          { street: '88-й квартал', dist: '88-й квартал', price: 330, time: '40 мин', coords: [48.3180, 38.0460] },
          { street: 'ул. Академика Павлова', dist: '88-й квартал', price: 330, time: '40 мин', coords: [48.3160, 38.0430] },
          { street: 'ул. Пересыпкина', dist: '88-й квартал', price: 330, time: '40 мин', coords: [48.3190, 38.0480] },
          { street: 'ул. Великан', dist: '88-й квартал', price: 330, time: '40 мин', coords: [48.3210, 38.0450] },

          // Кочегарка (330 ₽)
          { street: 'пос. ш. Кочегарка', dist: 'Кочегарка', price: 330, time: '40 мин', coords: [48.3140, 37.9950] },
          { street: 'ул. Багратиона', dist: 'Кочегарка', price: 330, time: '40 мин', coords: [48.3120, 37.9980] },
          { street: 'ул. Запорожская', dist: 'Кочегарка', price: 330, time: '40 мин', coords: [48.3150, 37.9920] },

          // Майский (330 ₽)
          { street: 'пос. Майский', dist: 'Майский', price: 330, time: '30 мин', coords: [48.2980, 38.0580] },
          { street: 'ул. Майская', dist: 'Майский', price: 330, time: '30 мин', coords: [48.2970, 38.0560] },
          { street: 'ул. Белинского', dist: 'Майский', price: 330, time: '30 мин', coords: [48.2990, 38.0590] },
          { street: 'ул. Светлая', dist: 'Майский', price: 330, time: '30 мин', coords: [48.2960, 38.0610] },

          // Строитель (350 ₽)
          { street: 'ж/м Строителей', dist: 'Строитель', price: 350, time: '40 мин', coords: [48.3280, 37.9620] },
          { street: 'ул. Оленина', dist: 'Строитель', price: 350, time: '40 мин', coords: [48.3290, 37.9640] },
          { street: 'ул. Жукова', dist: 'Строитель', price: 350, time: '40 мин', coords: [48.3270, 37.9600] },
          { street: 'ул. Ленина (Строитель)', dist: 'Строитель', price: 350, time: '40 мин', coords: [48.3260, 37.9650] },

          // 5-й квартал (400 ₽)
          { street: '5-й квартал', dist: '5-й квартал', price: 400, time: '40 мин', coords: [48.3310, 38.0380] },
          { street: 'ул. Горловской Дивизии', dist: '5-й квартал', price: 400, time: '40 мин', coords: [48.3300, 38.0350] },
          { street: 'ул. Марии Батраковой', dist: '5-й квартал', price: 400, time: '40 мин', coords: [48.3320, 38.0400] },

          // Новогорловка (400 ₽)
          { street: 'Новогорловка', dist: 'Новогорловка', price: 400, time: '40 мин', coords: [48.3120, 38.0850] },
          { street: 'ул. Харьковская', dist: 'Новогорловка', price: 400, time: '40 мин', coords: [48.3140, 38.0880] },
          { street: 'ул. Потемкина', dist: 'Новогорловка', price: 400, time: '40 мин', coords: [48.3100, 38.0820] },

          // Аксёновка (400 ₽)
          { street: 'пос. Аксёновка', dist: 'Аксёновка', price: 400, time: '40 мин', coords: [48.2820, 38.0480] },
          { street: 'ул. Чехова', dist: 'Аксёновка', price: 400, time: '40 мин', coords: [48.2830, 38.0500] },

          // пос. Кирова (450 ₽)
          { street: 'пос. Кирова', dist: 'пос. Кирова', price: 450, time: '40 мин', coords: [48.2860, 37.9780] },
          { street: 'ул. Куйбышева', dist: 'пос. Кирова', price: 450, time: '40 мин', coords: [48.2870, 37.9800] },
          { street: 'ул. Фрунзе', dist: 'пос. Кирова', price: 450, time: '40 мин', coords: [48.2850, 37.9760] },

          // Пятая шахта (450 ₽)
          { street: 'пос. 5-я шахта', dist: 'Пятая шахта', price: 450, time: '40 мин', coords: [48.2720, 38.0050] },
          { street: 'ул. Горловская', dist: 'Пятая шахта', price: 450, time: '40 мин', coords: [48.2730, 38.0070] },
          { street: 'ул. Шахтерская', dist: 'Пятая шахта', price: 450, time: '40 мин', coords: [48.2710, 38.0030] },

          // Финский (450 ₽)
          { street: 'пос. Финский', dist: 'Финский', price: 450, time: '50 мин', coords: [48.3380, 38.0650] },
          { street: 'ул. Финская', dist: 'Финский', price: 450, time: '50 мин', coords: [48.3390, 38.0670] },

          // Озеряновка (450 ₽)
          { street: 'пос. Озеряновка', dist: 'Озеряновка', price: 450, time: '40 мин', coords: [48.2420, 37.9820] },
          { street: 'ул. Центральная', dist: 'Озеряновка', price: 450, time: '40 мин', coords: [48.2430, 37.9840] },
          { street: 'ул. Озерная', dist: 'Озеряновка', price: 450, time: '40 мин', coords: [48.2410, 37.9800] },

          // Румянцево (470 ₽)
          { street: 'пос. Румянцево', dist: 'Румянцево', price: 470, time: '50 мин', coords: [48.3420, 38.0120] },
          { street: 'ул. Румянцева', dist: 'Румянцево', price: 470, time: '50 мин', coords: [48.3430, 38.0140] },

          // Мирный (480 ₽)
          { street: 'пос. Мирный', dist: 'Мирный', price: 480, time: '40 мин', coords: [48.2650, 38.0620] },
          { street: 'ул. Мира', dist: 'Мирный', price: 480, time: '40 мин', coords: [48.2660, 38.0640] },

          // Комсомолец (500 ₽)
          { street: 'пос. Комсомолец', dist: 'Комсомолец', price: 500, time: '45 мин', coords: [48.3450, 37.9350] },
          { street: 'ул. 60 лет СССР', dist: 'Комсомолец', price: 500, time: '45 мин', coords: [48.3460, 37.9370] },
          { street: 'ул. Есенина', dist: 'Комсомолец', price: 500, time: '45 мин', coords: [48.3440, 37.9330] },

          // Семидорожки (520 ₽)
          { street: 'пос. Семидорожки', dist: 'Семидорожки', price: 520, time: '50 мин', coords: [48.2480, 38.0420] },
          { street: 'ул. Семидорожная', dist: 'Семидорожки', price: 520, time: '50 мин', coords: [48.2490, 38.0440] },

          // Калиновка (650 ₽)
          { street: 'пос. Калиновка', dist: 'Калиновка', price: 650, time: '60 мин', coords: [48.3480, 38.1180] },
          { street: 'ул. Калинина', dist: 'Калиновка', price: 650, time: '60 мин', coords: [48.3490, 38.1200] },

          // Октябрьский (650 ₽)
          { street: 'пос. Октябрьский', dist: 'Октябрьский', price: 650, time: '60 мин', coords: [48.3180, 37.8920] },
          { street: 'ул. Октябрьская', dist: 'Октябрьский', price: 650, time: '60 мин', coords: [48.3190, 37.8940] },

          // Воробьёвка (650 ₽)
          { street: 'пос. Воробьёвка', dist: 'Воробьёвка', price: 650, time: '60 мин', coords: [48.3620, 38.0450] },
          { street: 'ул. Воробьевская', dist: 'Воробьёвка', price: 650, time: '60 мин', coords: [48.3630, 38.0470] },

          // Михайловка (750 ₽)
          { street: 'пос. Михайловка', dist: 'Михайловка (дачи)', price: 750, time: '50 мин', coords: [48.2250, 37.9450] },

          // Пригород / другие поселки (650 ₽)
          { street: 'пос. Пантелеймоновка', dist: 'Пригород Горловки', price: 650, time: '60 мин', coords: [48.2050, 37.9400] },
          { street: 'пос. Гольмовский', dist: 'Пригород Горловки', price: 650, time: '60 мин', coords: [48.3980, 38.0820] },
          { street: 'пос. Зайцево', dist: 'Пригород Горловки', price: 650, time: '60 мин', coords: [48.3850, 38.0050] },
          { street: 'пос. Никитовка', dist: 'Северная проходная', price: 550, time: '50 мин', coords: [48.3550, 38.0120] }
        ];

        var suggestDebounce = null;
        var gorlovkaBounds = [[48.20, 37.85], [48.45, 38.25]];

        function normalizeQ(str) {
          var s = str.toLowerCase().trim();
          // Remove city prefix
          var cityPrefixes = ['г. горловка, ', 'г.горловка, ', 'горловка, ', 'г. горловка,', 'горловка,', 'г. ', 'г.'];
          for (var ci = 0; ci < cityPrefixes.length; ci++) {
            if (s.indexOf(cityPrefixes[ci]) === 0) { s = s.slice(cityPrefixes[ci].length).trim(); break; }
          }
          // Remove street type prefix (both short and full forms)
          var typePrefixes = [
            'улица ', 'улица.', 'ул. ', 'ул.', 'ул ',
            'проспект ', 'проспект.', 'пр. ', 'пр.', 'пр ',
            'бульвар ', 'бульвар.', 'б-р ', 'б-р.', 'бул. ', 'бул.',
            'переулок ', 'переулок.', 'пер. ', 'пер.', 'пер ',
            'поселок ', 'посёлок ', 'пос. ', 'пос.', 'пос ',
            'площадь ', 'площадь.', 'пл. ', 'пл.', 'пл ',
            'жилмассив ', 'ж/м ', 'ж/м.', 'жм '
          ];
          for (var ti = 0; ti < typePrefixes.length; ti++) {
            if (s.indexOf(typePrefixes[ti]) === 0) { s = s.slice(typePrefixes[ti].length).trim(); break; }
          }
          return s;
        }


        function extractStreetAndHouse(rawInput) {
          var s = normalizeQ(rawInput).split(',').join(' ');
          while (s.indexOf('  ') !== -1) { s = s.replace('  ', ' '); }
          s = s.trim();
          var parts = s.split(' ');
          var house = '';
          var streetPart = s;
          if (parts.length > 1) {
            var lastPart = parts[parts.length - 1];
            var firstChar = lastPart.charAt(0);
            if (firstChar >= '0' && firstChar <= '9') {
              house = lastPart;
              parts.pop();
              streetPart = parts.join(' ').trim();
            }
          }
          return { street: streetPart, house: house };
        }

        function findLocalStreetMatches(rawInput) {
          var parsed = extractStreetAndHouse(rawInput);
          var norm = parsed.street;
          if (!norm || norm.length < 1) return [];
          
          var searchWords = norm.split(' ').filter(function(w) {
            var stopWords = ['улица', 'ул', 'ул.', 'проспект', 'пр', 'пр.', 'бульвар', 'бул', 'бул.', 'б-р', 'б-р.', 'переулок', 'пер', 'пер.', 'поселок', 'посёлок', 'пос', 'пос.', 'площадь', 'пл', 'пл.', 'ж/м', 'жилмассив', 'г', 'г.', 'горловка'];
            return stopWords.indexOf(w) === -1;
          });
          // If all words were stop words, just use the original norm
          if (searchWords.length === 0) searchWords = [norm];

          var results = [];
          GORLOVKA_STREET_REGISTRY.forEach(function(item) {
            var fullText = (item.street + ' ' + item.dist).toLowerCase();
            var sNorm = normalizeQ(item.street);
            
            var match = true;
            for(var i = 0; i < searchWords.length; i++) {
               if (fullText.indexOf(searchWords[i]) === -1 && sNorm.indexOf(searchWords[i]) === -1) {
                  match = false; break;
               }
            }
            
            if (!match && (sNorm.indexOf(norm) !== -1 || fullText.indexOf(norm) !== -1)) {
               match = true;
            }

            if (match) {
              var formattedTitle = item.street + (parsed.house ? (', ' + parsed.house) : '');
              results.push({
                title: formattedTitle,
                full: 'Горловка, ' + formattedTitle,
                dist: item.dist,
                price: item.price,
                time: item.time,
                coords: item.coords,
                meta: item.dist + ' • ' + item.price + ' ₽ (' + item.time + ')'
              });
            }
          });
          return results.slice(0, 8);
        }

        function doSearchGorlovkaAddresses(val) {
          if (!val || val.trim().length < 2) {
            if (addressSuggestions) addressSuggestions.style.display = 'none';
            return;
          }

          if (typeof ymaps !== 'undefined' && ymaps.suggest) {
            var fullQuery = val.toLowerCase().indexOf('горловка') !== -1 ? val : ('Горловка, ' + val);
            ymaps.suggest(fullQuery, { boundedBy: gorlovkaBounds, results: 8 }).then(function(items) {
              if (!items || items.length === 0) {
                var local = findLocalStreetMatches(val);
                if (local.length > 0) renderSuggestions(local);
                else if (addressSuggestions) addressSuggestions.style.display = 'none';
                return;
              }

              var list = items.map(function(it) {
                var displayName = it.value || '';
                var cleanTitle = displayName
                  .replace(/Донецкая Народная Республика[^,]*,\s*/gi, '')
                  .replace(/ДНР[^,]*,\s*/gi, '')
                  .replace(/Донецкая обл[^,]*,\s*/gi, '')
                  .replace(/г\.?\s*Горловка,\s*/gi, '')
                  .replace(/Горловка,\s*/gi, '')
                  .trim();
                if (!cleanTitle) cleanTitle = displayName;

                return {
                  title: cleanTitle,
                  full: displayName,
                  dist: '',
                  price: 0,
                  time: '',
                  coords: null,
                  meta: 'Горловка'
                };
              });

              renderSuggestions(list);
            }).catch(function() {
              var local = findLocalStreetMatches(val);
              if (local.length > 0) renderSuggestions(local);
            });
          } else {
            var local = findLocalStreetMatches(val);
            if (local.length > 0) renderSuggestions(local);
          }
        }


        function renderSuggestions(list) {
          if (!addressSuggestions) return;
          if (!list || list.length === 0) {
            addressSuggestions.style.display = 'none';
            return;
          }
          addressSuggestions.innerHTML = list.map(function(item) {
            return '<div class="suggest-row" data-full="' + item.full + '" data-title="' + item.title + '" data-dist="' + (item.dist || 'ЦГР') + '" data-price="' + (item.price || 250) + '" data-time="' + (item.time || '30 мин') + '" data-lat="' + (item.coords ? item.coords[0] : '') + '" data-lon="' + (item.coords ? item.coords[1] : '') + '">' +
              '<span class="suggest-pin">📍</span>' +
              '<div class="suggest-info">' +
                '<span class="suggest-name">' + item.title + '</span>' +
                '<span class="suggest-meta">' + item.meta + '</span>' +
              '</div>' +
            '</div>';
          }).join('');
          addressSuggestions.style.display = 'block';

          addressSuggestions.querySelectorAll('.suggest-row').forEach(function(row) {
            row.addEventListener('click', function() {
              var full = row.getAttribute('data-full');
              var title = row.getAttribute('data-title');
              var dist = row.getAttribute('data-dist');
              var price = parseInt(row.getAttribute('data-price') || '250', 10);
              var time = row.getAttribute('data-time') || '30 мин';
              var lat = parseFloat(row.getAttribute('data-lat'));
              var lon = parseFloat(row.getAttribute('data-lon'));

              deliveryInfo.address = full;
              deliveryInfo.district = dist;
              if (price > 0) deliveryInfo.price = price;
              deliveryInfo.time = time;
              if (mapAddressInput) mapAddressInput.value = title || full;
              addressSuggestions.style.display = 'none';
              updateModalCalcView();

              // If coords are available (local registry results), use them directly
              if (!isNaN(lat) && !isNaN(lon) && window.gorlovkaYandexMapInstance) {
                var coords = [lat, lon];
                if (window.gorlovkaClientPlacemark) {
                  window.gorlovkaClientPlacemark.geometry.setCoordinates(coords);
                } else if (window.gorlovkaYandexMapInstance) {
                  window.gorlovkaClientPlacemark = new ymaps.Placemark(coords, {}, { preset: 'islands#redDotIcon' });
                  window.gorlovkaYandexMapInstance.geoObjects.add(window.gorlovkaClientPlacemark);
                }
                window.gorlovkaYandexMapInstance.panTo(coords, { flying: true, duration: 600 });
                window.gorlovkaYandexMapInstance.setZoom(16);
                if (window.checkCoordsZoneGlobal) {
                  window.checkCoordsZoneGlobal(coords, false);
                }
              } else if (typeof ymaps !== 'undefined' && ymaps.geocode) {
                // Yandex Suggest result — geocode to get exact coords
                var geocodeQuery = full || title;
                ymaps.geocode(geocodeQuery, { results: 1 }).then(function(res) {
                  var obj = res.geoObjects.get(0);
                  if (!obj) return;
                  var gcoords = obj.geometry.getCoordinates();
                  if (window.gorlovkaClientPlacemark) {
                    window.gorlovkaClientPlacemark.geometry.setCoordinates(gcoords);
                  } else if (window.gorlovkaYandexMapInstance) {
                    window.gorlovkaClientPlacemark = new ymaps.Placemark(gcoords, {}, { preset: 'islands#redDotIcon' });
                    window.gorlovkaYandexMapInstance.geoObjects.add(window.gorlovkaClientPlacemark);
                  }
                  if (window.gorlovkaYandexMapInstance) {
                    window.gorlovkaYandexMapInstance.panTo(gcoords, { flying: true, duration: 600 });
                    window.gorlovkaYandexMapInstance.setZoom(16);
                  }
                  if (window.checkCoordsZoneGlobal) {
                    window.checkCoordsZoneGlobal(gcoords, false);
                  }
                }).catch(function() {});
              }
            });
          });
        }

        if (mapAddressInput) {
          mapAddressInput.addEventListener('input', function(e) {
            var val = e.target.value;
            deliveryInfo.address = val;
            clearTimeout(suggestDebounce);
            suggestDebounce = setTimeout(function() {
              doSearchGorlovkaAddresses(val);
            }, 120);
          });

          mapAddressInput.addEventListener('focus', function() {
            if (mapAddressInput.value.trim().length > 0) {
              doSearchGorlovkaAddresses(mapAddressInput.value);
            }
          });

          mapAddressInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (addressSuggestions) addressSuggestions.style.display = 'none';
              var localMatches = findLocalStreetMatches(mapAddressInput.value);
              if (localMatches.length > 0) {
                var topMatch = localMatches[0];
                deliveryInfo.address = topMatch.full;
                deliveryInfo.district = topMatch.dist;
                deliveryInfo.price = topMatch.price;
                deliveryInfo.time = topMatch.time;
                if (mapAddressInput) mapAddressInput.value = topMatch.title;
                updateModalCalcView();
                if (topMatch.coords && window.gorlovkaYandexMapInstance) {
                  if (window.gorlovkaClientPlacemark) window.gorlovkaClientPlacemark.geometry.setCoordinates(topMatch.coords);
                  window.gorlovkaYandexMapInstance.panTo(topMatch.coords, { flying: true, duration: 600 });
                  window.gorlovkaYandexMapInstance.setZoom(15);
                }
              } else if (window.geocodeAndPanAddress) {
                window.geocodeAndPanAddress(mapAddressInput.value);
              }
            }
          });

        }

        document.addEventListener('click', function(e) {
          if (addressSuggestions && !addressSuggestions.contains(e.target) && e.target !== mapAddressInput) {
            addressSuggestions.style.display = 'none';
          }
        });

        var isYandexMapInited = false;
        function initYandexMapGorlovka() {
          if (isYandexMapInited || typeof ymaps === 'undefined') return;
          try {
            ymaps.ready(function() {
              isYandexMapInited = true;
              var gorlovkaCenter = [48.306075, 38.016335];
              var mapEl = document.getElementById('yandex-delivery-map');
              if (!mapEl) return;
              mapEl.innerHTML = '';
              
              var myMap = new ymaps.Map('yandex-delivery-map', {
                center: gorlovkaCenter,
                zoom: 12,
                controls: ['zoomControl', 'geolocationControl']
              });

              var zonesData = window.GORLOVKA_DELIVERY_ZONES || [];
              var zonesCollection = new ymaps.GeoObjectCollection();

              function applyZoneData(foundZone, coords, updateInput) {
                if (foundZone) {
                  deliveryInfo.district = foundZone.name;
                  deliveryInfo.price = foundZone.price;
                  deliveryInfo.time = foundZone.time + ' мин';
                } else {
                  deliveryInfo.district = 'Пригород Горловки';
                  deliveryInfo.price = 650;
                  deliveryInfo.time = '60-80 мин';
                }

                if (coords && updateInput !== false) {
                  ymaps.geocode(coords, { results: 1 }).then(function(res) {
                    var firstGeoObject = res.geoObjects.get(0);
                    if (firstGeoObject) {
                      var fullAddr = firstGeoObject.getAddressLine() || '';
                      var shortName = firstGeoObject.properties.get('name') || fullAddr;
                      var cleanShort = shortName
                        .replace(/Донецкая Народная Республика[^,]*,\s*/gi, '')
                        .replace(/ДНР[^,]*,\s*/gi, '')
                        .replace(/г\.?\s*Горловка,?\s*/gi, '')
                        .replace(/Горловка,?\s*/gi, '')
                        .trim();
                      var cleanFull = fullAddr
                        .replace(/Донецкая Народная Республика[^,]*,\s*/gi, '')
                        .replace(/ДНР[^,]*,\s*/gi, '')
                        .trim();
                      deliveryInfo.address = cleanFull || fullAddr;
                      if (mapAddressInput) mapAddressInput.value = cleanShort || shortName;
                      var coAddr = document.getElementById('co-selected-address-text');
                      if (coAddr) coAddr.textContent = cleanFull || shortName;
                      applyDeliveryInfoToSite();
                      updateCheckoutAddressUI();
                    }
                    updateModalCalcView();
                  }).catch(function() {
                    updateModalCalcView();
                  });
                } else {
                  updateModalCalcView();
                }
              }

              function checkCoordsZone(coords, updateInput) {
                var found = null;
                for (var i = 0; i < zonesData.length; i++) {
                  if (pointInPolygon(coords, zonesData[i].coords)) {
                    found = zonesData[i];
                    break;
                  }
                }
                applyZoneData(found, coords, updateInput);
              }

              window.gorlovkaYandexMapInstance = myMap;
              window.checkCoordsZoneGlobal = checkCoordsZone;

              // Add all 25 polygon zones with official colors, tooltips & hover
              zonesData.forEach(function(zone) {
                var polygon = new ymaps.Polygon([zone.coords], {
                  hintContent: '<div style="padding: 4px 8px; font-family: sans-serif; font-size: 13px;"><strong>' + zone.name + '</strong><br/>Доставка: <strong style="color: #1B4D36;">' + zone.price + ' ₽</strong> • ' + zone.time + ' мин</div>',
                  balloonContent: '<div style="padding: 10px; font-family: sans-serif; font-size: 14px;"><strong>Район: ' + zone.name + '</strong><br/>Стоимость доставки: <strong style="color: #2D6A4F; font-size: 16px;">' + zone.price + ' ₽</strong><br/>Время доставки: <strong>' + zone.time + ' мин</strong></div>'
                }, {
                  fillColor: zone.fillColor,
                  fillOpacity: 0.45,
                  strokeColor: zone.strokeColor,
                  strokeOpacity: 0.95,
                  strokeWidth: 2,
                  cursor: 'pointer'
                });

                polygon.events.add('mouseenter', function() {
                  polygon.options.set('fillOpacity', 0.72);
                  polygon.options.set('strokeWidth', 3);
                });

                polygon.events.add('mouseleave', function() {
                  polygon.options.set('fillOpacity', 0.45);
                  polygon.options.set('strokeWidth', 2);
                });

                polygon.events.add('click', function(e) {
                  var coords = e.get('coords');
                  clientPlacemark.geometry.setCoordinates(coords);
                  applyZoneData(zone, coords, true);
                });

                zonesCollection.add(polygon);
              });

              myMap.geoObjects.add(zonesCollection);

              var shopPlacemark = new ymaps.Placemark(gorlovkaCenter, {
                balloonContent: '<strong>«Цветочный Рай»</strong><br/>г. Горловка, ул. Пушкинская, 36а'
              }, {
                preset: 'islands#darkGreenDotIcon'
              });

              var clientPlacemark = new ymaps.Placemark(gorlovkaCenter, {
                balloonContent: 'Адрес доставки в Горловке'
              }, {
                preset: 'islands#redCircleDotIcon',
                draggable: true
              });

              window.gorlovkaClientPlacemark = clientPlacemark;

              myMap.geoObjects.add(shopPlacemark);
              myMap.geoObjects.add(clientPlacemark);

              // Popular interactive points across Gorlovka
              var popularPoints = [
                { name: 'Магазин «Цветочный Рай»', addr: 'г. Горловка, ул. Пушкинская, 36а', coords: [48.306075, 38.016335], icon: 'islands#darkGreenDotIcon' },
                { name: 'Площадь Победы', addr: 'г. Горловка, пр. Победы, 35', coords: [48.305412, 38.019542], icon: 'islands#violetDotIcon' },
                { name: 'ТРЦ «Пассаж»', addr: 'г. Горловка, пр. Ленина, 12', coords: [48.308215, 38.014210], icon: 'islands#blueDotIcon' },
                { name: 'Автовокзал Горловка', addr: 'г. Горловка, ул. Горловской Дивизии, 42', coords: [48.318450, 38.032120], icon: 'islands#orangeDotIcon' },
                { name: 'КСК «Экипаж»', addr: 'г. Горловка, ул. Комсомольская, 28', coords: [48.301540, 38.026410], icon: 'islands#darkOrangeDotIcon' },
                { name: 'Горбольница №2', addr: 'г. Горловка, пр. Ленина, 26', coords: [48.312150, 38.009840], icon: 'islands#redDotIcon' },
                { name: 'Ж/Д Вокзал Горловка', addr: 'г. Горловка, ул. Станционная, 1', coords: [48.324510, 38.051230], icon: 'islands#nightDotIcon' }
              ];

              popularPoints.forEach(function(pt) {
                var mark = new ymaps.Placemark(pt.coords, {
                  hintContent: '<strong>' + pt.name + '</strong><br/>' + pt.addr + '<br/><span style="color:#2D6A4F; font-size:11px;">Кликните для выбора адреса</span>',
                  balloonContent: '<strong>' + pt.name + '</strong><br/>' + pt.addr
                }, {
                  preset: pt.icon
                });

                mark.events.add('click', function() {
                  clientPlacemark.geometry.setCoordinates(pt.coords);
                  if (mapAddressInput) mapAddressInput.value = pt.addr.replace(/^г\.?\s*Горловка,?\s*/gi, '');
                  deliveryInfo.address = pt.addr;
                  var coAddr = document.getElementById('co-selected-address-text');
                  if (coAddr) coAddr.textContent = pt.addr;
                  applyDeliveryInfoToSite();
                  updateCheckoutAddressUI();
                  checkCoordsZone(pt.coords, false);
                });

                myMap.geoObjects.add(mark);
              });

              clientPlacemark.events.add('dragend', function() {
                var coords = clientPlacemark.geometry.getCoordinates();
                checkCoordsZone(coords, true);
              });

              myMap.events.add('click', function(e) {
                var coords = e.get('coords');
                clientPlacemark.geometry.setCoordinates(coords);
                checkCoordsZone(coords, true);
              });

              window.geocodeAndPanAddress = function(addrText) {
                if (!addrText || addrText.length < 2 || typeof ymaps === 'undefined') return;
                var fullQuery = addrText.toLowerCase().indexOf('горловка') !== -1 ? addrText : ('г. Горловка, ' + addrText);
                ymaps.geocode(fullQuery, { boundedBy: gorlovkaBounds, results: 1 }).then(function(res) {
                  var firstGeo = res.geoObjects.get(0);
                  if (firstGeo) {
                    var coords = firstGeo.geometry.getCoordinates();
                    var fullLine = firstGeo.getAddressLine();
                    var shortName = firstGeo.properties.get('name') || fullLine;
                    if (fullLine) {
                      deliveryInfo.address = fullLine;
                      if (mapAddressInput) mapAddressInput.value = shortName;
                    }
                    clientPlacemark.geometry.setCoordinates(coords);
                    myMap.panTo(coords, { flying: true, duration: 600 });
                    myMap.setZoom(16);
                    checkCoordsZone(coords, false);
                  }
                });
              };

              // Official Native Yandex SuggestView
              try {
                if (typeof ymaps.SuggestView !== 'undefined' && mapAddressInput) {
                  var suggestView = new ymaps.SuggestView('map-address-input', {
                    boundedBy: gorlovkaBounds,
                    results: 8
                  });
                  suggestView.events.add('select', function(e) {
                    var item = e.get('item');
                    if (item && item.value) {
                      window.geocodeAndPanAddress(item.value);
                    }
                  });
                }
              } catch(sErr) {
                console.warn('SuggestView init:', sErr);
              }
            });
          } catch(err) {
            console.error('Yandex Maps error:', err);
          }
        }

        if (btnApplyAddress) {
          btnApplyAddress.addEventListener('click', function() {
            var flat = document.getElementById('addr-flat');
            var entrance = document.getElementById('addr-entrance');
            var floor = document.getElementById('addr-floor');
            var doorphone = document.getElementById('addr-doorphone');
            var isPrivate = document.getElementById('private-house-toggle');
            if (mapAddressInput && mapAddressInput.value.trim()) {
              var typedVal = mapAddressInput.value.trim();
              if (deliveryInfo.address.indexOf(typedVal) === -1) {
                deliveryInfo.address = typedVal.indexOf('Горловка') !== -1 ? typedVal : ('Горловка, ' + typedVal);
              }
            }
            if (flat) deliveryInfo.flat = flat.value;
            if (entrance) deliveryInfo.entrance = entrance.value;
            if (floor) deliveryInfo.floor = floor.value;
            if (doorphone) deliveryInfo.doorphone = doorphone.value;
            if (isPrivate) deliveryInfo.isPrivate = isPrivate.checked;
            
            applyDeliveryInfoToSite();
            updateCheckoutAddressUI();
            closeAddressModal();
          });
        }

        if (btnGeolocation) {
          btnGeolocation.addEventListener('click', function() {
            btnGeolocation.textContent = 'Определение...';
            setTimeout(function() {
              deliveryInfo.address = 'Горловка, пр. Победы, 35';
              deliveryInfo.district = 'ЦГР';
              deliveryInfo.price = 250;
              deliveryInfo.time = '30 мин';
              if (mapAddressInput) mapAddressInput.value = 'пр. Победы, 35';
              updateModalCalcView();
              btnGeolocation.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg><span>Определено</span>';
            }, 400);
          });
        }

        // --- 3. Cart Drawer Open / Close & Checkout Navigation ---
        var cartDrawerWrap = document.getElementById('cart-drawer-wrap');
        var btnHeaderCart = document.getElementById('btn-header-cart');
        var btnCloseCart = document.getElementById('btn-close-cart');
        var cartBackdrop = document.getElementById('cart-backdrop');
        var btnClearCart = document.getElementById('btn-clear-cart');
        var btnCartToCatalog = document.getElementById('btn-cart-to-catalog');
        var btnSubmitOrder = document.getElementById('btn-submit-order');

        function openCart() {
          if (!cartDrawerWrap) return;
          cartDrawerWrap.classList.add('is-open');
          updateCartUI();
          lockBodyScroll(true);
        }

        function closeCart() {
          if (!cartDrawerWrap) return;
          cartDrawerWrap.classList.remove('is-open');
          lockBodyScroll(false);
        }

        if (btnHeaderCart) btnHeaderCart.addEventListener('click', openCart);
        if (btnCloseCart) btnCloseCart.addEventListener('click', closeCart);
        if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);
        if (btnClearCart) btnClearCart.addEventListener('click', clearCart);
        if (btnCartToCatalog) {
          btnCartToCatalog.addEventListener('click', function() {
            closeCart();
            navigateToView('catalog', 'Цветы');
          });
        }

        // --- 3.1 DEDICATED FULL CHECKOUT PAGE CONTROLLER ---
        var checkoutSection = document.getElementById('checkout-page-section');
        var mainCatalogContent = document.getElementById('main-catalog-content');
        var checkoutMainGrid = document.getElementById('checkout-main-grid');
        var checkoutSuccessView = document.getElementById('checkout-success-view');
        var btnCheckoutBack = document.getElementById('btn-checkout-back');
        var btnCoEditCart = document.getElementById('btn-co-edit-cart');
        var btnCoChangeMapAddress = document.getElementById('btn-co-change-map-address');
        var btnCoSubmitOrder = document.getElementById('btn-co-submit-order');
        var btnCoReturnHome = document.getElementById('btn-co-return-home');
        var currentDeliveryMethod = 'courier';
        var currentPaymentMethod = 'card_online';

        function updateCheckoutAddressUI() {
          var addrTitle = document.getElementById('co-selected-address-text');
          var zonePill = document.getElementById('co-zone-pill');
          var pricePill = document.getElementById('co-price-pill');
          var timePill = document.getElementById('co-time-pill');
          var subtotalEl = document.getElementById('co-sum-subtotal');
          var deliveryEl = document.getElementById('co-sum-delivery');
          var discountEl = document.getElementById('co-sum-discount');
          var discountRow = document.getElementById('co-sum-discount-row');
          var finalTotalEl = document.getElementById('co-sum-final-total');
          var coFlat = document.getElementById('co-flat');
          var coEntrance = document.getElementById('co-entrance');
          var coPrivate = document.getElementById('co-private-house-check');
          var coSubaddressGrid = document.getElementById('co-subaddress-grid');

          if (addrTitle) {
            var fullDisplay = deliveryInfo.address || 'Горловка, пр. Победы, 35';
            addrTitle.textContent = fullDisplay;
          }
          if (zonePill) zonePill.textContent = 'Район: ' + (deliveryInfo.district || 'ЦГР');
          if (pricePill) pricePill.textContent = 'Доставка: ' + (currentDeliveryMethod === 'pickup' ? '0 ₽ (Бесплатно)' : (deliveryInfo.price || 250) + ' ₽');
          if (timePill) timePill.textContent = deliveryInfo.time || '30-45 мин';

          if (coFlat && deliveryInfo.flat) coFlat.value = deliveryInfo.flat;
          if (coEntrance && deliveryInfo.entrance) coEntrance.value = deliveryInfo.entrance;
          if (coPrivate && typeof deliveryInfo.isPrivate !== 'undefined') {
            coPrivate.checked = deliveryInfo.isPrivate;
            if (coSubaddressGrid) coSubaddressGrid.style.display = coPrivate.checked ? 'none' : 'grid';
          }

          var dateInput = document.getElementById('co-delivery-date');
          if (dateInput) {
            var now = new Date();
            var yyyy = now.getFullYear();
            var mm = String(now.getMonth() + 1).padStart(2, '0');
            var dd = String(now.getDate()).padStart(2, '0');
            var todayStr = yyyy + '-' + mm + '-' + dd;
            dateInput.min = todayStr;
            if (!dateInput.value) {
              dateInput.value = todayStr;
            }
          }

          updateCheckoutTotals();
        }

        function renderCheckoutSummary() {
          var itemsList = document.getElementById('co-summary-items-list');
          if (!itemsList) return;
          if (cart.length === 0) {
            itemsList.innerHTML = '<div style="padding: 16px 0; color: #6C757D; font-size: 14px;">В заказе нет товаров</div>';
            return;
          }
          itemsList.innerHTML = cart.map(function(item) {
            var qty = item.count || item.quantity || 1;
            var priceNum = item.priceNum || (typeof item.price === 'number' ? item.price : parseInt(String(item.price).replace(/\D/g, ''), 10)) || 0;
            return '<div class="co-item-row">' +
              '<img src="' + item.image + '" alt="' + item.title + '" class="co-item-thumb" />' +
              '<div class="co-item-info">' +
                '<div class="co-item-title">' + item.title + '</div>' +
                '<div class="co-item-qty-meta">' + qty + ' шт. × ' + priceNum.toLocaleString('ru-RU') + ' ₽</div>' +
              '</div>' +
              '<div class="co-item-total">' + (priceNum * qty).toLocaleString('ru-RU') + ' ₽</div>' +
            '</div>';
          }).join('');
        }

        function updateCheckoutTotals() {
          var subtotal = cart.reduce(function(sum, it) {
            var qty = it.count || it.quantity || 1;
            var pNum = it.priceNum || (typeof it.price === 'number' ? it.price : parseInt(String(it.price).replace(/\D/g, ''), 10)) || 0;
            return sum + (pNum * qty);
          }, 0);
          var discount = promoDiscountPercent > 0 ? Math.round(subtotal * (promoDiscountPercent / 100)) : 0;
          var deliveryCost = currentDeliveryMethod === 'pickup' ? 0 : (deliveryInfo.price || 250);
          var finalTotal = Math.max(0, subtotal - discount) + deliveryCost;

          var subtotalEl = document.getElementById('co-sum-subtotal');
          var deliveryEl = document.getElementById('co-sum-delivery');
          var discountEl = document.getElementById('co-sum-discount');
          var discountRow = document.getElementById('co-sum-discount-row');
          var finalTotalEl = document.getElementById('co-sum-final-total');

          if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString('ru-RU') + ' ₽';
          if (discountEl) discountEl.textContent = '-' + discount.toLocaleString('ru-RU') + ' ₽';
          if (discountRow) discountRow.style.display = discount > 0 ? 'flex' : 'none';
          if (deliveryEl) {
            deliveryEl.textContent = deliveryCost === 0 ? 'Бесплатно (0 ₽)' : (deliveryCost.toLocaleString('ru-RU') + ' ₽');
            deliveryEl.style.color = '#2D6A4F';
          }
          if (finalTotalEl) finalTotalEl.textContent = finalTotal.toLocaleString('ru-RU') + ' ₽';
          if (btnCoSubmitOrder) {
            btnCoSubmitOrder.innerHTML = '<span>Подтвердить заказ • ' + finalTotal.toLocaleString('ru-RU') + ' ₽</span>';
          }
        }

        function openCheckoutPage() {
          if (cart.length === 0) {
            showToast('Добавьте букеты в корзину для оформления заказа');
            openCart();
            return;
          }
          closeCart();
          if (mainCatalogContent) mainCatalogContent.style.display = 'none';
          if (checkoutSection) checkoutSection.style.display = 'block';
          if (checkoutMainGrid) checkoutMainGrid.style.display = 'grid';
          if (checkoutSuccessView) checkoutSuccessView.style.display = 'none';

          // Stepper: Step 2 active
          var s1 = document.getElementById('co-step-1');
          var s2 = document.getElementById('co-step-2');
          var s3 = document.getElementById('co-step-3');
          if (s1) { s1.className = 'co-step-item completed'; }
          if (s2) { s2.className = 'co-step-item active'; }
          if (s3) { s3.className = 'co-step-item'; }

          renderCheckoutSummary();
          updateCheckoutAddressUI();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function closeCheckoutPage() {
          if (checkoutSection) checkoutSection.style.display = 'none';
          if (mainCatalogContent) mainCatalogContent.style.display = 'block';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if (btnSubmitOrder) {
          btnSubmitOrder.addEventListener('click', function() {
            if (cart.length === 0) return;
            openCheckoutPage();
          });
        }

        if (btnCheckoutBack) {
          btnCheckoutBack.addEventListener('click', function() {
            closeCheckoutPage();
            if (catalogView && catalogView.style.display === 'block') {
              navigateToView('catalog', currentActiveCategory || 'Цветы');
            }
          });
        }
        if (btnCoEditCart) {
          btnCoEditCart.addEventListener('click', function() {
            closeCheckoutPage();
            openCart();
          });
        }
        var coStep1 = document.getElementById('co-step-1');
        if (coStep1) {
          coStep1.style.cursor = 'pointer';
          coStep1.addEventListener('click', function() {
            closeCheckoutPage();
            openCart();
          });
        }

        function formatPhoneValue(inputVal) {
          var inputNumbersValue = (inputVal || '').replace(/[^0-9]/g, '');
          if (!inputNumbersValue) return '';

          var firstChar = inputNumbersValue[0];
          var digits = inputNumbersValue;
          if (firstChar === '7' || firstChar === '8') {
            digits = inputNumbersValue.substring(1);
          }

          var formatted = '+7';
          if (digits.length > 0) {
            formatted += ' (' + digits.substring(0, 3);
          }
          if (digits.length >= 3) {
            formatted += ') ' + digits.substring(3, 6);
          }
          if (digits.length >= 6) {
            formatted += '-' + digits.substring(6, 8);
          }
          if (digits.length >= 8) {
            formatted += '-' + digits.substring(8, 10);
          }
          return formatted;
        }

        function setupPhoneInputMask(inputEl) {
          if (!inputEl) return;

          inputEl.addEventListener('input', function() {
            inputEl.value = formatPhoneValue(inputEl.value);
          });

          inputEl.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && inputEl.value.replace(/[^0-9]/g, '').length <= 1) {
              inputEl.value = '';
            }
          });

          inputEl.addEventListener('paste', function(e) {
            var clipboard = e.clipboardData || window.clipboardData;
            if (clipboard) {
              var pasted = clipboard.getData('text');
              if (pasted) {
                e.preventDefault();
                inputEl.value = formatPhoneValue(pasted);
              }
            }
          });
        }
        setupPhoneInputMask(document.getElementById('co-customer-phone'));
        setupPhoneInputMask(document.getElementById('co-recipient-phone'));

        if (btnCoChangeMapAddress) {
          btnCoChangeMapAddress.addEventListener('click', function() {
            openAddressModal();
          });
        }

        // Recipient tabs
        var recipientTabs = document.getElementById('co-recipient-type-tabs');
        var giftRecipientBox = document.getElementById('co-gift-recipient-box');
        if (recipientTabs) {
          recipientTabs.querySelectorAll('.co-segment-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
              recipientTabs.querySelectorAll('.co-segment-btn').forEach(function(b) { b.classList.remove('active'); });
              btn.classList.add('active');
              var type = btn.getAttribute('data-type');
              if (giftRecipientBox) {
                giftRecipientBox.style.display = type === 'gift' ? 'block' : 'none';
              }
            });
          });
        }

        // Delivery method tabs (Courier vs Pickup)
        var deliveryMethodTabs = document.getElementById('co-delivery-method-tabs');
        var courierSection = document.getElementById('co-courier-section');
        var pickupSection = document.getElementById('co-pickup-section');
        if (deliveryMethodTabs) {
          deliveryMethodTabs.querySelectorAll('.co-segment-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
              deliveryMethodTabs.querySelectorAll('.co-segment-btn').forEach(function(b) { b.classList.remove('active'); });
              btn.classList.add('active');
              currentDeliveryMethod = btn.getAttribute('data-method');
              if (courierSection) courierSection.style.display = currentDeliveryMethod === 'courier' ? 'block' : 'none';
              if (pickupSection) pickupSection.style.display = currentDeliveryMethod === 'pickup' ? 'block' : 'none';
              updateCheckoutTotals();
            });
          });
        }

        // Private house checkbox toggle in Checkout
        var coPrivateCheck = document.getElementById('co-private-house-check');
        var coSubaddressGridEl = document.getElementById('co-subaddress-grid');
        if (coPrivateCheck && coSubaddressGridEl) {
          coPrivateCheck.addEventListener('change', function() {
            if (this.checked) {
              coSubaddressGridEl.style.display = 'none';
              var f = document.getElementById('co-flat');
              var e = document.getElementById('co-entrance');
              if (f) f.value = '';
              if (e) e.value = '';
              deliveryInfo.isPrivate = true;
            } else {
              coSubaddressGridEl.style.display = 'grid';
              deliveryInfo.isPrivate = false;
            }
          });
        }

        // Time mode tabs (ASAP vs Scheduled date/time)
        var timeModeTabs = document.getElementById('co-time-mode-tabs');
        var scheduleOptions = document.getElementById('co-schedule-options');
        var deliveryDateInput = document.getElementById('co-delivery-date');

        // Set min date to today's date in local time
        if (deliveryDateInput) {
          var todayStr = new Date().toISOString().split('T')[0];
          deliveryDateInput.setAttribute('min', todayStr);
          if (!deliveryDateInput.value) {
            deliveryDateInput.value = todayStr;
          }
          deliveryDateInput.addEventListener('click', function() {
            try {
              if (typeof deliveryDateInput.showPicker === 'function') {
                deliveryDateInput.showPicker();
              }
            } catch (err) {}
          });
        }

        if (timeModeTabs) {
          timeModeTabs.querySelectorAll('.co-segment-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
              timeModeTabs.querySelectorAll('.co-segment-btn').forEach(function(b) { b.classList.remove('active'); });
              btn.classList.add('active');
              var mode = btn.getAttribute('data-time-mode') || btn.getAttribute('data-mode');
              if (scheduleOptions) {
                var isScheduled = (mode === 'scheduled' || mode === 'schedule');
                scheduleOptions.style.display = isScheduled ? 'block' : 'none';
                if (isScheduled && deliveryDateInput) {
                  setTimeout(function() {
                    try {
                      if (typeof deliveryDateInput.showPicker === 'function') {
                        deliveryDateInput.showPicker();
                      }
                    } catch (e) {}
                  }, 80);
                }
              }
            });
          });
        }

        // Payment method selection
        var paymentContainer = document.getElementById('co-payment-methods') || document.getElementById('co-payment-group');
        if (paymentContainer) {
          var payOptions = paymentContainer.querySelectorAll('.co-pay-option');
          payOptions.forEach(function(opt) {
            opt.addEventListener('click', function() {
              payOptions.forEach(function(o) {
                o.classList.remove('active');
                var radio = o.querySelector('input[type="radio"]');
                if (radio) radio.checked = false;
              });
              opt.classList.add('active');
              var myRadio = opt.querySelector('input[type="radio"]');
              if (myRadio) {
                myRadio.checked = true;
                currentPaymentMethod = myRadio.value;
              }
            });
          });

          paymentContainer.querySelectorAll('input[name="co-payment"]').forEach(function(radio) {
            radio.addEventListener('change', function() {
              payOptions.forEach(function(o) {
                var r = o.querySelector('input[type="radio"]');
                if (r && r.checked) {
                  o.classList.add('active');
                  currentPaymentMethod = r.value;
                } else {
                  o.classList.remove('active');
                }
              });
            });
          });
        }

        // Promo code inside Checkout
        var btnCoApplyPromo = document.getElementById('btn-co-apply-promo');
        var coPromoInput = document.getElementById('co-promo-input');
        var coPromoMsg = document.getElementById('co-promo-msg');
        if (btnCoApplyPromo && coPromoInput && coPromoMsg) {
          btnCoApplyPromo.addEventListener('click', function() {
            var code = coPromoInput.value.trim().toUpperCase();
            if (code === 'START5') {
              promoDiscountPercent = 5;
              coPromoMsg.textContent = '✓ Промокод применен: скидка 5% на первый заказ!';
              coPromoMsg.style.display = 'block';
              coPromoMsg.style.color = '#2D6A4F';
              updateCheckoutTotals();
            } else if (code === 'ГОРЛОВКА10' || code === 'ЦВЕТЫ10' || code === 'РАЙ10' || code === '1234' || code === '1235') {
              promoDiscountPercent = 10;
              coPromoMsg.textContent = '✓ Промокод применен: скидка 10% на ваш заказ!';
              coPromoMsg.style.display = 'block';
              coPromoMsg.style.color = '#2D6A4F';
              updateCheckoutTotals();
            } else if (code) {
              coPromoMsg.textContent = 'Неверный промокод';
              coPromoMsg.style.display = 'block';
              coPromoMsg.style.color = '#E03544';
            }
          });
        }

        // Finish & Place Order
        if (btnCoSubmitOrder) {
          btnCoSubmitOrder.addEventListener('click', function() {
            var nameEl = document.getElementById('co-customer-name');
            var phoneEl = document.getElementById('co-customer-phone');

            if (!nameEl || !nameEl.value.trim()) {
              if (nameEl) { nameEl.focus(); nameEl.style.borderColor = '#E03544'; }
              showToast('Пожалуйста, укажите ваше имя');
              return;
            }
            if (!phoneEl || !phoneEl.value.trim()) {
              if (phoneEl) { phoneEl.focus(); phoneEl.style.borderColor = '#E03544'; }
              showToast('Пожалуйста, укажите ваш номер телефона');
              return;
            }

            var orderNum = 'GR-' + Math.floor(10000 + Math.random() * 90000);
            var subtotal = cart.reduce(function(sum, it) {
              var qty = it.count || it.quantity || 1;
              var pNum = it.priceNum || (typeof it.price === 'number' ? it.price : parseInt(String(it.price).replace(/\D/g, ''), 10)) || 0;
              return sum + (pNum * qty);
            }, 0);
            var discount = promoDiscountPercent > 0 ? Math.round(subtotal * (promoDiscountPercent / 100)) : 0;
            var deliveryCost = currentDeliveryMethod === 'pickup' ? 0 : (deliveryInfo.price || 250);
            var finalTotal = Math.max(0, subtotal - discount) + deliveryCost;

            // Fill success view
            var succNum = document.getElementById('co-success-num');
            var succMethod = document.getElementById('co-succ-method');
            var succAddress = document.getElementById('co-succ-address');
            var succTime = document.getElementById('co-succ-time');
            var succPayment = document.getElementById('co-succ-payment');
            var succTotal = document.getElementById('co-succ-total');

            if (succNum) succNum.textContent = 'Заказ № ' + orderNum;
            if (succMethod) succMethod.textContent = currentDeliveryMethod === 'courier' ? 'Курьерская доставка по Горловке' : 'Самовывоз (Пушкинская, 36а)';
            if (succAddress) succAddress.textContent = currentDeliveryMethod === 'courier' ? (deliveryInfo.address || 'Горловка, пр. Победы, 35') : 'г. Горловка, ул. Пушкинская, 36а';
            if (succTime) {
              var timeSlotEl = document.getElementById('co-delivery-time-slot');
              var dateEl = document.getElementById('co-delivery-date');
              var isAsap = !scheduleOptions || scheduleOptions.style.display === 'none';
              succTime.textContent = isAsap ? 'Как можно скорее (40-60 мин)' : ((dateEl ? dateEl.value : 'Сегодня') + ', ' + (timeSlotEl ? timeSlotEl.value : ''));
            }
            if (succPayment) {
              var payLabels = {
                card_online: 'Картой онлайн / перевод (Сбер, ПСБ, Тинькофф)',
                sbp: 'СБП (по QR-коду)',
                cash: 'Наличными при получении'
              };
              succPayment.textContent = payLabels[currentPaymentMethod] || 'Онлайн оплата';
            }
            if (succTotal) succTotal.textContent = finalTotal.toLocaleString('ru-RU') + ' ₽';

            // Show Success View
            if (checkoutMainGrid) checkoutMainGrid.style.display = 'none';
            if (checkoutSuccessView) checkoutSuccessView.style.display = 'block';

            // Stepper: Step 3 completed
            var s1 = document.getElementById('co-step-1');
            var s2 = document.getElementById('co-step-2');
            var s3 = document.getElementById('co-step-3');
            if (s1) s1.className = 'co-step-item completed';
            if (s2) s2.className = 'co-step-item completed';
            if (s3) s3.className = 'co-step-item active';

            cart = [];
            promoDiscountPercent = 0;
            saveCart();
            updateCartUI();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }

        var btnCoReturnCatalog = document.getElementById('btn-co-return-catalog');
        if (btnCoReturnCatalog) {
          btnCoReturnCatalog.addEventListener('click', function() {
            closeCheckoutPage();
            navigateToView('catalog', 'Цветы');
          });
        }

        if (btnCoReturnHome) {
          btnCoReturnHome.addEventListener('click', function() {
            closeCheckoutPage();
            navigateToView('home');
          });
        }

        // --- 4. Long Semi-Transparent Search Bar with Instant Live Search ---
        var mainSearchInput = document.getElementById('main-search-input');
        var btnSearchClear = document.getElementById('btn-search-clear');
        var searchLiveResults = document.getElementById('search-live-results');

        function escapeHtml(str) {
          if (!str) return '';
          return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        }

        function hideSearchResults() {
          if (searchLiveResults) {
            searchLiveResults.style.display = 'none';
            searchLiveResults.innerHTML = '';
          }
        }

        function openSearchOverlay() {
          if (!searchOverlay) return;
          searchOverlay.classList.add('active');
          lockBodyScroll(true);
          if (mainSearchInput) {
            setTimeout(function() {
              try {
                mainSearchInput.focus({ preventScroll: true });
              } catch (e) {
                mainSearchInput.focus();
              }
            }, 60);
          }
        }

        function closeSearchOverlay() {
          if (searchOverlay) searchOverlay.classList.remove('active');
          hideSearchResults();
          lockBodyScroll(false);
        }

        function handleLiveSearch(query) {
          if (!searchLiveResults) return;
          var q = (query || '').trim().toLowerCase();

          if (btnSearchClear) {
            btnSearchClear.style.display = q ? 'block' : 'none';
          }

          if (q.length < 2) {
            hideSearchResults();
            return;
          }

          var matches = productsData.filter(function(p) {
            var title = (p.title || '').toLowerCase();
            var cat = (p.category || '').toLowerCase();
            var sub = (p.subCategory || '').toLowerCase();
            return title.indexOf(q) !== -1 || cat.indexOf(q) !== -1 || sub.indexOf(q) !== -1;
          });

          if (matches.length === 0) {
            searchLiveResults.innerHTML = '<div class="search-live-empty">По запросу «' + escapeHtml(query) + '» ничего не найдено</div>';
            searchLiveResults.style.display = 'block';
            return;
          }

          var topMatches = matches.slice(0, 6);
          var html = '<div class="search-live-list">';
          topMatches.forEach(function(item) {
            html += '<div class="search-live-item" data-id="' + item.id + '" data-title="' + escapeHtml(item.title) + '">' +
              '<img src="' + item.image + '" alt="' + escapeHtml(item.title) + '" class="search-live-thumb" />' +
              '<div class="search-live-info">' +
                '<div class="search-live-title">' + escapeHtml(item.title) + '</div>' +
                '<div class="search-live-meta">' + (item.subCategory || item.category || 'Цветы') + '</div>' +
              '</div>' +
              '<div class="search-live-price">' + (typeof item.price === 'number' ? item.price.toLocaleString('ru-RU') + ' ₽' : item.price) + '</div>' +
            '</div>';
          });
          html += '</div>';

          if (matches.length > 6) {
            html += '<div class="search-live-more-btn" id="btn-search-show-all">Показать все результаты (' + matches.length + ') →</div>';
          }

          searchLiveResults.innerHTML = html;
          searchLiveResults.style.display = 'block';

          // Click on item in search dropdown
          searchLiveResults.querySelectorAll('.search-live-item').forEach(function(row) {
            row.addEventListener('click', function(e) {
              e.stopPropagation();
              var title = row.getAttribute('data-title');
              var id = parseInt(row.getAttribute('data-id'), 10);
              closeSearchOverlay();
              if (id) {
                openProductModal(id);
              } else if (title) {
                navigateToView('catalog', 'all', title);
              }
            });
          });

          var btnShowAll = document.getElementById('btn-search-show-all');
          if (btnShowAll) {
            btnShowAll.addEventListener('click', function() {
              closeSearchOverlay();
              navigateToView('catalog', 'all', query);
            });
          }
        }

        if (mainSearchInput) {
          mainSearchInput.addEventListener('input', function() {
            handleLiveSearch(mainSearchInput.value);
          });

          mainSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
              var q = mainSearchInput.value.trim();
              if (q) {
                closeSearchOverlay();
                navigateToView('catalog', 'all', q);
              }
            } else if (e.key === 'Escape') {
              closeSearchOverlay();
            }
          });

          mainSearchInput.addEventListener('focus', function() {
            if (mainSearchInput.value.trim().length >= 2) {
              handleLiveSearch(mainSearchInput.value);
            }
          });
        }

        // Search Modal Overlay Handlers
        var searchOverlay = document.getElementById('header-search-overlay');
        var btnSearchTrigger = document.getElementById('btn-search-trigger');
        var btnSearchModalClose = document.getElementById('btn-search-modal-close');

        if (btnSearchTrigger) {
          btnSearchTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            openSearchOverlay();
          });
        }

        if (btnSearchModalClose) {
          btnSearchModalClose.addEventListener('click', function() {
            closeSearchOverlay();
          });
        }

        if (searchOverlay) {
          searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
              closeSearchOverlay();
            }
          });
        }

        if (btnSearchClear) {
          btnSearchClear.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mainSearchInput) {
              mainSearchInput.value = '';
              mainSearchInput.focus();
            }
            hideSearchResults();
            btnSearchClear.style.display = 'none';
          });
        }

        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            hideSearchResults();
          }
        });

        // --- Header Transparency on Scroll (Optimized 60fps with rAF) ---
        var siteHeader = document.querySelector('.cvetov-header') || document.querySelector('.header');
        var isHeaderScrolled = false;
        var scrollTickActive = false;

        function onWindowScroll() {
          if (!scrollTickActive) {
            window.requestAnimationFrame(function() {
              var shouldBeScrolled = window.scrollY > 20;
              if (shouldBeScrolled !== isHeaderScrolled) {
                isHeaderScrolled = shouldBeScrolled;
                if (!siteHeader) siteHeader = document.querySelector('.cvetov-header') || document.querySelector('.header');
                if (siteHeader) {
                  if (isHeaderScrolled) {
                    siteHeader.classList.add('is-scrolled');
                  } else {
                    siteHeader.classList.remove('is-scrolled');
                  }
                }
              }
              updateHeroScrollDim();
              scrollTickActive = false;
            });
            scrollTickActive = true;
          }
        }

        var heroDimOverlay = document.getElementById('hero-scroll-dim-overlay');
        function updateHeroScrollDim() {
          if (!heroDimOverlay) return;
          if (window.innerWidth > 768) {
            heroDimOverlay.style.opacity = '0';
            return;
          }
          var sy = window.scrollY || window.pageYOffset || 0;
          if (sy <= 4) {
            heroDimOverlay.style.opacity = '0';
          } else {
            var progress = Math.min(1, sy / 220);
            heroDimOverlay.style.opacity = (progress * 0.94).toFixed(2);
          }
        }

        window.addEventListener('scroll', onWindowScroll, { passive: true });
        window.addEventListener('resize', updateHeroScrollDim);
        onWindowScroll();

        // Instant tactile touch feedback on mobile
        document.addEventListener('touchstart', function(e) {
          var target = e.target.closest('.hub-cell, .hub-cell__more-btn, .hub-card__header, .ribbon-btn, .bestsellers-tab-btn, .btn-primary, .btn-secondary, .modal-btn-cart, .modal-btn-buynow, .modal-size-chip, .modal-btn-fav, .mobile-nav-item, .bestseller-card, .product-card, .btn-buy, .header-icon-btn');
          if (target) {
            target.classList.add('touch-active');
          }
        }, { passive: true });

        document.addEventListener('touchend', function() {
          document.querySelectorAll('.touch-active').forEach(function(el) {
            el.classList.remove('touch-active');
          });
        }, { passive: true });

        document.addEventListener('touchcancel', function() {
          document.querySelectorAll('.touch-active').forEach(function(el) {
            el.classList.remove('touch-active');
          });
        }, { passive: true });

        // --- 5. Hub Panels & Bestsellers Navigation ---
        var hubTrack = document.getElementById('category-hub-track');
        var btnHubPrev = document.getElementById('btn-hub-prev');
        var btnHubNext = document.getElementById('btn-hub-next');

        function updateHubArrowStates() {
          if (!hubTrack || !btnHubPrev || !btnHubNext) return;
          var maxScroll = hubTrack.scrollWidth - hubTrack.clientWidth;
          btnHubPrev.style.opacity = hubTrack.scrollLeft <= 8 ? '0.35' : '1';
          btnHubPrev.style.cursor = hubTrack.scrollLeft <= 8 ? 'default' : 'pointer';
          btnHubNext.style.opacity = hubTrack.scrollLeft >= maxScroll - 8 ? '0.35' : '1';
          btnHubNext.style.cursor = hubTrack.scrollLeft >= maxScroll - 8 ? 'default' : 'pointer';
        }

        function scrollTrackToCard(trackEl, direction) {
          if (!trackEl) return;
          var cards = Array.from(trackEl.children).filter(function(el) {
            return el.nodeType === 1 && (el.offsetWidth > 0);
          });
          if (cards.length === 0) return;

          var maxScroll = Math.max(0, trackEl.scrollWidth - trackEl.clientWidth);
          if (maxScroll <= 0) return;

          var current = (typeof trackEl._targetScroll === 'number' && !trackEl._manualScroll) ? trackEl._targetScroll : trackEl.scrollLeft;
          trackEl._manualScroll = false;

          var cardStep = cards[0].offsetWidth + (cards.length > 1 ? Math.max(12, cards[1].offsetLeft - cards[0].offsetLeft - cards[0].offsetWidth) : 18);
          var target = current;

          if (direction > 0) {
            for (var i = 0; i < cards.length; i++) {
              var left = cards[i].offsetLeft;
              if (left > current + 15) {
                target = left;
                break;
              }
            }
            if (target === current) {
              target = Math.min(maxScroll, current + cardStep);
            }
          } else {
            for (var i = cards.length - 1; i >= 0; i--) {
              var left = cards[i].offsetLeft;
              if (left < current - 15) {
                target = left;
                break;
              }
            }
            if (target === current) {
              target = Math.max(0, current - cardStep);
            }
          }

          target = Math.max(0, Math.min(maxScroll, target));
          trackEl._targetScroll = target;
          trackEl.scrollTo({ left: target, behavior: 'smooth' });

          clearTimeout(trackEl._scrollTimer);
          trackEl._scrollTimer = setTimeout(function() {
            trackEl._targetScroll = trackEl.scrollLeft;
          }, 500);
        }

        if (hubTrack && btnHubPrev && btnHubNext) {
          btnHubPrev.addEventListener('click', function(e) {
            e.preventDefault();
            scrollTrackToCard(hubTrack, -1);
          });
          btnHubNext.addEventListener('click', function(e) {
            e.preventDefault();
            scrollTrackToCard(hubTrack, 1);
          });
          hubTrack.addEventListener('scroll', updateHubArrowStates, { passive: true });
          window.addEventListener('resize', updateHubArrowStates);
          setTimeout(updateHubArrowStates, 100);
        }

        var track = document.getElementById('bestsellers-track');
        var btnPrev = document.getElementById('btn-best-prev');
        var btnNext = document.getElementById('btn-best-next');

        function updateArrowStates() {
          if (!track || !btnPrev || !btnNext) return;
          var maxScroll = track.scrollWidth - track.clientWidth;
          btnPrev.style.opacity = track.scrollLeft <= 8 ? '0.35' : '1';
          btnPrev.style.cursor = track.scrollLeft <= 8 ? 'default' : 'pointer';
          btnNext.style.opacity = track.scrollLeft >= maxScroll - 8 ? '0.35' : '1';
          btnNext.style.cursor = track.scrollLeft >= maxScroll - 8 ? 'default' : 'pointer';
        }

        if (track && btnPrev && btnNext) {
          btnPrev.addEventListener('click', function(e) {
            e.preventDefault();
            scrollTrackToCard(track, -1);
          });
          btnNext.addEventListener('click', function(e) {
            e.preventDefault();
            scrollTrackToCard(track, 1);
          });
          track.addEventListener('scroll', updateArrowStates, { passive: true });
          window.addEventListener('resize', updateArrowStates);
          setTimeout(updateArrowStates, 100);
        }

        // Auto-expand Block 4 textareas so they are tall and have zero scrollbars
        ['co-postcard-text', 'co-order-comment'].forEach(function(id) {
          var ta = document.getElementById(id);
          if (ta) {
            function resizeTa() {
              ta.style.height = 'auto';
              ta.style.height = Math.max(95, ta.scrollHeight) + 'px';
            }
            ta.addEventListener('input', resizeTa);
            setTimeout(resizeTa, 200);
          }
        });

        // Bestsellers Category Tabs
        var bestTabs = document.querySelectorAll('.best-tab');
        var bestCards = document.querySelectorAll('.bestseller-card');

        bestTabs.forEach(function(tab) {
          tab.addEventListener('click', function(e) {
            e.preventDefault();
            bestTabs.forEach(function(t) { t.classList.remove('active'); });
            tab.classList.add('active');
            var cat = tab.getAttribute('data-cat') || 'all';

            bestCards.forEach(function(card) {
              var cardCat = (card.getAttribute('data-category') || '').toLowerCase();
              var allCats = (card.getAttribute('data-all-categories') || '').toLowerCase();
              var cardTitle = ((card.querySelector('.bestseller-card__title') || {}).textContent || '').toLowerCase();

              if (cat === 'all') {
                card.style.display = 'flex';
              } else if (cat.toLowerCase() === 'цветы') {
                var isFlower = cardCat.indexOf('букет') !== -1 || cardCat.indexOf('композиц') !== -1 || allCats.indexOf('букет') !== -1 || allCats.indexOf('композиц') !== -1;
                card.style.display = isFlower ? 'flex' : 'none';
              } else {
                var match = cardCat.indexOf(cat.toLowerCase()) !== -1 ||
                            allCats.indexOf(cat.toLowerCase()) !== -1 ||
                            cardTitle.indexOf(cat.toLowerCase()) !== -1;
                card.style.display = match ? 'flex' : 'none';
              }
            });

            if (track) {
              track.scrollTo({ left: 0, behavior: 'smooth' });
              setTimeout(updateArrowStates, 250);
            }
          });
        });

        // --- 6. CATALOG DYNAMIC RIBBON DATA & GROUPS (ALL FLOWERS CONSOLIDATED, 3D MODELS FOR ALL BUTTONS) ---
        var ribbonGroups = {
          flowers: {
            title: 'Цветы и букеты',
            parentName: 'Цветы и букеты',
            desc: 'Свежие авторские и монобукеты, шляпные коробки, корзины, свадебные и сезонные цветы в Горловке',
            items: [
              { cat: 'Цветы', title: 'Все цветы<br/>(225)', img: './3d/3d_all_flowers.png' },
              { cat: 'Сборные букеты размер M', title: 'Авторские<br/>букеты M', img: './3d/3d_author.png' },
              { cat: 'Монобукеты', title: 'Монобукеты<br/>(розы)', img: './3d/3d_mono.png' },
              { cat: 'Сборные букеты размер S', title: 'Классические<br/>букеты S', img: './3d/3d_classic.png' },
              { cat: 'Сборные букеты размер L', title: 'Большие<br/>букеты L', img: './3d/3d_wow.png' },
              { cat: 'WOW-букеты', title: 'WOW-букеты<br/>101 роза', img: './3d/3d_wow.png' },
              { cat: 'В коробках', title: 'Цветы в<br/>коробках', img: './3d/3d_flower_box.png' },
              { cat: 'В корзинках', title: 'Цветы в<br/>корзинах', img: './3d/3d_basket.png' },
              { cat: 'Букет Невесты', title: 'Свадебные<br/>букеты', img: './3d/3d_wedding.png' },
              { cat: 'Ювелирная флористика', title: 'Ювелирная<br/>флористика', img: './3d/3d_composition.png' },
              { cat: 'С сухоцветами', title: 'Букеты с<br/>сухоцветами', img: './3d/3d_dried.png' },
              { cat: 'Сезонные композиции', title: 'Сезонные<br/>цветы', img: './3d/3d_seasonal.png' },
              { cat: 'Комнатные растения', title: 'Комнатные<br/>растения', img: './3d/3d_plant.png' }
            ]
          },
          decor: {
            title: 'Оформление и декор мероприятий',
            parentName: 'Оформление и декор мероприятий',
            desc: 'Флористическое оформление свадебных арок, президиумов, банкетных залов и фотозон в Горловке',
            items: [
              { cat: 'Оформление и декор мероприятий', title: 'Смотреть<br/>всё (6)', img: './3d/3d_wedding_arch.png' },
              { cat: 'Оформление свадебной арки', title: 'Свадебные<br/>арки', img: './3d/3d_wedding_arch.png' },
              { cat: 'Декор президиума', title: 'Декор залов<br/>и столов', img: './3d/3d_hall_decor.png' },
              { cat: 'Композиции на столы', title: 'Композиции<br/>на столы', img: './3d/3d_basket.png' },
              { cat: 'Оформление фотозоны', title: 'Фотозоны<br/>для событий', img: './3d/3d_photozone.png' }
            ]
          },
          gifts: {
            title: 'Подарки и декор',
            parentName: 'Подарки и декор',
            desc: 'Мягкие игрушки, подарочные боксы, открытки и сувениры к праздникам',
            items: [
              { cat: 'Подарки и декор', title: 'Смотреть<br/>всё (27)', img: './3d/3d_gift_box.png' },
              { cat: 'Мягкие игрушки', title: 'Мягкие<br/>игрушки', img: './3d/3d_toys.png' },
              { cat: 'Подарочные наборы', title: 'Подарочные<br/>наборы', img: './3d/3d_gift_box.png' },
              { cat: 'Сувениры и декор', title: 'Сувениры<br/>и декор', img: './3d/3d_card.png' },
              { cat: 'Открытки', title: 'Дизайнерские<br/>открытки', img: './3d/3d_card.png' }
            ]
          },
          balloons: {
            title: 'Гелиевые шары',
            parentName: 'Гелиевые шары',
            desc: 'Гелиевые шары, наборы, фонтаны и большие коробки с сюрпризом в Горловке',
            items: [
              { cat: 'Гелиевые шары', title: 'Смотреть<br/>всё (4)', img: './3d/3d_balloons_set.png' },
              { cat: 'Наборы шаров', title: 'Наборы и<br/>фонтаны', img: './3d/3d_balloons_set.png' },
              { cat: 'Шары в коробке', title: 'Шары в<br/>коробке', img: './3d/3d_balloons_box.png' },
              { cat: 'Шары с надписями', title: 'Шары с<br/>надписями', img: './3d/3d_balloon_single.png' }
            ]
          },
          all: {
            title: 'Весь каталог товаров',
            parentName: 'Каталог товаров',
            desc: 'Все товары магазина «Цветочный Рай» с быстрой доставкой по Горловке',
            items: [
              { cat: 'all', title: 'Смотреть<br/>всё', img: './3d/3d_all_flowers.png' },
              { cat: 'Цветы', title: 'Цветы и<br/>букеты', img: './3d/3d_all_flowers.png' },
              { cat: 'Оформление и декор мероприятий', title: 'Декор<br/>мероприятий', img: './3d/3d_wedding_arch.png' },
              { cat: 'Подарки и декор', title: 'Подарки и<br/>декор', img: './3d/3d_gift_box.png' },
              { cat: 'Гелиевые шары', title: 'Гелиевые<br/>шары', img: './3d/3d_balloons_set.png' },
              { cat: 'Сборные букеты размер M', title: 'Авторские<br/>букеты', img: './3d/3d_author.png' },
              { cat: 'Монобукеты', title: 'Монобукеты<br/>(розы)', img: './3d/3d_mono.png' },
              { cat: 'В коробках', title: 'В коробках<br/>и корзинах', img: './3d/3d_flower_box.png' },
              { cat: 'Мягкие игрушки', title: 'Мягкие<br/>игрушки', img: './3d/3d_toys.png' },
              { cat: 'Комнатные растения', title: 'Комнатные<br/>растения', img: './3d/3d_plant.png' }
            ]
          }
        };

        function getCategoryGroup(catName) {
          var c = (catName || '').toLowerCase().trim();
          if (!c || c === 'all' || c === 'все товары' || c === 'весь каталог') return 'all';
          if (c.indexOf('оформлен') !== -1 || c.indexOf('мероприят') !== -1 || c.indexOf('арк') !== -1 || c.indexOf('президиум') !== -1 || c.indexOf('фотозон') !== -1) return 'decor';
          if (c.indexOf('подарк') !== -1 || c.indexOf('игрушк') !== -1 || c.indexOf('сувенир') !== -1 || c.indexOf('открытк') !== -1 || c.indexOf('набор') !== -1) return 'gifts';
          if (c.indexOf('шар') !== -1) return 'balloons';
          return 'flowers';
        }

        var currentRenderedGroup = null;
        var pageRibbonTrack = document.getElementById('page-ribbon-track');
        var btnPageRibbonPrev = document.getElementById('btn-page-ribbon-prev');
        var btnPageRibbonNext = document.getElementById('btn-page-ribbon-next');

        function renderRibbonForGroup(groupKey, activeCatClean) {
          if (!pageRibbonTrack) return;
          var groupData = ribbonGroups[groupKey] || ribbonGroups.flowers;

          if (currentRenderedGroup !== groupKey) {
            currentRenderedGroup = groupKey;
            pageRibbonTrack.innerHTML = groupData.items.map(function(item) {
              return '<div class="ribbon-btn" data-cat="' + item.cat + '">' +
                '<span class="ribbon-btn__text">' + item.title + '</span>' +
                '<img src="' + item.img + '" alt="" class="ribbon-btn__img" />' +
              '</div>';
            }).join('');

            pageRibbonTrack.querySelectorAll('.ribbon-btn').forEach(function(btn) {
              btn.addEventListener('click', function(e) {
                e.preventDefault();
                var cat = btn.getAttribute('data-cat') || 'all';
                navigateToView('catalog', cat, pageSearchInput ? pageSearchInput.value : '');
              });
            });

            pageRibbonTrack.scrollLeft = 0;
          }

          pageRibbonTrack.querySelectorAll('.ribbon-btn').forEach(function(btn) {
            var btnCat = (btn.getAttribute('data-cat') || '').toLowerCase().trim();
            if (btnCat === activeCatClean || (activeCatClean === 'all' && btnCat === 'all') || (activeCatClean === 'цветы' && btnCat === 'цветы')) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });

          setTimeout(updateRibbonArrowStates, 60);
        }

        function updateRibbonArrowStates() {
          if (!pageRibbonTrack || !btnPageRibbonPrev || !btnPageRibbonNext) return;
          var maxScroll = pageRibbonTrack.scrollWidth - pageRibbonTrack.clientWidth;
          btnPageRibbonPrev.style.opacity = pageRibbonTrack.scrollLeft <= 8 ? '0.35' : '1';
          btnPageRibbonPrev.style.cursor = pageRibbonTrack.scrollLeft <= 8 ? 'default' : 'pointer';
          btnPageRibbonNext.style.opacity = pageRibbonTrack.scrollLeft >= maxScroll - 8 ? '0.35' : '1';
          btnPageRibbonNext.style.cursor = pageRibbonTrack.scrollLeft >= maxScroll - 8 ? 'default' : 'pointer';
        }

        if (pageRibbonTrack && btnPageRibbonPrev && btnPageRibbonNext) {
          btnPageRibbonPrev.addEventListener('click', function(e) {
            e.preventDefault();
            scrollTrackToCard(pageRibbonTrack, -1);
          });
          btnPageRibbonNext.addEventListener('click', function(e) {
            e.preventDefault();
            scrollTrackToCard(pageRibbonTrack, 1);
          });
          pageRibbonTrack.addEventListener('scroll', updateRibbonArrowStates, { passive: true });
          window.addEventListener('resize', updateRibbonArrowStates);
          setTimeout(updateRibbonArrowStates, 100);
        }



        // --- 7. CATALOG 2-COLUMN FLYOUT LOGIC (1:1 SCREENSHOT MATCH) ---
        var btnCatalog = document.getElementById('btn-catalog');
        var catalogFlyout = document.getElementById('catalog-flyout');
        var catalogFlyoutBackdrop = document.getElementById('catalog-flyout-backdrop');
        var flyoutRightPane = document.getElementById('flyout-right-pane');

        var flyoutSubmenus = {
          'Букеты': [
            { cat: 'Монобукеты', label: 'Монобукеты' },
            { cat: 'Сборные букеты размер S', label: 'Сборные букеты размер S' },
            { cat: 'Сборные букеты размер M', label: 'Сборные букеты размер M' },
            { cat: 'Сборные букеты размер L', label: 'Сборные букеты размер L' },
            { cat: 'WOW-букеты', label: 'WOW-букеты' }
          ],
          'Композиции': [
            { cat: 'В коробках', label: 'В коробках' },
            { cat: 'В корзинках', label: 'В корзинках' },
            { cat: 'С сухоцветами', label: 'С сухоцветами' }
          ],
          'Свадебная флористика': [
            { cat: 'Букет Невесты', label: 'Букет Невесты' },
            { cat: 'Ювелирная флористика', label: 'Ювелирная флористика' }
          ],
          'Оформление и декор мероприятий': [
            { cat: 'Оформление свадебной арки', label: 'Оформление свадебных арок' },
            { cat: 'Декор президиума', label: 'Флористический декор залов' },
            { cat: 'Композиции на столы', label: 'Композиции на гостевые столы' },
            { cat: 'Оформление фотозоны', label: 'Оформление фотозон' },
            { cat: 'Оформление и декор мероприятий', label: 'Смотреть всё оформление' }
          ]
        };

        function renderFlyoutSubmenu(catName) {
          if (!flyoutRightPane) return;
          var subList = flyoutSubmenus[catName];
          if (subList && subList.length > 0) {
            flyoutRightPane.innerHTML = subList.map(function(item) {
              return '<a href="#catalog?cat=' + encodeURIComponent(item.cat) + '" data-cat="' + item.cat + '" class="flyout-sub-item">' + item.label + '</a>';
            }).join('');

            flyoutRightPane.querySelectorAll('.flyout-sub-item').forEach(function(link) {
              link.addEventListener('click', function(e) {
                e.preventDefault();
                var cat = link.getAttribute('data-cat');
                navigateToView('catalog', cat);
              });
            });
          } else {
            flyoutRightPane.innerHTML = '<div class="flyout-empty-hint">Нажмите, чтобы перейти в раздел <strong>«' + catName + '»</strong></div>' +
              '<a href="#catalog?cat=' + encodeURIComponent(catName) + '" data-cat="' + catName + '" class="flyout-sub-item" style="font-weight: 700; color: #8C6A53;">Перейти в ' + catName + ' →</a>';
            
            flyoutRightPane.querySelectorAll('.flyout-sub-item').forEach(function(link) {
              link.addEventListener('click', function(e) {
                e.preventDefault();
                var cat = link.getAttribute('data-cat');
                navigateToView('catalog', cat);
              });
            });
          }
        }

        document.querySelectorAll('.flyout-cat-item').forEach(function(item) {
          item.addEventListener('mouseenter', function() {
            document.querySelectorAll('.flyout-cat-item').forEach(function(i) { i.classList.remove('active'); });
            item.classList.add('active');
            var cat = item.getAttribute('data-cat');
            renderFlyoutSubmenu(cat);
          });

          item.addEventListener('click', function(e) {
            e.preventDefault();
            var cat = item.getAttribute('data-cat');
            navigateToView('catalog', cat);
          });
        });

        function toggleCatalogFlyout() {
          if (!catalogFlyout) return;
          var isOpen = catalogFlyout.classList.contains('is-open');
          if (isOpen) { closeCatalogFlyout(); } else { openCatalogFlyout(); }
        }

        function openCatalogFlyout() {
          if (!catalogFlyout) return;
          catalogFlyout.classList.add('is-open');
          if (catalogFlyoutBackdrop) catalogFlyoutBackdrop.classList.add('is-open');
        }

        function closeCatalogFlyout() {
          if (!catalogFlyout) return;
          catalogFlyout.classList.remove('is-open');
          if (catalogFlyoutBackdrop) catalogFlyoutBackdrop.classList.remove('is-open');
        }

        if (btnCatalog) {
          btnCatalog.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleCatalogFlyout();
          });
        }

        if (catalogFlyoutBackdrop) catalogFlyoutBackdrop.addEventListener('click', closeCatalogFlyout);

        // --- 8. DEDICATED CATALOG PAGE VIEW & SPA ROUTING ---
        var homeView = document.getElementById('home-view');
        var catalogView = document.getElementById('catalog-view');
        var pageCatalogGrid = document.getElementById('catalog-page-grid');
        var pageCards = pageCatalogGrid ? pageCatalogGrid.querySelectorAll('.product-card') : [];
        var pageSearchInput = document.getElementById('page-catalog-search-input');
        var btnPageSearchClear = document.getElementById('btn-page-search-clear');
        var pageCatalogTitle = document.getElementById('catalog-page-title');
        var pageCatalogDesc = document.getElementById('catalog-page-desc');
        var pageCatalogCount = document.getElementById('catalog-page-count');
        var btnCrumbParent = document.getElementById('btn-crumb-parent');
        var crumbSep2 = document.getElementById('crumb-sep-2');
        var breadcrumbCategory = document.getElementById('breadcrumb-category');
        var btnReturnHome = document.getElementById('btn-return-home');
        var btnCrumbHome = document.getElementById('btn-crumb-home');
        var btnLogoLink = document.getElementById('logo-link');
        var catalogEmptyState = document.getElementById('catalog-empty-state');
        var btnResetFilter = document.getElementById('btn-reset-filter');

        var currentActiveCategory = 'Цветы';

        function navigateToView(viewName, categoryName, searchQuery) {
          closeCatalogFlyout();
          closeCart();
          closeAddressModal();
          closeCheckoutPage();

          if (viewName === 'catalog') {
            if (homeView) homeView.style.display = 'none';
            if (catalogView) catalogView.style.display = 'block';

            currentActiveCategory = categoryName || 'Цветы';

            if (searchQuery !== undefined && pageSearchInput) {
              pageSearchInput.value = searchQuery;
            }

            filterPageCatalog(currentActiveCategory, pageSearchInput ? pageSearchInput.value : '');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            setMobNavActive(mobNavCatalog);

            var newHash = '#catalog';
            if (currentActiveCategory !== 'all') {
              newHash += '?cat=' + encodeURIComponent(currentActiveCategory);
            }
            if (window.location.hash !== newHash) {
              history.pushState(null, '', newHash);
            }
          } else {
            if (homeView) homeView.style.display = 'block';
            if (catalogView) catalogView.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });

            setMobNavActive(mobNavHome);

            if (window.location.hash && window.location.hash !== '#home' && window.location.hash !== '') {
              history.pushState(null, '', '#');
            }
          }
        }

        function filterPageCatalog(categoryName, query) {
          currentActiveCategory = categoryName || 'Цветы';
          var cleanCat = currentActiveCategory.toLowerCase().trim();
          var q = (query || '').toLowerCase().trim();
          var groupKey = getCategoryGroup(currentActiveCategory);
          var groupInfo = ribbonGroups[groupKey] || ribbonGroups.flowers;

          if (btnPageSearchClear) {
            btnPageSearchClear.style.display = q ? 'block' : 'none';
          }

          renderRibbonForGroup(groupKey, cleanCat);

          var isFlowersMaster = cleanCat === 'цветы' || cleanCat === 'все цветы' || cleanCat === 'цветы и букеты' || cleanCat === 'букеты';

          var visibleCount = 0;

          pageCards.forEach(function(card) {
            var cat = (card.getAttribute('data-category') || '').toLowerCase();
            var allCats = (card.getAttribute('data-all-categories') || '').toLowerCase();
            var title = (card.querySelector('.product-card__title') || {}).textContent || '';
            var titleLower = title.toLowerCase();

            var catMatch = false;
            if (cleanCat === 'all' || cleanCat === 'все товары' || cleanCat === 'весь каталог') {
              catMatch = true;
            } else if (isFlowersMaster) {
              catMatch = cat.indexOf('букет') !== -1 || cat.indexOf('композиц') !== -1 || allCats.indexOf('букет') !== -1 || 
                         allCats.indexOf('композиц') !== -1 || cat.indexOf('свадеб') !== -1 || allCats.indexOf('свадеб') !== -1 ||
                         cat.indexOf('растен') !== -1 || allCats.indexOf('растен') !== -1 || cat.indexOf('сезон') !== -1 || allCats.indexOf('сезон') !== -1 ||
                         cat.indexOf('моно') !== -1 || cat.indexOf('wow') !== -1 || cat.indexOf('сухоцвет') !== -1;
            } else if (cleanCat === 'оформление и декор мероприятий' || cleanCat.indexOf('декор мероприят') !== -1) {
              catMatch = cat.indexOf('оформлен') !== -1 || allCats.indexOf('оформлен') !== -1 || titleLower.indexOf('арк') !== -1 || titleLower.indexOf('президиум') !== -1 || titleLower.indexOf('фотозон') !== -1;
            } else if (cleanCat === 'подарки и декор' || cleanCat === 'подарки') {
              catMatch = (cat.indexOf('подарк') !== -1 || allCats.indexOf('подарк') !== -1) && cat.indexOf('растен') === -1;
            } else if (cleanCat === 'гелиевые шары' || cleanCat.indexOf('шар') !== -1) {
              catMatch = cat.indexOf('шар') !== -1 || allCats.indexOf('шар') !== -1;
            } else if (cleanCat === 'комнатные растения' || cleanCat.indexOf('растен') !== -1) {
              catMatch = cat.indexOf('растен') !== -1 || allCats.indexOf('растен') !== -1;
            } else if (cleanCat === 'сезонные композиции' || cleanCat.indexOf('сезон') !== -1) {
              catMatch = cat.indexOf('сезон') !== -1 || allCats.indexOf('сезон') !== -1;
            } else if (cleanCat.indexOf('в коробках') !== -1) {
              catMatch = cat.indexOf('коробк') !== -1 || allCats.indexOf('коробк') !== -1 || titleLower.indexOf('коробк') !== -1;
            } else if (cleanCat.indexOf('в корзинках') !== -1 || cleanCat.indexOf('корзин') !== -1) {
              catMatch = cat.indexOf('корзин') !== -1 || allCats.indexOf('корзин') !== -1 || titleLower.indexOf('корзин') !== -1;
            } else if (cleanCat.indexOf('игрушк') !== -1) {
              catMatch = titleLower.indexOf('мишка') !== -1 || titleLower.indexOf('зайка') !== -1 || titleLower.indexOf('гном') !== -1 || titleLower.indexOf('кукла') !== -1;
            } else {
              catMatch = cat.indexOf(cleanCat) !== -1 || allCats.indexOf(cleanCat) !== -1 || titleLower.indexOf(cleanCat) !== -1;
            }

            var qMatch = !q || titleLower.indexOf(q) !== -1 || cat.indexOf(q) !== -1 || allCats.indexOf(q) !== -1;

            if (catMatch && qMatch) {
              card.style.display = 'flex';
              visibleCount++;
            } else {
              card.style.display = 'none';
            }
          });

          var displayCatName = currentActiveCategory;
          if (cleanCat === 'all' || cleanCat === 'все товары' || cleanCat === 'весь каталог') {
            displayCatName = 'Весь каталог цветов и подарков';
          } else if (isFlowersMaster) {
            displayCatName = 'Цветы и букеты';
          }

          if (pageCatalogTitle) pageCatalogTitle.textContent = displayCatName;
          if (pageCatalogDesc) pageCatalogDesc.textContent = groupInfo.desc;
          if (pageCatalogCount) pageCatalogCount.textContent = visibleCount + ' ' + getPluralGoods(visibleCount);

          if (btnCrumbParent && crumbSep2 && breadcrumbCategory) {
            if (groupKey !== 'all' && currentActiveCategory !== groupInfo.title) {
              btnCrumbParent.style.display = 'inline';
              btnCrumbParent.textContent = groupInfo.title;
              btnCrumbParent.setAttribute('data-parent-cat', groupInfo.items[0].cat);
              crumbSep2.style.display = 'inline';
              breadcrumbCategory.textContent = displayCatName;
            } else {
              btnCrumbParent.style.display = 'none';
              crumbSep2.style.display = 'none';
              breadcrumbCategory.textContent = displayCatName;
            }
          }

          if (catalogEmptyState) catalogEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
          if (pageCatalogGrid) pageCatalogGrid.style.display = visibleCount === 0 ? 'none' : 'grid';
        }

        if (btnCrumbParent) {
          btnCrumbParent.addEventListener('click', function(e) {
            e.preventDefault();
            var parentCat = btnCrumbParent.getAttribute('data-parent-cat') || 'Цветы';
            navigateToView('catalog', parentCat);
          });
        }

        var btnFlyoutAll = document.getElementById('btn-flyout-all');
        if (btnFlyoutAll) {
          btnFlyoutAll.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToView('catalog', 'all');
          });
        }

        document.querySelectorAll('.hub-card__header, .hub-cell, .hub-cell__more-btn').forEach(function(el) {
          el.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var cat = el.getAttribute('data-cat') || 'Цветы';
            navigateToView('catalog', cat);
          });
        });

        var btnHeroAction = document.getElementById('btn-hero-action');
        if (btnHeroAction) {
          btnHeroAction.addEventListener('click', function(e) {
            e.preventDefault();
            if (catalogView && catalogView.style.display === 'block') {
              navigateToView('home');
            }
            var hub = document.getElementById('category-hub-section');
            if (hub) {
              hub.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }
          });
        }

        var btnBestsellersCatalog = document.getElementById('btn-bestsellers-catalog');
        if (btnBestsellersCatalog) {
          btnBestsellersCatalog.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToView('catalog', 'all');
          });
        }

        if (btnReturnHome) btnReturnHome.addEventListener('click', function() { navigateToView('home'); });
        if (btnCrumbHome) btnCrumbHome.addEventListener('click', function(e) { e.preventDefault(); navigateToView('home'); });
        if (btnLogoLink) btnLogoLink.addEventListener('click', function(e) { e.preventDefault(); navigateToView('home'); });

        if (btnResetFilter) {
          btnResetFilter.addEventListener('click', function() {
            if (pageSearchInput) pageSearchInput.value = '';
            navigateToView('catalog', 'all');
          });
        }

        if (pageSearchInput) {
          pageSearchInput.addEventListener('input', function(e) {
            filterPageCatalog(currentActiveCategory, e.target.value);
          });
        }

        if (btnPageSearchClear) {
          btnPageSearchClear.addEventListener('click', function() {
            if (pageSearchInput) {
              pageSearchInput.value = '';
              pageSearchInput.focus();
              filterPageCatalog(currentActiveCategory, '');
            }
          });
        }

        var sortChips = document.querySelectorAll('#page-sort-group .sort-chip');
        sortChips.forEach(function(chip) {
          chip.addEventListener('click', function() {
            sortChips.forEach(function(c) { c.classList.remove('active'); });
            chip.classList.add('active');
            var sortType = chip.getAttribute('data-sort');
            var cardsArray = Array.prototype.slice.call(pageCards);

            cardsArray.sort(function(a, b) {
              var priceA = parseFloat(a.getAttribute('data-price')) || 0;
              var priceB = parseFloat(b.getAttribute('data-price')) || 0;
              var ratingA = parseFloat(a.getAttribute('data-rating')) || 0;
              var ratingB = parseFloat(b.getAttribute('data-rating')) || 0;
              var revA = parseInt(a.getAttribute('data-reviews'), 10) || 0;
              var revB = parseInt(b.getAttribute('data-reviews'), 10) || 0;

              if (sortType === 'price-asc') return priceA - priceB;
              if (sortType === 'price-desc') return priceB - priceA;
              if (sortType === 'rating') return ratingB - ratingA;
              return revB - revA;
            });

            cardsArray.forEach(function(card) {
              if (pageCatalogGrid) pageCatalogGrid.appendChild(card);
            });
          });
        });

        // Unified Escape Key Handler
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            if (productModalWrap && productModalWrap.style.display !== 'none') {
              closeProductModal();
            } else if (searchOverlay && searchOverlay.classList.contains('active')) {
              closeSearchOverlay();
            } else if (catalogFlyout && catalogFlyout.classList.contains('is-open')) {
              closeCatalogFlyout();
            } else if (addressModal && addressModal.classList.contains('is-open')) {
              closeAddressModal();
            } else if (cartDrawerWrap && cartDrawerWrap.classList.contains('is-open')) {
              closeCart();
            } else if (favDrawerWrap && favDrawerWrap.classList.contains('is-open')) {
              closeFavoritesDrawer();
            }
          }
        });

        // --- 9. Mobile Navigation ---
        var mobNavHome = document.getElementById('mob-nav-home');
        var mobNavCatalog = document.getElementById('mob-nav-catalog');
        var mobNavSearch = document.getElementById('mob-nav-search');
        var mobNavFav = document.getElementById('mob-nav-fav');
        var mobNavCart = document.getElementById('mob-nav-cart');

        function setMobNavActive(activeBtn) {
          document.querySelectorAll('.mobile-nav-item').forEach(function(item) { item.classList.remove('active'); });
          if (activeBtn) activeBtn.classList.add('active');
        }

        if (mobNavHome) {
          mobNavHome.addEventListener('click', function() {
            closeCheckoutPage();
            closeFavoritesDrawer();
            closeCart();
            navigateToView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobNavActive(mobNavHome);
          });
        }

        if (mobNavCatalog) {
          mobNavCatalog.addEventListener('click', function() {
            closeCheckoutPage();
            closeFavoritesDrawer();
            closeCart();
            navigateToView('catalog', 'Цветы');
            var hub = document.getElementById('category-hub-section');
            if (hub) hub.scrollIntoView({ behavior: 'smooth' });
            setMobNavActive(mobNavCatalog);
          });
        }

        if (mobNavSearch) {
          mobNavSearch.addEventListener('click', function(e) {
            e.stopPropagation();
            openSearchOverlay();
          });
        }

        if (mobNavFav) {
          mobNavFav.addEventListener('click', function() {
            closeCatalogFlyout();
            closeAddressModal();
            openFavoritesDrawer();
          });
        }

        if (mobNavCart) {
          mobNavCart.addEventListener('click', function() {
            closeCatalogFlyout();
            closeAddressModal();
            openCart();
          });
        }

        function parseHashRoute() {
          var hash = window.location.hash;
          if (hash.indexOf('#checkout') === 0) {
            openCheckoutPage();
          } else if (hash.indexOf('#catalog') === 0) {
            closeCheckoutPage();
            var cat = 'Цветы';
            var queryMatch = hash.match(/cat=([^&]+)/);
            if (queryMatch) cat = decodeURIComponent(queryMatch[1]);
            navigateToView('catalog', cat);
          } else {
            closeCheckoutPage();
            navigateToView('home');
          }
        }

        window.addEventListener('hashchange', parseHashRoute);
        window.addEventListener('popstate', parseHashRoute);

        updateCartUI();

        if (window.location.hash.indexOf('#checkout') === 0) {
          openCheckoutPage();
        } else if (window.location.hash.indexOf('#catalog') === 0) {
          parseHashRoute();
        }

        window.navigateToView = navigateToView;
        window.openCart = openCart;
        window.closeCart = closeCart;
        window.openCheckoutPage = openCheckoutPage;
        window.closeCheckoutPage = closeCheckoutPage;
        window.openAddressModal = openAddressModal;
        window.closeAddressModal = closeAddressModal;
      })();
    </script>
  </body>
</html>
`;

fs.writeFileSync('./index.html', indexHtml, 'utf8');
console.log('Successfully updated index.html with dedicated 3D decor icons and larger hub panels!');

