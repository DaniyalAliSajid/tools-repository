import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy | Tools Repository',
    description: 'Privacy Policy for Tools Repository. Learn how we handle your data with our privacy-first, browser-based tools.',
};

export default function PrivacyPage() {
    return (
        <div style={{
            backgroundColor: '#f8fafc', /* Soft slate light gray */
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
                    Privacy Policy
                </h1>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '40px', fontStyle: 'italic' }}>
                    Last Updated: March 8, 2028
                </p>

                <article style={{ color: '#334155', lineHeight: '1.7', fontSize: '1.0625rem' }}>
                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>1. Introduction</h2>
                        <p>
                            Welcome to Tools Repository. We respect your privacy and are committed to protecting it. This Privacy Policy explains
                            our practices regarding the collection, use, and disclosure of your information when you use our website and tools.
                        </p>
                    </section>

                    <section style={{
                        marginBottom: '40px',
                        backgroundColor: '#f5f3ff',
                        border: '1px solid #ddd6fe',
                        borderRadius: '1rem',
                        padding: '28px',
                        position: 'relative'
                    }}>
                        <div style={{
                            width: '4px',
                            height: '24px',
                            backgroundColor: '#6b46c1',
                            position: 'absolute',
                            left: '0',
                            top: '28px',
                            borderRadius: '0 2px 2px 0'
                        }}></div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#5b21b6', marginBottom: '8px' }}>The Core Principle</h3>
                        <p style={{ fontSize: '1rem', color: '#4c1d95' }}>
                            <strong>Tools Repository is a privacy-first platform.</strong> All tools provided on this website are executed
                            entirely within your web browser. This means that any data you input into our tools never leaves your
                            local machine and is never sent to our servers.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>2. Information We Do NOT Collect</h2>
                        <p style={{ marginBottom: '16px' }}>We do not collect or store any of the following:</p>
                        <ul style={{ paddingLeft: '24px', listStyleType: 'disc' }}>
                            <li style={{ marginBottom: '10px' }}>Sensitive personal data (names, addresses, emails, etc.)</li>
                            <li style={{ marginBottom: '10px' }}>Any data you process using our tools (text, code, passwords, files)</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>3. Information We May Collect</h2>
                        <p style={{ marginBottom: '16px' }}>To improve the user experience and maintain site security, we may collect basic technical data:</p>
                        <ul style={{ paddingLeft: '24px', listStyleType: 'disc' }}>
                            <li style={{ marginBottom: '10px' }}>Browser type and version</li>
                            <li style={{ marginBottom: '10px' }}>Operating system</li>
                            <li style={{ marginBottom: '10px' }}>Time zone and general location data (IP based, but anonymized)</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>4. Cookies and Local Storage</h2>
                        <p style={{ marginBottom: '16px' }}>
                            We use "Local Storage" to save your preferences, such as your theme selection (Dark/Light mode).
                            We may also use essential cookies for basic site functionality. These are stored locally on your device and are not used for tracking across other websites.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>5. Third-Party Services</h2>
                        <p>
                            We may use third-party tools like Google Analytics or AdSense. These services may collect information sent by your browser as part of a web page request, such as cookies or your IP request. Please refer to their respective privacy policies for details.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>6. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at{' '}
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
