const http = require('http');
const fs = require('fs');
const port = process.env.Port || 1857

function serveStaticFile(res, path, contentType, resonseCode = 200) {
  fs.readFile(__dirname + path, (err, data) => { //fs.readFile (파일을 비동기적으로 읽음) / fs.readFilesync(파일을 동기적으로 읽음)
    //__dirname : 현재 실행중인 scirpt가 존재하는 디렉터리
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('500-Internalerror');
    }
    res.writeHead(resonseCode, { "Content-Type": contentType });
    res.end(data);
  })
}

const server = http.createServer((req, res) => {
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch (path) {
    case '/main':
      serveStaticFile(res, '/public/home.html', 'text/html');
      break
    case '/about':
      serveStaticFile(res, '/public/about.html', 'text/html');
      break
    case '/imgs.jpg':
      serveStaticFile(res, '/public/imgs.jpg', 'img/jpg');
      break
    default:
      serveStaticFile(res, '/public/404.html', 'text/html');
      break
  }
})

server.listen(port, () => {
  console.log('run server 1857');
})