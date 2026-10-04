import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import VideoEmbed from '@site/src/components/VideoEmbed';

function HeroBanner(): React.JSX.Element {
  return (
    <div className="hero-banner">
      <div className="hero-banner__content">
        <p className="hero-banner__subtitle">DataCROP&#8482; Maize · Workflow Management Engine</p>
        <h1 className="hero-banner__title">Model. Connect. Deploy. Observe.</h1>
        <p className="hero-banner__description">
          Describe processing components and data sources once, connect them on a drag-and-drop
          canvas, and run them as Docker containers on your own workers — with Airflow scheduling,
          managed Logstash pipelines, Kibana observability and a Workflow Assistant (Preview)
          that drafts workflows for you.
        </p>
        <div className="hero-banner__buttons">
          <Link className="hero-banner__btn hero-banner__btn--primary" to="/getting-started/quickstart/">
            Quickstart
          </Link>
          <Link className="hero-banner__btn hero-banner__btn--secondary" to="/intro/">
            What is DataCROP Maize?
          </Link>
          <a
            className="hero-banner__btn hero-banner__btn--secondary"
            href="https://github.com/datacrop"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

function VideoSection(): React.JSX.Element {
  return (
    <section className="homepage-section">
      <div className="homepage-section__container" style={{maxWidth: 960}}>
        <h2 className="homepage-section__title">WME in three minutes</h2>
        <VideoEmbed />
      </div>
    </section>
  );
}

const FEATURES: {title: string; text: string; to: string}[] = [
  {title: 'Model components', text: 'Wrap ML models, LLM services or scripts as processor definitions: a container image or a Compose app from GitHub, with declared interfaces and parameters.', to: '/user-guide/warehouse/processor-definitions/'},
  {title: 'Describe your data', text: 'Kafka, Elasticsearch, MQTT, MongoDB, S3, Redis, RabbitMQ, HTTP and Beats resources, with data kinds and schemas.', to: '/user-guide/warehouse/digital-resources/'},
  {title: 'Connect visually', text: 'Drag-and-drop workflows that only allow compatible links. Connected resources become environment variables automatically.', to: '/user-guide/workflow-lab/flow-creator/'},
  {title: 'Deploy anywhere', text: 'Airflow DAGs run each processor on the worker you choose — once or on a schedule — across as many workers as you need.', to: '/developers/how-deployment-works/'},
  {title: 'Pipelines without code', text: 'Managed Logstash pipelines between resources, with an AI assistant that drafts, explains and fixes filters.', to: '/user-guide/logstash-pipelines/'},
  {title: 'Observe & operate', text: 'Observations, auto-built Kibana dashboards, Worker Runtime logs and start/stop/restart, Airflow run history.', to: '/user-guide/observations/'},
  {title: 'Workflow Assistant', text: 'Describe what you need; an AI agent drafts the workflow and resources for you to review in the Lab. (Preview)', to: '/user-guide/workflow-assistant/'},
  {title: 'Bring your own code', text: 'A tiny contract — read environment variables — and a worked example to package any component.', to: '/developers/writing-processors/'},
];

function FeatureCards(): React.JSX.Element {
  return (
    <section className="homepage-section">
      <div className="homepage-section__container">
        <h2 className="homepage-section__title">What you can do</h2>
        <div className="feature-cards">
          {FEATURES.map((f) => (
            <Link key={f.title} className="feature-card" to={f.to}>
              <div className="feature-card__title">{f.title}</div>
              <div className="feature-card__text">{f.text}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StartHere(): React.JSX.Element {
  const paths = [
    {icon: '🚀', label: 'Deploy with the Maize MVP', to: '/deploy/maize-mvp/'},
    {icon: '🧭', label: 'Walk through your first workflow', to: '/getting-started/first-workflow/'},
    {icon: '📊', label: 'Observe your data in Kibana', to: '/getting-started/observe-data/'},
    {icon: '🧩', label: 'Package your own processor', to: '/developers/writing-processors/'},
    {icon: '🏗️', label: 'Understand the architecture', to: '/intro/architecture/'},
    {icon: '📚', label: 'Look something up', to: '/reference/'},
  ];
  return (
    <section className="homepage-section">
      <div className="homepage-section__container">
        <h2 className="homepage-section__title">Start here</h2>
        <div className="links-grid">
          {paths.map((p) => (
            <Link key={p.to} className="link-card" to={p.to}>
              <span className="link-card__icon">{p.icon}</span>
              {p.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinksSection(): React.JSX.Element {
  return (
    <section className="homepage-section">
      <div className="homepage-section__container">
        <h2 className="homepage-section__title">Community</h2>
        <div className="links-grid">
          <a className="link-card" href="mailto:datacrop@googlegroups.com">
            <span className="link-card__icon">📧</span>
            Contact DataCROP
          </a>
          <a className="link-card" href="mailto:datacrop@googlegroups.com">
            <span className="link-card__icon">🐛</span>
            Report Issues
          </a>
          <a className="link-card" href="https://groups.google.com/forum/#!forum/datacrop" target="_blank" rel="noopener noreferrer">
            <span className="link-card__icon">💬</span>
            DataCROP Forum
          </a>
          <a className="link-card" href="http://www.datacrop.eu/" target="_blank" rel="noopener noreferrer">
            <span className="link-card__icon">🌐</span>
            Website
          </a>
          <a className="link-card" href="https://hub.docker.com/u/datacrop" target="_blank" rel="noopener noreferrer">
            <span className="link-card__icon">🐳</span>
            DockerHub
          </a>
          <a className="link-card" href="https://www.openhub.net/p/datacrop" target="_blank" rel="noopener noreferrer">
            <span className="link-card__icon">📊</span>
            OpenHUB Stats
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="DataCROP Maize" description={siteConfig.tagline}>
      <HeroBanner />
      <main>
        <VideoSection />
        <FeatureCards />
        <StartHere />
        <LinksSection />
      </main>
    </Layout>
  );
}
