import type { JSX } from "react";

import Link from "@docusaurus/Link";

import styles from "./git-hub-stats.module.css";

interface GitHubStatsProps {
    readonly className?: string | undefined;
}

interface LiveBadge {
    readonly alt: string;
    readonly href: string;
    readonly src: string;
}

const packageName = "typedoc-plugin-docusaurus-doc-links";
const repositorySlug = "Nick2bad4u/typedoc-plugin-docusaurus-doc-links";
const badgeBaseUrl = "https://flat.badgen.net";

const liveBadges = [
    {
        alt: "npm license",
        href: `https://github.com/${repositorySlug}/blob/main/LICENSE`,
        src: `${badgeBaseUrl}/npm/license/${packageName}?color=purple`,
    },
    {
        alt: "npm total downloads",
        href: `https://www.npmjs.com/package/${packageName}`,
        src: `${badgeBaseUrl}/npm/dt/${packageName}?color=pink`,
    },
    {
        alt: "latest GitHub release",
        href: `https://github.com/${repositorySlug}/releases`,
        src: `${badgeBaseUrl}/github/release/${repositorySlug}?color=cyan`,
    },
    {
        alt: "GitHub open issues",
        href: `https://github.com/${repositorySlug}/issues`,
        src: `${badgeBaseUrl}/github/open-issues/${repositorySlug}?color=red`,
    },
    {
        alt: "Codecov",
        href: `https://app.codecov.io/gh/${repositorySlug}`,
        src: `${badgeBaseUrl}/codecov/github/${repositorySlug}?color=blue`,
    },
] as const satisfies readonly LiveBadge[];

const joinClassNames = (
    ...classNames: readonly (string | undefined)[]
): string =>
    classNames.filter((className) => className !== undefined).join(" ");

export default function GitHubStats({
    className = "",
}: GitHubStatsProps): JSX.Element {
    return (
        <ul className={joinClassNames(styles.liveBadgeList, className)}>
            {liveBadges.map((badge) => (
                <li className={styles.liveBadgeListItem} key={badge.src}>
                    <Link
                        className={joinClassNames(styles.liveBadgeAnchor)}
                        href={badge.href}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img
                            alt={badge.alt}
                            className={styles.liveBadgeImage}
                            decoding="async"
                            loading="lazy"
                            src={badge.src}
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
