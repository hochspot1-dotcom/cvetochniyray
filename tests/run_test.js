import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\914b9532-6a37-4489-a287-a851dff106d0';

function startServer(port = 4173) {
  const mimeTypes = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'text/javascript; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };

  const distDir = path.resolve('dist');

  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    let filePath = path.join(distDir, reqPath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        filePath = path.join(distDir, 'index.html');
      }
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      fs.readFile(filePath, (readErr, content) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content);
        }
      });
    });
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log('Static test server running at http://localhost:' + port);
      resolve(server);
    });
  });
}

const BREAKPOINTS = [
  { name: '01_mobile_compact_320px', width: 320, height: 640, isMobile: true },
  { name: '02_mobile_standard_480px', width: 480, height: 800, isMobile: true },
  { name: '03_tablet_portrait_768px', width: 768, height: 1024, isMobile: true },
  { name: '04_tablet_landscape_1024px', width: 1024, height: 768, isMobile: false },
  { name: '05_desktop_1440px', width: 1440, height: 900, isMobile: false },
  { name: '06_ultrawide_1920px', width: 1920, height: 1080, isMobile: false }
];

async function runVisualTests() {
  const port = 4173;
  const server = await startServer(port);

  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const results = [];

  for (const bp of BREAKPOINTS) {
    console.log('\n--- Testing Breakpoint: ' + bp.name + ' (' + bp.width + 'x' + bp.height + ') ---');
    await page.setViewport({
      width: bp.width,
      height: bp.height,
      deviceScaleFactor: 2,
      isMobile: bp.isMobile,
      hasTouch: bp.isMobile
    });

    await page.goto('http://localhost:' + port, { waitUntil: 'networkidle0' });
    await page.evaluate(() => new Promise((r) => setTimeout(r, 600)));

    // Check for Horizontal Overflow
    const overflowCheck = await page.evaluate(() => {
      const docEl = document.documentElement;
      const body = document.body;
      const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
      const clientWidth = docEl.clientWidth;
      const hasOverflow = scrollWidth > clientWidth;

      const offending = [];
      if (hasOverflow) {
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          const rect = el.getBoundingClientRect();
          if (rect.right > clientWidth + 2) {
            offending.push({
              tag: el.tagName,
              className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 50) : '',
              id: el.id || '',
              right: Math.round(rect.right),
              width: Math.round(rect.width)
            });
          }
        }
      }

      // Check touch targets under 44px
      const smallTouchTargets = [];
      const interactives = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
      for (const el of interactives) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && (rect.width < 40 || rect.height < 40)) {
          smallTouchTargets.push({
            tag: el.tagName,
            id: el.id,
            className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 50) : '',
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          });
        }
      }

      return {
        scrollWidth,
        clientWidth,
        hasOverflow,
        offendingCount: offending.length,
        offending: offending.slice(0, 5),
        smallTouchTargetsCount: smallTouchTargets.length,
        smallTouchTargets: smallTouchTargets.slice(0, 5)
      };
    });

    console.log('Overflow Status: ' + (overflowCheck.hasOverflow ? 'FAIL (scrollWidth ' + overflowCheck.scrollWidth + 'px > clientWidth ' + overflowCheck.clientWidth + 'px)' : 'PASS (0 overflow)'));
    if (overflowCheck.hasOverflow) {
      console.log('Offending elements:', JSON.stringify(overflowCheck.offending, null, 2));
    }
    console.log('Touch target check (<40px): ' + overflowCheck.smallTouchTargetsCount + ' elements');

    // Viewport Screenshot
    const screenshotPath = path.join(ARTIFACT_DIR, 'screenshot_' + bp.name + '.jpg');
    await page.screenshot({
      path: screenshotPath,
      type: 'jpeg',
      quality: 85,
      fullPage: false
    });

    // Full Page Screenshot
    const fullScreenshotPath = path.join(ARTIFACT_DIR, 'screenshot_full_' + bp.name + '.jpg');
    await page.screenshot({
      path: fullScreenshotPath,
      type: 'jpeg',
      quality: 80,
      fullPage: true
    });

    console.log('Saved: screenshot_' + bp.name + '.jpg & screenshot_full_' + bp.name + '.jpg');

    results.push({
      breakpoint: bp,
      overflow: overflowCheck,
      screenshot: 'screenshot_' + bp.name + '.jpg',
      fullScreenshot: 'screenshot_full_' + bp.name + '.jpg'
    });
  }

  // Interactive UI tests (Product Quick View Modal and Favorites on Mobile 320px)
  console.log('\n--- Capturing Interactive Modal & Cart at 320px ---');
  await page.setViewport({ width: 320, height: 640, isMobile: true, deviceScaleFactor: 2 });
  await page.goto('http://localhost:' + port, { waitUntil: 'networkidle0' });

  // Open Product Modal
  await page.evaluate(() => {
    const card = document.querySelector('.bestseller-card, .product-card');
    if (card) card.click();
  });
  await page.evaluate(() => new Promise((r) => setTimeout(r, 600)));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'screenshot_modal_mobile_320px.jpg'),
    type: 'jpeg',
    quality: 85
  });
  console.log('Saved: screenshot_modal_mobile_320px.jpg');

  // Open Favorites Drawer
  await page.evaluate(() => {
    const closeBtn = document.getElementById('modal-btn-close');
    if (closeBtn) closeBtn.click();
    const favBtn = document.getElementById('btn-header-fav');
    if (favBtn) favBtn.click();
  });
  await page.evaluate(() => new Promise((r) => setTimeout(r, 600)));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'screenshot_favorites_mobile_320px.jpg'),
    type: 'jpeg',
    quality: 85
  });
  console.log('Saved: screenshot_favorites_mobile_320px.jpg');

  // Open Cart Drawer
  await page.evaluate(() => {
    const closeFav = document.getElementById('btn-close-fav');
    if (closeFav) closeFav.click();
    const cartBtn = document.getElementById('btn-header-cart');
    if (cartBtn) cartBtn.click();
  });
  await page.evaluate(() => new Promise((r) => setTimeout(r, 600)));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'screenshot_cart_mobile_320px.jpg'),
    type: 'jpeg',
    quality: 85
  });
  console.log('Saved: screenshot_cart_mobile_320px.jpg');

  // Open Checkout Page at 320px
  console.log('\n--- Testing Checkout Page at 320px (No Horizontal Scroll) ---');
  await page.evaluate(() => {
    // Close cart and favorites drawer if open
    const closeCartBtn = document.getElementById('btn-close-cart');
    if (closeCartBtn) closeCartBtn.click();
    const closeFavBtn = document.getElementById('btn-close-fav');
    if (closeFavBtn) closeFavBtn.click();
    const modalClose = document.getElementById('modal-btn-close');
    if (modalClose) modalClose.click();

    // Populate cart and open checkout
    if (typeof window.addToCart === 'function') {
      window.addToCart(1996);
      window.addToCart(1848);
    }
    if (typeof window.openCheckoutPage === 'function') {
      window.openCheckoutPage();
    }
  });
  await page.evaluate(() => new Promise((r) => setTimeout(r, 600)));
  
  const checkoutOverflow = await page.evaluate(() => {
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    return {
      scrollWidth,
      clientWidth,
      hasOverflow: scrollWidth > clientWidth + 1
    };
  });
  console.log('Checkout 320px Overflow Status: ' + (checkoutOverflow.hasOverflow ? 'FAIL (scrollWidth ' + checkoutOverflow.scrollWidth + 'px > clientWidth ' + checkoutOverflow.clientWidth + 'px)' : 'PASS (0 horizontal overflow)'));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'screenshot_checkout_mobile_320px.jpg'),
    type: 'jpeg',
    quality: 85,
    fullPage: false
  });
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'screenshot_full_checkout_mobile_320px.jpg'),
    type: 'jpeg',
    quality: 80,
    fullPage: true
  });
  console.log('Saved: screenshot_checkout_mobile_320px.jpg & screenshot_full_checkout_mobile_320px.jpg');

  // Open Catalog Page at 320px
  console.log('\n--- Testing Catalog Page at 320px (Compact Top Margin) ---');
  await page.evaluate(() => {
    window.location.hash = '#catalog?cat=all';
  });
  await page.evaluate(() => new Promise((r) => setTimeout(r, 600)));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'screenshot_catalog_mobile_320px.jpg'),
    type: 'jpeg',
    quality: 85,
    fullPage: false
  });
  console.log('Saved: screenshot_catalog_mobile_320px.jpg');

  // Mobile scroll sequence frames on Home Page
  console.log('\n--- Capturing Mobile Scroll Frames ---');
  await page.evaluate(() => {
    window.location.hash = '';
    const closeCart = document.getElementById('btn-close-cart');
    if (closeCart) closeCart.click();
  });
  await page.evaluate(() => new Promise((r) => setTimeout(r, 400)));

  const scrollPositions = [0, 450, 950, 1500, 2200, 3100];
  for (let i = 0; i < scrollPositions.length; i++) {
    await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: 'instant' }), scrollPositions[i]);
    await page.evaluate(() => new Promise((r) => setTimeout(r, 250)));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'scroll_frame_mobile_' + (i + 1) + '.jpg'),
      type: 'jpeg',
      quality: 80
    });
  }
  console.log('Saved 6 mobile scroll sequence frames');

  await browser.close();
  server.close();

  fs.writeFileSync(path.join(ARTIFACT_DIR, 'responsive_test_results.json'), JSON.stringify(results, null, 2));
  console.log('\n=== Multi-Breakpoint Testing Completed Successfully ===');
}

runVisualTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});

