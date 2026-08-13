

const categories = [
  'Flowers',
  'Gifts',
  'Cakes & Desserts',
  'Live Plants',
  'Jewelry',
  'Decor',
  'Perfumes',
  'Tea & Coffee',
  'Gift Cards'
];

const products = [
  {
    id: 1,
    title: 'Bouquet "Tender Peach"',
    price: '3 500 ₽',
    rating: '4.9',
    reviews: 128,
    delivery: '60 min',
    image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=400',
    badge: 'Hit'
  },
  {
    id: 2,
    title: 'Red Roses 51 pcs',
    price: '5 990 ₽',
    rating: '5.0',
    reviews: 342,
    delivery: '90 min',
    image: 'https://images.unsplash.com/photo-1548842416-86f38e079782?w=400',
    badge: '-15%'
  },
  {
    id: 3,
    title: 'Strawberry in Chocolate',
    price: '2 800 ₽',
    rating: '4.8',
    reviews: 89,
    delivery: '45 min',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=400',
    badge: 'New'
  },
  {
    id: 4,
    title: 'Potted Monstera Plant',
    price: '1 950 ₽',
    rating: '4.7',
    reviews: 45,
    delivery: '120 min',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400'
  },
  {
    id: 5,
    title: 'Assorted Macarons Box',
    price: '1 200 ₽',
    rating: '4.9',
    reviews: 210,
    delivery: '40 min',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400',
    badge: 'Hit'
  },
  {
    id: 6,
    title: 'Gift Set "Morning Spa"',
    price: '4 200 ₽',
    rating: '5.0',
    reviews: 12,
    delivery: '180 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400'
  }
];

function renderCategories() {
  const list = document.getElementById('category-list');
  list.innerHTML = categories.map(cat => `
    <li class="nav-categories__item">
      <a href="#">${cat}</a>
    </li>
  `).join('');
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = products.map(prod => `
    <article class="product-card">
      ${prod.badge ? `<span class="badge">${prod.badge}</span>` : ''}
      <img class="product-card__image" src="${prod.image}" alt="${prod.title}" loading="lazy" />
      <div class="product-card__info">
        <div class="product-card__price">${prod.price}</div>
        <h3 class="product-card__title">${prod.title}</h3>
        <div class="product-card__meta">
          <span style="color: #ff9800;">★ ${prod.rating}</span>
          <span>(${prod.reviews})</span>
          <span>•</span>
          <span>${prod.delivery}</span>
        </div>
      </div>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProducts();

  const logoLink = document.getElementById('logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const header = document.querySelector('.header');
  const filtersBar = document.getElementById('filters-bar');
  
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    
    if (filtersBar) {
      if (filtersBar.getBoundingClientRect().top <= 97) {
        filtersBar.classList.add('is-stuck');
      } else {
        filtersBar.classList.remove('is-stuck');
      }
    }
  });

  // Catalog Dropdown Logic
  const catalogWrap = document.querySelector('.header__catalog-wrap');
  const catalogDropdown = document.getElementById('catalog-dropdown');
  if (catalogWrap && catalogDropdown) {
    catalogWrap.addEventListener('mouseenter', () => catalogDropdown.classList.add('is-open'));
    catalogWrap.addEventListener('mouseleave', () => catalogDropdown.classList.remove('is-open'));
  }

  const catalogItems = document.querySelectorAll('.catalog-item');
  const catalogPanes = document.querySelectorAll('.catalog-pane');
  catalogItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      catalogItems.forEach(i => i.classList.remove('active'));
      catalogPanes.forEach(p => p.classList.remove('active'));
      
      item.classList.add('active');
      const target = item.getAttribute('data-target');
      if (target) {
        const pane = document.getElementById(`pane-${target}`);
        if (pane) pane.classList.add('active');
      }
    });
  });

  // Icon Categories Toggle
  const catToggleBtn = document.getElementById('cat-toggle-btn');
  const iconCategories = document.querySelector('.icon-categories');
  const extraCats = document.querySelectorAll('.extra-cat');
  const catToggleText = document.getElementById('cat-toggle-text');
  const catToggleIcon = document.getElementById('cat-toggle-icon');

  if (catToggleBtn && iconCategories) {
    let isExpanded = false;

    catToggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;

      if (isExpanded) {
        // Measure start height
        const startHeight = iconCategories.offsetHeight;
        
        // Show elements to measure target height
        extraCats.forEach(cat => cat.classList.add('show'));
        const targetHeight = iconCategories.scrollHeight;
        
        // Force reflow and start animation
        iconCategories.style.height = `${startHeight}px`;
        void iconCategories.offsetHeight;
        iconCategories.style.height = `${targetHeight}px`;
        
        // Trigger opacity/transform animation slightly after
        setTimeout(() => {
          extraCats.forEach(cat => cat.classList.add('animate'));
        }, 10);

        catToggleText.textContent = 'Свернуть';
        catToggleIcon.innerHTML = '<path d="m18 15-6-6-6 6"/>';
        
        iconCategories.addEventListener('transitionend', function handler(e) {
          if (e.propertyName === 'height') {
            iconCategories.style.height = 'auto'; // allow resize
            iconCategories.removeEventListener('transitionend', handler);
          }
        });
      } else {
        // Measure start height from 'auto'
        const startHeight = iconCategories.offsetHeight;
        
        // Remove animation class for opacity/transform
        extraCats.forEach(cat => cat.classList.remove('animate'));
        
        // Measure collapsed height
        extraCats.forEach(cat => cat.classList.remove('show'));
        const targetHeight = iconCategories.scrollHeight;
        extraCats.forEach(cat => cat.classList.add('show')); // Put back for transition
        
        // Force reflow and start animation
        iconCategories.style.height = `${startHeight}px`;
        void iconCategories.offsetHeight;
        iconCategories.style.height = `${targetHeight}px`;

        catToggleText.textContent = 'Еще категории';
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
});
