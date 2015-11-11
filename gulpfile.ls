require! <[fs gulp webpack webpack-dev-server express]>

dev-port = 9090

gulp.task \dev-server !->
  if fs.exists-sync \./host
    host = fs.read-file-sync \./host .to-string!replace \\n, ''
  else
    host = \localhost
  config = require \./webpack.config.js
  config.entry.unshift "webpack-dev-server/client?http://#host:#dev-port", "webpack/hot/dev-server"
  compiler = webpack config
  server = new webpackDevServer compiler, {
    stats: {+colors}, +hot }
  err <-! server.listen dev-port, host
  return console.log err if err

gulp.task \server !->
  port = parseInt fs.read-file-sync \./port
  require! \express
  express-server = express!
  router = require \./router.ls
  router.init express-server
  router.counter!
  express-server.listen port

gulp.task \default <[dev-server]>

# vi:et:nowrap
