import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = {src: string; alt?: string; caption?: React.ReactNode; width?: number | string};

/** Framed, click-to-enlarge screenshot with an optional caption. */
export default function Screenshot({src, alt, caption, width}: Props): React.JSX.Element {
  const url = useBaseUrl(src);
  return (
    <figure className="doc-screenshot" style={width ? {maxWidth: width} : undefined}>
      <a href={url} target="_blank" rel="noopener noreferrer" title="Open full size">
        <img src={url} alt={alt ?? (typeof caption === 'string' ? caption : '')} loading="lazy" />
      </a>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
