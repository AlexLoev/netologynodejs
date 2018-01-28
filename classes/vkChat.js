chat = require('./chat');

class vkChat extends chat.ChatApp {
  constructor (title) {
    super(title);
    //в задаче указано поставить 2 слушателя, но потом просят добавить еще close, поэтому увеличил
    this.setMaxListeners(3); 
    this.on('message', chatOnPrepareMessage);
    this.on('message',chatOnMessage);
    this.on('close',chatOnMessage);    
  };
  close(message) {
    console.log(`*`.repeat(5),`Закрываю ${this.title}`,'*'.repeat(5));
    this.removeListener('message', chatOnPrepareMessage);
    this.removeListener('message', chatOnMessage);
    this.emit('close', `*`.repeat(5)+` Чат ${this.title} закрылся :( `+'*'.repeat(5));
    this.removeListener('close', chatOnMessage);
  };  
};

module.exports = {vkChat}