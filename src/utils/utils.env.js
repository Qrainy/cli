
const { execSync } = require('child_process')
const path = require('path')


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

function getRootPath () {
  return path.resolve(__dirname, '../../src')
}

module.exports = {
  hasYarn,
  hasNpm,
  hasPnpm,
  getRootPath
}