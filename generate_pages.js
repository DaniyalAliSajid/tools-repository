const fs = require('fs');

const registryContent = fs.readFileSync('./src/vanilla/registry.ts', 'utf-8');
const slugMatches = [...registryContent.matchAll(/slug: '([^']+)'/g)].map(m => m[1]);
const categoryMatches = [...registryContent.matchAll(/category: '([^']+)'/g)].map(m => m[1]);
const nameMatches = [...registryContent.matchAll(/name: '([^']+)'/g)].map(m => m[1]);

const tools = slugMatches.map((slug, i) => ({
  slug,
  category: categoryMatches[i],
  name: nameMatches[i]
}));

const categoryColors = {
  text: '#3b82f6',
  calculators: '#10b981',
  security: '#f43f5e',
  developer: '#8b5cf6',
  converters: '#f59e0b',
  productivity: '#14b8a6',
  health: '#ec4899',
};

// SEO Overrides for exact match keywords based on GSC data
const SEO_OVERRIDES = {
  'button-generator': 'CSS Button Generator',
  'flexbox-generator': 'CSS Flexbox Generator',
  'html-table-generator': 'HTML Table Generator',
  'steps-to-km': 'Steps to KM Converter',
  'time-duration-calculator': 'Duration Calculator',
  'cgpa-calculator': 'CGPA Calculator',
  'zalgo-text-generator': 'Zalgo Text Generator',
  'xml-to-csv': 'XML to CSV Converter'
};

const selectedTools = tools;

let configTS = `export type Cluster = 'text' | 'calculators' | 'security' | 'developer' | 'converters' | 'productivity' | 'health';

export interface SEOPageConfig {
  keyword: string;
  slug: string;
  modifier: string;
  cluster: Cluster;
  angle: string;
  themeColor: string;
}

export const SEO_PAGES_CONFIG: SEOPageConfig[] = [\n`;

let linkingTS = `import { SEO_PAGES_CONFIG, Cluster } from './seo-pages.config';

type ClusterName = Cluster;

interface ClusterEntry {
  cluster: ClusterName;
  primary: string;
  crossCluster: string;
}

export interface InternalLinks {
  parentTool: { text: string; href: string };
  relatedInCluster: { text: string; href: string }[];
  crossCluster: { text: string; href: string };
  conversionPage: { text: string; href: string };
}

export const CLUSTER_MAP: Record<string, ClusterEntry> = {\n`;

selectedTools.forEach((tool, i) => {
  const seoSlug = `best-${tool.slug}-online`;
  const keyword = SEO_OVERRIDES[tool.slug] || `best ${tool.name.toLowerCase()} online`;
  const color = categoryColors[tool.category] || '#3b82f6';
  
  const crossClusterTool = selectedTools.find(t => t.category !== tool.category);
  const crossClusterSlug = crossClusterTool ? `best-${crossClusterTool.slug}-online` : 'best-word-counter-online';

  configTS += `  {
    keyword: '${keyword}',
    slug: '${seoSlug}',
    modifier: 'best online',
    cluster: '${tool.category}' as Cluster,
    angle: 'transactional',
    themeColor: '${color}',
  },\n`;

  linkingTS += `  '${seoSlug}': { cluster: '${tool.category}' as Cluster, primary: '${tool.slug}', crossCluster: '${crossClusterSlug}' },\n`;
});

configTS += `];\n`;

linkingTS += `};

const ANCHOR_VARIATIONS = [
  (tool: string) => \`Use \${formatName(tool)} Free\`,
  (tool: string) => \`Try \${formatName(tool)} Now\`,
  (tool: string) => \`\${formatName(tool)} Tool\`,
  (tool: string) => \`Access \${formatName(tool)} Online\`,
];

function formatName(str: string): string {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; 
  }
  return Math.abs(hash);
}

function pickAnchor(sourceSlug: string, targetSlug: string): string {
  const hash = stringHash(\`\${sourceSlug}->\${targetSlug}\`);
  const index = hash % ANCHOR_VARIATIONS.length;
  return ANCHOR_VARIATIONS[index](targetSlug);
}

export function getInternalLinks(currentSlug: string): InternalLinks {
  const meta = CLUSTER_MAP[currentSlug];
  if (!meta) {
    throw new Error(
      \`[seo-linking] Slug "\${currentSlug}" is not registered in CLUSTER_MAP.\`
    );
  }

  const { cluster, primary, crossCluster } = meta;

  const parentTool = { text: pickAnchor(currentSlug, primary), href: \`/tool/\${primary}\` };

  const relatedInCluster = Object.entries(CLUSTER_MAP)
    .filter(([slug, entry]) => slug !== currentSlug && entry.cluster === cluster)
    .slice(0, 2)
    .map(([slug]) => ({
      text: pickAnchor(currentSlug, slug),
      href: \`/seo/\${slug}\`,
    }));

  const crossClusterLink = {
    text: pickAnchor(currentSlug, crossCluster),
    href: \`/seo/\${crossCluster}\`,
  };

  return {
    parentTool,
    relatedInCluster,
    crossCluster: crossClusterLink,
    conversionPage: parentTool,
  };
}
`;

fs.writeFileSync('./src/utils/seo-pages.config.ts', configTS);
fs.writeFileSync('./src/utils/seo-linking.ts', linkingTS);

console.log(`Successfully generated ${selectedTools.length} new SEO pages and linked them!`);
