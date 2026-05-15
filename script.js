/* ============================================
   SKYLARC WEBSITE - SHARED SCRIPT
   Navigation & Interactive Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initUpcomingLiveAuctionCarouselDelays();
  initNavbarIntroAnimation();
  initAuctionSingleTopIntroAnimation();
  initCaseStudyInternalHeroScrollAnimation();
  initCaseStudyChallengeScrollAnimation();
  initCaseStudyProcessScrollAnimation();
  initCaseStudyMarketingScrollAnimation();
  initCaseStudyResultsScrollAnimation();
  initCaseStudyMediaLinksScrollAnimation();
  initNavigation();
  initPastAuctionFilters();
  initSectionOneScrollAnimation();
  initSectionTwoScrollAnimation();
  initSectionThreeScrollAnimation();
  initProcessSectionScroll();
  initSectionFourScrollAnimation();
  initSectionFiveScrollAnimation();
  initSectionFiveMobileCarousel();
  initSectionSixScrollAnimation();
  initSectionSevenScrollAnimation();
  initSectionEightScrollAnimation();
  initHomeRsBottomLayoutScrollAnimation();
  initFooterScrollAnimation();
  initSellTrustedScrollAnimation();
  initSellResultsScrollAnimation();
  initSellFaqScrollAnimation();
  initSellPricingScrollAnimation();
  initSellContactScrollAnimation();
  initContactDetailsScrollAnimation();
  initPickupSectionScrollAnimation();
  initAboutMissionScrollAnimation();
  initAboutValuesScrollAnimation();
  initAboutDifferentScrollAnimation();
  initAboutTeamScrollAnimation();
  initUpcomingPastAuctionAnimation();
  initCaseFilterScrollAnimation();
  initAuctionsListingIntroAnimation();
  initAuctionsMarketTabs();
  initAuctionsCardsGridAnimation();
  initAuctionsResultsAnimation();
  initAuctionsDrivingAnimation();
  initAuctionSingleSpecAnimation();
  initAuctionSinglePickupAnimation();
  initPaginationControls();
});

/** Sync “Auction” live cards stagger to category line animation end (upcoming auctions page only). */
function initUpcomingLiveAuctionCarouselDelays() {
  if (!document.body.classList.contains('upcoming-auctions-page')) return;

  const section = document.querySelector('.auctions-listing-section');
  const grid = document.querySelector('.upcoming-auction-cards--stagger-animate');
  const header = document.querySelector('.upcoming-auction-live__header--anim-on');
  if (!section || !grid || !header) return;

  const categoryEls = section.querySelectorAll(
    '.auctions-market-overlay__label, .auctions-market-overlay__grid > *'
  );
  const n = categoryEls.length;
  const base = n > 0 ? 1.02 + (n - 1) * 0.08 + 0.72 + 0.12 : 2.82;

  const title = header.querySelector('.section-3__title');
  if (title) title.style.setProperty('--ula-title-delay', `${base}s`);

  grid.style.setProperty('--ula-tile-1-delay', `${base + 0.4}s`);
  grid.style.setProperty('--ula-tile-2-delay', `${base + 0.56}s`);
  grid.style.setProperty('--ula-content-1-delay', `${base + 0.95}s`);
  grid.style.setProperty('--ula-content-2-delay', `${base + 1.15}s`);
  grid.style.setProperty('--ula-image-1-delay', `${base + 1.42}s`);
  grid.style.setProperty('--ula-image-2-delay', `${base + 1.62}s`);
}

function initAuctionSingleTopIntroAnimation() {
  const pageNavbar = document.querySelector('.auction-single-page .auction-single-hero .navbar');
  const topBanner = document.querySelector('.auction-single-page .auction-single-banner');
  const topGallery = document.querySelector('.auction-single-page .auction-single-top');
  if (!pageNavbar || !topBanner || !topGallery) return;

  pageNavbar.classList.add('auction-single-top-intro--ready');
  topBanner.classList.add('auction-single-top-intro--ready');
  topGallery.classList.add('auction-single-top-intro--ready');

  const copyElements = topBanner.querySelectorAll('.auction-single-breadcrumb, h1, p');
  copyElements.forEach((element, index) => {
    const delay = 0.18 + index * 0.12;
    element.style.setProperty('--auction-single-copy-delay', `${delay}s`);
  });

  const ctaButton = topBanner.querySelector('.auction-single-banner__cta');
  const bidImageWrap = topBanner.querySelector('.auction-single-banner__bid');
  if (ctaButton) ctaButton.style.setProperty('--auction-single-bottom-delay', '0.88s');
  if (bidImageWrap) bidImageWrap.style.setProperty('--auction-single-bottom-delay', '1s');
  const mainImage = topGallery.querySelector('.auction-single-main-image');
  const thumbRow = topGallery.querySelector('.auction-single-thumb-row');
  if (mainImage) mainImage.style.setProperty('--auction-single-gallery-delay', '1.22s');
  if (thumbRow) thumbRow.style.setProperty('--auction-single-gallery-delay', '1.34s');

  void pageNavbar.offsetWidth;
  void topBanner.offsetWidth;
  void topGallery.offsetWidth;
  document.documentElement.classList.remove('auction-single-intro-preload');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      pageNavbar.classList.add('auction-single-top-intro--in');
      topBanner.classList.add('auction-single-top-intro--in');
      topGallery.classList.add('auction-single-top-intro--in');
    });
  });

  setTimeout(() => {
    pageNavbar.classList.add('auction-single-top-intro--in');
    topBanner.classList.add('auction-single-top-intro--in');
    topGallery.classList.add('auction-single-top-intro--in');
  }, 180);
}

