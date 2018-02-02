const fs = require('fs');
const crypto = require('crypto');
const hash = crypto.createHash('md5');
const opt = {encoding : 'utf8'};

var stream = require('stream');
class Transform extends stream.Transform {
    constructor(options) {
        super(options);
    }          
    _transform (chunk, encoding, afterTransform) {
        let data = '\nhex:\n'+chunk.toString('hex') +'\n\n'
        afterTransform(null, data)
    };
};

var transformStream = new Transform();
var inputStream = fs.createReadStream('./data.txt',opt);
var outputStream = fs.createWriteStream('./stream-data.txt');

outputStream.write('md5:\n')
process.stdout.write('md5:\n')

var tomd5Stream = inputStream.pipe(hash)
tomd5Stream.pipe(outputStream);
tomd5Stream.pipe(process.stdout);

var tohexStream = tomd5Stream.pipe(transformStream)
tohexStream.pipe(outputStream);
tohexStream.pipe(process.stdout);





// inputStream.on('end', () => {
//     console.log('\ninputStream ends');
// })

// inputStream.on('readable', () => {
//     console.log('\ninputStream readable');
// })

// inputStream.on('read', () => {
//     console.log('\ninputStream read');
// })

// hash.on('readable', () => {
//     console.log('\nHash readable');
// })

// outputStream.on('finish', () => {
//     console.log('\nOutput finish');
// })

// hash.on('finish', () => {
//     console.log('\nHash finish');
// })

// inputStream.push('ssss1');
// inputStream.push('\nssss2');
// inputStream.push('\nssss3');



// inputStream.push('\nssss4\n');
// inputStream.push(null);

// var c = 97-1;
// inputStream._read = function () {
//     //inputStream.push(String.fromCharCode(c++));
//     if (c >= 'z'.charCodeAt(0)) return inputStream.push(null);
//     setTimeout(() => {
//         inputStream.push(String.fromCharCode(++c));
//     }, 200);
// };

// inputStream.pipe(process.stdout);

// process.on('exit', function () {
//     console.error('\n_read() called ' + (c - 97) + ' times');
// });

// process.stdout.on('error', process.exit);

// process.stdin.on('readable', function () {
//     var buf = process.stdin.read(2);
//     console.log(buf);
//     process.stdin.read(0);
// });

// outputStream._write = function (chunk, enc, next) {
//     console.dir(chunk);
//     next();
// };


