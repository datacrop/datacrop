import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = {src?: string; poster?: string; captions?: string; title?: string};

/** The DataCROP Maize explainer video (self-hosted, with captions). */
export default function VideoEmbed({
  src = '/video/datacrop-wme-explainer.mp4',
  poster = '/video/datacrop-wme-explainer-poster.jpg',
  captions = '/video/datacrop-wme-explainer.vtt',
  title = 'DataCROP Maize Workflow Management Editor — 3-minute introduction',
}: Props): React.JSX.Element {
  return (
    <figure className="doc-video">
      <video controls preload="metadata" poster={useBaseUrl(poster)} aria-label={title}>
        <source src={useBaseUrl(src)} type="video/mp4" />
        <track kind="captions" src={useBaseUrl(captions)} srcLang="en" label="English" />
      </video>
      <figcaption>{title}</figcaption>
    </figure>
  );
}
