import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service | Tools Repository',
    description: 'Terms of Service for using Tools Repository. Please read our guidelines on usage, liability, and user responsibilities.',
};

export default function TermsPage() {
    return (
        <div style={{
            backgroundColor: '#f8fafc',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '60px 20px',
            fontFamily: 'var(--font-sans)'
        }}>
            <div style={{
                backgroundColor: 'white',
                width: '100%',
                maxWidth: '700px',
                borderRadius: '1.25rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                padding: '48px'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    color: '#0f172a',
                    marginBottom: '12px',
                    letterSpacing: '-0.025em'
                }}>
                    Terms of Service
                </h1>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '40px', fontStyle: 'italic' }}>
                    Last Updated: March 8, 2028
                </p>

                <article style={{ color: '#334155', lineHeight: '1.7', fontSize: '1.0625rem' }}>
                    <p style={{ marginBottom: '32px' }}>
                        Welcome to Tools Repository. By accessing or using our website and its suite of browser-based utility tools, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our platform.
                    </p>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>1. Use of Service</h2>
                        <p style={{ marginBottom: '16px' }}>
                            Tools Repository provides various free online tools for personal and commercial use. You are permitted to use these tools for their intended purposes, provided you comply with these terms.
                        </p>
                        <p>
                            You agree not to exploit our services for any illegal activities or to distribute malware. Any use of automated scripts or scrapers to access our tools in a manner that harms server performance is strictly prohibited.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>2. Intellectual Property</h2>
                        <p>
                            All content, design, and proprietary code on Tools Repository are protected by intellectual property laws. While many individual tools utilize open-source logic, the compilation, interface, and branding are the exclusive property of Tools Repository. You may not republish our site content or tools as your own without explicit permission.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>3. Privacy & Data Handling</h2>
                        <p>
                            Our priority is your privacy. Most of our tools process data locally in your browser. For more information on how we handle anonymous technical data and cookies, please review our <Link href="/privacy" style={{ color: '#6b46c1', fontWeight: '600', textDecoration: 'none' }}>Privacy Policy</Link>.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>4. Third-Party Links & Advertisements</h2>
                        <p>
                            Tools Repository may contain links to third-party websites or display advertisements (e.g., via Google AdSense). These external sites are not operated by us, and we have no control over their content or privacy practices. Use of these links is at your own risk.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>5. Disclaimer of Warranties</h2>
                        <p>
                            The tools and services on Tools Repository are provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the accuracy, reliability, or availability of our tools. We disclaim any responsibility for errors or omissions in the output of our tools.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>6. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, Tools Repository shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>7. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Continued use of the platform after changes are posted constitutes acceptance of the new terms.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>8. Contact Us</h2>
                        <p>
                            If you have any questions regarding these Terms, please contact us at{' '}
                            <Link href="mailto:support@toolrepository.com" style={{ color: '#6b46c1', fontWeight: '600', textDecoration: 'none' }}>
                                support@toolrepository.com
                            </Link>.
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}
