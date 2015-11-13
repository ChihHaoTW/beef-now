require! <[fs gulp webpack webpack-dev-server express path child_process]>

dev-port = fs.read-file-sync \./dev-port .to-string!

gulp.task \dev-server <[link]> !->
  if fs.exists-sync \./host
    host = fs.read-file-sync \./host .to-string!replace \\n, ''
  else
    host = \localhost
  config = require \./webpack.config.js
  config.entry.unshift "webpack-dev-server/client?http://#host:#dev-port", "webpack/hot/dev-server"
  compiler = webpack config
  server = new webpackDevServer compiler, { stats: {+colors}, +hot }
  err <-! server.listen dev-port, host
  return console.log err if err

gulp.task \link !->
  cb = it
  <-! child_process.exec "ln -s #{path.resolve \bin, \dist} #{path.resolve \app, \res, \dist}"
  cb!

gulp.task \default <[dev-server]>

# vi:et:nowrap
