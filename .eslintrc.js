module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "plugins": [
    "react",
  ],
  "globals": {
    "graphql": false
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
    },
  }, 
  "rules": {
    "indent": ["error", 2, {"SwitchCase": 1}],
    "brace-style": ["error", "1tbs"],
    "camelcase": ["error", {"properties": "never"}],
    "comma-spacing": ["error", {"before": false, "after": true}],
    "comma-style": ["error", "last"],
    "space-before-blocks": ["error", { "functions": "always", "keywords": "always", "classes": "always" }],
    "semi": ["error", "always"],
    "no-undef": "error",
    "no-var": "error",
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }],
    "prefer-const": "error",
    "no-const-assign": "error",
    "one-var": ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    "no-trailing-spaces": "error",
    "react/jsx-closing-bracket-location": "error",
    "react/jsx-tag-spacing": ["error", { "beforeSelfClosing": "always" }],
    "react/jsx-curly-spacing": ["error", "never"]
  }

}
