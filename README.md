
<a name="PivotBuffer"></a>
# pivot-buffer
Rotating data buffer for Node.js

[![Build Status](https://travis-ci.org/yotamofek/pivot-buffer.svg?branch=master)](https://travis-ci.org/yotamofek/pivot-buffer)

**Kind**: global class  

* [PivotBuffer](#PivotBuffer)
    * [new PivotBuffer(size)](#new_PivotBuffer_new)
    * [.value](#PivotBuffer+value) ⇒ <code>Buffer</code>
    * [.length](#PivotBuffer+length) ⇒ <code>number</code>
    * [.append(buffer)](#PivotBuffer+append)

<a name="new_PivotBuffer_new"></a>
### new PivotBuffer(size)

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The fixed size of the buffer, beyond which point data will be rotated. |

<a name="PivotBuffer+value"></a>
### pivotBuffer.value ⇒ <code>Buffer</code>
The underlying buffer. Truncated to size of current data (may be smaller than size specified in constructor).

**Kind**: instance property of <code>[PivotBuffer](#PivotBuffer)</code>  
<a name="PivotBuffer+length"></a>
### pivotBuffer.length ⇒ <code>number</code>
Length of current buffer, between the range of 0 to buffer size, inclusive.

**Kind**: instance property of <code>[PivotBuffer](#PivotBuffer)</code>  
<a name="PivotBuffer+append"></a>
### pivotBuffer.append(buffer)
Append a node buffer to the current buffer, rotating the current data if necessary.
If buffer to append is bigger than the cap of the pivot buffer, only the last portion of it will be written.

**Kind**: instance method of <code>[PivotBuffer](#PivotBuffer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Buffer</code> | the buffer to append |

