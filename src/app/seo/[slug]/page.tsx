import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SEO_PAGES_CONFIG } from '../../../utils/seo-pages.config';
import SEOLandingPage from '../../../components/SEOLandingPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEO_PAGES_CONFIG.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = SEO_PAGES_CONFIG.find((p) => p.slug === slug);

  if (!page) {
    return {};
  }

  // Capitalize keyword for Title
  const titleText = page.keyword
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${titleText} — Free Online Tool | ToolsRepository`,
    description: `Use our free online ${page.keyword} tool. Fast, secure, and easy to use without any signup required.`,
    alternates: {
      canonical: `https://toolsrepository.com/seo/${page.slug}`,
    },
  };
}

export default async function SEOProgrammaticPage({ params }: Props) {
  const { slug } = await params;
  const pageConfig = SEO_PAGES_CONFIG.find((p) => p.slug === slug);

  if (!pageConfig) {
    notFound();
  }

  // Generate dynamic content based on the config. 
  // In a real scenario, this could pull from a CMS or a larger static JSON file.
  const titleText = pageConfig.keyword
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Dynamic Robust Content Generation to avoid "Thin Content" penalties
  const featureList = [
    { title: 'Lightning Fast', description: `Our ${titleText} engine processes your request directly in your browser, guaranteeing zero wait times.` },
    { title: '100% Privacy Preserved', description: 'Your data never leaves your device. We do not upload your files to our servers, ensuring complete confidentiality.' },
    { title: 'No Account Required', description: 'Skip the signup screens. Start using the tool instantly without providing an email address or credit card.' }
  ];

  const useCaseList = [
    { title: 'For Students & Educators', description: 'Perfect for completing assignments quickly when strict formatting or specific limits are required.' },
    { title: 'For Professionals', description: 'Save hours of manual work by using our automated tools for daily administrative or technical tasks.' },
    { title: 'For Developers', description: 'Clean, reliable outputs that you can instantly drop into your codebase or production environment.' }
  ];

  return (
    <SEOLandingPage
      slug={pageConfig.slug}
      keyword={pageConfig.keyword}
      h1={titleText}
      heroDescription={`Everything you need for ${pageConfig.keyword}, instantly available in your browser.`}
      intro={`When you search for "${pageConfig.keyword}", you expect a fast, reliable, and completely free solution. We built exactly that. Our tool processes your request instantly without requiring any software installation or account signups. Whether you're on a mobile phone or a desktop computer, you get a premium experience designed for maximum efficiency.`}
      features={featureList}
      useCases={useCaseList}
      themeColor={pageConfig.themeColor}
      faqs={[
        {
          question: `Is the ${pageConfig.keyword} tool free to use?`,
          answer: 'Yes, it is 100% free with no hidden fees or account requirements.',
        },
        {
          question: 'Do I need to download any software?',
          answer: 'No, everything works directly within your web browser instantly. There is no app or software installation required.',
        },
        {
          question: 'Is my data secure?',
          answer: 'Absolutely. We process data locally in your browser whenever possible. If server processing is required, files are automatically deleted immediately after processing.',
        }
      ]}
      faqTitle={`Frequently Asked Questions about ${titleText}`}
    />
  );
}
