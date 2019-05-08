// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'pact', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@pact-foundation/karma-pact'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    // Please uncomment for prod
    // autoWatch: false,
    // browsers: ['ChromeHeadlessNoSandbox'],
    // customLaunchers: {
    //   ChromeHeadlessNoSandbox: {
    //     base: 'ChromeHeadless',
    //     flags: [
    //       '--no-sandbox',
    //       '--disable-setuid-sandbox',
    //       '--headless',
    //       '--disable-gpu',
    //       '--remote-debugging-port=9222',
    //     ]
    //   }
    // },
    // singleRun: true,
    // Please uncomment for dev
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    pact: [{
      cors: true,
      port: 1234,
      consumer: "midgard",
      provider: "bifrost",
      dir: "pacts",
      spec: 2
    }],
    proxies: {
      '/bifrost/': 'http://127.0.0.1:1234/bifrost/'
    }
  });
};
