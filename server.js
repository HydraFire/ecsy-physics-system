const path = require('path');
const express = require('express');
const webpack = require('webpack');
//const expressStaticGzip = require('express-static-gzip');
//const bodyParser = require('body-parser');
//const fs = require('fs');

const app = express();

const webpackConfig = require('./webpack.config');



//if (process.env.NODE_ENV == 'development') {

  const compiler = webpack(webpackConfig);
  app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));

//}

/// компресия в gzip
/*
function shouldCompress(req, res) {
  var type = res.get('Content-Type')

  if (type === undefined || !compressible(type)) {
    debug('%s not compressible', type)
    return false
  }

  return true
}

app.use(compress({ filter: shouldCompress }));
*/
//app.use(compression({ threshold: 0 }))

/*
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.br';
  res.set('Content-Encoding', 'gzip');
  console.log(req.url);
  res.sendFile(path.join(__dirname, '/public', req.url));
});
*/
app.use(express.static(path.join(__dirname, '/')));

app.listen(
  80, // port
  'localhost', // ip
  function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Listening at `);
});
