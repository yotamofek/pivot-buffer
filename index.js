'use strict';

/**
 * Rotating data buffer for Node.js
 */
class PivotBuffer {
    /**
     * @param {number} size - The fixed size of the buffer, beyond which point data will be rotated.
     */
    constructor(size) {
        this.size = size;
        this.$buffer = new Buffer(size);
        
        this.$buffer.fill(0);

        this.$curSize = 0;
    }

    /**
     * Append a node buffer to the current buffer, rotating the current data if necessary.
     * If buffer to append is bigger than the cap of the pivot buffer, only the last portion of it will be written.
     * @param {Buffer} buffer - the buffer to append
     */
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

    /**
     * The underlying buffer. Truncated to size of current data (may be smaller than size specified in constructor).
     * @return {Buffer}
     */
    get value() {
        return this.$curSize != this.size
            ? this.$buffer.slice(this.size - this.$curSize) // truncate the buffer if it was not yet filled up
            : this.$buffer;
    }

    /**
     * Length of current buffer, between the range of 0 to buffer size, inclusive.
     * @return {number}
     */
    get length() {
        return this.$curSize;
    }
}

module.exports = PivotBuffer;
