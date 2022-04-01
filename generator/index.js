module.exports = (api) => {
  api.render('./template')

  api.extendPackage({
    scripts: {
      'test:e2e': 'vue-cli-service test:e2e'
    },
    devDependencies: {
      '@vue/test-utils': '^1.3.0',
      chai: '^4.3.6',
      playwright: '^1.20.2'
    },
    eslintConfig: {
      overrides: [
        {
          files: [
            '**/__tests__/*.{j,t}s?(x)',
            '**/tests/e2e/**/*.spec.{j,t}s?(x)'
          ],
          env: {
            mocha: true
          }
        }
      ]
    }
  })
}
