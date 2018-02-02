//const issue1 = require('./issue1');
//const issue2 = require('./issue2');
//const issue3 = require('./issue3');

//issue4 Emmits Запускаем чат
// const fb = require('./classes/fbChat');
// const vk = require('./classes/vkChat');
// const wb = require('./classes/wbChat');

// var vkChatApp = new vk.vkChat('vk');
// var fbChatApp = new fb.fbChat('fb');
// var wbChatApp = new wb.wbChat('wb');

// setTimeout(function() {
//     vkChatApp.close();
// }, 5000);

// setTimeout(function() {
//     fbChatApp.close();
// }, 10000);

// setTimeout(function() {
//     wbChatApp.close();
// }, 15000);

// //принудительно завершим приложение через 20 сек.
// setTimeout(function() {
//     process.exit();    
// }, 20000);


/* просто проверил отлов неотловленных ошибок (работает!)
//по словам учителя, работает только в последней ноде 9 версии...
process.on('uncaughtException',(reason, p) => {
    console.log('err');
    process.exit();
});
//генерим ошибку для принудительного завершения приложения
setTimeout(() => {
    throw new Error('CloseApp Right Now!')
}, 20000);

*/