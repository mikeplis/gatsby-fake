module.exports = {
    extends: 'airbnb',
    rules: {
        // Overwriting indentation rules to be 4 spaces instead of 2
        'indent': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],

        'max-len': ['warn', 120],

        // Turning off a couple of rules that I don't think are necessary
        'comma-dangle': 'off',
        'no-else-return': 'off',
        'react/jsx-filename-extension': 'off',
        'react/no-multi-comp': 'off',

        // These rules can conflict with Prettier, which I use for formatting
        'arrow-parens': 'off',
        'react/jsx-wrap-multilines': 'off',
        'arrow-body-style': 'off',

        'import/no-extraneous-dependencies': 'off'
    }
};
