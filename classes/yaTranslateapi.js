const https = require('https');
var querystring = require('querystring');

function yatranslate(text) {
    const keyapi = 'trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df';
    const lang = 'ru-en'
    const opt = {
        hostname: 'translate.yandex.net',
        path: `/api/v1.5/tr.json/translate?key=${keyapi}&text=${text}&lang=${lang}`   
    }
    return new Promise((resolve,reject) => {      
        //console.log(`promise yatranslate for ${text}`)
        https.get(opt,(res) => {
            let body = [];
            res
            .on('error', (err) => {
                res.statusCode = 500;
                res.statusMessage = `Can't get response: ${err.message}`;
                reject(err);
            })
            .on('data', (chunk) => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString();
                var data = JSON.parse(body);
                data = querystring.parse(data.text[0]);
                //console.log(`tr=${data.translatetext}`);
                resolve(`${data.translatetext}`);
            });    
        })
    });
}

module.exports = yatranslate;