import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import VideoEmbed from '@site/src/components/VideoEmbed';
import {
  IconActivity,
  IconArrowRight,
  IconBook,
  IconBox,
  IconBug,
  IconChart,
  IconChat,
  IconCode,
  IconCompass,
  IconDatabase,
  IconGlobe,
  IconLayers,
  IconMail,
  IconNodes,
  IconPipeline,
  IconPuzzle,
  IconRocket,
  IconServer,
  IconSparkles,
} from '@site/src/components/Icons';

type IconType = (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;

// Mirrors step 1 of docs/getting-started/quickstart.md.
const QUICKSTART = `git clone https://github.com/datacrop/maize-mvp.git
cd maize-mvp
cp .env.example .env   # then set HOST_IP
./setup.sh             # option 1: deploy everything`;

function Hero(): React.JSX.Element {
  return (
    <header className="landing-hero">
      <div className="landing-container">
        <span className="landing-eyebrow">
          <span className="landing-eyebrow__dot" />
          DataCROP&#8482; Maize · Workflow Management Engine
        </span>
        <h1 className="landing-title">Model. Connect. Deploy. Observe.</h1>
        <p className="landing-lead">
          Describe processing components and data sources once, connect them on a drag-and-drop
          canvas, and run them as Docker containers on your own workers — with Airflow scheduling,
          managed Logstash pipelines, Kibana observability and a Workflow Assistant (Preview)
          that drafts workflows for you.
        </p>
        <div className="landing-actions">
          <Link className="button button--primary button--lg" to="/getting-started/quickstart/">
            Quickstart
          </Link>
          <Link className="button button--tinted button--lg" to="/intro/">
            What is DataCROP Maize?
          </Link>
          <Link className="button button--subtle button--lg" href="https://github.com/datacrop">
            GitHub
          </Link>
        </div>
        <div className="landing-snippet">
          <CodeBlock language="bash" title="Deploy with the Maize MVP">
            {QUICKSTART}
          </CodeBlock>
        </div>
      </div>
    </header>
  );
}

function VideoSection(): React.JSX.Element {
  return (
    <section className="landing-section">
      <div className="landing-container">
        <h2 className="landing-section__title">DataCROP Maize in three minutes</h2>
        <p className="landing-section__lead">A narrated tour of the Workflow Management Engine.</p>
        <div className="landing-video">
          <VideoEmbed />
        </div>
      </div>
    </section>
  );
}

const TINTS = ['', 'feature-card--violet', 'feature-card--sky', 'feature-card--teal'];

const FEATURES: {title: string; text: string; to: string; icon: IconType}[] = [
  {icon: IconBox, title: 'Model components', text: 'Wrap ML models, LLM services or scripts as processor definitions: a container image or a Compose app from GitHub, with declared interfaces and parameters.', to: '/user-guide/warehouse/processor-definitions/'},
  {icon: IconDatabase, title: 'Describe your data', text: 'Kafka, Elasticsearch, MQTT, MongoDB, S3, Redis, RabbitMQ, HTTP and Beats resources, with data kinds and schemas.', to: '/user-guide/warehouse/digital-resources/'},
  {icon: IconNodes, title: 'Connect visually', text: 'Drag-and-drop workflows that only allow compatible links. Connected resources become environment variables automatically.', to: '/user-guide/workflow-lab/flow-creator/'},
  {icon: IconServer, title: 'Deploy anywhere', text: 'Airflow DAGs run each processor on the worker you choose — once or on a schedule — across as many workers as you need.', to: '/developers/how-deployment-works/'},
  {icon: IconPipeline, title: 'Pipelines without code', text: 'Managed Logstash pipelines between resources, with an AI assistant that drafts, explains and fixes filters.', to: '/user-guide/logstash-pipelines/'},
  {icon: IconActivity, title: 'Observe & operate', text: 'Observations, auto-built Kibana dashboards, Worker Runtime logs and start/stop/restart, Airflow run history.', to: '/user-guide/observations/'},
  {icon: IconSparkles, title: 'Workflow Assistant', text: 'Describe what you need; an AI agent drafts the workflow and resources for you to review in the Lab. (Preview)', to: '/user-guide/workflow-assistant/'},
  {icon: IconCode, title: 'Bring your own code', text: 'A tiny contract — read environment variables — and a worked example to package any component.', to: '/developers/writing-processors/'},
];

function Features(): React.JSX.Element {
  return (
    <section className="landing-section">
      <div className="landing-container">
        <h2 className="landing-section__title">What you can do</h2>
        <p className="landing-section__lead">Everything a workflow needs, from catalogue to running containers.</p>
        <div className="feature-grid">
          {FEATURES.map(({icon: Icon, ...f}, i) => (
            <Link key={f.title} className={`feature-card ${TINTS[i % TINTS.length]}`} to={f.to}>
              <span className="feature-card__icon"><Icon /></span>
              <span className="feature-card__title">{f.title}</span>
              <span className="feature-card__text">{f.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkGrid({items}: {items: {icon: IconType; label: string; to?: string; href?: string}[]}): React.JSX.Element {
  return (
    <div className="link-grid">
      {items.map(({icon: Icon, label, to, href}) => (
        <Link key={label} className="link-card" to={to} href={href}>
          <span className="link-card__icon"><Icon /></span>
          {label}
          <IconArrowRight className="link-card__arrow" width={16} height={16} />
        </Link>
      ))}
    </div>
  );
}

function StartHere(): React.JSX.Element {
  return (
    <section className="landing-section">
      <div className="landing-container">
        <h2 className="landing-section__title">Start here</h2>
        <p className="landing-section__lead">Pick the path that matches what you came to do.</p>
        <LinkGrid
          items={[
            {icon: IconRocket, label: 'Deploy with the Maize MVP', to: '/deploy/maize-mvp/'},
            {icon: IconCompass, label: 'Walk through your first workflow', to: '/getting-started/first-workflow/'},
            {icon: IconChart, label: 'Observe your data in Kibana', to: '/getting-started/observe-data/'},
            {icon: IconPuzzle, label: 'Package your own processor', to: '/developers/writing-processors/'},
            {icon: IconLayers, label: 'Understand the architecture', to: '/intro/architecture/'},
            {icon: IconBook, label: 'Look something up', to: '/reference/'},
          ]}
        />
      </div>
    </section>
  );
}

function Community(): React.JSX.Element {
  return (
    <section className="landing-section">
      <div className="landing-container">
        <h2 className="landing-section__title">Community</h2>
        <p className="landing-section__lead">Questions, bugs and everything around DataCROP.</p>
        <LinkGrid
          items={[
            {icon: IconMail, label: 'Contact DataCROP', href: 'mailto:datacrop@googlegroups.com'},
            {icon: IconBug, label: 'Report an issue', href: 'https://github.com/datacrop/datacrop/issues'},
            {icon: IconChat, label: 'DataCROP Forum', href: 'https://groups.google.com/forum/#!forum/datacrop'},
            {icon: IconGlobe, label: 'Website', href: 'https://www.datacrop.eu/'},
            {icon: IconBox, label: 'DockerHub', href: 'https://hub.docker.com/u/datacrop'},
            {icon: IconChart, label: 'OpenHUB stats', href: 'https://www.openhub.net/p/datacrop'},
          ]}
        />
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="DataCROP Maize" description={siteConfig.tagline}>
      <Hero />
      <main>
        <VideoSection />
        <Features />
        <StartHere />
        <Community />
      </main>
    </Layout>
  );
}
