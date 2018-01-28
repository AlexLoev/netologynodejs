const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  constructor(title) {
    super();
    
    this.title = title;
    console.log(`*`.repeat(5),`${this.title} подключился к сети`,`*`.repeat(5));
    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`, `${this.title}: Готовлюсь к ответу...`);
    }, 1000);
  }
  
  close(message) {
      this.emit('close', `${this.title}: Чат ${this.title} закрылся :(`);
  };
}

chatOnMessage = (message) => {
  console.log(message);
};

chatOnPrepareMessage = (message,prepareMessage) => {
  console.log(prepareMessage);
};

module.exports = {ChatApp, chatOnMessage, chatOnPrepareMessage}