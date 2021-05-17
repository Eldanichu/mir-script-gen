module.exports = {
  purge: {
    content:[
      './public/**/*.html',
      './src/**/*.vue',
      './src/**/*.js',
      './src/**/*.jsx',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  important: '#app',
  theme: {
    extend: {
      colors:{
        primary:'rgb(46, 117, 181)',
        blue:{
          '450':'#377BB9',
          '550':'#215483',
          '850':'#194265',
        }
      },
      fontSize:{
        'ns':'12px',
        'nm':'14px',
        'nl':'16px'
      },
      fontFamily:{
        chn:'-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol'
      }
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
