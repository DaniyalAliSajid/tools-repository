import Link from 'next/link';
import { ToolEntry, ToolCategory } from '../vanilla/types';

const categoryColors: Record<ToolCategory, string> = {
    text: '#9333ea', // Purple
    calculators: '#e11d48', // Red
    converters: '#eab308', // Yellow/Orange
    developer: '#10b981', // Emerald Green
    security: '#3b82f6', // Blue
    productivity: '#0ea5e9', // Sky Blue
    health: '#ec4899' // Pink
};

export default function ToolCard({ tool }: { tool: ToolEntry }) {
    const mainColor = categoryColors[tool.category] || '#4f46e5';
    const lightColor = mainColor + '15'; // 15% opacity hex

    return (
        <Link href={`/tool/${tool.slug}`} className="tool-card hover-lift" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            border: '1px solid #e2e8f0',
            borderTop: `5px solid ${mainColor}`,
            borderRadius: '16px',
            padding: '24px',
            textDecoration: 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ marginBottom: '1.25rem' }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    background: lightColor,
                    color: mainColor
                }}>
                    {tool.icon}
                </div>
            </div>

            <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '800',
                marginBottom: '0.75rem',
                color: '#0f172a',
                fontFamily: 'var(--font-sans)'
            }}>
                {tool.name}
            </h3>

            <p style={{
                fontSize: '0.95rem',
                color: '#475569',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                flex: 1
            }}>
                {tool.description}
            </p>

            <div style={{
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <button style={{
                    padding: '10px 20px',
                    background: mainColor,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'opacity 0.2s ease'
                }}>
                    Start Using <span style={{ fontSize: '1.1em' }}>→</span>
                </button>
            </div>
        </Link>
    );
}
