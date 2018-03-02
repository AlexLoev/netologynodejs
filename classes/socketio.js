const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const log = console.log;

app.use(express.static(__dirname+'/chatclient'));

app.get('/', function(req,res) {
    res.sendFile(__dirname+'/index.html');
});


io.on('connect', function(socket) {
    log('i see a new user');   
    socket.on('disconnect', () => {
        log(`disconnect: ${socket.username}`);
        socket.broadcast.emit('user left',socket.username);
      });
    
    socket.on('add user', (username) => {
        log(`we have an new user: ${username}`);
        socket.username = username;
        socket.broadcast.emit('add user', username);
    });
    socket.on('new message', (data) => {
        log('We have an new message');
        log('-'.repeat(20));
        console.log(data);
        log('-'.repeat(20));
        socket.broadcast.emit('new message', data);
    });    

    socket.on('join room admin', () => {
        socket.join('admin');        
        data = {
            username: 'admin',
            message: `${socket.username} joined admin room`,
            time: gettime()
        }
        socket.broadcast.to('admin').emit('new message', data);
    });

    socket.on('new admin message', (data) => {
        log('We have an new message');
        log('-'.repeat(20));
        console.log(data);
        log('-'.repeat(20));
        io.to('admin').emit('new message', data);
    });

})


function gettime() {
    var now = new Date();
    hh = now.getHours();
    if (hh<10) {hh = `0${hh}`};
    mm = now.getMinutes();
    if (mm<10) {mm = `0${mm}`};
    ss = now.getSeconds();
    if (ss<10) {ss = `0${ss}`};

    return `${hh}:${mm}:${ss}`;
}

http.listen(1337);