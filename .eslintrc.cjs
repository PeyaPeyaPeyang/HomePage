const { builtinModules } = require("node:module")
const { defineConfig } = require("eslint-define-config")

module.exports = defineConfig({
    root: true,
    env: {
        browser: true,
        node: true,
        // jest: true,
    },
    extends: ["eslint:recommended", "plugin:eslint-comments/recommended"],
    rules: {
        "space-before-blocks": "error",
        "spaced-comment": [
            "error",
            "always",
            {
                block: {
                    exceptions: ["*"],
                },
                line: {
                    exceptions: ["-"],
                    markers: ["/"],
                },
            },
        ],
    },
    overrides: [
        {
            env: {
                node: true,
            },
            extends: [
                "plugin:regexp/recommended",
                "plugin:unicorn/recommended",
            ],
            files: ["**.{js,ts}{,x}"],
            parserOptions: {
                sourceType: "module",
            },
            plugins: [
                "node",
                "import",
                "sort-class-members",
                "unicorn",
                "unused-imports",
            ],
            rules: {
                "block-spacing": "error",
                "constructor-super": "error",
                "default-case-last": "error",
                "default-param-last": "error",
                eqeqeq: "error",
                "for-direction": "error",
                "func-style": ["error", "expression"],
                "import/order": [
                    "error",
                    {
                        alphabetize: {
                            order: "asc",
                        },
                        groups: [
                            "builtin",
                            "external",
                            "parent",
                            "sibling",
                            "index",
                            "object",
                            "type",
                        ],
                        "newlines-between": "always",
                        pathGroups: [
                            {
                                group: "parent",
                                pattern: "@/**",
                                position: "before",
                            },
                        ],
                    },
                ],
                "lines-between-class-members": "error",
                "new-parens": "error",
                "no-alert": "error",

                "no-array-constructor": "error",
                "no-div-regex": "error",
                "no-duplicate-imports": [
                    "error",
                    {
                        includeExports: false,
                    },
                ],
                "no-extra-bind": "error",
                "no-implied-eval": "error",
                "no-invalid-this": "error",
                "no-label-var": "error",
                "no-lone-blocks": "error",
                "no-lonely-if": "error",
                "no-mixed-spaces-and-tabs": "off",
                "no-multi-assign": "error",
                "no-multi-str": "error",
                "no-nested-ternary": "off",
                "no-new-func": "error",
                "no-new-object": "error",
                "no-octal-escape": "error",
                "no-param-reassign": "error",

                // For web apps
                "no-process-exit": "error",

                "no-proto": "error",
                "no-return-assign": "error",
                "no-script-url": "error",
                "no-self-compare": "error",
                "no-sequences": "error",
                "no-shadow": [
                    "error",
                    {
                        builtinGlobals: true,
                    },
                ],
                "no-throw-literal": "error",
                "no-undef-init": "error",
                "no-unmodified-loop-condition": "error",
                "no-unneeded-ternary": "error",
                "no-unused-expressions": "error",

                // use unused-imports/no-unused-vars
                "no-unused-vars": "off",

                "no-useless-call": "error",
                "no-useless-computed-key": "error",
                "no-useless-concat": "error",
                "no-useless-constructor": "error",
                "no-useless-rename": "error",
                "no-useless-return": "error",
                "no-var": "error",
                "no-void": "error",
                "no-warning-comments": "warn",
                "object-shorthand": "error",
                "one-var": ["error", "never"],
                "operator-assignment": "error",
                "operator-linebreak": "error",
                "padding-line-between-statements": [
                    "error",
                    {
                        blankLine: "always",
                        next: "*",
                        prev: ["block", "block-like"],
                    },
                    {
                        blankLine: "always",
                        next: "export",
                        prev: "block",
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: "const",
                    },
                    {
                        blankLine: "never",
                        next: "singleline-const",
                        prev: "singleline-const",
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: "let",
                    },
                    {
                        blankLine: "never",
                        next: "singleline-let",
                        prev: "singleline-let",
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: "var",
                    },
                    {
                        blankLine: "never",
                        next: "singleline-var",
                        prev: "singleline-var",
                    },
                    {
                        blankLine: "never",
                        next: ["cjs-export", "cjs-import"],
                        prev: ["cjs-export", "cjs-import"],
                    },
                    {
                        blankLine: "always",
                        next: ["return", "continue", "break", "throw"],
                        prev: "*",
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: "directive",
                    },
                    {
                        blankLine: "always",
                        next: "*",
                        prev: ["case", "default"],
                    },
                ],
                "prefer-arrow-callback": [
                    "error",
                    {
                        allowNamedFunctions: true,
                    },
                ],
                "prefer-const": [
                    "error",
                    {
                        destructuring: "all",
                        ignoreReadBeforeAssign: false,
                    },
                ],
                "prefer-destructuring": "error",
                "prefer-exponentiation-operator": "error",
                "prefer-object-spread": "error",
                "prefer-promise-reject-errors": "error",
                "prefer-regex-literals": "error",
                "prefer-rest-params": "error",
                "prefer-spread": "error",
                "prefer-template": "error",
                radix: "error",
                "require-await": "error",
                "require-yield": "error",
                "wrap-iife": ["error", "inside"],
                "wrap-regex": "error",
                yoda: "error",

                // Project-specific rules
                "no-alert": "off",
                "no-console": "off",

                "node/no-missing-import": "off",
                "import/no-nodejs-modules": [
                    "error",
                    { allow: builtinModules.map((mod) => `node:${mod}`) },
                ],
                "import/no-duplicates": "error",
                "regexp/no-contradiction-with-assertion": "error",
                "sort-class-members/sort-class-members": [
                    "error",
                    {
                        accessorPairPositioning: "getThenSet",
                        order: [
                            "[static-properties]",
                            "[properties]",
                            "[conventional-private-properties]",
                            "constructor",
                            "[methods]",
                            "[static-methods]",
                            "[conventional-private-methods]",
                            "[getters]",
                            "[setters]",
                        ],
                    },
                ],
                "unicorn/better-regex": "off",

                // conflicts with prettier
                "unicorn/number-literal-case": "off",

                "unicorn/prefer-module": "off",
                "unicorn/prevent-abbreviations": "off",
                "unused-imports/no-unused-imports": "error",
                "unused-imports/no-unused-vars": [
                    "error",
                    {
                        args: "after-used",
                        argsIgnorePattern: "^_",
                        caughtErrors: "all",
                        caughtErrorsIgnorePattern: "^_",
                        destructuredArrayIgnorePattern: "^_",
                        vars: "local",
                        varsIgnorePattern: "^_",
                    },
                ],
            },
        },
    ],
    reportUnusedDisableDirectives: true,
})
