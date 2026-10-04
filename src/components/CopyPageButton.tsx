import React, {useEffect, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import {IconCheck, IconCopy} from '@site/src/components/Icons';

/**
 * Copies the current page's Markdown source. The build writes it next to each page as
 * `<slug>/index.md` (see plugins/markdown-source.js); the dev server has no such file,
 * so it falls back to the rendered text.
 */
async function loadMarkdown(pathname: string): Promise<string> {
  const base = pathname.endsWith('/') ? pathname : `${pathname}/`;
  try {
    const res = await fetch(`${base}index.md`);
    const type = res.headers.get('content-type') ?? '';
    if (res.ok && !type.includes('text/html')) {
      return await res.text();
    }
  } catch {
    // fall through to the rendered text
  }
  const article = document.querySelector<HTMLElement>('article .theme-doc-markdown');
  return article?.innerText ?? '';
}

/**
 * Writes text that is still loading. A promise-valued ClipboardItem keeps the click's user
 * activation (Safari drops it across an `await`); older browsers fall back to writeText and
 * finally to execCommand.
 */
async function copyText(text: Promise<string>): Promise<boolean> {
  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
    try {
      const blob = text.then((t) => new Blob([t], {type: 'text/plain'}));
      await navigator.clipboard.write([new ClipboardItem({'text/plain': blob})]);
      return true;
    } catch {
      // try the next method
    }
  }
  const value = await text;
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = value;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

type Status = 'idle' | 'copied' | 'failed';

export default function CopyPageButton(): React.JSX.Element {
  const {pathname} = useLocation();
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (status === 'idle') return undefined;
    const t = setTimeout(() => setStatus('idle'), 2000);
    return () => clearTimeout(t);
  }, [status]);

  const onClick = async () => {
    setStatus((await copyText(loadMarkdown(pathname))) ? 'copied' : 'failed');
  };

  return (
    <button
      type="button"
      className="button button--sm button--subtle copy-page-button"
      onClick={onClick}
      aria-live="polite"
      title="Copy this page as Markdown">
      {status === 'copied' ? <IconCheck width={14} height={14} /> : <IconCopy width={14} height={14} />}
      {status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy page'}
    </button>
  );
}
