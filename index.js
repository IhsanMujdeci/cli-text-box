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

function isObject (value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

/**
 * I have some questions about ideal API design
 * I have included the object as first arg to support using .bind() syntax to make own augmentation of this function
 * eg. const myCustomConsoleTextBox = myCustomConsoleTextBox.bind(myOptions);
 *
 * Or I could include options as last argument and the same bind syntax can be achieved via closure
 * e.g const myCustomConsoleTextBox = (...textLines) => const myCustomConsoleTextBox =(options, ...textLines);
 *
 * I'm open to suggestions
 *
 * @param {(object || string)} options optionally add options or the first string you want to print
 * @param {number} options.sideBuffer
 * @param {number} options.topBottomBuffer
 * @param {string} textLines
 */
function consoleTextBox(options, ...textLines){
    if(!isObject(options)){
        textLines = Object.values(arguments);
    }
    options = {
        sideBuffer:  options.sideBuffer || options.sideBuffer === 0 ? options.sideBuffer : 3,
        topBottomBuffer:  options.topBottomBuffer || options.topBottomBuffer === 0 ? options.topBottomBuffer : 1
    };

    // Compensate for any new lines and `back tick` syntax
    for(let t = 0; t  < textLines.length; t++){
        const splitOnNewLine = textLines[t]
            .split('\n')
            .map(tl=> tl.trim());

        textLines.splice(t, 1, ...splitOnNewLine);
        t += splitOnNewLine.length - 1;
    }

    const sideBuffer = options.sideBuffer;
    const maxTextLength = textLines.reduce((p, c) => p > c.length ? p : c.length ,0);
    const maxLength = maxTextLength + sideBuffer * 2;

    const topBorder = topLeft + repeatFill(maxLength,top) + topRight;
    const fillLine = side + repeatFill(maxLength, space) + side;
    const bottomBorder = bottomLeft + repeatFill(maxLength, top) + bottomRight;

    console.log(topBorder);
    for(let i = 0; i < options.topBottomBuffer; i++){
        console.log(fillLine);
    }
    textLines.forEach(t => console.log(genLine(t, maxLength)));
    for(let i = 0; i < options.topBottomBuffer; i++){
        console.log(fillLine);
    }
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

    return side + leftBuffer + text + rightBuffer + side;
}

function examples(){
    consoleTextBox('hey', 'dude');
    consoleTextBox('hey', 'dude', 'im kind of long', 'i have a \n new line', `im a multi
    line back tick`);
    consoleTextBox({sideBuffer: 1, topBottomBuffer: 0}, 'I have options', 'Look at me mum')
    const myBindTextBox = consoleTextBox.bind({sideBuffer: 3, topBottomBuffer: 2});
    const myClosureTextBox = (...textLines) => consoleTextBox({sideBuffer: 3, topBottomBuffer: 2}, ...textLines)
}

module.exports = consoleTextBox;