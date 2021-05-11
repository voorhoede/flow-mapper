module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.js', './components/**/*.js'],
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
