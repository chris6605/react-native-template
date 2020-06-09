module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  rules: {
    //禁止行内样式
    'react-native/no-inline-styles': 'off',
    // Allow .js files to use JSX syntax
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    //'no-console': ['error'],
    // 禁止使用 var
    'no-var': 'error',
  },
}
