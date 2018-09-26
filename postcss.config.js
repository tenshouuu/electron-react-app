module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 3,
      features: {
        'color-mod-function': { unresolved: 'warn' }
      },
      browsers: [
        'Firefox >= 58',
        'Chrome >= 62',
        'ie >= 10',
        'last 4 versions',
        'Safari >= 9'
      ]
    },
    'postcss-import': {},
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['html', 'body'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    },
    'postcss-nested': {}
  }
}
