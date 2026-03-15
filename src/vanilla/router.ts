import { getToolBySlug } from './registry';
import { updateSEO } from './seo';
import { ToolModule } from './types';
import { renderHome } from './main';

let currentTool: ToolModule | null = null;

export function initRouter(): void {
    window.addEventListener('hashchange', () => handleRoute());
    handleRoute();
}

export async function handleRoute(): Promise<void> {
    const hash = window.location.hash.slice(1); // remove #
    const mainEl = document.getElementById('main-content');
    if (!mainEl) return;

    // Destroy previous tool
    if (currentTool?.destroy) {
        currentTool.destroy();
        currentTool = null;
    }

    if (hash.startsWith('/tool/')) {
        const slug = hash.replace('/tool/', '');
        const toolEntry = getToolBySlug(slug);
        if (toolEntry) {
            updateSEO(toolEntry);
            mainEl.innerHTML = `
        <div class="tool-page">

            <h1 class="tool-page__title">${toolEntry.icon} ${toolEntry.name}</h1>
            <p class="tool-page__description">${toolEntry.description}</p>
          </div>
          <div class="tool-page__content" id="tool-container"></div>
          <div class="ad-slot" id="ad-tool-bottom">Ad Space</div>
        </div>
      `;
            const container = document.getElementById('tool-container')!;
            try {
                const mod = await toolEntry.module();
                currentTool = mod;
                mod.render(container);
            } catch (err) {
                container.innerHTML = `<p style="color:var(--color-error)">Failed to load tool. Please try again.</p>`;
                console.error(err);
            }
        } else {
            mainEl.innerHTML = `
        <div class="no-results">
          <div class="no-results__icon">🔍</div>
          <p class="no-results__text">Tool not found</p>
          <a href="#/" class="btn btn--primary" style="margin-top:1rem">Go Home</a>
        </div>
      `;
        }
    } else {
        updateSEO();
        renderHome(mainEl);
    }

    // Update active category nav
    const navItems = document.querySelectorAll('.category-nav__item');
    navItems.forEach((item) => {
        const cat = (item as HTMLElement).dataset.category;
        if (hash === '/' || !hash) {
            item.classList.toggle('active', cat === 'all');
        }
    });

    // Update active header links
    const headerLinks = document.querySelectorAll('.header__link');
    headerLinks.forEach((link) => {
        const route = (link as HTMLElement).dataset.route;
        const isActive = (hash === '' && route === '/') || (hash === route) || (hash.startsWith(route + '/') && route !== '/');
        link.classList.toggle('active', isActive);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
