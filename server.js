let path = require('path');
let express = require('express');
let app = express();
let PORT = process.env.PORT || 8080;

let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let webpack = require('webpack');
let config = require('./webpack.config');
let compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.join(__dirname, 'templates')));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/templates/index.html')
});

app.listen(PORT, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    }
});