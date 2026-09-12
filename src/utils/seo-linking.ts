import { SEO_PAGES_CONFIG, Cluster } from './seo-pages.config';

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

export const CLUSTER_MAP: Record<string, ClusterEntry> = {
  // --- Original 8 Seed Pages ---
  'word-counter-online': { cluster: 'text' as Cluster, primary: 'word-counter', crossCluster: 'strong-password-generator' },
  'character-count-with-spaces': { cluster: 'text' as Cluster, primary: 'character-counter', crossCluster: 'calculate-bmi-online-free' },
  'how-to-remove-extra-spaces': { cluster: 'text' as Cluster, primary: 'remove-extra-spaces', crossCluster: 'calculate-bmi-online-free' },
  'calculate-bmi-online-free': { cluster: 'calculators' as Cluster, primary: 'bmi-calculator', crossCluster: 'word-counter-online' },
  'loan-emi-calculator-monthly': { cluster: 'calculators' as Cluster, primary: 'loan-emi-calculator', crossCluster: 'word-counter-online' },
  'json-formatter-validator': { cluster: 'developer' as Cluster, primary: 'json-formatter', crossCluster: 'strong-password-generator' },
  'css-gradient-generator-online': { cluster: 'developer' as Cluster, primary: 'gradient-generator', crossCluster: 'word-counter-online' },
  'strong-password-generator': { cluster: 'security' as Cluster, primary: 'password-generator', crossCluster: 'word-counter-online' },
  // --- 82 Generated Pages ---
  'best-word-counter-online': { cluster: 'text' as Cluster, primary: 'word-counter', crossCluster: 'best-basic-calculator-online' },
  'best-character-counter-online': { cluster: 'text' as Cluster, primary: 'character-counter', crossCluster: 'best-basic-calculator-online' },
  'best-case-converter-online': { cluster: 'text' as Cluster, primary: 'case-converter', crossCluster: 'best-basic-calculator-online' },
  'best-remove-extra-spaces-online': { cluster: 'text' as Cluster, primary: 'remove-extra-spaces', crossCluster: 'best-basic-calculator-online' },
  'best-text-reverser-online': { cluster: 'text' as Cluster, primary: 'text-reverser', crossCluster: 'best-basic-calculator-online' },
  'best-palindrome-checker-online': { cluster: 'text' as Cluster, primary: 'palindrome-checker', crossCluster: 'best-basic-calculator-online' },
  'best-json-formatter-online': { cluster: 'text' as Cluster, primary: 'json-formatter', crossCluster: 'best-basic-calculator-online' },
  'best-lorem-ipsum-generator-online': { cluster: 'text' as Cluster, primary: 'lorem-ipsum-generator', crossCluster: 'best-basic-calculator-online' },
  'best-text-to-slug-online': { cluster: 'text' as Cluster, primary: 'text-to-slug', crossCluster: 'best-basic-calculator-online' },
  'best-duplicate-line-remover-online': { cluster: 'text' as Cluster, primary: 'duplicate-line-remover', crossCluster: 'best-basic-calculator-online' },
  'best-binary-converter-online': { cluster: 'text' as Cluster, primary: 'binary-converter', crossCluster: 'best-basic-calculator-online' },
  'best-morse-code-converter-online': { cluster: 'text' as Cluster, primary: 'morse-code-converter', crossCluster: 'best-basic-calculator-online' },
  'best-list-sorter-online': { cluster: 'text' as Cluster, primary: 'list-sorter', crossCluster: 'best-basic-calculator-online' },
  'best-markdown-previewer-online': { cluster: 'text' as Cluster, primary: 'markdown-previewer', crossCluster: 'best-basic-calculator-online' },
  'best-text-diff-checker-online': { cluster: 'text' as Cluster, primary: 'text-diff-checker', crossCluster: 'best-basic-calculator-online' },
  'best-csv-to-json-online': { cluster: 'text' as Cluster, primary: 'csv-to-json', crossCluster: 'best-basic-calculator-online' },
  'best-json-to-csv-online': { cluster: 'text' as Cluster, primary: 'json-to-csv', crossCluster: 'best-basic-calculator-online' },
  'best-yaml-to-json-online': { cluster: 'text' as Cluster, primary: 'yaml-to-json', crossCluster: 'best-basic-calculator-online' },
  'best-nato-phonetic-online': { cluster: 'text' as Cluster, primary: 'nato-phonetic', crossCluster: 'best-basic-calculator-online' },
  'best-sentiment-analyzer-online': { cluster: 'text' as Cluster, primary: 'sentiment-analyzer', crossCluster: 'best-basic-calculator-online' },
  'best-rot13-encoder-online': { cluster: 'text' as Cluster, primary: 'rot13-encoder', crossCluster: 'best-basic-calculator-online' },
  'best-zalgo-text-generator-online': { cluster: 'text' as Cluster, primary: 'zalgo-text-generator', crossCluster: 'best-basic-calculator-online' },
  'best-upside-down-text-online': { cluster: 'text' as Cluster, primary: 'upside-down-text', crossCluster: 'best-basic-calculator-online' },
  'best-text-to-speech-online': { cluster: 'text' as Cluster, primary: 'text-to-speech', crossCluster: 'best-basic-calculator-online' },
  'best-email-extractor-online': { cluster: 'text' as Cluster, primary: 'email-extractor', crossCluster: 'best-basic-calculator-online' },
  'best-basic-calculator-online': { cluster: 'calculators' as Cluster, primary: 'basic-calculator', crossCluster: 'best-word-counter-online' },
  'best-percentage-calculator-online': { cluster: 'calculators' as Cluster, primary: 'percentage-calculator', crossCluster: 'best-word-counter-online' },
  'best-age-calculator-online': { cluster: 'calculators' as Cluster, primary: 'age-calculator', crossCluster: 'best-word-counter-online' },
  'best-bmi-calculator-online': { cluster: 'calculators' as Cluster, primary: 'bmi-calculator', crossCluster: 'best-word-counter-online' },
  'best-discount-calculator-online': { cluster: 'calculators' as Cluster, primary: 'discount-calculator', crossCluster: 'best-word-counter-online' },
  'best-loan-emi-calculator-online': { cluster: 'calculators' as Cluster, primary: 'loan-emi-calculator', crossCluster: 'best-word-counter-online' },
  'best-scientific-calculator-online': { cluster: 'calculators' as Cluster, primary: 'scientific-calculator', crossCluster: 'best-word-counter-online' },
  'best-time-duration-calculator-online': { cluster: 'calculators' as Cluster, primary: 'time-duration-calculator', crossCluster: 'best-word-counter-online' },
  'best-tip-calculator-online': { cluster: 'calculators' as Cluster, primary: 'tip-calculator', crossCluster: 'best-word-counter-online' },
  'best-compound-interest-calculator-online': { cluster: 'calculators' as Cluster, primary: 'compound-interest-calculator', crossCluster: 'best-word-counter-online' },
  'best-bmr-calculator-online': { cluster: 'calculators' as Cluster, primary: 'bmr-calculator', crossCluster: 'best-word-counter-online' },
  'best-sales-tax-calculator-online': { cluster: 'calculators' as Cluster, primary: 'sales-tax-calculator', crossCluster: 'best-word-counter-online' },
  'best-savings-goal-calculator-online': { cluster: 'calculators' as Cluster, primary: 'savings-goal-calculator', crossCluster: 'best-word-counter-online' },
  'best-fuel-cost-calculator-online': { cluster: 'calculators' as Cluster, primary: 'fuel-cost-calculator', crossCluster: 'best-word-counter-online' },
  'best-gpa-calculator-online': { cluster: 'calculators' as Cluster, primary: 'gpa-calculator', crossCluster: 'best-word-counter-online' },
  'best-cgpa-calculator-online': { cluster: 'calculators' as Cluster, primary: 'cgpa-calculator', crossCluster: 'best-word-counter-online' },
  'best-auto-loan-calculator-online': { cluster: 'calculators' as Cluster, primary: 'auto-loan-calculator', crossCluster: 'best-word-counter-online' },
  'best-mortgage-payoff-calculator-online': { cluster: 'calculators' as Cluster, primary: 'mortgage-payoff-calculator', crossCluster: 'best-word-counter-online' },
  'best-unix-timestamp-converter-online': { cluster: 'calculators' as Cluster, primary: 'unix-timestamp-converter', crossCluster: 'best-word-counter-online' },
  'best-base-converter-online': { cluster: 'calculators' as Cluster, primary: 'base-converter', crossCluster: 'best-word-counter-online' },
  'best-aspect-ratio-calculator-online': { cluster: 'calculators' as Cluster, primary: 'aspect-ratio-calculator', crossCluster: 'best-word-counter-online' },
  'best-date-difference-calculator-online': { cluster: 'calculators' as Cluster, primary: 'date-difference-calculator', crossCluster: 'best-word-counter-online' },
  'best-inflation-calculator-online': { cluster: 'calculators' as Cluster, primary: 'inflation-calculator', crossCluster: 'best-word-counter-online' },
  'best-password-generator-online': { cluster: 'security' as Cluster, primary: 'password-generator', crossCluster: 'best-word-counter-online' },
  'best-password-strength-checker-online': { cluster: 'security' as Cluster, primary: 'password-strength-checker', crossCluster: 'best-word-counter-online' },
  'best-random-number-generator-online': { cluster: 'security' as Cluster, primary: 'random-number-generator', crossCluster: 'best-word-counter-online' },
  'best-random-name-picker-online': { cluster: 'security' as Cluster, primary: 'random-name-picker', crossCluster: 'best-word-counter-online' },
  'best-uuid-generator-online': { cluster: 'security' as Cluster, primary: 'uuid-generator', crossCluster: 'best-word-counter-online' },
  'best-qr-code-generator-online': { cluster: 'security' as Cluster, primary: 'qr-code-generator', crossCluster: 'best-word-counter-online' },
  'best-color-palette-generator-online': { cluster: 'security' as Cluster, primary: 'color-palette-generator', crossCluster: 'best-word-counter-online' },
  'best-sha256-hash-online': { cluster: 'security' as Cluster, primary: 'sha256-hash', crossCluster: 'best-word-counter-online' },
  'best-md5-hash-online': { cluster: 'security' as Cluster, primary: 'md5-hash', crossCluster: 'best-word-counter-online' },
  'best-coin-flip-dice-online': { cluster: 'security' as Cluster, primary: 'coin-flip-dice', crossCluster: 'best-word-counter-online' },
  'best-random-string-generator-online': { cluster: 'security' as Cluster, primary: 'random-string-generator', crossCluster: 'best-word-counter-online' },
  'best-base64-encode-decode-online': { cluster: 'developer' as Cluster, primary: 'base64-encode-decode', crossCluster: 'best-word-counter-online' },
  'best-url-encoder-decoder-online': { cluster: 'developer' as Cluster, primary: 'url-encoder-decoder', crossCluster: 'best-word-counter-online' },
  'best-html-minifier-online': { cluster: 'developer' as Cluster, primary: 'html-minifier', crossCluster: 'best-word-counter-online' },
  'best-css-minifier-online': { cluster: 'developer' as Cluster, primary: 'css-minifier', crossCluster: 'best-word-counter-online' },
  'best-js-minifier-online': { cluster: 'developer' as Cluster, primary: 'js-minifier', crossCluster: 'best-word-counter-online' },
  'best-gradient-generator-online': { cluster: 'developer' as Cluster, primary: 'gradient-generator', crossCluster: 'best-word-counter-online' },
  'best-box-shadow-generator-online': { cluster: 'developer' as Cluster, primary: 'box-shadow-generator', crossCluster: 'best-word-counter-online' },
  'best-border-radius-generator-online': { cluster: 'developer' as Cluster, primary: 'border-radius-generator', crossCluster: 'best-word-counter-online' },
  'best-glassmorphism-generator-online': { cluster: 'developer' as Cluster, primary: 'glassmorphism-generator', crossCluster: 'best-word-counter-online' },
  'best-svg-blob-generator-online': { cluster: 'developer' as Cluster, primary: 'svg-blob-generator', crossCluster: 'best-word-counter-online' },
  'best-flexbox-generator-online': { cluster: 'developer' as Cluster, primary: 'flexbox-generator', crossCluster: 'best-word-counter-online' },
  'best-grid-generator-online': { cluster: 'developer' as Cluster, primary: 'grid-generator', crossCluster: 'best-word-counter-online' },
  'best-button-generator-online': { cluster: 'developer' as Cluster, primary: 'button-generator', crossCluster: 'best-word-counter-online' },
  'best-filter-effects-generator-online': { cluster: 'developer' as Cluster, primary: 'filter-effects-generator', crossCluster: 'best-word-counter-online' },
  'best-meta-tag-generator-online': { cluster: 'developer' as Cluster, primary: 'meta-tag-generator', crossCluster: 'best-word-counter-online' },
  'best-json-to-ts-online': { cluster: 'developer' as Cluster, primary: 'json-to-ts', crossCluster: 'best-word-counter-online' },
  'best-contrast-checker-online': { cluster: 'developer' as Cluster, primary: 'contrast-checker', crossCluster: 'best-word-counter-online' },
  'best-robots-txt-generator-online': { cluster: 'developer' as Cluster, primary: 'robots-txt-generator', crossCluster: 'best-word-counter-online' },
  'best-sitemap-generator-online': { cluster: 'developer' as Cluster, primary: 'sitemap-generator', crossCluster: 'best-word-counter-online' },
  'best-html-table-generator-online': { cluster: 'developer' as Cluster, primary: 'html-table-generator', crossCluster: 'best-word-counter-online' },
  'best-image-to-base64-online': { cluster: 'developer' as Cluster, primary: 'image-to-base64', crossCluster: 'best-word-counter-online' },
  'best-base64-to-image-online': { cluster: 'developer' as Cluster, primary: 'base64-to-image', crossCluster: 'best-word-counter-online' },
  'best-image-resizer-online': { cluster: 'developer' as Cluster, primary: 'image-resizer', crossCluster: 'best-word-counter-online' },
};