/**
 * Case study internal: hero copy slides in from the right, stats rise from below,
 * main gallery image rises when scrolled into view, then thumb strip when scrolled further.
 */
function initCaseStudyInternalHeroScrollAnimation() {
  const heroRoot = document.body.classList.contains('case-study-internal-page')
    ? 'case-study-internal-page'
    : document.body.classList.contains('case-study-single-page')
      ? 'case-study-single-page'
      : null;
  if (!heroRoot) return;

  const banner = document.querySelector(`.${heroRoot} .auction-single-banner`);
  const mainImage = document.querySelector(`.${heroRoot} .auction-single-main-image`);
  const thumbRow = document.querySelector(`.${heroRoot} .auction-single-thumb-row`);

  const observeOnce = (target, onInView, options) => {
    if (!target) return null;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        onInView();
        obs.disconnect();
      });
    }, options);
    observer.observe(target);
    return observer;
  };

  if (banner) {
    banner.classList.add('case-study-hero-banner--ready');
    observeOnce(
      banner,
      () => banner.classList.add('case-study-hero-banner--in'),
      { threshold: 0.14, rootMargin: '0px 0px -12% 0px' }
    );
  }

  if (mainImage) {
    mainImage.classList.add('case-study-hero-main--ready');
    observeOnce(
      mainImage,
      () => mainImage.classList.add('case-study-hero-main--in'),
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );
  }

  if (thumbRow) {
    thumbRow.classList.add('case-study-hero-thumb--ready');
    observeOnce(
      thumbRow,
      () => thumbRow.classList.add('case-study-hero-thumb--in'),
      { threshold: 0.16, rootMargin: '0px 0px -6% 0px' }
    );
  }
}

/** “The Challenge” — image from left, copy from bottom-right (case study pages). */
function initCaseStudyChallengeScrollAnimation() {
  const section = document.querySelector('.case-study-challenge-section');
  if (!section) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    section.classList.add('case-study-challenge--in-view');
    return;
  }

  section.classList.add('case-study-challenge--ready');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        section.classList.add('case-study-challenge--in-view');
        obs.disconnect();
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -10% 0px' }
  );
  observer.observe(section);
}

/** “The Process” — text/image from right, tender card from left. */
function initCaseStudyProcessScrollAnimation() {
  const section = document.querySelector('.case-study-process-section');
  if (!section) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    section.classList.add('case-study-process--in-view');
    return;
  }

  section.classList.add('case-study-process--ready');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        section.classList.add('case-study-process--in-view');
        obs.disconnect();
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -10% 0px' }
  );
  observer.observe(section);
}

/** Marketing — image from right; heading then paragraphs from left (stagger). */
function initCaseStudyMarketingScrollAnimation() {
  const section = document.querySelector('.case-study-marketing-section');
  if (!section) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    section.classList.add('case-study-marketing--in-view');
    return;
  }

  section.classList.add('case-study-marketing--ready');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        section.classList.add('case-study-marketing--in-view');
        obs.disconnect();
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -10% 0px' }
  );
  observer.observe(section);
}

/** Results — image from left; heading then paragraphs from right (stagger). */
function initCaseStudyResultsScrollAnimation() {
  const section = document.querySelector('.case-study-results-section');
  if (!section) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    section.classList.add('case-study-results--in-view');
    return;
  }

  section.classList.add('case-study-results--ready');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        section.classList.add('case-study-results--in-view');
        obs.disconnect();
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -10% 0px' }
  );
  observer.observe(section);
}

/** Media Links — title from left; link grid from bottom-right. */
function initCaseStudyMediaLinksScrollAnimation() {
  const section = document.querySelector('.case-study-media-links-section');
  if (!section) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    section.classList.add('case-study-media-links--in-view');
    return;
  }

  section.classList.add('case-study-media-links--ready');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        section.classList.add('case-study-media-links--in-view');
        obs.disconnect();
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
  );
  observer.observe(section);
}

function initNavbarIntroAnimation() {
  const navbars = document.querySelectorAll('.navbar');
  if (!navbars.length) return;

  navbars.forEach(navbar => {
    navbar.classList.add('navbar--animate-ready');

    const navItems = navbar.querySelectorAll('.navbar__list li');
    navItems.forEach((item, index) => {
      const delay = 0.16 + index * 0.08;
      item.style.setProperty('--nav-item-delay', `${delay}s`);
    });

    // Force layout so initial state is painted before animation starts.
    void navbar.offsetWidth;

    const isHomeHeroNavbar =
      document.body.classList.contains('home-page') &&
      !!navbar.closest('.hero');
    const isSellHeroNavbar =
      document.body.classList.contains('sell-page') &&
      !!navbar.closest('.sell-hero');
    const isAboutHeroNavbar =
      document.body.classList.contains('about-page') &&
      !!navbar.closest('.about-hero');
    const isCaseStudiesHeroNavbar =
      document.body.classList.contains('case-studies-page') &&
      !!navbar.closest('.case-hero');
    const introDelay = isHomeHeroNavbar ? 960 : isSellHeroNavbar ? 900 : isAboutHeroNavbar ? 900 : isCaseStudiesHeroNavbar ? 900 : 80;

    setTimeout(() => {
      navbar.classList.add('navbar--animate-in');
    }, introDelay);
  });
}

