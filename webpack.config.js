module.exports = {
  mode: "production",

  entry: "./src/index.js",

  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
              loader: 'url-loader',
              options: {
                  name: './dist/img/icon/[name].[ext]'
              }
          }
      }
    ],
  },
  target: ["web", "es5"],
};