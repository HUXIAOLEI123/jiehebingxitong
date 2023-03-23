'use strict';
const path = require('path');
const defaultSettings = require('./src/settings.js');
// 引入等比适配插件
const px2rem = require('postcss-px2rem');
// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 17,
});
function resolve(dir) {
  return path.join(__dirname, dir);
}
const name = defaultSettings.title || '江西肺结核'; // page title
const port = process.env.port || process.env.npm_config_port || 9522; // dev port
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin'); //这个插件可以看官网还是很好用的
const productionGzipExtensions = ['js', 'css']; //对什么文件进行压缩
const Timestamp = new Date().getTime(); //防止http的缓存每次打包用时间戳进行区分

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === 'development',
  css: {
    //使用等比适配插件
    loaderOptions: {
      postcss: {
        plugins: [postcss],
      },
    },
  },
  devServer: {
    port: port,
    open: true,
    // 设置代理
    proxy: {
      '/api': {
        // 导出接口+视频播放调用参数(源地址)注意（后端地址变化时注意修改）
        target: process.env.VUE_APP_BASE_API,
        //process.env.VUE_APP_BASE_API,//代理的域名和端口号 后端接口
        changOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
    // public: 'http://localhost:9527',
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    devtool: 'source-map',
    externals: {
      AMap: 'AMap', // 高德地图配置
      AMapUI: 'AMapUI',
    },
    output: {
      // 输出重构  打包编译后的 文件名称
      filename: `js/[name]${Timestamp}.js`,
      chunkFilename: `js/[name]${Timestamp}.js`,
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), //该插件能够使得指定目录被忽略，从而使得打包变快，文件变小
      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip', //压缩算法
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), //处理所有匹配此 {RegExp} 的资源
        threshold: 10240, //只处理比这个值大的资源。按字节计算
        minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5, //控制打包生成js的个数
        minChunkSize: 100,
      }),
    ],
  },
  chainWebpack(config) {
    config.externals({ './cptable': 'var cptable' });
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ]);
    config.plugins.delete('prefetch');
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk('single');
    });
  },
};
