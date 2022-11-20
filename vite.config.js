import fs from "node:fs"
import { resolve } from "node:path"

import { defineConfig } from "vite"
import handlebars from "vite-plugin-handlebars"
import { ViteMinifyPlugin } from "vite-plugin-minify"

/**
 * html内で{{hoge}}とか{{fuga}}とかをグローバルに参照するためのkv
 */
const context = {}

const allFiles = [
    ...fs.readdirSync(resolve(__dirname, "src/pages")),
    "contents/100que.htm",
    "contents/welcome.htm",
    "contents/artifacts.htm",
    "contents/contact_got.htm",
    "contents/contact.htm",
    /*
    ...fs
        .readdirSync(resolve(__dirname, "src/pages/contents"))
        .map((file) => `contents/${file}`),
    */
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
    ] = resolve(__dirname, `src/pages/${htmlFile}`)
}

export default defineConfig({
    root: "src/pages",
    base: "",
    publicDir: resolve(__dirname, "src/public"),
    build: {
        emptyOutDir: true,
        outDir: "../../dist", // /dist
        rollupOptions: {
            input: inputFiles,
        },
    },
    resolve: {
        alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, "src/pages/components"),
            context,
        }),
        ViteMinifyPlugin({}),
    ],
})
