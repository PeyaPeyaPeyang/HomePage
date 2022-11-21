import fs from "node:fs"
import { resolve as resolvePath } from "node:path"

import git from "git-last-commit"
import { defineConfig } from "vite"
import handlebars from "vite-plugin-handlebars"
import { ViteMinifyPlugin } from "vite-plugin-minify"

/**
 * html内で{{hoge}}とか{{fuga}}とかをグローバルに参照するためのkv
 */
const context = {}

const readdirNested = (baseDir, dirName) =>
    fs
        .readdirSync(resolvePath(baseDir, dirName))
        .map((file) => `${dirName}/${file}`)

const allFiles = [
    ...fs.readdirSync(resolvePath(__dirname, "src/pages")),
    ...readdirNested("src/pages", "contents"),
    ...readdirNested("src/pages", "private"),
]

const htmlFiles = allFiles.filter(
    // .htmうごかないかも
    (file) => file.endsWith(".html") || file.endsWith(".htm"),
)

const inputFiles = {}

for (const htmlFile of htmlFiles) {
    // 拡張子とってkvにするよ
    inputFiles[
        htmlFile.endsWith("l") ? htmlFile.slice(0, -5) : htmlFile.slice(0, -4)
    ] = resolvePath(__dirname, `src/pages/${htmlFile}`)
}

export default defineConfig(async () => {
    const lastCommit = await new Promise((resolve, reject) => {
        git.getLastCommit((err, commit) => {
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
            }),
            ViteMinifyPlugin({}),
        ],
    }
})
