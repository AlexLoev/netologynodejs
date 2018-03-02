const log = console.log;

function wait (timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // log('wait');
            resolve()
        }, timeout)
    });
};

async function requestWithRetry (url) {
    const MAX_RETRIES = 10
    for (let i = 0; i <= MAX_RETRIES; i++) {
        try {
            return await request(url)
        } catch (err) {
            const timeout = Math.pow(2, i)
            console.log('Waiting', timeout, 'ms')
            await wait(timeout)
            console.log('Retrying', err.message, i)
        }
    }
};

// wait(2000);
//requestWithRetry('sss')

function waito(timeout) {
    setTimeout(() => {
        log('wtf')
    }, timeout);
    return new Promise((resolve) => {
       setTimeout(() => {
           log('promise');
           resolve('cool await'); 
       }, timeout); 
    });
};

async function mmm(timeout) {
    log('mmm st');
    log(await waito(timeout));
    log('mmm st2');
    log(await waito(timeout));
    log('mmm ed');
    return 1;
};

function alex(text) {
    return text
};

// mmm(2000)

module.exports = {alex,mmm}