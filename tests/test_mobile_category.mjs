import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';

const distDir = path.resolve('./dist');
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(distDir, reqPath === '/' ? 'index.html' : reqPath);
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) filePath = path.join(distDir, 'index.html');
  const ext = path.extname(filePath).toLowerCase();
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(filePath).pipe(res);
});

server.listen(4195, async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:4195', { waitUntil: 'networkidle0' });

  // 1. Try tapping a hub-cell on home page
  const resHub = await page.evaluate(async () => {
    const hubCell = document.querySelector('.hub-cell[data-cat="Монобукеты"]');
    if (!hubCell) return { error: 'hubCell not found' };
    hubCell.click();
    await new Promise(r => setTimeout(r, 400));
    const catView = document.getElementById('catalog-view');
    const homeView = document.getElementById('home-view');
    const title = document.getElementById('page-catalog-title')?.textContent;
    const cards = Array.from(document.querySelectorAll('#catalog-page-grid .product-card')).filter(c => c.style.display !== 'none').length;
    return {
      catViewDisplay: catView?.style.display,
      homeViewDisplay: homeView?.style.display,
      title,
      cards
    };
  });
  console.log('1. Hub cell click on home page:', resHub);

  // 2. Now we are in catalog-view on mobile. Let's see what categories are in the ribbon:
  const ribbonInfo = await page.evaluate(() => {
    const track = document.getElementById('page-ribbon-track');
    const btns = Array.from(track.querySelectorAll('.ribbon-btn')).map(b => ({
      cat: b.getAttribute('data-cat'),
      text: b.textContent.trim().replace(/\s+/g, ' '),
      active: b.classList.contains('active')
    }));
    return btns;
  });
  console.log('2. Ribbon buttons in catalog view:', ribbonInfo);

  // 3. Try tapping another category button in the ribbon: e.g. "WOW-букеты" or "В коробках"
  const clickRibbon1 = await page.evaluate(async () => {
    const btn = Array.from(document.querySelectorAll('.ribbon-btn')).find(b => b.getAttribute('data-cat') === 'В коробках');
    if (!btn) return { error: 'btn not found' };
    btn.click();
    await new Promise(r => setTimeout(r, 300));
    const cards = Array.from(document.querySelectorAll('#catalog-page-grid .product-card')).filter(c => c.style.display !== 'none').length;
    const title = document.getElementById('page-catalog-title')?.textContent;
    return { clicked: true, title, cards };
  });
  console.log('3. Click "В коробках":', clickRibbon1);

  // 4. Try tapping "Сборные букеты размер M"
  const clickRibbon2 = await page.evaluate(async () => {
    const btn = Array.from(document.querySelectorAll('.ribbon-btn')).find(b => b.getAttribute('data-cat') === 'Сборные букеты размер M');
    if (!btn) return { error: 'btn not found' };
    btn.click();
    await new Promise(r => setTimeout(r, 300));
    const cards = Array.from(document.querySelectorAll('#catalog-page-grid .product-card')).filter(c => c.style.display !== 'none').length;
    const title = document.getElementById('page-catalog-title')?.textContent;
    return { clicked: true, title, cards };
  });
  console.log('4. Click "Сборные букеты размер M":', clickRibbon2);

  // 5. Try tapping "Все цветы"
  const clickRibbon3 = await page.evaluate(async () => {
    const btn = Array.from(document.querySelectorAll('.ribbon-btn')).find(b => b.getAttribute('data-cat') === 'Цветы');
    if (!btn) return { error: 'btn not found' };
    btn.click();
    await new Promise(r => setTimeout(r, 300));
    const cards = Array.from(document.querySelectorAll('#catalog-page-grid .product-card')).filter(c => c.style.display !== 'none').length;
    const title = document.getElementById('page-catalog-title')?.textContent;
    return { clicked: true, title, cards };
  });
  console.log('5. Click "Все цветы":', clickRibbon3);

  // 6. What if user taps category in mobile nav?
  const mobNavClick = await page.evaluate(async () => {
    const mobCat = document.getElementById('mob-nav-catalog');
    mobCat.click();
    await new Promise(r => setTimeout(r, 300));
    const cards = Array.from(document.querySelectorAll('#catalog-page-grid .product-card')).filter(c => c.style.display !== 'none').length;
    const title = document.getElementById('page-catalog-title')?.textContent;
    const ribbonBtns = Array.from(document.querySelectorAll('.ribbon-btn')).map(b => b.getAttribute('data-cat'));
    return { title, cards, ribbonBtns };
  });
  console.log('6. Click mob-nav-catalog:', mobNavClick);

  await browser.close();
  server.close();
});
