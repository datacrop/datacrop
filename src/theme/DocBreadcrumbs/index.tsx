import React from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import type DocBreadcrumbsType from '@theme/DocBreadcrumbs';
import type {WrapperProps} from '@docusaurus/types';
import CopyPageButton from '@site/src/components/CopyPageButton';
import OpenInMenu from '@site/src/components/OpenInMenu';

type Props = WrapperProps<typeof DocBreadcrumbsType>;

// Breadcrumbs on the left, page actions (copy + "Open in…" split button) on the right.
export default function DocBreadcrumbsWrapper(props: Props): React.JSX.Element {
  return (
    <div className="doc-topbar">
      <DocBreadcrumbs {...props} />
      <div className="page-actions">
        <CopyPageButton />
        <OpenInMenu />
      </div>
    </div>
  );
}
