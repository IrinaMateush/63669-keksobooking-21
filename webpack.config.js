const path = require("path");

module.exports = {
  entry: [
    "./js/backend.js",
    "./js/debounce.js",
    "./js/filter.js",
    "./js/main.js",
    "./js/move.js",
    "./js/data.js",
    "./js/map.js",
    "./js/card.js",
    "./js/form.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
