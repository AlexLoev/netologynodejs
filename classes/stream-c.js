const {
    Readable,
    Writable,
    Transform
} = require('stream');

class CReadable extends Readable {
    constructor(options) {
        super(options);
        this.count = 0;
    }
    _read(size) {
        this.count++;
        if (this.count > 10) {
            return this.push(null)
        }
        let chunk = String(Math.floor(Math.random()*10));
        this.push(chunk);
    }
}

class CWritable extends Writable {
    constructor(options) {
        super(options);
    }
    _write(chunk,enc,cb) {
        setTimeout(() => {
            process.stdout.write(chunk);
            cb(null,chunk)                    
        }, 500);
    }
}

class CTransform extends Transform {
    constructor(options) {
        super(options);
    }
    _transform(chunk,enc,cb) {
        cb(null,'| '+chunk+' |'+'\n'+'_'.repeat(5)+'\n\n');
    }
}

var rstream = new CReadable;
var wstream = new CWritable;
var tstream = new CTransform;

rstream.pipe(tstream).pipe(wstream);

