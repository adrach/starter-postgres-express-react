#!/usr/bin/env node
const http = require('http');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('../config/env');
const App = require('../src-server/app');

function main() {
  App().then((app) => {
    // Function for normalizing a port into a number, string, or false.
    function normalizePort(val) {
      const port = parseInt(val, 10);

      if (Number.isNaN(port)) {
        // named pipe
        return val;
      }

      if (port >= 0) {
        // port number
        return port;
      }

      return false;
    }

    // Event listener for HTTP server "error" event.
    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    }

    // Event listener for HTTP server "listening" event.
    function onListening() {
      const addr = server.address();
      const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
      console.log(`Listening on ${bind}`);
    }

    // ----------
    // MAIN CODE
    // ----------

    // Get port from environment and store in Express.
    const port = normalizePort(process.env.PORT || '5000');
    app.set('port', port);

    // Create HTTP server.
    const server = http.createServer(app);

    // Listen on provided port, on all network interfaces.
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

if (require.main === module) {
  main();
} else {
  module.exports = main;
}
