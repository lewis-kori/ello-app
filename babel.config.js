// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': '.',
        },
      },
    ],
  ],
};
