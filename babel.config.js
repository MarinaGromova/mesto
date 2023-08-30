const presets = [
  ['@babel/env', { 
      targets: { 
          edge: '17',
          ie: '11',
          firefox: '80',
          chrome: '64',
          safari: '11.1'
      },
      useBuiltIns: "entry",
      corejs: {version: "3.32.1"}
    }]
];

module.exports = { presets };