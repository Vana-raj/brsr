import { Configuration } from 'webpack';

const config: Configuration = {
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/', 
            publicPath: 'fonts/', 
          },
        },
      },
    ],
  },
};

export default config;
