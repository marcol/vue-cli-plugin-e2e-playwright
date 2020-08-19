const { info, execa } = require('@vue/cli-shared-utils')

module.exports = (api, options) => {
  async function handler (args, rawArgs) {
    const { server, url } = args.url ? { url: args.url }
      : await api.service.run('serve')

    info('Running Playwright E2E tests...')

    process.env.VUE_DEV_SERVER_URL = url
    process.env.VUE_BROWSER_ENGINE = args.browser || 'chromium'

    const runner = await execa('mocha', [
      './tests/e2e/*.spec.js',
      '--timeout',
      args.timeout || 90000
    ], { stdio: 'inherit' })

    if (server) {
      server.close()
    }

    if (process.env.VUE_CLI_TEST) {
      runner.on('exit', code => {
        process.exit(code)
      })
    }
  }

  api.registerCommand('test:e2e', {
    description: 'Run e2e tests with Playwright',
    usage: 'vue-cli-service test:e2e',
    options: {
      '--timeout': 'Tests timeout in ms. Default 90000',
      '--browser': 'Browser to run the tests, can be chromium, firefix or webkit. Default chromium',
      '--url': 'URL to test. If set it will not run the dev server'
    }
  },
  handler)
}
