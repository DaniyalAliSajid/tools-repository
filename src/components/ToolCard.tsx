import Link from 'next/link';
import { ToolEntry } from '../vanilla/types';

export default function ToolCard({ tool }: { tool: ToolEntry }) {
    return (
        <Link href={`/tool/${tool.slug}`} className="tool-card" aria-label={`Use ${tool.name}: ${tool.description}`}>
            <div className="tool-card__icon">
                {tool.icon}
            </div>

            <div className="tool-card__content">
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
            </div>

            <div className="tool-card__footer">
                <div className="tool-card__tags">
                    <span className="tool-card__tag">{tool.category}</span>
                </div>
                <span className="tool-card__link">
                    Start Using <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
            </div>
        </Link>
    );
}
