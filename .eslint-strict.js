module.exports = {
    rules: {
        /* Extension Rules */
        '@typescript-eslint/no-unused-vars': ['error'],
        'import/prefer-default-export': 'off',

        /* Standard Rules */
        'no-promise-executor-return': 'error',
        'no-template-curly-in-string': 'error',
        'require-atomic-updates': 'error',
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'curly': ['error', 'multi-or-nest', 'consistent'],
        'default-case': 'warn',
        'default-case-last': 'error',
        'default-param-last': 'error',
        'dot-location': ['error', 'property'],
        'dot-notation': 'error',
        'eqeqeq': ['warn', 'smart'],
        'grouped-accessor-pairs': ['warn', 'getBeforeSet'],
        'no-alert': 'error',
        'no-constructor-return': 'error',
        'no-else-return': 'warn',
        'no-eval': 'error',
        'no-extend-native': ['error', { exceptions: ['Object', 'Array'] }],
        'no-fallthrough': 'error',
        'no-floating-decimal': 'warn',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-lone-blocks': 'warn',
        'no-loop-func': 'error',
        'no-multi-spaces': 'warn',
        'no-multi-str': 'warn',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-nonoctal-decimal-escape': 'warn',
        'no-param-reassign': 'error',
        'no-proto': 'error',
        'no-return-assign': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
                allowTernary: true,
                allowTaggedTemplates: true,
            },
        ],
        'no-useless-return': 'warn',
        'no-void': 'error',
        'prefer-promise-reject-errors': 'warn',
        'require-await': 'warn',
        'wrap-iife': ['error', 'inside'],
        'yoda': ['error', 'never'],
        'no-label-var': 'error',
        'no-shadow': 'error',
        'no-undefined': 'error',
        'no-use-before-define': 'error',

        'array-bracket-newline': ['warn', { multiline: true }],
        'array-bracket-spacing': ['warn', 'never', { arraysInArrays: true }],
        'array-element-newline': [
            'warn',
            {
                multiline: true,
                minItems: 3,
            },
        ],
        'block-spacing': 'warn',
        'brace-style': ['warn', '1tbs'],
        'camelcase': ['warn', { allow: ['V2_MetaFunction'] }],
        'capitalized-comments': 'warn',
        'comma-dangle': ['warn', 'always-multiline'],
        'comma-spacing': [
            'warn',
            {
                before: false,
                after: true,
            },
        ],
        'comma-style': ['warn', 'last'],
        'eol-last': ['warn', 'always'],
        'func-call-spacing': ['warn', 'never'],
        'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
        'function-call-argument-newline': ['warn', 'never'],
        'function-paren-newline': ['warn', 'never'],
        'id-length': 'off',
        'implicit-arrow-linebreak': ['warn', 'beside'],
        'indent': ['warn', 2, { SwitchCase: 1 }],
        'key-spacing': [
            'warn',
            {
                beforeColon: false,
                afterColon: true,
                mode: 'minimum',
            },
        ],
        'keyword-spacing': [
            'warn',
            {
                before: true,
                after: true,
            },
        ],
        'line-comment-position': ['warn', 'above'],
        'lines-around-comment': [
            'warn',
            {
                beforeBlockComment: true,
                beforeLineComment: true,
                allowBlockStart: true,
                allowBlockEnd: true,
                allowClassStart: true,
                allowClassEnd: true,
                allowObjectStart: true,
                allowObjectEnd: true,
                allowArrayStart: true,
                allowArrayEnd: true,
            },
        ],
        'lines-between-class-members': ['warn', 'always'],
        'max-len': [
            'warn',
            {
                code: 240,
                tabWidth: 8,
                comments: 160,
                ignoreComments: false,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
        'max-params': ['warn', 6],
        'max-statements-per-line': ['warn', { max: 1 }],
        'multiline-comment-style': ['error', 'starred-block'],
        'multiline-ternary': ['error', 'never'],
        'new-cap': 'error',
        'new-parens': ['error', 'always'],
        'newline-per-chained-call': 'warn',
        'no-array-constructor': 'error',
        'no-inline-comments': 'error',
        'no-lonely-if': 'error',
        'no-mixed-operators': 'error',
        'no-multi-assign': 'error',
        'no-multiple-empty-lines': [
            'warn',
            {
                max: 2,
                maxBOF: 0,
            },
        ],
        'no-negated-condition': 'error',
        'no-nested-ternary': 'error',
        'no-new-object': 'error',
        'no-trailing-spaces': 'warn',
        'no-whitespace-before-property': 'warn',
        'nonblock-statement-body-position': ['error', 'below'],
        'object-curly-newline': [
            'warn',
            {
                ObjectExpression: {
                    multiline: true,
                    minProperties: 3,
                },
                ObjectPattern: {
                    multiline: true,
                    minProperties: 3,
                },
                ImportDeclaration: {
                    multiline: true,
                    minProperties: 3,
                },
                ExportDeclaration: {
                    multiline: true,
                    minProperties: 3,
                },
            },
        ],
        'object-curly-spacing': ['warn', 'always'],
        'object-property-newline': 'warn',
        'one-var': ['error', 'never'],
        'one-var-declaration-per-line': ['error', 'initializations'],
        'operator-linebreak': [
            'error',
            'none',
            {
                overrides: {
                    '&&': 'ignore',
                    '||': 'ignore',
                },
            },
        ],
        'padded-blocks': ['warn', 'never'],
        'quote-props': [
            'error',
            'consistent',
            {
                keywords: true,
                numbers: true,
            },
        ],
        'quotes': [
            'warn',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        'semi': ['error', 'always'],
        'semi-spacing': [
            'warn',
            {
                before: false,
                after: false,
            },
        ],
        'semi-style': ['error', 'last'],
        'space-before-blocks': ['warn', 'always'],
        'space-before-function-paren': ['warn', 'never'],
        'space-in-parens': ['warn', 'never'],
        'space-infix-ops': ['warn', { int32Hint: true }],
        'space-unary-ops': [
            'warn',
            {
                words: true,
                nonwords: false,
            },
        ],
        'spaced-comment': ['warn', 'always'],
        'switch-colon-spacing': [
            'warn',
            {
                before: false,
                after: true,
            },
        ],
        'template-tag-spacing': ['error', 'never'],

        /* ES6 SPECIFICS */
        'arrow-body-style': ['warn', 'as-needed'],
        'arrow-parens': ['warn', 'as-needed'],
        'arrow-spacing': [
            'warn',
            {
                before: true,
                after: true,
            },
        ],
        'generator-star-spacing': [
            'error',
            {
                before: false,
                after: true,
            },
        ],
        'no-confusing-arrow': 'error',
        'no-duplicate-imports': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-var': 'error',
        'object-shorthand': ['error', 'always'],
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-destructuring': 'warn',
        'prefer-numeric-literals': 'error',
        'prefer-template': 'error',
        'rest-spread-spacing': ['error', 'never'],
        'template-curly-spacing': ['warn', 'never'],
        'yield-star-spacing': [
            'error',
            {
                before: false,
                after: true,
            },
        ],
    },
};
