import { products } from './productsData.js';

const bestsellers = products.filter(p => p.isBestseller);
let modalActiveCategory = 'all';
let modalCurrentProducts = [...products];

// Category synonyms mapping
const categoryMapping = {
  'букеты': ['Букеты', 'Монобукеты', 'Сборные букеты размер S', 'Сборные букеты размер M', 'Сборные букеты размер L', 'WOW-букеты', 'Букет Невесты'],
  'все букеты': ['Букеты', 'Монобукеты', 'Сборные букеты размер S', 'Сборные букеты размер M', 'Сборные букеты размер L', 'WOW-букеты'],
  'монобукеты': ['Монобукеты'],
  'сборные букеты': ['Сборные букеты размер S', 'Сборные букеты размер M', 'Сборные букеты размер L'],
  'сборные букеты размер s': ['Сборные букеты размер S'],
  'сборные букеты размер m': ['Сборные букеты размер M'],
  'сборные букеты размер l': ['Сборные букеты размер L'],
  'wow-букеты': ['WOW-букеты'],
  'композиции': ['Композиции', 'В корзинках', 'С сухоцветами', 'Сезонные композиции'],
  'в коробках': ['Композиции', 'Сезонные композиции'],
  'в корзинках': ['В корзинках'],
  'с сухоцветами': ['С сухоцветами'],
  'подарки и декор': ['Подарки и декор'],
  'гелиевые шары': ['Гелиевые шары'],
  'свадебная флористика': ['Свадебная флористика', 'Букет Невесты', 'Ювелирная флористика'],
  'букет невесты': ['Букет Невесты', 'Свадебная флористика'],
  'ювелирная флористика': ['Ювелирная флористика'],
  'оформление мероприятий': ['Подарки и декор', 'Свадебная флористика'],
  'оформление и декор мероприятий': ['Подарки и декор', 'Свадебная флористика'],
  'комнатные растения': ['Комнатные растения'],
  'сезонные композиции': ['Сезонные композиции']
};

