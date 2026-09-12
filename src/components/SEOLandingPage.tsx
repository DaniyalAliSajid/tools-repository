import React from 'react';
import Link from 'next/link';
import { getInternalLinks } from '../utils/seo-linking';
import styles from './SEOLandingPage.module.css';
import FAQSection from './FAQSection';

interface SEOLandingPageProps {
  keyword: string;
  slug: string;
  h1: string;
  heroDescription: string;
  intro: string;
  themeColor: string;
  features?: { title: string; description: string }[];
  useCases?: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  faqTitle?: string;
}

export default function SEOLandingPage(props: SEOLandingPageProps) {
  const links = getInternalLinks(props.slug);

  return (
    <div className={styles.wrapper} style={{ '--theme-color': props.themeColor } as React.CSSProperties}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroContent}`}>
          <h1 className={styles.h1}>
            <span>{props.h1}</span>
          </h1>
          <p className={styles.heroDesc}>{props.heroDescription}</p>
          <div className={styles.ctaWrapper}>
            <Link href={links.parentTool.href} className={styles.primaryCta}>
              Try it Now — Free
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section (avoiding thin content) */}
      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.prose}>
            <h2>Why use our {props.keyword} tool?</h2>
            <p>{props.intro}</p>

            {props.features && props.features.length > 0 && (
              <>
                <h3 style={{ marginTop: '2rem' }}>Key Features</h3>
                <ul className={styles.featureList}>
                  {props.features.map((feature, i) => (
                    <li key={i}>
                      <strong>{feature.title}:</strong> {feature.description}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {props.useCases && props.useCases.length > 0 && (
              <>
                <h3 style={{ marginTop: '2rem' }}>Common Use Cases</h3>
                <div className={styles.useCaseGrid}>
                  {props.useCases.map((uc, i) => (
                    <div key={i} className={styles.useCaseCard}>
                      <h4>{uc.title}</h4>
                      <p>{uc.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Related Internal Links */}
      <section className={styles.relatedLinksSection}>
        <div className={styles.container}>
          <h2 className={styles.relatedTitle}>Explore Related Tools</h2>
          <div className={styles.pillRow}>
            <Link href={links.parentTool.href} className={`${styles.pill} ${styles.parentPill}`}>
              {links.parentTool.text}
            </Link>
            {links.relatedInCluster.map((link, i) => (
              <Link key={`cluster-${i}`} href={link.href} className={styles.pill}>
                {link.text}
              </Link>
            ))}
            <Link href={links.crossCluster.href} className={styles.pill}>
              {links.crossCluster.text}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {props.faqs && props.faqs.length > 0 && (
        <section className={styles.faqWrapper}>
          <div className={styles.container}>
            {props.faqTitle && <h2 className={styles.faqTitle}>{props.faqTitle}</h2>}
            <FAQSection faqs={props.faqs} />
            {/* Inject JSON-LD Schema manually if FAQSection doesn't do it */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: props.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: faq.answer,
                    },
                  })),
                }),
              }}
            />
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className={styles.bottomCta}>
        <div className={`${styles.container} ${styles.bottomCtaContainer}`}>
          <h2>Ready to solve your problem?</h2>
          <Link href={links.conversionPage.href} className={styles.btnInverse}>
            {links.conversionPage.text}
          </Link>
        </div>
      </section>
    </div>
  );
}
