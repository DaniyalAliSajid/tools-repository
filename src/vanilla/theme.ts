const THEME_KEY = 'toolsrepository-theme';

export function initTheme(): void {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
}

export function toggleTheme(): void {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
}

export function getCurrentTheme(): string {
    return document.documentElement.getAttribute('data-theme') || 'light';
}
