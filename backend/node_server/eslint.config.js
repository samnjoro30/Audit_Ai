import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        languagesOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                URL: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
            }
        },
        rules: {
            indent: ['error', 2, { SwitchCase: 1 }],
            'linebreak-style': ['error', 'unix'],
        }
    }
]