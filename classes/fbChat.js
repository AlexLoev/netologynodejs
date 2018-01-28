chat = require('./chat');

class fbChat extends chat.ChatApp {
  constructor (title) {
    super(title);
    this.on('message',chatOnMessage);
  };
  close(message) {
    console.log(`*`.repeat(5),`Закрываю ${this.title}, все внимание — вебинару!`,'*'.repeat(5));
    this.removeListener('message', chatOnMessage);
  };   
};  

module.exports = {fbChat};

