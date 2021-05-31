/**
 * Script to run before release
 */
const shell = require('shelljs')
const sugar = require('sugar-chalk')
const Runner = require('listr')
const pkg = require('../package.json')

sugar.info('Creating new release...')

/**
 * Handle promosise and log progress
 * @param  {String} cmd command to run
 * @param  {Object} log Ora instance to log information
 * @return void
 */
function promise (cmd, ctx) {
  return new Promise((resolve, reject) => {
    shell.exec(cmd, { silent: true }, (code) => {
      if (code) {
        reject(code)
        ctx.rejected = true
      } else {
        resolve()
      }
    })
  })
}

function createTag (ctx) {
  return new Promise((resolve, reject) => {
    if (shell.exec('git show-ref --tags ' + pkg.version, { silent: true }).code !== 0) {
      shell.exec('git tag ' + pkg.version + ' && git push --tags', { silent: true })
      resolve()
    } else {
      reject(new Error('Tag already exists'))
    }
  })
}

const tasks = new Runner([
  { title: 'Linting', task: (ctx) => promise('yarn lint', ctx) },
  { title: 'Check for vulnerabilites in dependencies', task: (ctx) => promise('yarn audit', ctx) },
  { title: 'Check for outdated dependencies', task: (ctx) => promise('yarn outdated', ctx) },
  { title: 'Unit tests', task: (ctx) => promise('yarn test', ctx) },
  { title: 'Create release tag', enabled: (ctx) => ctx.rejected !== true, task: (ctx) => createTag(ctx) }
])

tasks.run()
  .then(() => {
    sugar.pass('Release is valid. Please publish: `yarn publish --tag ' + pkg.version + '`')
  })
  .catch((error) => {
    sugar.fail('Error creating release', error)
  })
