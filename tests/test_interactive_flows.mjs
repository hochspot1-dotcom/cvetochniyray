import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';

const distDir = path.resolve('./dist');
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(distDir, reqPath === '/' ? 'index.html' : reqPath);
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    filePath = path.join(distDir, 'index.html');
  }
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
  };
  res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
  fs.createReadStream(filePath).pipe(res);
});

server.listen(4178, async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const issues = [];

  page.on('console', msg => {
    if (msg.type() === 'error') issues.push('CONSOLE ERROR: ' + msg.text());
  });
  page.on('pageerror', err => {
    issues.push('PAGE ERROR: ' + err.message);
  });

  // 1. Test Desktop 1440px
  console.log('--- Testing Desktop 1440px ---');
  await page.setViewport({ width: 1440, height: 900, isMobile: false });
  await page.goto('http://localhost:4178', { waitUntil: 'networkidle0' });

  // Test Header Search Trigger
  const searchBtnWorks = await page.evaluate(() => {
    const btn = document.getElementById('btn-search-trigger');
    if (!btn) return 'btn-search-trigger not found';
    btn.click();
    const overlay = document.getElementById('header-search-overlay');
    if (!overlay) return 'overlay not found';
    const computed = window.getComputedStyle(overlay);
    return {
      classes: overlay.className,
      display: computed.display,
      visibility: computed.visibility,
      opacity: computed.opacity
    };
  });
  console.log('Search Trigger click result on Desktop:', searchBtnWorks);

  // Test Catalog Flyout
  const flyoutWorks = await page.evaluate(() => {
    const btn = document.getElementById('btn-catalog');
    if (!btn) return 'btn-catalog not found';
    btn.click();
    const flyout = document.getElementById('catalog-flyout');
    if (!flyout) return 'flyout not found';
    const comp = window.getComputedStyle(flyout);
    return {
      classes: flyout.className,
      opacity: comp.opacity,
      visibility: comp.visibility
    };
  });
  console.log('Catalog Flyout toggle result:', flyoutWorks);

  // Test Favorites Toggle
  const favWorks = await page.evaluate(() => {
    // Add first card to fav via modal
    const card = document.querySelector('.bestseller-card');
    if (card) card.click();
    const favBtn = document.getElementById('modal-btn-fav');
    if (favBtn) favBtn.click();
    const isFav = favBtn.classList.contains('active');
    const closeBtn = document.getElementById('modal-btn-close');
    if (closeBtn) closeBtn.click();
    const badge = document.getElementById('fav-badge');
    return { isFav, badgeText: badge ? badge.textContent : null, badgeDisplay: badge ? badge.style.display : null };
  });
  console.log('Favorites test result:', favWorks);

  // Test Cart Operations
  const cartWorks = await page.evaluate(() => {
    const card = document.querySelector('.bestseller-card');
    if (card) card.click();
    const addBtn = document.getElementById('modal-btn-cart');
    if (addBtn) addBtn.click();
    const closeBtn = document.getElementById('modal-btn-close');
    if (closeBtn) closeBtn.click();

    const cartBadge = document.getElementById('cart-badge');
    const badgeCount = cartBadge ? cartBadge.textContent : null;

    // Open cart drawer
    const openCartBtn = document.getElementById('btn-header-cart');
    if (openCartBtn) openCartBtn.click();
    const drawer = document.getElementById('cart-drawer-wrap');
    const isOpen = drawer ? drawer.classList.contains('is-open') : false;

    // Check items count inside drawer
    const items = document.querySelectorAll('.cart-item-row');
    return { badgeCount, isOpen, itemsInCart: items.length };
  });
  console.log('Cart test result:', cartWorks);

  // Test Checkout Flow
  const checkoutWorks = await page.evaluate(() => {
    const btnSubmit = document.getElementById('btn-submit-order');
    if (btnSubmit) btnSubmit.click();
    const checkoutSec = document.getElementById('checkout-page-section');
    return {
      checkoutVisible: checkoutSec ? checkoutSec.style.display : 'none',
      hash: window.location.hash
    };
  });
  console.log('Checkout navigation result:', checkoutWorks);

  // Test Promo Code inside Checkout
  const promoWorks = await page.evaluate(() => {
    const promoInput = document.getElementById('co-promo-input');
    const promoBtn = document.getElementById('btn-co-apply-promo');
    if (promoInput && promoBtn) {
      promoInput.value = 'START5';
      promoBtn.click();
      const msg = document.getElementById('co-promo-msg');
      return { msgText: msg ? msg.textContent : null, msgColor: msg ? msg.style.color : null };
    }
    return 'promo elements not found';
  });
  console.log('Promo test result:', promoWorks);

  // Test Order Submission Validation
  const orderSubmitValidation = await page.evaluate(() => {
    const btnFinish = document.getElementById('btn-co-submit-order');
    if (btnFinish) btnFinish.click();
    const successView = document.getElementById('checkout-success-view');
    const isSuccess = successView ? successView.style.display !== 'none' : false;
    return { isSuccess };
  });
  console.log('Order submission without name/phone result:', orderSubmitValidation);

  // Test Order Submission With Name & Phone and Phone Masking
  const orderSubmitFull = await page.evaluate(() => {
    const nameInput = document.getElementById('co-customer-name');
    const phoneInput = document.getElementById('co-customer-phone');
    if (nameInput) nameInput.value = 'Анна';
    if (phoneInput) {
      phoneInput.value = '9491234567';
      phoneInput.dispatchEvent(new Event('input'));
    }
    const maskedPhone = phoneInput ? phoneInput.value : '';
    const btnFinish = document.getElementById('btn-co-submit-order');
    if (btnFinish) btnFinish.click();
    const successView = document.getElementById('checkout-success-view');
    const orderNum = document.getElementById('co-success-num');
    const btnReturnCat = document.getElementById('btn-co-return-catalog');
    const btnReturnHome = document.getElementById('btn-co-return-home');
    return {
      maskedPhone,
      successDisplay: successView ? successView.style.display : 'none',
      orderNumText: orderNum ? orderNum.textContent : null,
      hasReturnCatBtn: !!btnReturnCat,
      hasReturnHomeBtn: !!btnReturnHome
    };
  });
  console.log('Order submission with data result:', orderSubmitFull);

  // 2. Test Mobile 375px
  console.log('\n--- Testing Mobile 375px ---');
  await page.setViewport({ width: 375, height: 667, isMobile: true });
  await page.goto('http://localhost:4178', { waitUntil: 'networkidle0' });

  // Test Mobile Navigation switching
  const mobileNavSwitch = await page.evaluate(() => {
    const mobHome = document.getElementById('mob-nav-home');
    const mobCat = document.getElementById('mob-nav-catalog');
    const mobFav = document.getElementById('mob-nav-fav');
    const mobCart = document.getElementById('mob-nav-cart');

    const homeView = document.getElementById('home-view');
    const catView = document.getElementById('catalog-view');

    mobCat.click();
    const catActive = catView ? catView.style.display !== 'none' : false;
    const homeHidden = homeView ? homeView.style.display === 'none' : false;

    mobHome.click();
    const homeActive = homeView ? homeView.style.display !== 'none' : false;

    return { catActive, homeHidden, homeActive };
  });
  console.log('Mobile nav switch result:', mobileNavSwitch);

  console.log('\n=== All Issues Logged ===');
  console.log('Total issues:', issues.length);
  issues.forEach(i => console.log('  ', i));

  await browser.close();
  server.close();
  process.exit(0);
});
