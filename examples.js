const consoleTextBox = require('./index');

function examples(){
    consoleTextBox('hey', 'dude');

    consoleTextBox('hey', 'dude', 'im kind of long, can you see?', 'i have a \n new line', `im a multi
    line back tick`);

    consoleTextBox({sideBuffer: 1, topBottomBuffer: 0}, 'I have options', 'Look at me mum');

    const myBoundTextBox = consoleTextBox.bind({sideBuffer: 3, topBottomBuffer: 2});
    myBoundTextBox('I have options', 'bound 2');

    const myClosureTextBox = (...textLines) => consoleTextBox({sideBuffer: 3, topBottomBuffer: 2}, ...textLines);
    myClosureTextBox('I also have options', 'I wont dis-close how i got them')
}