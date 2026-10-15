/**
 * Busan Supermarket Map - Dynamic Promotion Web App
 * Pure Vanilla JavaScript ES6+ (Component-based Dynamic Rendering)
 */

(function () {
  'use strict';

  const D = window.PROMOTION_DATA;
  if (!D) {
    console.error('PROMOTION_DATA not found. Make sure promotion_data.js is loaded.');
    return;
  }

  // 1. Core App Initialization
  function initApp() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    // Render entire UI from Javascript
    appEl.innerHTML = `
      ${renderBackgroundOrbs()}
      ${renderGnb()}
      <main>
        ${renderHero()}
        ${renderStats()}
        ${renderBrandShowroom()}
        ${renderCoreFeatures()}
        ${renderLiveDemo()}
        ${renderInsights()}
        ${renderFaq()}
        ${renderFinalCta()}
      </main>
      ${renderFooter()}
      ${renderScrollTopBtn()}
    `;

    // Bind event handlers and animations
    bindEvents();
  }

  // 2. Component Renderers
  function renderBackgroundOrbs() {
    return `
      <div class="bg-orb orb-1" aria-hidden="true"></div>
      <div class="bg-orb orb-2" aria-hidden="true"></div>
      <div class="bg-orb orb-3" aria-hidden="true"></div>
    `;
  }

  function renderGnb() {
    const navItemsHtml = D.navLinks
      .map((item) => `<a href="${item.href}" class="nav-link">${item.label}</a>`)
      .join('');

    return `
      <header class="gnb" id="gnb">
        <div class="gnb-container">
          <a href="#" class="gnb-logo" aria-label="부산슈퍼마켓지도 홈">
            <div class="logo-icon-wrapper">
              <span class="logo-icon">🛒</span>
              <span class="pulse-ring"></span>
            </div>
            <div class="logo-text-group">
              <span class="logo-title">부산슈퍼마켓지도</span>
              <span class="logo-badge">공공데이터</span>
            </div>
          </a>

          <nav class="gnb-nav" id="gnbNav">
            ${navItemsHtml}
          </nav>

          <div class="gnb-actions">
            <a href="${D.meta.mapUrl}" class="btn-primary btn-header" id="headerCtaBtn" target="_blank" rel="noopener">
              <span>지도 앱 열기</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
            <button class="menu-toggle" id="menuToggle" aria-label="메뉴 열기">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  function renderHero() {
    const trustItemsHtml = D.trustBadges
      .map(
        (b) => `
        <div class="trust-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${b.text}</span>
        </div>
      `
      )
      .join('<div class="trust-divider"></div>');

    return `
      <section class="hero-section" id="hero">
        <div class="container hero-container">
          <div class="hero-content">
            <div class="hero-badge animate-fade-in">
              <span class="badge-dot"></span>
              <span class="badge-text">${D.meta.badge}</span>
            </div>

            <h1 class="hero-title animate-fade-in delay-1">
              ${D.meta.heroHeadline.sub}<br>
              <span class="gradient-emerald">${D.meta.heroHeadline.highlight}</span>${D.meta.heroHeadline.tail}
            </h1>

            <p class="hero-desc animate-fade-in delay-2">
              ${D.meta.heroDesc}
            </p>

            <div class="hero-cta-group animate-fade-in delay-3">
              <a href="${D.meta.mapUrl}" class="btn-primary btn-large glow-effect" id="heroCtaMain" target="_blank" rel="noopener">
                <span class="btn-icon">🗺️</span>
                <span>내 주변 마트 지도 바로가기</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <a href="#demo" class="btn-secondary btn-large">
                <span>체험 데모 보기</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </a>
            </div>

            <div class="hero-trust-bar animate-fade-in delay-4">
              ${trustItemsHtml}
            </div>
          </div>

          <div class="hero-visual animate-fade-in delay-2">
            <div class="mockup-frame">
              <div class="frame-header">
                <div class="dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="address-bar">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <span>busan-supermarket-map.local</span>
                </div>
                <div class="frame-tag">LIVE APP</div>
              </div>

              <div class="mockup-screen">
                <div class="preview-map-sim">
                  <div class="preview-search-bar">
                    <span class="search-sim-icon">🔍</span>
                    <span class="search-sim-text">해운대구 또는 탑마트 검색...</span>
                    <span class="search-sim-btn">107개 일치</span>
                  </div>

                  <div class="floating-chip chip-topmart floating-anim-1">
                    <span class="chip-dot" style="background: #059669;"></span>
                    <strong>탑마트</strong> 32개 매장
                  </div>

                  <div class="floating-chip chip-emart floating-anim-2">
                    <span class="chip-dot" style="background: #d97706;"></span>
                    <strong>이마트/트레이더스</strong> 24개 매장
                  </div>

                  <div class="floating-chip chip-megamart floating-anim-3">
                    <span class="chip-dot" style="background: #2563eb;"></span>
                    <strong>메가마트</strong> 동래/남천
                  </div>

                  <div class="floating-pin pin-1">
                    <div class="pin-marker emerald"><span>🛒</span></div>
                    <div class="pin-popup">
                      <div class="popup-title">탑마트 문현점</div>
                      <div class="popup-addr">남구 전포대로91번길</div>
                    </div>
                  </div>

                  <div class="floating-pin pin-2">
                    <div class="pin-marker blue"><span>🛒</span></div>
                    <div class="pin-popup">
                      <div class="popup-title">메가마트 동래점</div>
                      <div class="popup-addr">동래구 충렬대로 197</div>
                    </div>
                  </div>

                  <div class="floating-pin pin-3">
                    <div class="pin-marker amber"><span>🛒</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderStats() {
    const statsHtml = D.stats
      .map((st, idx) => {
        const isLast = idx === D.stats.length - 1;
        const highlightClass = st.isHighlight ? 'highlight' : '';
        const numberClass = st.isHighlight ? 'text-emerald' : '';

        return `
        <div class="stat-box ${highlightClass}">
          <div class="stat-number-wrapper">
            <span class="stat-number counter ${numberClass}" data-target="${st.target}">${st.isHighlight ? st.target : 0}</span>
            <span class="stat-unit ${numberClass}">${st.unit}</span>
          </div>
          <div class="stat-title">${st.title}</div>
          <div class="stat-caption">${st.caption}</div>
        </div>
        ${!isLast ? '<div class="stat-separator"></div>' : ''}
      `;
      })
      .join('');

    return `
      <section class="stats-section" id="stats">
        <div class="container">
          <div class="stats-card">
            ${statsHtml}
          </div>
        </div>
      </section>
    `;
  }

  function renderBrandShowroom() {
    const brandsHtml = D.brands
      .map(
        (b) => `
        <div class="brand-card" data-brand="${b.code}">
          <div class="brand-card-top">
            <div class="brand-icon-badge" style="background: ${b.bgTint}; color: ${b.color};">
              <span>${b.icon}</span>
            </div>
            <span class="store-count-badge" style="background: ${b.color}; color: #ffffff;">${b.countText}</span>
          </div>
          <h3 class="brand-name" style="color: ${b.color};">${b.name}</h3>
          <p class="brand-summary">${b.summary}</p>
          <div class="brand-tags">
            ${b.tags.map((t) => `<span class="brand-tag">${t}</span>`).join('')}
          </div>
          <a href="${D.meta.mapUrl}?brand=${b.code}" class="brand-link" target="_blank" rel="noopener">
            <span>${b.name} 매장 보기</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </a>
        </div>
      `
      )
      .join('');

    return `
      <section class="brands-section" id="brands">
        <div class="container">
          <div class="section-header text-center">
            <span class="section-tag">BRAND CURATION</span>
            <h2 class="section-title">부산을 대표하는 <span class="gradient-emerald">8대 마트 라인업</span></h2>
            <p class="section-desc">
              서원유통 탑마트부터 글로벌 대형마트, 동네 주민이 사랑하는 로컬 슈퍼까지 한 번에 비교하세요.
            </p>
          </div>
          <div class="brands-grid">
            ${brandsHtml}
          </div>
        </div>
      </section>
    `;
  }

  function renderCoreFeatures() {
    const featuresHtml = D.features
      .map(
        (f) => `
        <div class="feature-card">
          <div class="feature-icon-box ${f.gradientClass}">
            ${f.icon}
          </div>
          <h3 class="feature-title">${f.title}</h3>
          <p class="feature-desc">${f.desc}</p>
          <ul class="feature-checklist">
            ${f.bullets.map((b) => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      `
      )
      .join('');

    return `
      <section class="features-section" id="features">
        <div class="container">
          <div class="section-header text-center">
            <span class="section-tag">WHY IT'S SPECIAL</span>
            <h2 class="section-title">스마트한 장보기를 위한 <span class="gradient-emerald">4가지 핵심 무기</span></h2>
            <p class="section-desc">무거운 앱 없이, 가볍고 번개처럼 빠른 인터페이스로 원하는 매장을 찾아드립니다.</p>
          </div>
          <div class="features-grid">
            ${featuresHtml}
          </div>
        </div>
      </section>
    `;
  }

  function renderLiveDemo() {
    return `
      <section class="demo-section" id="demo">
        <div class="container">
          <div class="demo-card-wrapper">
            <div class="demo-header-bar">
              <div class="demo-title-group">
                <span class="live-indicator">
                  <span class="live-dot"></span>
                  LIVE PREVIEW
                </span>
                <h2 class="demo-title">지금 여기서 지도를 직접 사용해보세요</h2>
              </div>
              <div class="demo-controls">
                <a href="${D.meta.mapUrl}" class="btn-primary btn-sm" target="_blank" rel="noopener">
                  <span>전체 화면으로 열기</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                </a>
              </div>
            </div>

            <div class="demo-iframe-container">
              <iframe src="${D.meta.mapUrl}" title="부산 슈퍼마켓 지도 라이브 데모" class="demo-iframe" loading="lazy"></iframe>
            </div>

            <div class="demo-footer-info">
              <span>💡 팁: 지도 안의 마커를 클릭하면 상세 매장 정보와 길찾기 버튼이 나타납니다.</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderInsights() {
    const pointsHtml = D.insights.points
      .map(
        (p) => `
        <div class="data-point-item">
          <span class="point-num">${p.num}</span>
          <div>
            <strong>${p.title}</strong>
            <p>${p.desc}</p>
          </div>
        </div>
      `
      )
      .join('');

    return `
      <section class="insights-section" id="insights">
        <div class="container">
          <div class="insights-box">
            <div class="insights-text">
              <span class="section-tag">PUBLIC DATA ECOSYSTEM</span>
              <h2 class="insights-title">투명하고 정확한 <br><span class="gradient-emerald">공공데이터의 힘</span></h2>
              <p class="insights-desc">
                본 서비스는 중소벤처기업부 및 소상공인시장진흥공단에서 제공하는 <strong>상가(상권)정보 공공데이터</strong>를 가공 및 정밀 정제하여 구축되었습니다.
              </p>
              <div class="data-points">
                ${pointsHtml}
              </div>
            </div>

            <div class="insights-badge-card">
              <div class="badge-card-icon">🏛️</div>
              <h3>공공데이터 개방 가치 실현</h3>
              <p>시민의 알 권리와 편리한 일상생활을 위해 데이터는 누구에게나 자유롭고 편리하게 공유되어야 합니다.</p>
              <div class="badge-source">출처: 공공데이터포털(data.go.kr)</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderFaq() {
    const faqHtml = D.faq
      .map(
        (item) => `
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false">
            <span>${item.q}</span>
            <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="faq-answer">
            <p>${item.a}</p>
          </div>
        </div>
      `
      )
      .join('');

    return `
      <section class="faq-section" id="faq">
        <div class="container">
          <div class="section-header text-center">
            <span class="section-tag">FAQ</span>
            <h2 class="section-title">자주 묻는 <span class="gradient-emerald">질문</span></h2>
            <p class="section-desc">서비스 이용에 대해 궁금한 점을 빠르게 확인해보세요.</p>
          </div>
          <div class="faq-list">
            ${faqHtml}
          </div>
        </div>
      </section>
    `;
  }

  function renderFinalCta() {
    return `
      <section class="final-cta-section">
        <div class="container">
          <div class="final-cta-card">
            <div class="final-cta-content">
              <span class="final-badge">START NOW</span>
              <h2 class="final-title">지금 바로 부산의 마트를 탐색해보세요</h2>
              <p class="final-desc">
                107개 매장 위치와 스마트 길찾기가 여러분을 기다립니다. 3초 만에 우리 동네 마트를 찾아보세요.
              </p>
              <div class="final-btn-group">
                <a href="${D.meta.mapUrl}" class="btn-primary btn-large glow-effect" target="_blank" rel="noopener">
                  <span>🛒 지도 바로 실행하기</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderFooter() {
    return `
      <footer class="footer">
        <div class="container footer-container">
          <div class="footer-top">
            <div class="footer-brand">
              <div class="logo-text-group">
                <span class="logo-title" style="font-size: 1.15rem;">🛒 부산슈퍼마켓지도</span>
                <span class="footer-sub">Busan Supermarket Interactive Map</span>
              </div>
              <p class="footer-desc">
                부산광역시 16개 구·군 주요 8대 슈퍼마켓 브랜드 위치 및 상권 정보 시각화 프로젝트
              </p>
            </div>

            <div class="footer-links-group">
              <div class="footer-col">
                <h4 class="footer-col-title">바로가기</h4>
                <a href="${D.meta.mapUrl}" target="_blank">지도 웹앱 실행</a>
                <a href="#brands">8대 브랜드</a>
                <a href="#features">핵심 기능</a>
                <a href="#demo">라이브 데모</a>
              </div>
              <div class="footer-col">
                <h4 class="footer-col-title">데이터 출처</h4>
                <a href="https://www.data.go.kr" target="_blank" rel="noopener">공공데이터포털</a>
                <a href="https://www.semas.or.kr" target="_blank" rel="noopener">소상공인시장진흥공단</a>
                <a href="https://www.openstreetmap.org" target="_blank" rel="noopener">OpenStreetMap</a>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <p class="copyright">© 2026 Busan Supermarket Map Project. All Rights Reserved. Pure Vanilla Web Edition.</p>
            <div class="footer-badges">
              <span class="badge-mini">100% Client-Side</span>
              <span class="badge-mini">Zero Dependency</span>
              <span class="badge-mini">Fresh Light Theme</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function renderScrollTopBtn() {
    return `
      <button id="scrollTopBtn" class="scroll-top-btn" aria-label="맨 위로 가기">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    `;
  }

  // 3. Event Listeners & Interactive Animations
  function bindEvents() {
    initHeaderScroll();
    initMobileMenu();
    initCounterAnimation();
    initFaqAccordion();
    initScrollTop();
    initSmoothNav();
  }

  function initHeaderScroll() {
    const gnb = document.getElementById('gnb');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!gnb) return;

    window.addEventListener(
      'scroll',
      () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 40) {
          gnb.style.boxShadow = '0 10px 25px -5px rgba(15, 23, 42, 0.08)';
          gnb.style.background = 'rgba(255, 255, 255, 0.94)';
        } else {
          gnb.style.boxShadow = 'none';
          gnb.style.background = 'rgba(255, 255, 255, 0.85)';
        }

        if (scrollTopBtn) {
          if (currentScroll > 400) {
            scrollTopBtn.classList.add('visible');
          } else {
            scrollTopBtn.classList.remove('visible');
          }
        }
      },
      { passive: true }
    );
  }

  function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const gnbNav = document.getElementById('gnbNav');
    if (!menuToggle || !gnbNav) return;

    menuToggle.addEventListener('click', () => {
      gnbNav.classList.toggle('open');
      const isOpen = gnbNav.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    const navLinks = gnbNav.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        gnbNav.classList.remove('open');
      });
    });
  }

  function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach((c) => (c.textContent = c.getAttribute('data-target')));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counterEl = entry.target;
            const target = parseInt(counterEl.getAttribute('data-target'), 10);
            if (target > 0) {
              animateCount(counterEl, target, 1600);
            }
            obs.unobserve(counterEl);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function animateCount(el, target, duration) {
    let startTimestamp = null;
    const startValue = 0;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeOut * (target - startValue) + startValue);

      el.textContent = current;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    window.requestAnimationFrame(step);
  }

  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  function initSmoothNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetEl = document.querySelector(href);
          if (targetEl) {
            const headerOffset = 80;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // 4. Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
