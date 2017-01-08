# Trysilr
A simple React webapp to show the contents of a JSON file.

### Development

Provide your own paameldinger.json file, place this in `build/trysilr/paameldinger.json` (or change this in webpack.conf.js).

Then run `npm run dev` which will start the webpack-dev-server on `http://localhost:8080/webpack-dev-server`.

### Building

To package the application run `npm run build`, this will minify, uglify and package the application into a `dist/` folder. This can be served statically from any web server.
