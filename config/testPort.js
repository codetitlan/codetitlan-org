const http = require('http');

let port = 3000;
let listenerCounter = 0;

const HTTPserver = http.createServer((request, response) => {
  response.writeHead(200);
  response.end(`Hello from server on port: ${port}`);
});

HTTPserver
  .listen(port, () => {
    console.log(`we have created ${listenerCounter} http server listeners`);
    listenerCounter += 1;
    console.log(`HTTP listening on port: ${port}`);
  })
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      port += 1;
      console.log(`Address in use, retrying on port ${port}`);
      setTimeout(() => {
        HTTPserver.listen(port);
      }, 250);
    }
  });
