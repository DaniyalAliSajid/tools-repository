'use client';

import { useEffect, useRef } from 'react';
import { tools } from '../vanilla/registry';

interface ToolWrapperProps {
    slug: string;
}

export default function ToolWrapper({ slug }: ToolWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let toolInstance: any;
        const tool = tools.find(t => t.slug === slug);

        if (containerRef.current && tool) {
            containerRef.current.innerHTML = '';
            tool.module().then(mod => {
                toolInstance = mod;
                mod.render(containerRef.current!);
            }).catch(err => {
                console.error('Failed to load tool module', err);
                if (containerRef.current) {
                    containerRef.current.innerHTML = '<div style="color:red;padding:2rem;text-align:center;">Error loading tool.</div>';
                }
            });
        }

        return () => {
            if (toolInstance?.destroy) {
                toolInstance.destroy();
            }
        };
    }, [slug]);

    return (
        <div ref={containerRef} className="tool-layout" />
    );
}
