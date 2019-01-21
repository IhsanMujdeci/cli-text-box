const topLeft = '╭';
const topRight = '╮';
const bottomLeft = '╰';
const bottomRight = '╯';
const top = '─';
const side = '│';
const space = ' ';

function repeatFill(n, fill) {
    let string = '';
    for(let i = 0; i < n; i++){
        string += fill
    }
    return string
}

function cliTextBox(...textLines){

    // Compensate for any new lines and `back tick` syntax
    for(let t = 0; t  < textLines.length; t++){
        const splitOnNewLine = textLines[t]
            .split('\n')
            .map(tl=> tl.trim());

        textLines.splice(t, 1, ...splitOnNewLine);
        t += splitOnNewLine.length - 1;
    }

    const sideBuffer = 3;
    const maxTextLength = textLines.reduce((p, c) => p > c.length ? p : c.length ,0);
    const maxLength = maxTextLength + sideBuffer * 2;

    const topBorder = topLeft + repeatFill(maxLength,top) + topRight;
    const fillLine = side + repeatFill(maxLength, space) + side;
    const bottomBorder = bottomLeft + repeatFill(maxLength, top) + bottomRight;

    console.log(topBorder);
    console.log(fillLine);
    textLines.forEach(t => console.log(genLine(t, maxLength)));
    console.log(fillLine);
    console.log(bottomBorder);
}

function genLine(text, maxLength){
    const buffer = maxLength - text.length;
    let leftBufferLength = 0;
    let rightBufferLength = 0;
    let leftBuffer = '';
    let rightBuffer = '';

    if(buffer > 0){
        if(buffer % 2 === 0){
            leftBufferLength = buffer/2;
            rightBufferLength = leftBufferLength;
        } else {
            leftBufferLength = Math.floor(buffer/2);
            rightBufferLength = leftBufferLength + 1
        }

        leftBuffer = repeatFill(leftBufferLength, space);
        rightBuffer = repeatFill(rightBufferLength, space);
    }

    return side + leftBuffer + text + rightBuffer + side
}

module.exports = cliTextBox;