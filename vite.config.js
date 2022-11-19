import fs from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { ViteMinifyPlugin } from "vite-plugin-minify";

/**
 * html内で{{hoge}}とか{{fuga}}とかをグローバルに参照するためのkv
 */
const context = {};

const allFiles = [
    ...fs.readdirSync(resolve(__dirname, "src/pages")),
    ...fs.readdirSync(resolve(__dirname, "src/pages/contents")),
];

export default defineConfig({
    root: "src/pages",
    base: "",
    publicDir: resolve(__dirname, "src/public"),
    build: {
        emptyOutDir: true,
        outDir: "../../dist",
    },
    resolve: {
        alias: [
            { find: "@/", replacement: "src/" }
        ]
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, "src/pages/components"),
            context,
        }),
        ViteMinifyPlugin({}),
    ],
});
