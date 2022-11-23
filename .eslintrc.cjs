// @ts-check
const { builtinModules } = require("node:module")

const { defineConfig } = require("eslint-define-config")

module.exports = defineConfig({
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:eslint-comments/recommended",
        "plugin:regexp/recommended",
        "plugin:unicorn/recommended",
        "plugin:import/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
    ],
    parserOptions: {
        project: ["./tsconfig.json"],
    },
    plugins: ["sort-class-members", "unused-imports"],
    rules: {
        "@typescript-eslint/array-type": [
            "error",
            {
                default: "array-simple",
            },
        ],
        "@typescript-eslint/ban-tslint-comment": "error",
        "@typescript-eslint/consistent-indexed-object-style": ["error", "index-signature"],
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        "@typescript-eslint/consistent-type-imports": [
            "error",
            {
                disallowTypeAnnotations: false,
                prefer: "type-imports",
            },
        ],
        "@typescript-eslint/default-param-last": "error",
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                accessibility: "explicit",
            },
        ],
        "@typescript-eslint/lines-between-class-members": "error",
        "@typescript-eslint/method-signature-style": ["error", "method"],
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-confusing-non-null-assertion": "error",
        "@typescript-eslint/no-confusing-void-expression": "error",
        "@typescript-eslint/no-invalid-this": "error",
        "@typescript-eslint/no-meaningless-void-operator": "error",
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                checksVoidReturn: false,
            },
        ],
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-shadow": [
            "error",
            {
                builtinGlobals: true,
            },
        ],
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-throw-literal": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-unnecessary-qualifier": "error",
        "@typescript-eslint/no-unnecessary-type-arguments": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/non-nullable-type-assertion-style": "error",
        "@typescript-eslint/padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                prev: ["block", "block-like"],
                next: "*",
            },
            {
                blankLine: "always",
                prev: "block",
                next: "export",
            },
            {
                blankLine: "always",
                prev: "const",
                next: "*",
            },
            {
                blankLine: "never",
                prev: "singleline-const",
                next: "singleline-const",
            },
            {
                blankLine: "always",
                prev: "expression",
                next: "const",
            },
            {
                blankLine: "always",
                prev: "let",
                next: "*",
            },
            {
                blankLine: "never",
                prev: "singleline-let",
                next: "singleline-let",
            },
            {
                blankLine: "always",
                prev: "expression",
                next: "let",
            },
            {
                blankLine: "always",
                prev: "var",
                next: "*",
            },
            {
                blankLine: "never",
                prev: "singleline-var",
                next: "singleline-var",
            },
            {
                blankLine: "never",
                prev: "expression",
                next: "var",
            },
            {
                blankLine: "always",
                prev: "*",
                next: ["return", "continue", "break", "throw"],
            },
            {
                blankLine: "always",
                prev: "*",
                next: ["block-like"],
            },
            {
                blankLine: "always",
                prev: "directive",
                next: "*",
            },
            {
                blankLine: "always",
                prev: ["case", "default"],
                next: "*",
            },
            {
                blankLine: "always",
                prev: "*",
                next: ["interface", "type"],
            },
            {
                blankLine: "always",
                prev: ["import", "require"],
                next: ["export", "exports"],
            },
            {
                blankLine: "any",
                prev: ["import", "require"],
                next: ["import", "require"],
            },
        ],
        "@typescript-eslint/prefer-includes": "error",
        "@typescript-eslint/prefer-reduce-type-parameter": "error",
        "@typescript-eslint/prefer-regexp-exec": "error",
        "@typescript-eslint/prefer-return-this-type": "error",
        "@typescript-eslint/prefer-string-starts-ends-with": "error",
        "@typescript-eslint/prefer-ts-expect-error": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/return-await": "error",
        "@typescript-eslint/sort-type-union-intersection-members": "error",
        "constructor-super": "error",
        "default-case-last": "error",
        eqeqeq: "error",
        "for-direction": "error",
        "func-style": ["error", "expression"],
        "no-div-regex": "error",
        "no-extra-bind": "error",
        "no-label-var": "error",
        "no-lone-blocks": "error",
        "no-lonely-if": "error",
        "no-multi-assign": "error",
        "no-multi-str": "error",
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
        "no-undef-init": "error",
        "no-unmodified-loop-condition": "error",
        "no-unneeded-ternary": "error",
        "no-useless-call": "error",
        "no-useless-computed-key": "error",
        "no-useless-concat": "error",
        "no-useless-rename": "error",
        "no-useless-return": "error",
        "no-void": "error",
        "no-warning-comments": "warn",
        "object-shorthand": "error",
        "one-var": ["error", "never"],
        "operator-assignment": "error",
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
        "prefer-template": "error",
        radix: "error",
        "require-yield": "error",
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
        yoda: "error",

        "import/newline-after-import": "error",
        "import/no-nodejs-modules": ["error", { allow: builtinModules.map((mod) => `node:${mod}`) }],
        "import/no-self-import": "error",
        "import/no-useless-path-segments": "error",
        "import/order": [
            "error",
            {
                alphabetize: {
                    order: "asc",
                },
                groups: ["builtin", "external", "parent", "sibling", "index", "object", "type"],
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

        // This rule is too strict
        "unicorn/prefer-module": "off",
        "unicorn/prevent-abbreviations": "off",

        "unused-imports/no-unused-imports": "warn",

        "@typescript-eslint/no-unused-vars": "off",
        "no-unused-vars": "off",
        "unused-imports/no-unused-vars": [
            "warn",
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

        // conflicts with prettier
        "unicorn/empty-brace-spaces": "off",
        "unicorn/no-nested-ternary": "off",
        "unicorn/number-literal-case": "off",

        // Project-specific rules
        "no-alert": "off",
        "no-console": "off",
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
        },
        {
            files: ["*.cjs"],
            rules: {
                "@typescript-eslint/no-require-imports": "off",
                "@typescript-eslint/no-var-requires": "off",
            },
        },
        // Project-specific overrides
        {
            files: ["src/**/*.ts", "src/**/*.js"],
            parserOptions: {
                project: ["src/tsconfig.json"],
            },
        },
    ],
    reportUnusedDisableDirectives: true,
})
