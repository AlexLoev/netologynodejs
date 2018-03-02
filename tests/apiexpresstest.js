const http = require('http');

const opt = [
    protocol = 'http',
    port = 1337,
    host = 'localhost',
    path = 'users',
    method = 'POST'
]

http.request(opt, (res) => {
    console.log('send post');
    console.log(res);
});