/**
 * Initialize navigation with mobile menu toggle and active link highlighting
 */
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.navbar__link');
  const navCta = document.querySelector('.navbar__actions .btn--navbar-primary');

  function syncMobileNavCta() {
    if (!navMenu || !navCta) return;
    const existing = navMenu.querySelector('.navbar__mobile-cta');
    if (window.innerWidth > 1024) {
      if (existing) existing.remove();
      return;
    }
    if (navMenu.querySelector('.navbar__mobile-cta')) return;
    const wrap = document.createElement('div');
    wrap.className = 'navbar__mobile-cta';
    wrap.appendChild(navCta.cloneNode(true));
    navMenu.appendChild(wrap);
  }

  function setNavOpen(open) {
    if (!hamburger || !navMenu) return;
    hamburger.classList.toggle('active', open);
    navMenu.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('nav-open', open);
  }

  function closeNavMenu() {
    setNavOpen(false);
  }

  syncMobileNavCta();

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      setNavOpen(!hamburger.classList.contains('active'));
    });
  }

  // Close mobile menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (hamburger && hamburger.classList.contains('active')) {
        closeNavMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (hamburger && navMenu && 
        !hamburger.contains(e.target) && 
        !navMenu.contains(e.target) &&
        hamburger.classList.contains('active')) {
      closeNavMenu();
    }
  });

  // Reset dropdown menu when leaving tablet/mobile breakpoints
  window.addEventListener('resize', function() {
    syncMobileNavCta();
    if (window.innerWidth > 1024) {
      closeNavMenu();
    }
  });

  // Set active nav link based on current page
  setActiveNavLink();
}

function initPastAuctionFilters() {
  const toolbar = document.querySelector('.past-auction-toolbar--collapsible');
  const toggleButton = toolbar ? toolbar.querySelector('[data-filter-toggle]') : null;

  if (!toolbar || !toggleButton) return;

  const syncToolbarState = () => {
    if (window.innerWidth > 1024) {
      toolbar.classList.remove('filters-open');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  };

  toggleButton.addEventListener('click', function() {
    const isOpen = toolbar.classList.toggle('filters-open');
    toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', function(event) {
    if (window.innerWidth > 1024) return;
    if (!toolbar.contains(event.target)) {
      toolbar.classList.remove('filters-open');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('resize', syncToolbarState);
  syncToolbarState();
}

function initSectionOneScrollAnimation() {
  const sectionOne = document.querySelector('.section-1');
  if (!sectionOne) return;

  sectionOne.classList.add('section-1--animate-ready');

  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      sectionOne.classList.add('section-1--in-view');
      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -60px 0px'
  });

  observer.observe(sectionOne);
}

function toggleSectionInView(section, options = {}) {
  if (!section) return;

  const {
    threshold = 0.2,
    rootMargin = '0px 0px -70px 0px',
    inViewClass,
    outOfViewClass
  } = options;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (outOfViewClass) section.classList.remove(outOfViewClass);
        if (inViewClass) section.classList.add(inViewClass);
      } else {
        if (inViewClass) section.classList.remove(inViewClass);
        if (outOfViewClass) section.classList.add(outOfViewClass);
      }
    });
  }, { threshold, rootMargin });

  observer.observe(section);
}

function initSectionTwoScrollAnimation() {
  const sectionTwo = document.querySelector('.section-2');
  if (!sectionTwo) return;

  const statCards = sectionTwo.querySelectorAll('.section-2__stat-card');
  sectionTwo.classList.add('section-2--animate-ready');

  statCards.forEach((card, index) => {
    const delay = 0.2 + index * 0.12;
    card.style.setProperty('--card-delay', `${delay}s`);
  });

  const isMobileSectionTwo = window.matchMedia('(max-width: 767px)').matches;
  if (isMobileSectionTwo) {
    sectionTwo.classList.add('section-2--in-view');
    animateSectionTwoCounters(sectionTwo);
    return;
  }

  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      sectionTwo.classList.add('section-2--in-view');
      animateSectionTwoCounters(sectionTwo);
      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.22,
    rootMargin: '0px 0px -70px 0px'
  });

  observer.observe(sectionTwo);
}

function animateSectionTwoCounters(sectionTwo) {
  const statNumbers = sectionTwo.querySelectorAll('.section-2__stat-number[data-count-target]');
  if (!statNumbers.length) return;

  statNumbers.forEach(statNumber => {
    const card = statNumber.closest('.section-2__stat-card');
    const cardDelay = card ? parseFloat(card.style.getPropertyValue('--card-delay')) || 0 : 0;
    const startDelay = (cardDelay + 0.55) * 1000;

    setTimeout(() => animateCounterValue(statNumber), startDelay);
  });
}

/** Prev/next + page buttons for `.auctions-pagination` (auctions, case studies, upcoming). */
function initPaginationControls() {
  document.querySelectorAll('.auctions-pagination').forEach((root) => {
    if (root.dataset.paginationBound === '1') return;

    const pageButtons = root.querySelectorAll('.auctions-pagination__page[data-page]');
    if (!pageButtons.length) return;

    root.dataset.paginationBound = '1';

    const prev = root.querySelector('.auctions-pagination__nav--prev');
    const next = root.querySelector('.auctions-pagination__nav--next');

    function getPageNumbers() {
      return Array.from(pageButtons)
        .map((b) => parseInt(b.getAttribute('data-page'), 10))
        .filter((n) => Number.isFinite(n))
        .sort((a, b) => a - b);
    }

    function getCurrentPage() {
      const active = root.querySelector('.auctions-pagination__page--active[data-page]');
      if (active) return parseInt(active.getAttribute('data-page'), 10);
      const nums = getPageNumbers();
      return nums.length ? nums[0] : 1;
    }

    function setActivePage(num) {
      const nums = getPageNumbers();
      if (!nums.includes(num)) return;
      pageButtons.forEach((btn) => {
        const p = parseInt(btn.getAttribute('data-page'), 10);
        const on = p === num;
        btn.classList.toggle('auctions-pagination__page--active', on);
        if (on) btn.setAttribute('aria-current', 'page');
        else btn.removeAttribute('aria-current');
      });
      const min = nums[0];
      const max = nums[nums.length - 1];
      if (prev) prev.disabled = num <= min;
      if (next) next.disabled = num >= max;
    }

    pageButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const p = parseInt(btn.getAttribute('data-page'), 10);
        if (Number.isFinite(p)) setActivePage(p);
      });
    });

    if (prev) {
      prev.addEventListener('click', () => {
        const nums = getPageNumbers();
        const cur = getCurrentPage();
        const idx = nums.indexOf(cur);
        if (idx > 0) setActivePage(nums[idx - 1]);
      });
    }

    if (next) {
      next.addEventListener('click', () => {
        const nums = getPageNumbers();
        const cur = getCurrentPage();
        const idx = nums.indexOf(cur);
        if (idx >= 0 && idx < nums.length - 1) setActivePage(nums[idx + 1]);
      });
    }

    setActivePage(getCurrentPage());
  });
}

