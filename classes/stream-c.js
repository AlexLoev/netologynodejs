const {
    Readable
} = require('stream');

class CReadable extends Readable {
    constructor(opttions) {
        super(opttions);
        this.count = 0;
    }
}