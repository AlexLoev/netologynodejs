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
    _read(data) {
        this.count++;
        if (this.count > 10) {
            return this.push(null)
        }
        // let chunk = String('HTY');
        let chunk = String(Math.random());
        
        //console.log(data);
        this.push(chunk);
        
    }
}

var rstream = new CReadable;
rstream.pipe(process.stdout);
