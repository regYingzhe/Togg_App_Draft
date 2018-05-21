module.exports = {
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'no-multiple-empty-lines': 0,
    'no-mixed-operators': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "quotes": "off",
    "semi": "off",
    "no-unused-vars": "off",
    "space-before-function-paren": "off",
    "eol-last": "off",
    "handle-callback-error": "off",
    "no-trailing-spaces": "off"
  }
};
