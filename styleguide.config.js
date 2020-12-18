module.exports = {
  components: 'src/components/**/[A-Z]*.tsx',
  webpackConfig: {
    module: {
      rules: [
        // Babel loader will use your project’s babel.config.js
        {
          test: /(?<!\.d)\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
}