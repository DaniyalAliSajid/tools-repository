import './css/variables.css';
import './css/base.css';
import './css/layout.css';
import './css/components.css';
import './css/themes.css';

import { initTheme, toggleTheme, getCurrentTheme } from './theme';
import { initRouter, handleRoute } from './router';
import { tools, categories, getToolsByCategory, searchTools } from './registry';
import { ToolEntry } from './types';

// Initialize app
initTheme();

const app = document.getElementById('app')!;
app.innerHTML = `
  <header class="header">
    <a href="#/" class="header__logo">
      <span class="header__logo-icon">F</span>
      <span>Tools Repository</span>
    </a>
    <div class="header__search" id="search-wrapper">
      <span class="header__search-icon">🔍</span>
      <input
        type="search"
        class="header__search-input"
        id="search-input"
        placeholder="Search tools..."
        aria-label="Search tools"
      />
    </div>
    <div class="header__actions">
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
        ${getCurrentTheme() === 'dark' ? '☀️' : '🌙'}
      </button>
      <button class="mobile-menu-btn" id="mobile-search-btn" aria-label="Toggle search">🔍</button>
    </div>
  </header>
  <nav class="category-nav" id="category-nav">
    <ul class="category-nav__list">
      <li class="category-nav__item active" data-category="all">🏠 All Tools</li>
      ${categories
    .map(
      (c) =>
        `<li class="category-nav__item" data-category="${c.id}">${c.icon} ${c.name}</li>`
    )
    .join('')}
    </ul>
  </nav>
  <main class="main" id="main-content"></main>
  <footer class="footer">
    <div class="footer__inner">
      <p class="footer__text">© ${new Date().getFullYear()} Tools Repository — 100% Free, No Signup</p>
      <div class="footer__links">
        <a href="#/">Home</a>
        <a href="#/about">About</a>
      </div>
    </div>
  </footer>
`;

// Theme toggle
document.getElementById('theme-toggle')!.addEventListener('click', () => {
  toggleTheme();
  document.getElementById('theme-toggle')!.textContent =
    getCurrentTheme() === 'dark' ? '☀️' : '🌙';
});

// Mobile search toggle
document.getElementById('mobile-search-btn')!.addEventListener('click', () => {
  document.getElementById('search-wrapper')!.classList.toggle('show');
});

// Category navigation
document.querySelectorAll('.category-nav__item').forEach((item) => {
  item.addEventListener('click', () => {
    const category = (item as HTMLElement).dataset.category || 'all';
    document.querySelectorAll('.category-nav__item').forEach((i) => i.classList.remove('active'));
    item.classList.add('active');

    // If not on homepage, go to homepage first
    if (window.location.hash.startsWith('#/tool/')) {
      window.location.hash = '/';
    }

    const mainEl = document.getElementById('main-content')!;
    const filtered = getToolsByCategory(category);
    renderHome(mainEl, filtered, category);
  });
});

// Search
let searchTimeout: ReturnType<typeof setTimeout>;
document.getElementById('search-input')!.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const query = (e.target as HTMLInputElement).value;
    if (window.location.hash.startsWith('#/tool/')) {
      window.location.hash = '/';
    }
    const mainEl = document.getElementById('main-content')!;
    const results = searchTools(query);
    renderHome(mainEl, results, 'all');

    // Reset category nav
    document.querySelectorAll('.category-nav__item').forEach((i) => {
      i.classList.toggle('active', (i as HTMLElement).dataset.category === 'all');
    });
  }, 200);
});

// Render homepage
export function renderHome(
  container: HTMLElement,
  toolList?: ToolEntry[],
  _activeCategory?: string
): void {
  const displayTools = toolList || tools;

  container.innerHTML = `
    <section class="hero">
      <span class="hero__badge">✨ 100% Free & Browser-Based</span>
      <h1 class="hero__title">Your Daily Toolbox, Right in the Browser</h1>
    <p class="hero__subtitle">101 powerful tools for text, math, security & development. No signup, no backend, everything runs locally.</p>
    </section>
    <div class="ad-slot" id="ad-banner-top">Ad Space</div>
    ${displayTools.length > 0
      ? `<div class="tools-grid" id="tools-grid">
            ${displayTools.map((t) => renderToolCard(t)).join('')}
          </div>`
      : `<div class="no-results">
            <div class="no-results__icon">🔍</div>
            <p class="no-results__text">No tools found matching your search</p>
          </div>`
    }
  `;

  // Add click listeners to cards
  container.querySelectorAll('.tool-card').forEach((card) => {
    card.addEventListener('click', () => {
      const slug = (card as HTMLElement).dataset.slug;
      if (slug) window.location.hash = `/tool/${slug}`;
    });
  });
}

function renderToolCard(tool: ToolEntry): string {
  return `
    <article class="tool-card" data-slug="${tool.slug}" role="link" tabindex="0" aria-label="Open ${tool.name}">
      <div class="tool-card__icon tool-card__icon--${tool.category}">${tool.icon}</div>
      <h3 class="tool-card__name">${tool.name}</h3>
      <p class="tool-card__desc">${tool.description}</p>
      <span class="tool-card__arrow">Open tool →</span>
    </article>
  `;
}

// Initialize router (handles initial route)
initRouter();