const ANCHOR_VARIATIONS = [
  (tool: string) => `Use ${formatName(tool)} Free`,
  (tool: string) => `Try ${formatName(tool)} Now`,
  (tool: string) => `${formatName(tool)} Tool`,
  (tool: string) => `Access ${formatName(tool)} Online`,
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
  const hash = stringHash(`${sourceSlug}->${targetSlug}`);
  const index = hash % ANCHOR_VARIATIONS.length;
  return ANCHOR_VARIATIONS[index](targetSlug);
}

export function getInternalLinks(currentSlug: string): InternalLinks {
  const meta = CLUSTER_MAP[currentSlug];
  if (!meta) {
    throw new Error(
      `[seo-linking] Slug "${currentSlug}" is not registered in CLUSTER_MAP.`
    );
  }

  const { cluster, primary, crossCluster } = meta;

  const parentTool = { text: pickAnchor(currentSlug, primary), href: `/tool/${primary}` };

  const relatedInCluster = Object.entries(CLUSTER_MAP)
    .filter(([slug, entry]) => slug !== currentSlug && entry.cluster === cluster)
    .slice(0, 2)
    .map(([slug]) => ({
      text: pickAnchor(currentSlug, slug),
      href: `/seo/${slug}`,
    }));

  const crossClusterLink = {
    text: pickAnchor(currentSlug, crossCluster),
    href: `/seo/${crossCluster}`,
  };

  return {
    parentTool,
    relatedInCluster,
    crossCluster: crossClusterLink,
    conversionPage: parentTool,
  };
}
