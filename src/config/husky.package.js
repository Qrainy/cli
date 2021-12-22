
module.exports = {
  "scripts": {
    "lint-commit-msg": "commitlint --config commitlint.config.js -e -V",
    "lint-staged": "lint-staged",
  },
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*": "your-cmd, such as: eslint"
  }
}
