'use strict';

module.exports = class PivotBuffer {
    constructor(size) {
        this.size = size;
        this.$buffer = new Buffer(size);
        
        this.$buffer.fill(0);

        this.$curSize = 0;
    }
    
    append(buffer) {
        if (buffer.length === 0) {
            return;
        }

        if (buffer.length >= this.size) {
            // buffer being appended is longer than buffer size
            buffer.copy(this.$buffer, 0, buffer.length - this.size);
        } else {
            // rotate current buffer
            var leftover = this.size - buffer.length;
            this.$buffer.copy(this.$buffer, 0, this.size - leftover);

            // copy the new buffer to the current one
            buffer.copy(this.$buffer, leftover);
        }

        this.$curSize = Math.min(this.size, this.$curSize + buffer.length);
    }

    get value() {
        return this.$curSize != this.size
            ? this.$buffer.slice(this.size - this.$curSize) // truncate the buffer if it was not yet filled up
            : this.$buffer;
    }

    get length() {
        return this.$curSize;
    }
};