export function renderModalProducts(list = modalCurrentProducts) {
  const grid = document.getElementById('modal-product-grid');
  const title = document.getElementById('catalog-modal-title');
  const subtitle = document.getElementById('catalog-modal-subtitle');
  
  if (title) {
    title.textContent = modalActiveCategory === 'all' 
      ? `Все товары (${list.length})` 
      : `${modalActiveCategory} (${list.length})`;
  }
  if (subtitle) {
    subtitle.textContent = list.length === 1 
      ? 'Найден 1 товар' 
      : `Найдено ${list.length} товаров с быстрой доставкой`;
  }
  
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #1C130F; border: 1px solid #4D3328; border-radius: 16px; color: #9E918A;">
        <p style="font-size: 20px; font-weight: 600; color: #EAE3DE; margin-bottom: 8px;">Товары не найдены</p>
        <p style="font-size: 14px;">Попробуйте выбрать другую категорию или изменить поисковый запрос</p>
        <button id="btn-modal-reset" style="margin-top: 16px; padding: 10px 20px; background: linear-gradient(135deg, #E6BC7E 0%, #CE9B4E 100%); color: #140C07; font-weight: 700; border-radius: 8px; border: none; cursor: pointer;">Показать все товары (254)</button>
      </div>
    `;
    const resetBtn = document.getElementById('btn-modal-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => filterModalCategory('all'));
    }
    return;
  }

  grid.innerHTML = list.map(prod => `
    <article class="product-card" data-id="${prod.id}">
      ${prod.badge ? `<span class="badge">${prod.badge}</span>` : ''}
      <img class="product-card__image" src="${prod.image}" alt="${prod.title}" loading="lazy" />
      <div class="product-card__info">
        <div class="product-card__price">${prod.price}</div>
        <h3 class="product-card__title" title="${prod.title}">${prod.title}</h3>
        <div class="product-card__meta">
          <span style="color: #E2B572; font-weight: 600;">★ ${prod.rating}</span>
          <span>(${prod.reviews})</span>
          <span>•</span>
          <span>${prod.delivery}</span>
        </div>
      </div>
    </article>
  `).join('');
}

export function openCatalog(category = 'all', searchQuery = '') {
  const modal = document.getElementById('catalog-modal');
  if (!modal) return;

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  const modalSearch = document.getElementById('modal-search-input');
  if (modalSearch) {
    modalSearch.value = searchQuery;
  }

  filterModalCategory(category, searchQuery);
}

export function closeCatalog() {
  const modal = document.getElementById('catalog-modal');
  if (!modal) return;

  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

export function filterModalCategory(categoryName, searchQuery = '') {
  modalActiveCategory = categoryName || 'all';

  if (!categoryName || categoryName === 'all' || categoryName === 'Все товары') {
    modalActiveCategory = 'all';
    modalCurrentProducts = [...products];
  } else {
    const cleanKey = categoryName.toLowerCase().replace(/^[^\wа-яё]+/i, '').trim();
    const mappedTargets = categoryMapping[cleanKey];

    if (mappedTargets && mappedTargets.length > 0) {
      modalCurrentProducts = products.filter(p => {
        const prodCat = p.category;
        const allCats = p.allCategories || [];
        return mappedTargets.some(target => 
          prodCat === target || 
          allCats.includes(target) || 
          (target === 'В коробках' && (p.title.toLowerCase().includes('коробк') || prodCat === 'Композиции')) ||
          p.title.toLowerCase().includes(target.toLowerCase())
        );
      });
    } else {
      modalCurrentProducts = products.filter(p => {
        const catMatch = p.category && p.category.toLowerCase().includes(cleanKey);
        const allCatMatch = p.allCategories && p.allCategories.some(c => c.toLowerCase().includes(cleanKey));
        const titleMatch = p.title && p.title.toLowerCase().includes(cleanKey);
        return catMatch || allCatMatch || titleMatch;
      });
    }
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    modalCurrentProducts = modalCurrentProducts.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Update active state in sidebar
  document.querySelectorAll('.sidebar-cat-item').forEach(item => {
    const cat = item.getAttribute('data-cat');
    if (cat && (cat.toLowerCase() === modalActiveCategory.toLowerCase() || (modalActiveCategory === 'all' && cat === 'all'))) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  renderModalProducts(modalCurrentProducts);
}

function initApp() {
  // Bestsellers Carousel Scroll Buttons
  const track = document.getElementById('bestsellers-track');
  const btnPrev = document.getElementById('btn-best-prev');
  const btnNext = document.getElementById('btn-best-next');

  if (track && btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      track.scrollBy({ left: -480, behavior: 'smooth' });
    });
    btnNext.addEventListener('click', () => {
      track.scrollBy({ left: 480, behavior: 'smooth' });
    });
  }

  // Header Transparency on Scroll (Optimized 60fps)
  const header = document.querySelector('.cvetov-header') || document.querySelector('.header');
  let isHeaderScrolled = false;
  let scrollTick = false;
  const updateHeaderScroll = () => {
    if (!scrollTick) {
      window.requestAnimationFrame(() => {
        const shouldBeScrolled = window.scrollY > 20;
        if (shouldBeScrolled !== isHeaderScrolled) {
          isHeaderScrolled = shouldBeScrolled;
          if (header) {
            if (isHeaderScrolled) {
              header.classList.add('is-scrolled');
            } else {
              header.classList.remove('is-scrolled');
            }
          }
        }
        scrollTick = false;
      });
      scrollTick = true;
    }
  };
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // Open Catalog Triggers
  const catalogBtn = document.getElementById('btn-catalog');
  const heroCatalogBtn = document.getElementById('btn-hero-catalog');
  
  if (catalogBtn) {
    catalogBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCatalog('all');
    });
  }

  if (heroCatalogBtn) {
    heroCatalogBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCatalog('all');
    });
  }

  // Header Dropdown links open catalog with that category
  document.querySelectorAll('#catalog-dropdown a[data-cat], #catalog-dropdown .catalog-item[data-target]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const cat = el.getAttribute('data-cat') || el.querySelector('.cat-title')?.textContent?.trim() || 'all';
      openCatalog(cat);
    });
  });

  // Icon Categories click opens catalog
  document.querySelectorAll('.icon-category[data-cat]').forEach(el => {
    el.addEventListener('click', () => {
      const cat = el.getAttribute('data-cat') || el.querySelector('span')?.textContent?.trim() || 'all';
      openCatalog(cat);
    });
  });

  // Main Search Input
  const searchBtn = document.getElementById('btn-search-toggle');
  const searchInput = document.getElementById('main-search-input');
  
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (searchInput.style.display === 'block') {
        if (searchInput.value.trim()) {
          openCatalog('all', searchInput.value.trim());
        } else {
          searchInput.style.display = 'none';
        }
      } else {
        searchInput.style.display = 'block';
        searchInput.focus();
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        openCatalog('all', searchInput.value.trim());
      }
    });
  }

  // Modal Close Triggers
  const btnClose = document.getElementById('btn-close-catalog');
  const backdrop = document.getElementById('catalog-modal-backdrop');

  if (btnClose) btnClose.addEventListener('click', closeCatalog);
  if (backdrop) backdrop.addEventListener('click', closeCatalog);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCatalog();
    }
  });

  // Modal Sidebar Category Clicks
  document.querySelectorAll('.sidebar-cat-item').forEach(item => {
    item.addEventListener('click', () => {
      const cat = item.getAttribute('data-cat') || 'all';
      filterModalCategory(cat);
    });
  });

  // Modal Live Search
  const modalSearchInput = document.getElementById('modal-search-input');
  if (modalSearchInput) {
    modalSearchInput.addEventListener('input', (e) => {
      filterModalCategory(modalActiveCategory, e.target.value);
    });
  }

  // Modal Sorting Buttons
  const sortBtns = document.querySelectorAll('.modal-sort-btn');
  sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sortBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sortType = btn.getAttribute('data-sort');

      if (sortType === 'popular') {
        modalCurrentProducts.sort((a, b) => b.reviews - a.reviews);
      } else if (sortType === 'price-asc') {
        modalCurrentProducts.sort((a, b) => a.priceNum - b.priceNum);
      } else if (sortType === 'price-desc') {
        modalCurrentProducts.sort((a, b) => b.priceNum - a.priceNum);
      } else if (sortType === 'rating') {
        modalCurrentProducts.sort((a, b) => b.rating - a.rating);
      }
      renderModalProducts(modalCurrentProducts);
    });
  });

  // Icon Categories Expand/Collapse
  const catToggleBtn = document.getElementById('cat-toggle-btn');
  const iconCategories = document.querySelector('.icon-categories');
  const extraCats = document.querySelectorAll('.extra-cat');
  const catToggleText = document.getElementById('cat-toggle-text');
  const catToggleIcon = document.getElementById('cat-toggle-icon');

  if (catToggleBtn && iconCategories) {
    let isExpanded = false;

    catToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isExpanded = !isExpanded;

      if (isExpanded) {
        const startHeight = iconCategories.offsetHeight;
        extraCats.forEach(cat => cat.classList.add('show'));
        const targetHeight = iconCategories.scrollHeight;
        
        iconCategories.style.height = `${startHeight}px`;
        void iconCategories.offsetHeight;
        iconCategories.style.height = `${targetHeight}px`;
        
        setTimeout(() => {
          extraCats.forEach(cat => cat.classList.add('animate'));
        }, 10);

        catToggleText.textContent = 'Свернуть';
        catToggleIcon.innerHTML = '<path d="m18 15-6-6-6 6"/>';
        
        iconCategories.addEventListener('transitionend', function handler(e) {
          if (e.propertyName === 'height') {
            iconCategories.style.height = 'auto';
            iconCategories.removeEventListener('transitionend', handler);
          }
        });
      } else {
        const startHeight = iconCategories.offsetHeight;
        extraCats.forEach(cat => cat.classList.remove('animate'));
        extraCats.forEach(cat => cat.classList.remove('show'));
        const targetHeight = iconCategories.scrollHeight;
        extraCats.forEach(cat => cat.classList.add('show'));
        
        iconCategories.style.height = `${startHeight}px`;
        void iconCategories.offsetHeight;
        iconCategories.style.height = `${targetHeight}px`;

        catToggleText.textContent = 'Еще категории';
        catToggleIcon.innerHTML = '<path d="m6 9 6 6 6-6"/>';
        
        iconCategories.addEventListener('transitionend', function handler(e) {
          if (e.propertyName === 'height' && !isExpanded) {
            extraCats.forEach(cat => cat.classList.remove('show'));
            iconCategories.style.height = '';
            iconCategories.removeEventListener('transitionend', handler);
          }
        });
      }
    });
  }
}

window.openCatalog = openCatalog;
window.closeCatalog = closeCatalog;
window.filterModalCategory = filterModalCategory;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
