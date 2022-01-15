module.exports = {
  
  devServer: {
    proxy: {'/api/*':{
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {'^/api' : ''}
    }},
} ,
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}
