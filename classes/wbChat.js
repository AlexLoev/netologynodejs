chat = require('./chat');

class wbChat extends chat.ChatApp {
  constructor (title) {
    super(title);
    this.on('message', chatOnPrepareMessage);
    this.on('message',chatOnMessage); 
  };
  close() {
    this.removeListener('message', chatOnPrepareMessage);
  };  
};

module.exports = {wbChat};