function animateCounterValue(element) {
  if (element.dataset.countAnimated === 'true') return;
  element.dataset.countAnimated = 'true';

  const target = parseFloat(element.dataset.countTarget || '0');
  const prefix = element.dataset.countPrefix || '';
  const suffix = element.dataset.countSuffix || '';
  const decimals = parseInt(element.dataset.countDecimals || '0', 10);
  const plain = element.dataset.countPlain === 'true';
  const duration = parseInt(element.dataset.countDuration || '1500', 10) || 1500;
  const startTime = performance.now();

  const formatValue = value => new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: !plain
  }).format(value);

  const tick = now => {
    const progress = Math.min((now - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = target * easedProgress;
    const displayValue = decimals > 0 ? currentValue : Math.round(currentValue);

    element.textContent = `${prefix}${formatValue(displayValue)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

function initSectionThreeScrollAnimation() {
  const sectionThree = document.querySelector('.section-3');
  if (!sectionThree) return;

  const cards = sectionThree.querySelectorAll('.section-3__card');
  sectionThree.classList.add('section-3--animate-ready');

  cards.forEach((card, index) => {
    const delay = 0.75 + index * 0.16;
    card.style.setProperty('--card-delay', `${delay}s`);
  });

  const isMobileSectionThree = window.matchMedia('(max-width: 767px)').matches;

  toggleSectionInView(sectionThree, {
    threshold: isMobileSectionThree ? 0.12 : 0.18,
    rootMargin: isMobileSectionThree ? '0px' : '0px 0px -70px 0px',
    inViewClass: 'section-3--in-view'
  });
}

function initProcessSectionScroll() {
  const tracks = document.querySelectorAll('.process-scroll-track');
  if (!tracks.length) return;

  const thresholds = [0, 0.33, 0.66, 1];
  const COMPLETE_MS = 2200;

  function applyProcessTrackProgress(track, p) {
    const useDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const section = track.querySelector('.process-section');
    if (!section) return;

    const cardsStrip = section.querySelector('#cardsStrip') || section.querySelector('.cards-strip');
    const textStrip = section.querySelector('#textStrip') || section.querySelector('.text-strip');
    const timelineRow = section.querySelector('#timelineRow') || section.querySelector('.timeline-row');
    const progressEl = section.querySelector('#timelineBar') || section.querySelector('.timeline-progress');
    const badges = section.querySelectorAll('.step-badge');
    const mobileStack = section.querySelector('.process-mobile-stack');

    const clamped = Math.max(0, Math.min(1, p));
    const isMobileVertical = window.matchMedia('(max-width: 767px)').matches;

    if (progressEl) progressEl.style.width = `${clamped * 100}%`;
    if (mobileStack) mobileStack.style.setProperty('--process-p', String(clamped));

    badges.forEach(badge => {
      const i = Number(badge.getAttribute('data-index'));
      if (Number.isNaN(i)) return;
      const t = thresholds[i] ?? 1;
      const active = i === 0 ? clamped > 0 : clamped >= t;
      badge.classList.toggle('active', active);
    });

    if (isMobileVertical) {
      if (cardsStrip) cardsStrip.style.transform = '';
      if (textStrip) textStrip.style.transform = '';
      if (timelineRow) timelineRow.style.transform = '';
    } else if (useDesktop) {
      const firstCard = cardsStrip && cardsStrip.querySelector('.step-card');
      const halfCard = firstCard ? firstCard.offsetWidth / 2 : 0;
      const shiftPx = clamped * halfCard;
      const translate = `translateX(${-shiftPx}px)`;

      if (cardsStrip) cardsStrip.style.transform = translate;
      if (textStrip) textStrip.style.transform = translate;
      if (timelineRow) timelineRow.style.transform = translate;
    } else {
      const carouselPct = clamped * 75;
      const translate = `translateX(-${carouselPct}%)`;

      if (cardsStrip) cardsStrip.style.transform = translate;
      if (textStrip) textStrip.style.transform = translate;
      if (timelineRow) timelineRow.style.transform = '';
    }
  }

  function runCompletionAnimation(track) {
    if (track.dataset.processPlayDone === 'true') return;
    if (track.dataset.processPlayRunning === 'true') return;

    track.dataset.processPlayRunning = 'true';
    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      const linear = Math.min(1, elapsed / COMPLETE_MS);
      const eased = 1 - Math.pow(1 - linear, 3);

      applyProcessTrackProgress(track, eased);

      if (linear < 1) {
        requestAnimationFrame(frame);
      } else {
        track.dataset.processPlayDone = 'true';
        track.dataset.processPlayRunning = '';
        applyProcessTrackProgress(track, 1);
      }
    }

    requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const track = entry.target;
      io.unobserve(track);
      runCompletionAnimation(track);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px 0px 0px'
  });

  tracks.forEach(track => {
    io.observe(track);
    applyProcessTrackProgress(track, 0);
  });

  window.addEventListener('resize', () => {
    tracks.forEach(track => {
      if (track.dataset.processPlayDone === 'true') {
        applyProcessTrackProgress(track, 1);
      } else if (track.dataset.processPlayRunning !== 'true') {
        applyProcessTrackProgress(track, 0);
      }
    });
  });
}

function initSectionFourScrollAnimation() {
  const sections = document.querySelectorAll('.process-steps-section, .section-4-placeholder');
  if (!sections.length) return;

  sections.forEach(sectionFour => {
    if (sectionFour.closest('.process-scroll-track')) return;

    const observer = new IntersectionObserver((entries, sectionObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        if (sectionFour.classList.contains('animated')) {
          sectionObserver.unobserve(entry.target);
          return;
        }

        const stepCards = sectionFour.querySelectorAll('.process-step, .section-4__content-card');
        const stepNumbers = sectionFour.querySelectorAll('.step-number, .section-4__timeline-step');

        stepCards.forEach((card, index) => {
          const delay = index * 0.15;
          card.style.setProperty('--step-delay', `${delay}s`);
        });

        stepNumbers.forEach((badge, index) => {
          const delay = index * 0.15;
          badge.style.setProperty('--step-delay', `${delay}s`);
        });

        sectionFour.classList.add('animated');
        sectionObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.22,
      rootMargin: '0px 0px -60px 0px'
    });

    observer.observe(sectionFour);
  });
}

function initSectionFiveScrollAnimation() {
  const sectionFive = document.querySelector('.section-5-placeholder');
  if (!sectionFive) return;

  sectionFive.classList.add('section-5--animate-ready');
  toggleSectionInView(sectionFive, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px',
    inViewClass: 'section-5--in-view'
  });
}

function initSectionFiveMobileCarousel() {
  const mq = window.matchMedia('(max-width: 767px)');
  document.querySelectorAll('.section-5-placeholder').forEach(section => {
    const wrap = section.querySelector('.section-5__reviews-wrap');
    const list = section.querySelector('.section-5__review-list');
    const cards = list ? list.querySelectorAll('.section-5__review-card') : null;
    const prev = wrap ? wrap.querySelector('.section-5__carousel-btn--prev') : null;
    const next = wrap ? wrap.querySelector('.section-5__carousel-btn--next') : null;
    if (!list || !cards || cards.length < 2 || !prev || !next) return;

    let desktopActiveIndex = [...cards].findIndex(c => c.classList.contains('section-5__review-card--active'));
    if (desktopActiveIndex < 0) desktopActiveIndex = 0;

    let index = desktopActiveIndex;

    function applyDesktop() {
      cards.forEach((c, i) => {
        c.classList.toggle('section-5__review-card--active', i === desktopActiveIndex);
      });
    }

    function applyMobile() {
      const n = cards.length;
      index = ((index % n) + n) % n;
      desktopActiveIndex = index;
      cards.forEach((c, j) => {
        c.classList.toggle('section-5__review-card--active', j === index);
      });
    }

    function sync() {
      if (mq.matches) {
        if (index < 0) index = 1;
        applyMobile();
      } else {
        applyDesktop();
      }
    }

    prev.addEventListener('click', () => {
      if (mq.matches) {
        index = (index - 1 + cards.length) % cards.length;
        applyMobile();
      } else {
        desktopActiveIndex = (desktopActiveIndex - 1 + cards.length) % cards.length;
        applyDesktop();
      }
    });
    next.addEventListener('click', () => {
      if (mq.matches) {
        index = (index + 1) % cards.length;
        applyMobile();
      } else {
        desktopActiveIndex = (desktopActiveIndex + 1) % cards.length;
        applyDesktop();
      }
    });

    mq.addEventListener('change', sync);
    sync();
  });
}

function initSectionSixScrollAnimation() {
  const sectionSix = document.querySelector('.section-6-industries');
  if (!sectionSix) return;

  const cards = sectionSix.querySelectorAll('.industry-card');
  sectionSix.classList.add('section-6--animate-ready');

  cards.forEach((card, index) => {
    const delay = 0.22 + index * 0.14;
    card.style.setProperty('--industry-delay', `${delay}s`);
  });

  toggleSectionInView(sectionSix, {
    threshold: 0.2,
    rootMargin: '0px 0px -70px 0px',
    inViewClass: 'section-6--in-view'
  });
}

function initSectionSevenScrollAnimation() {
  const sectionSeven = document.querySelector('.section-7-newsletter');
  if (!sectionSeven) return;

  sectionSeven.classList.add('section-7--animate-ready');
  toggleSectionInView(sectionSeven, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px',
    inViewClass: 'section-7--in-view'
  });
}

function initSectionEightScrollAnimation() {
  const sectionEightBlocks = document.querySelectorAll('.section-8-cta');
  if (!sectionEightBlocks.length) return;

  sectionEightBlocks.forEach(sectionEight => {
    sectionEight.classList.add('section-8--animate-ready');
    toggleSectionInView(sectionEight, {
      threshold: 0.2,
      rootMargin: '0px 0px -80px 0px',
      inViewClass: 'section-8--in-view'
    });
  });
}

function initHomeRsBottomLayoutScrollAnimation() {
  const bottomLayout = document.querySelector('.home-page .rs-bottom-layout');
  if (!bottomLayout) return;

  bottomLayout.classList.add('rs-bottom-layout--animate-ready');
  toggleSectionInView(bottomLayout, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px',
    inViewClass: 'rs-bottom-layout--in-view'
  });
}

function initFooterScrollAnimation() {
  const footers = document.querySelectorAll('.footer');
  if (!footers.length) return;

  footers.forEach(footer => {
    footer.classList.add('footer--animate-ready');

    const observer = new IntersectionObserver((entries, footerObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        footer.classList.add('footer--in-view');
        footerObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    observer.observe(footer);
  });
}

function initSellTrustedScrollAnimation() {
  const section = document.querySelector('.sell-trusted-section');
  if (!section) return;

  section.classList.add('sell-trusted--animate-ready');

  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      section.classList.add('sell-trusted--in-view');
      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px'
  });

  observer.observe(section);
}

function initSellResultsScrollAnimation() {
  const section = document.querySelector('.sell-results-section');
  if (!section) return;

  const statNumbers = section.querySelectorAll('.sell-results__stat-item h3[data-count-target]');
  section.classList.add('sell-results--animate-ready');

  statNumbers.forEach((stat, index) => {
    const delay = 0.5 + index * 0.16;
    stat.style.setProperty('--result-stat-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      section.classList.add('sell-results--in-view');

      statNumbers.forEach((stat, index) => {
        const countDelay = 760 + index * 180;
        setTimeout(() => animateCounterValue(stat), countDelay);
      });

      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.22,
    rootMargin: '0px 0px -80px 0px'
  });

  observer.observe(section);
}

function initSellFaqScrollAnimation() {
  const section = document.querySelector('.sell-faq-section');
  if (!section) return;

  const faqRows = section.querySelectorAll('.sell-faq__list details');
  section.classList.add('sell-faq--animate-ready');

  faqRows.forEach((row, index) => {
    const delay = 0.32 + index * 0.08;
    row.style.setProperty('--faq-row-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      section.classList.add('sell-faq--in-view');
      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -70px 0px'
  });

  observer.observe(section);
}

function initSellPricingScrollAnimation() {
  const section = document.querySelector('.sell-pricing-section');
  if (!section) return;

  const lines = section.querySelectorAll('.sell-pricing__list li');
  section.classList.add('sell-pricing--animate-ready');

  lines.forEach((line, index) => {
    const delay = 0.34 + index * 0.08;
    line.style.setProperty('--pricing-line-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('sell-pricing--in-view');
      } else {
        section.classList.remove('sell-pricing--in-view');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -10% 0px'
  });

  observer.observe(section);
}

function initSellContactScrollAnimation() {
  const section = document.querySelector('.sell-contact-section');
  if (!section) return;

  section.classList.add('sell-contact--animate-ready');

  const leftSequence = section.querySelectorAll(
    '.sell-contact__title, .sell-contact__subtitle, .sell-contact__form input'
  );

  leftSequence.forEach((el, index) => {
    const delay = 0.12 + index * 0.1;
    el.style.setProperty('--contact-line-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      section.classList.add('sell-contact--in-view');
      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -70px 0px'
  });

  observer.observe(section);
}

function initContactDetailsScrollAnimation() {
  const section = document.querySelector('.contact-page .contact-details-section');
  if (!section) return;

  section.classList.add('contact-details--animate-ready');

  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      section.classList.add('contact-details--in-view');
      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -70px 0px'
  });

  observer.observe(section);
}

function initPickupSectionScrollAnimation() {
  const section = document.querySelector('.contact-page .pickup-section');
  if (!section) return;

  section.classList.add('pickup-section--animate-ready');

  const rightLines = section.querySelectorAll('.pickup-content h2, .pickup-content p, .pickup-content .link-orange, .pickup-form input');
  rightLines.forEach((line, index) => {
    const delay = 0.16 + index * 0.1;
    line.style.setProperty('--pickup-line-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      section.classList.add('pickup-section--in-view');
      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -70px 0px'
  });

  observer.observe(section);
}

function initAboutMissionScrollAnimation() {
  const section = document.querySelector('.about-mission-feature');
  if (!section) return;

  section.classList.add('about-mission--animate-ready');

  const rightLines = section.querySelectorAll('.about-mission-feature__text p, .about-mission-feature__text li');
  rightLines.forEach((line, index) => {
    const delay = 0.3 + index * 0.1;
    line.style.setProperty('--mission-line-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('about-mission--in-view');
      } else {
        section.classList.remove('about-mission--in-view');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px'
  });

  observer.observe(section);
}

function initAboutValuesScrollAnimation() {
  const section = document.querySelector('.about-values-feature');
  if (!section) return;

  section.classList.add('about-values--animate-ready');

  const cards = section.querySelectorAll('.about-values-feature__card');
  cards.forEach((card, index) => {
    const delay = 0.22 + index * 0.12;
    card.style.setProperty('--about-values-card-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('about-values--in-view');
      } else {
        section.classList.remove('about-values--in-view');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px'
  });

  observer.observe(section);
}

function initAboutDifferentScrollAnimation() {
  const section = document.querySelector('.about-different-section');
  if (!section) return;

  section.classList.add('about-different--animate-ready');

  const rightTextLines = section.querySelectorAll('.about-different__content h2, .about-different__content p');
  rightTextLines.forEach((line, index) => {
    const delay = 0.18 + index * 0.12;
    line.style.setProperty('--different-text-delay', `${delay}s`);
  });

  const bottomLines = section.querySelectorAll('.about-different__content ul li, .about-different__btn');
  bottomLines.forEach((line, index) => {
    const delay = 0.44 + index * 0.1;
    line.style.setProperty('--different-bottom-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('about-different--in-view');
      } else {
        section.classList.remove('about-different--in-view');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px'
  });

  observer.observe(section);
}

function initAboutTeamScrollAnimation() {
  const section = document.querySelector('.about-block--team');
  if (!section) return;

  section.classList.add('about-team--animate-ready');

  const cards = section.querySelectorAll('.about-team-card');
  cards.forEach((card, index) => {
    let delay = 0.58;
    if (index === 1) delay = 0.28;
    if (index === 2) delay = 0.74;
    card.style.setProperty('--team-card-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('about-team--in-view');
      } else {
        section.classList.remove('about-team--in-view');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px'
  });

  observer.observe(section);
}

function initCaseFilterScrollAnimation() {
  const section = document.querySelector('.case-filter-section');
  if (!section) return;

  section.classList.add('case-filter--animate-ready');

  const cards = section.querySelectorAll('.industry-card');
  cards.forEach((card, index) => {
    const delay = 0.24 + index * 0.08;
    card.style.setProperty('--case-card-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('case-filter--in-view');
      } else {
        section.classList.remove('case-filter--in-view');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px'
  });

  observer.observe(section);
}

function initAuctionsMarketTabs() {
  if (document.body.classList.contains('upcoming-auctions-page')) return;

  const section = document.querySelector('.auctions-page .auctions-listing-section');
  if (!section) return;

  const tabs = section.querySelectorAll('.auctions-market-overlay__top .auctions-market-overlay__tab');
  const cards = section.querySelectorAll('.auctions-cards-grid .section-3__card');
  const emptyMsg = document.getElementById('auctionsMarketEmpty');
  const browseLabel = section.querySelector('.auctions-market-overlay__label');
  const pagination = section.querySelector('.auctions-pagination');

  if (!tabs.length || !cards.length) return;

  function applyFilter(market) {
    let visible = 0;
    cards.forEach((card) => {
      const m = card.getAttribute('data-auction-market') || 'marketplace';
      const show = m === market;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (emptyMsg) {
      emptyMsg.hidden = visible > 0;
    }
    if (pagination) {
      pagination.hidden = visible === 0;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const market = tab.getAttribute('data-market');
      if (!market) return;

      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('auctions-market-overlay__tab--active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      const labelText = tab.getAttribute('data-browse-label');
      if (browseLabel && labelText) {
        browseLabel.textContent = labelText;
      }

      applyFilter(market);
    });
  });
}

function initAuctionsListingIntroAnimation() {
  const section = document.querySelector('.auctions-page .auctions-listing-section');
  if (!section) return;
  const isUpcomingPage = document.body.classList.contains('upcoming-auctions-page');

  section.classList.add('auctions-listing--animate-ready');
  if (isUpcomingPage) {
    section.classList.add('upcoming-options--animate');
  }

  const tabs = section.querySelectorAll('.auctions-market-overlay__top .auctions-market-overlay__tab');
  tabs.forEach((tab, index) => {
    const delay = 0.1 + index * 0.08;
    tab.style.setProperty('--auction-filter-delay', `${delay}s`);
  });

  const searchRow = section.querySelector('.auctions-market-overlay__search-row');
  if (searchRow) {
    searchRow.style.setProperty('--auction-filter-delay', `${0.16 + tabs.length * 0.08}s`);
  }

  const categories = section.querySelectorAll('.auctions-market-overlay__label, .auctions-market-overlay__grid > *');
  categories.forEach((item, index) => {
    const delay = 0.28 + index * 0.045;
    item.style.setProperty('--auction-category-delay', `${delay}s`);
    if (isUpcomingPage) {
      const heroSyncedDelay = 1.02 + index * 0.08;
      item.style.setProperty('--upcoming-option-delay', `${heroSyncedDelay}s`);
    }
  });

  // Ensure initial right-offset state is painted before in-view class.
  void section.offsetWidth;

  // Start filter/tabs intro with hero load timing (no scroll wait).
  setTimeout(() => {
    section.classList.add('auctions-listing--in-view');
  }, 420);
}

function initAuctionsCardsGridAnimation() {
  const grid = document.querySelector('.auctions-page .auctions-cards-grid');
  if (!grid) return;

  const cards = grid.querySelectorAll('.section-3__card');
  grid.classList.add('auctions-cards-grid--animate-ready');

  cards.forEach((card, index) => {
    const delay = 0.16 + index * 0.08;
    card.style.setProperty('--auction-card-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries, gridObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      grid.classList.add('auctions-cards-grid--in-view');
      animateAuctionListingStatCounters(grid);
      gridObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -80px 0px'
  });

  observer.observe(grid);
}

/** Count-up for auction card stats after soft fade-in (main auctions listing only). */
function animateAuctionListingStatCounters(grid) {
  if (document.body.classList.contains('upcoming-auctions-page')) return;

  const cards = grid.querySelectorAll('.section-3__card');
  if (!cards.length) return;

  cards.forEach((card, cardIndex) => {
    const labels = card.querySelectorAll('.section-3__stat-label[data-count-target]');
    const cardDelayMs = (0.16 + cardIndex * 0.08) * 1000;
    /* Align with .section-3__content transition-delay (+0.6s) + duration (~0.65s) */
    const afterContentFadeMs = 1180;

    labels.forEach((label, statIndex) => {
      const startMs = cardDelayMs + afterContentFadeMs + statIndex * 140;
      setTimeout(() => animateCounterValue(label), startMs);
    });
  });
}

function initUpcomingPastAuctionAnimation() {
  if (!document.body.classList.contains('upcoming-auctions-page')) return;

  const section = document.querySelector('.upcoming-auctions-page .auctions-listing-section');
  const header = section?.querySelector('.upcoming-past-auction__header');
  const toolbar = section?.querySelector('.past-auction-toolbar');
  const cards = section?.querySelectorAll('.upcoming-past-auction__cards .industry-card');
  if (!section || !header || !toolbar || !cards?.length) return;

  section.classList.add('upcoming-past--animate-ready');

  const filterItems = toolbar.querySelectorAll('.past-auction-toolbar__filter-trigger, .past-auction-toolbar__item--option');
  filterItems.forEach((item, index) => {
    const delay = 0.18 + index * 0.08;
    item.style.setProperty('--upcoming-filter-delay', `${delay}s`);
  });

  cards.forEach((card, index) => {
    const delay = 0.24 + index * 0.08;
    card.style.setProperty('--upcoming-past-card-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      section.classList.add('upcoming-past--in-view');
      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -80px 0px'
  });

  observer.observe(header);
}

function initAuctionsResultsAnimation() {
  const section = document.querySelector('.auctions-page .auctions-results-section');
  if (!section) return;

  section.classList.add('auctions-results--animate-ready');

  const rightTextBlocks = section.querySelectorAll('.auctions-results__text article');
  rightTextBlocks.forEach((item, index) => {
    const delay = 0.28 + index * 0.12;
    item.style.setProperty('--auction-result-text-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      section.classList.add('auctions-results--in-view');
      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -70px 0px'
  });

  observer.observe(section);
}

function initAuctionsDrivingAnimation() {
  const section = document.querySelector('.auctions-page .auctions-driving-section');
  if (!section) return;

  const counterNumbers = section.querySelectorAll('.auctions-driving__stat h3[data-count-target]');

  counterNumbers.forEach((el) => {
    const prefix = el.dataset.countPrefix || '';
    const suffix = el.dataset.countSuffix || '';
    const decimals = parseInt(el.dataset.countDecimals || '0', 10);
    const plain = el.dataset.countPlain === 'true';
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: !plain
    }).format(0);
    el.textContent = `${prefix}${formatted}${suffix}`;
  });

  section.classList.add('auctions-driving--animate-ready');

  const FADE_MS = 1000;
  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      section.classList.add('auctions-driving--in-view');

      counterNumbers.forEach((el, index) => {
        const startDelay = FADE_MS + 120 + index * 200;
        setTimeout(() => animateCounterValue(el), startDelay);
      });

      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -70px 0px'
  });

  observer.observe(section);
}

function initAuctionSingleSpecAnimation() {
  const section = document.querySelector('.auction-single-page .auction-single-spec-section');
  if (!section) return;

  section.classList.add('auction-single-spec--animate-ready');

  const metrics = section.querySelectorAll('.auction-single-spec-metrics article');
  metrics.forEach((item, index) => {
    const delay = 0.24 + index * 0.1;
    item.style.setProperty('--spec-metric-delay', `${delay}s`);
  });

  const rightHeading = section.querySelector('.auction-single-spec-right h3');
  const rightParagraph = section.querySelector('.auction-single-spec-right > p');
  if (rightHeading) rightHeading.style.setProperty('--spec-right-delay', '0.2s');
  if (rightParagraph) rightParagraph.style.setProperty('--spec-right-delay', '0.32s');

  const rightLines = section.querySelectorAll('.auction-single-spec-right li');
  rightLines.forEach((line, index) => {
    const delay = 0.42 + index * 0.09;
    line.style.setProperty('--spec-line-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      section.classList.add('auction-single-spec--in-view');
      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px'
  });

  observer.observe(section);
}

function initAuctionSinglePickupAnimation() {
  const section = document.querySelector('.auction-single-page .auction-single-pickup-section');
  if (!section) return;

  section.classList.add('auction-single-pickup--animate-ready');

  const cards = section.querySelectorAll('.auction-single-pickup-card');
  cards.forEach((card, index) => {
    const delay = 0.3 + index * 0.14;
    card.style.setProperty('--auction-single-pickup-delay', `${delay}s`);
  });

  const observer = new IntersectionObserver((entries, sectionObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      section.classList.add('auction-single-pickup--in-view');
      sectionObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -70px 0px'
  });

  observer.observe(section);
}

/**
 * Set active navigation link based on current page URL
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.classList.remove('active');

    const href = link.getAttribute('href');

    // Check if link matches current page
    if (currentPath.includes(href.replace('.html', '').replace('./', '')) ||
        (href === 'index.html' && currentPath === '/') ||
        (href === './' && currentPath === '/')) {
      link.classList.add('active');
    }
  });
}

/**
 * Modal functionality
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside content
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

/**
 * Smooth scroll to section
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Image lazy loading
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Format price for display
 */
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Format date for display
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Handle form submission
 */
function handleFormSubmit(formElement, callback) {
  if (!formElement) return;

  formElement.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (isFormValid(data)) {
      if (callback) {
        callback(data);
      } else {
        // Default: show success message
        showNotification('Form submitted successfully!', 'success');
        formElement.reset();
      }
    }
  });
}

/**
 * Validate form data
 */
function isFormValid(data) {
  for (let key in data) {
    if (data[key].trim() === '') {
      showNotification(`${key} is required`, 'error');
      return false;
    }
  }
  return true;
}

/**
 * Show notification/toast message
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Modal functionality
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside content
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

/**
 * Smooth scroll to section
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Image lazy loading
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Format price for display
 */
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Format date for display
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Handle form submission
 */
function handleFormSubmit(formElement, callback) {
  if (!formElement) return;

  formElement.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (isFormValid(data)) {
      if (callback) {
        callback(data);
      } else {
        // Default: show success message
        showNotification('Form submitted successfully!', 'success');
        formElement.reset();
      }
    }
  });
}

/**
 * Validate form data
 */
function isFormValid(data) {
  for (let key in data) {
    if (data[key].trim() === '') {
      showNotification(`${key} is required`, 'error');
      return false;
    }
  }
  return true;
}

/**
 * Show notification/toast message
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
