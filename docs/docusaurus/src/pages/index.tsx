import type { JSX } from "react";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";

import GitHubStats from "../components/git-hub-stats";
import styles from "./index.module.css";

const packageName = "typedoc-plugin-docusaurus-doc-links";
const packageTagline =
    "Turn generated TypeDoc Markdown links into Docusaurus-friendly local doc links.";

const heroBadges = [
    {
        description:
            "Avoids code fences, inline code spans, external URLs, anchors, and already-relative paths.",
        label: "Conservative rewriting",
    },
    {
        description:
            "Prefixes bare .md and .mdx destinations so Docusaurus resolves them as local document files.",
        label: "Docusaurus-ready links",
    },
    {
        description:
            "Runs at render time, after TypeDoc has produced page contents and before files are written.",
        label: "Renderer integration",
    },
] as const;

const homeCards = [
    {
        description:
            "Inspect the generated TypeDoc API for the load hook and Markdown rewrite helper.",
        title: "Read the API",
        to: "/docs/category/api-reference",
    },
    {
        description:
            "Install the plugin next to TypeDoc and typedoc-plugin-markdown, then add it to the plugin list.",
        title: "Start quickly",
        to: "/docs/getting-started",
    },
    {
        description:
            "Review exactly which Markdown destinations are prefixed and which are preserved.",
        title: "Understand link behavior",
        to: "/docs/link-behavior",
    },
] as const;

const joinClassNames = (
    ...classNames: readonly (string | undefined)[]
): string =>
    classNames.filter((className) => className !== undefined).join(" ");

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout
            description={packageTagline}
            title={`${packageName} documentation`}
        >
            <header className={styles.heroBanner}>
                <div
                    className={joinClassNames("container", styles.heroContent)}
                >
                    <div className={styles.heroGrid}>
                        <div>
                            <p className={styles.heroKicker}>TypeDoc plugin</p>
                            <Heading as="h1" className={styles.heroTitle}>
                                {siteConfig.title}
                            </Heading>
                            <p className={styles.heroSubtitle}>
                                {packageTagline}
                            </p>
                            <div className={styles.heroBadgeRow}>
                                {heroBadges.map((badge) => (
                                    <article
                                        className={styles.heroBadge}
                                        key={badge.label}
                                    >
                                        <p className={styles.heroBadgeLabel}>
                                            {badge.label}
                                        </p>
                                        <p
                                            className={
                                                styles.heroBadgeDescription
                                            }
                                        >
                                            {badge.description}
                                        </p>
                                    </article>
                                ))}
                            </div>
                            <div className={styles.heroActions}>
                                <Link
                                    className={joinClassNames(
                                        "button",
                                        "button--lg",
                                        styles.heroActionButton,
                                        styles.heroActionPrimary
                                    )}
                                    to="/docs/getting-started"
                                >
                                    Install and configure
                                </Link>
                                <Link
                                    className={joinClassNames(
                                        "button",
                                        "button--lg",
                                        styles.heroActionButton,
                                        styles.heroActionSecondary
                                    )}
                                    to="/docs/link-behavior"
                                >
                                    Review rewrite rules
                                </Link>
                            </div>
                        </div>
                        <aside className={styles.heroPanel}>
                            <img
                                alt={`${packageName} logo`}
                                className={styles.heroPanelLogo}
                                decoding="async"
                                height="240"
                                loading="eager"
                                src="img/logo.svg"
                                width="240"
                            />
                        </aside>
                    </div>
                    <GitHubStats
                        className={joinClassNames(styles.heroLiveBadges)}
                    />
                </div>
            </header>

            <main className={styles.mainContent}>
                <section className="container">
                    <div className={styles.cardGrid}>
                        {homeCards.map((card) => (
                            <article className={styles.card} key={card.title}>
                                <Heading as="h2" className={styles.cardTitle}>
                                    {card.title}
                                </Heading>
                                <p className={styles.cardDescription}>
                                    {card.description}
                                </p>
                                <Link
                                    className={joinClassNames(styles.cardLink)}
                                    to={card.to}
                                >
                                    Open section
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </Layout>
    );
}
