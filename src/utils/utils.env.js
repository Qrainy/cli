
const { execSync } = require('child_process')


function hasYarn () {
  try {
    execSync('yarn --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}
function hasNpm () {
  try {
    execSync('npm --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}
function hasPnpm () {
  try {
    execSync('pnpm --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  hasYarn,
  hasNpm,
  hasPnpm
}