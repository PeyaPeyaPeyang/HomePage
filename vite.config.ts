import { readdirSync } from "node:fs"
import { resolve as resolvePath } from "node:path"

import { getLastCommit } from "git-last-commit"
import { defineConfig } from "vite"
import handlebars from "vite-plugin-handlebars"
import { ViteMinifyPlugin } from "vite-plugin-minify"

import type { Commit } from "git-last-commit"
import type { Plugin as VitePlugin } from "vite"

/**
 * html内で{{hoge}}とか{{fuga}}とかをグローバルに参照するためのkv
 */
const context = {}

const readdirNested = (baseDir: string, dirName: string) =>
    readdirSync(resolvePath(baseDir, dirName)).map(
        (file) => `${dirName}/${file}`,
    )

const allFiles = [
    ...readdirSync(resolvePath(__dirname, "src/pages")),
    ...readdirNested("src/pages", "contents"),
    ...readdirNested("src/pages", "private"),
]

const htmlFiles = allFiles.filter(
    // .htmうごかないかも
    (file) => file.endsWith(".html") || file.endsWith(".htm"),
)

const inputFiles: { [key: string]: string } = {}

for (const htmlFile of htmlFiles) {
    // 拡張子とってkvにするよ
    inputFiles[
        htmlFile.endsWith("l") ? htmlFile.slice(0, -5) : htmlFile.slice(0, -4)
    ] = resolvePath(__dirname, `src/pages/${htmlFile}`)
}

export default defineConfig(async ({ mode }) => {
    const lastCommit = await new Promise<Commit>((resolve, reject) => {
        getLastCommit((err: Error | undefined, commit) => {
            if (err) reject(err)
            else resolve(commit)
        })
    })

    const commitDate = new Date(+lastCommit.committedOn * 1000)

    const commitContext = {
        commit_date: commitDate.toLocaleString(),
        commit_message: lastCommit.subject,
    }

    return {
        root: "src/pages",
        base: "",
        publicDir: resolvePath(__dirname, "src/public"),
        build: {
            emptyOutDir: true,
            outDir: "../../dist", // /dist
            rollupOptions: {
                input: inputFiles,
            },
            sourcemap: mode === "development",
        },
        server: {
            watch: {
                // WSL2の場合はこれが必要
                usePolling: true,
            },
        },
        resolve: {
            alias: [{ find: "@", replacement: resolvePath(__dirname, "src") }],
        },
        plugins: [
            handlebars({
                partialDirectory: resolvePath(
                    __dirname,
                    "src/pages/components",
                ),
                context: {
                    ...context,
                    ...commitContext,
                },
            }) as unknown as VitePlugin,
            ViteMinifyPlugin({}),
        ],
    }
})
