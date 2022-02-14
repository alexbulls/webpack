/**
 * 1. Webpack
 * 2. Базовая настройка конфига
 * 3. Паттерны
 * 4. Плагины
 * 5. Работа с 'HTML'
 * 6. Очистка папки проекта
 * 7. Сборка проекта
 * 8. Контент
 * 9. CSS loaders
 * 10. Работа с 'JSON'
 * 11. Работа с файлами
 * 12. Подключение JS библиотек
 * 13. Оптимизация
 * 14. Dev server
 * 15. Копирование статических файлов
 * 16. Сжатие HTML, CSS, JS
 * 17. Компиляция Less
 * 18. Babel
 * 19. Плагины для Babel
 * 20. Компиляция TypeScript
 * 21. DevTool
 * 22. Динамические импорты
 * 23. Анализ финальной сборки
 * */

const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getOptimizationData = () => {
  const data = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (!isDev) {
    data.minimizer = [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return data;
};

const getPlugins = () => {
  const data = [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          to: path.resolve(__dirname, 'dist'),
          from: path.resolve(__dirname, 'src/favicon.ico'),
        },
      ],
    }),
    new MiniCSSExtractPlugin({
      filename: getFilePattern('css'),
    }),
  ];

  if (!isDev) {
    data.push(new BundleAnalyzerPlugin({
      generateStatsFile: true,
      statsFilename: 'bundle-analyzer-data.json',
    }));
  }

  return data;
}

const getFilePattern = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const config = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js'],
    analytics: './modules/Analytics/index.ts',
  },
  output: {
    filename: getFilePattern('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: getOptimizationData(),
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'modules': path.resolve(__dirname, 'src/modules'),
    },
  },
  devServer: {
    port: 3000,
    open: true,
    hot: isDev,
  },
  plugins: getPlugins(),
  devtool: isDev ? 'source-map' : 'eval',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        }],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: ['file-loader'],
      }
    ],
  },
};

module.exports = config;
