module.exports = {
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
  env: {
    jest: true,
  },
  rules: {
    semi: 0,
    'arrow-parens': 0,
    'comma-dangle': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'no-underscore-dangle': 0,
    'import/extensions': 0,
    'import/first': 0,
    'import/named': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/prefer-default-export': 0,
    indent: [2, 2],
    'no-param-reassign': 0,
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'space-before-function-paren': 0,
  },
}
