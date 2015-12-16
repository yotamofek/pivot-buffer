'use strict';

var should = require('chai').should();
var PivotBuffer = require('./');

describe('Pivot buffer', () => {
    it('should fill the buffer when appending content to empty buffer with same length', () => {
        const content = new Buffer('Hello world!');
        
        let pivotBuffer = new PivotBuffer(content.length);

        pivotBuffer.append(content);
        pivotBuffer.value.equals(content).should.be.true;
    });

    it('when buffer is full, appending content should rotate buffer', () => {
        const content = new Buffer('Hello world!');
        const surplusContent = new Buffer('foobar');

        let pivotBuffer = new PivotBuffer(content.length);

        // fill the buffer up
        pivotBuffer.append(content);
        pivotBuffer.value.length.should.be.equal(content.length);

        // buffer should be rotated here
        pivotBuffer.append(surplusContent);

        // surplus content should constitute end of buffer,
        // leftover from the original content should constitute beginning of buffer
        var leftover = content.slice(content.length - surplusContent.length);
        
        pivotBuffer.value.equals(
            Buffer.concat([
                leftover,
                surplusContent
            ], content.length)
        ).should.be.true;
    });

    it('when buffer was not filled, should return truncated buffer', () => {
        const content = new Buffer('Hello world!');
        const lengthToAppend = 3;

        let pivotBuffer = new PivotBuffer(content.length);

        // make sure we are not filling the buffer up
        lengthToAppend.should.be.below(content.length);

        pivotBuffer.append(content.slice(0, lengthToAppend));

        pivotBuffer.length.should.be.equal(lengthToAppend);
        pivotBuffer.value.equals(content.slice(0, lengthToAppend)).should.be.true;
    });
});
