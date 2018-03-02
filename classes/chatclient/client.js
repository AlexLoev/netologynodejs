var socket = io();

var $loginPage = $('.login.page');
var $usernameInput = $('.usernameInput');
var $currentInput = $usernameInput.focus(); //инициализация страницы, автофокус для ввода имени пользователя
var username; //глоабльно помним текущее имя пользователя

var $chatPage = $('.chat.page');
var $inputMessage = $('.inputMessage');

var $window = $(window);
var $messages = $('.messages');

$window.keydown(function (event) {
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
        $currentInput.focus();
    }
    if (event.which === 13) {
        if (username) {
            sendMessage();
        } else {
            setUsername();
        } 
    }
});

function cleanInput (input) {
    return $('<div/>').text(input).html();
};

function setUsername () {
    username = cleanInput($usernameInput.val().trim());
    if (username) {
        $loginPage.fadeOut();
        $chatPage.show();
        $loginPage.off('click');
        $currentInput = $inputMessage.focus();

        socket.emit('add user', username);
    }
};


function sendMessage () {
    var message = $inputMessage.val();
    message = cleanInput(message);
    if (message) {
        $inputMessage.val('');
        splitmessage = message.split(" ",2);
        console.log(splitmessage[0]);
        if (splitmessage[0] == "admin") {
            data = {
                username: username,
                message: message.substring(6),
                time: gettime()
            };            
            socket.emit("new admin message", data)
            return;
        }
        if (message === "join admin") {
            socket.emit('join room admin')
        } else {
            data = {
                username: username,
                message: message,
                time: gettime()
            };
            addChatMessage(data);
            socket.emit('new message', data);
        }
    }
};


function addChatMessage (data) {
    var $usernameDiv = $('<span class="username"/>')
        .text(`[${data.time}] ${data.username}:`)
    var $messageBodyDiv = $('<span class="messageBody">')
        .text(data.message);

    var $messageDiv = $('<li class="message"/>')
        .data('username', data.username)
        .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv);
};

function addMessageElement (el) {
    var $el = $(el);
    $messages.append($el);
    $messages[0].scrollTop = $messages[0].scrollHeight;
};

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

//ниже реализуем описание событий
socket.on('new message', function (data) {
    addChatMessage(data);
});

socket.on('add user', function (username) {
    data = {
        username: 'admin',
        message: `***${username}*** join the chat`,
        time: gettime()
    };    
    addChatMessage(data);
});

socket.on('user left', function (username) {
    data = {
        username: 'admin',
        message: `***${username}*** disconnected`,
        time: gettime()
    };    
    addChatMessage(data);
});

