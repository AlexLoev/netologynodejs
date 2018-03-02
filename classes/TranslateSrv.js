var http = require('http');
var querystring = require('querystring');
var fp = require('../file-promise');
var yatranslate = require('./yaTranslateapi');


function show(res) {
    fp
    .read('./forms/translate.html')
    .then(data => {
        //data += 'Введите текст для перевода</dir></body></html>';
        res.end(data)})
    .catch(err => {
        res.statusCode = 500;
        res.statusMessage = `Can't load input form for Yandex API: ${err.message}`;
        res.end();
    });        
}

function showTranslate(res, text, translatetext) {
    fp
    .read('./forms/translate.html')
    .then(data => {
        data += `<script type="text/javascript">document.getElementById("translatetext").value="${text}"</script>`
        data += `<script type="text/javascript">document.getElementById("translated").value="${translatetext}"</script>`
        res.end(data)
    })
    .catch(err => {
        res.statusCode = 500;
        res.statusMessage = `Can't load translate form for Yandex API: ${err.message}`;
        res.end();
    });        
}

function process(req, res, body) {
    let text = querystring.parse(body);
    yatranslate(body)
    .then(translatetext => {showTranslate(res, text.translatetext, translatetext)})
    .catch(err => {res.end()});
}

function reqhandler(req,res) {
    const { url } = req;
    // console.log(`new request event ${url}`);
    let body = [];
    req
    .on('error', (err) => {
        res.statusCode = 500;
        res.statusMessage = `Can't read request: ${err.message}`;
        res.end();
    })
    .on('data', (chunk) => {
        body.push(chunk);
    })
    .on('end', () => {    
        onreqend(req, res, body);
    }); 
}

function onreqend(req, res, body) {
    const { method } = req;
    body = Buffer.concat(body).toString();
    switch (method) {
        case 'GET':
            show(res);
            break;
        case 'POST':
            process(req, res, body);
            break;
        default:
            res.end();
            break;
    }
}

var server = http.createServer();
server.listen(3000);
server.on('request', reqhandler);
