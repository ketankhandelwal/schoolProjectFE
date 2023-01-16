module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: theme => ({
        'sideBarHover': "#C4C4C4",
        'bodyColor':'rgba(0, 0, 0, 0.08)',
        'labelColor':'rgba(0, 0, 0, 0.63)',
        'btnColor':'rgba(80, 26, 118, 1)',
        'modalbackColor':'rgba(0, 0, 0, 0.7)',
        'navActiveColoe':'rgba(196, 196, 196, 0.6)',
        'loginButton': 'rgba(80, 26, 118, 0.82)',
       })
    },
    boxShadow: {
      'customShadow': '-4px -4px 11px rgb(0 0 0 / 25%), 4px 4px 11px rgb(0 0 0 / 25%)',
    }
  },
  // theme: {
  //   extend: {},
  // },
  plugins: [],
}
