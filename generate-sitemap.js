const fs = require('fs');
const path = require('path');

// Mock tools for script (we'll read the registry file instead)
const registryPath = path.join(__dirname, 'src', 'vanilla', 'registry.ts');
const registryContent = fs.readFileSync(registryPath, 'utf8');

// Simple regex to find slugs in the registry.ts file
const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const slugs = [];
let match;
while ((match = slugRegex.exec(registryContent)) !== null) {
    slugs.push(match[1]);
}

const baseUrl = 'https://tools-repository.com';
const basePages = ['', '/about', '/contact', '/advertise', '/privacy', '/terms'];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

basePages.forEach(page => {
    xml += `  <url>\n    <loc>${baseUrl}${page}</loc>\n    <priority>0.8</priority>\n  </url>\n`;
});

slugs.forEach(slug => {
    xml += `  <url>\n    <loc>${baseUrl}/tool/${slug}</loc>\n    <priority>0.6</priority>\n  </url>\n`;
});

xml += '</urlset>';

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), xml);
console.log(`Generated sitemap.xml with ${slugs.length + basePages.length} URLs`);
