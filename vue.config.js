module.exports = {
  lintOnSave: true,
  publicPath: './',
  productionSourceMap: (process.env.NODE_ENV !== 'production'),
  css:{
    sourceMap:process.env.NODE_ENV !== 'production',
  },
  transpileDependencies: [

  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        maxAsyncRequests: 10,
        minSize: 10000,
        maxSize: 250000,
        chunks: 'all'
      }
    },
    output: {
      sourcePrefix: ' ',
    },
    plugins: [

    ]
  },
  pluginOptions: {
    electronBuilder: {
      preload: 'src/background/preload.js',
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        productName:'script-generator',
        win:{
          appId:'script-generator-0.1',
          target:'nsis',  // portable | win | nsis | nsis-web
        },
        portable:{
          useZip:true,
          artifactName:'script-generator.exe',
          splashImage:'src/assets/images/splash.png',
          unicode:true
        },
        nsis:{
          oneClick:false,
          perMachine:true,
          menuCategory:true,
          createDesktopShortcut:true,
          allowToChangeInstallationDirectory:true
        },
        // apk: {
        //
        // },
        extraResources:['src/background/wrfiles/**']
      },
      // // Provide an array of files that, when changed, will recompile the main process and restart Electron
      // // Your main process file will be added by default
      mainProcessWatch: ['src/background/preload.js','src/background/events/**'],
    }
  }
}
