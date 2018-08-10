const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const extractSass = new ExtractTextPlugin({
    filename: '[name].css'
  });

  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.s?css$/,
          use: extractSass.extract({
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader: 'sass-loader'
              }
            ],
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),
      extractSass
    ],

    devtool: isProduction ? 'source-map' : 'inline-source-map'
  };
};
