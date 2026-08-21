import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const rootManifest = JSON.parse(readFileSync("package.json", "utf8"));
const docsManifest = JSON.parse(
    readFileSync("docs/docusaurus/package.json", "utf8")
);
const expectedPackageManager = rootManifest.packageManager;

if (!/^npm@\d+\.\d+\.\d+$/v.test(expectedPackageManager)) {
    throw new Error(
        `Expected an exact npm packageManager, received ${String(expectedPackageManager)}`
    );
}

if (docsManifest.packageManager !== expectedPackageManager) {
    throw new Error(
        `Workspace packageManager ${String(docsManifest.packageManager)} does not match root ${expectedPackageManager}`
    );
}

const expectedVersion = expectedPackageManager.slice("npm@".length);
const npmCliPath = process.env.npm_execpath;

if (typeof npmCliPath !== "string" || npmCliPath.length === 0) {
    throw new Error("npm_execpath is unavailable; run this check through npm.");
}

const actualVersion = execFileSync(
    process.execPath,
    [npmCliPath, "--version"],
    {
        encoding: "utf8",
    }
).trim();

if (actualVersion !== expectedVersion) {
    throw new Error(
        `Expected npm ${expectedVersion} from packageManager, received ${actualVersion}`
    );
}

console.log(`npm ${actualVersion} matches every packageManager declaration.`);
