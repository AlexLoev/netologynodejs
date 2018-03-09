# Tracker App (mongoose nodejs)
Приложение разработано для демонстрации возможностей библиотеки mongoose

## Основной фунционал
Работа со списком задач используя библиотеку mongoose в виде API на Express.js

* Пользователи (имя) [список, добавление, редактирование, удаление];
* Задачи (название, описание, открыта/закрыта, пользователь) [список, добавление, редактирование, удаление];
* Задачу можно открыть/закрывать, делегировать на пользователя;
* Поиск по названию и описанию задач.
* статистика: список пользователей и количество у них закрытых задач, отсортированных по убыванию (используется aggregation framework в mongodb)

_TODO_

* Приложение на Express.js c WEB интерфейсом;
* Валидация входящих данных и показ ошибок в Веб интерфейсе;
* К задаче добавить дату исполнения;
* В списке задач сделать сортировку по дате исполнения;
* Сделать постраничную навигацию по задачам;

### Использование API
get('/users/') //получаем список пользователей
post('/users/') //создаем нового пользователя
get('/users/:id') //поиск пользователя по ID
delete('/users/:id') //удаление пользователя по ID
put('/users/:id') //редактирование пользователя по ID

get('/tasks/') //получаем список задач
post('/tasks/') //создаем новую задачу
get('/tasks/:id') //поиск задачи по ID
delete('/tasks/:id') //удаление задачи по ID
put('/tasks/:id') //редактирование задачи по ID
post('/tasks/assignto/:id') //делегирование задачи по ID передаем в body id пользователя в теге userid
post('/tasks/close/:id') //закрывает задачу по ID
post('/tasks/open/:id') //открывает задачу по ID
