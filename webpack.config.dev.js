
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const devMode = process.env.NODE_ENV !== 'production';
console.log( process.env.NODE_ENV );


module.exports = ( env, argv ) => {
  return {
    name: 'dev',
    entry: './example/index.js',
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
      static: './development',
      hot: true,
      compress: true,
      devMiddleware: {
        index: true,
        mimeTypes: { 'text/html': [ 'html' ] },
        writeToDisk: true,
      },
    },
    output: {
      path: path.resolve( __dirname, './development' ),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: '/node_modules/',
          loader: 'babel-loader',
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin( {
        cleanStaleWebpackAssets: false,
      } ),
      new HtmlWebpackPlugin( { template: './example/index.html' } )
    ],
    resolve: {
      alias: {
        '@form': path.resolve( __dirname, 'libs', 'form' ),
      },
    },
  };
};
