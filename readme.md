# Use Yandex Translate API
## Описание
Приложение позволяет переводить предложения с русского на английский используя API: https://translate.yandex.net/api/v1.5

Документацию по API можно посмотреть тут: https://tech.yandex.com/translate/

### Установка и запуск
Клонировать ветку с https://github.com/AlexLoev/netologynodejs/tree/issue6http
Приложение не требует дополнительной установки пакетов с npm.

Запуск из консоли
`node index.js` 

Для просмотра используется стандартный браузер: 
http://localhost:3000/


### Файлы

Название файла              | Содержание файла
----------------------------|--------------------------------------------------
index.js                    | запускает сервер, описанный в модуле TranslateSrv
classes/TranslateSrv        | реализация серверной части (отправка html, обработка request)
classes/yaTranslateapi.js   | подключение API от Yandex Translate
/forms/translate.htm        | страница клиентской части для отправки запроса на перевод с возможностью отображения полученного перевода
file-promise.js             | модуль используется для отправки html файла клиенту
