import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {IconArrowRight} from '@site/src/components/Icons';
import {ClaudeLogo, OpenAILogo, PerplexityLogo} from '@site/src/components/ProviderLogos';

type Provider = {
  name: string;
  logo: (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  url: (prompt: string) => string;
};

// Each URL opens a new chat with the prompt prefilled.
const PROVIDERS: Provider[] = [
  {name: 'ChatGPT', logo: OpenAILogo, url: (q) => `https://chatgpt.com/?hints=search&q=${encodeURIComponent(q)}`},
  {name: 'Claude', logo: ClaudeLogo, url: (q) => `https://claude.ai/new?q=${encodeURIComponent(q)}`},
  {name: 'Perplexity', logo: PerplexityLogo, url: (q) => `https://www.perplexity.ai/search/new?q=${encodeURIComponent(q)}`},
];

/** Chevron half of the page-actions split button: opens the current page in an AI chat. */
export default function OpenInMenu(): React.JSX.Element {
  const {pathname} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Always the published URL, so the assistant can fetch the page even from a local preview.
  const pageUrl = new URL(pathname, siteConfig.url).href;
  const prompt = `Read ${pageUrl}, I want to ask questions about it.`;

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="open-in" ref={rootRef}>
      <button
        ref={toggleRef}
        type="button"
        className="button button--sm button--subtle open-in__toggle"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open this page in an AI assistant"
        onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="open-in__menu" role="menu">
          {PROVIDERS.map(({name, logo: Logo, url}) => (
            <a
              key={name}
              role="menuitem"
              className="open-in__item"
              href={url(prompt)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}>
              <span className="open-in__logo"><Logo width={16} height={16} /></span>
              <span className="open-in__text">
                <span className="open-in__title">Open in {name}</span>
                <span className="open-in__hint">Ask questions about this page</span>
              </span>
              <IconArrowRight className="open-in__arrow" width={14} height={14} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
