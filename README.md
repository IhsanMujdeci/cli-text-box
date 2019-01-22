# Console Text Box
Zero dependency console text box. Inspired by the npm message


## Use

Include each line as a separate argument, a `\n` and backtick ``` ` ``` strings on 
a new line will be considered a new line.

Optionally can include options as first argument as an object and they are listed as below

### Options

`sideBuffer`: [default 3] Spaces on left of right inside the box. 

`topBottomBuffer`: [default 1] Spaces on top and bottom inside the box. 

## Examples
`const consoleTextBox = require('console-text-box')`

`consoleTextBox('hey', 'dude');`
```
╭──────────╮
│          │
│   hey    │
│   dude   │
│          │
╰──────────╯
```

```
consoleTextBox('hey', 'dude', 'im kind of long, can you see?', 'i have a \n new line', `im a multi
line back tick`);
```
```
╭───────────────────────────────────╮
│                                   │
│                hey                │
│               dude                │
│   im kind of long, can you see?   │
│             i have a              │
│             new line              │
│            im a multi             │
│          line back tick           │
│                                   │
╰───────────────────────────────────╯
```
```
consoleTextBox({sideBuffer: 1, topBottomBuffer: 0}, 'I have options', 'Look at me mum');
```
```
╭────────────────╮
│ I have options │
│ Look at me mum │
╰────────────────╯
```
```    
const myBoundTextBox = consoleTextBox.bind({sideBuffer: 3, topBottomBuffer: 2});
myBoundTextBox('I have options', 'bound 2');
```
```
╭────────────────────╮
│                    │
│   I have options   │
│      bound 2       │
│                    │
╰────────────────────╯
```
```    
const myClosureTextBox = (...textLines) => consoleTextBox({sideBuffer: 3, topBottomBuffer: 2}, ...textLines);
myClosureTextBox('I also have options', 'I wont dis-close how i got them')
```
```
╭─────────────────────────────────────╮
│                                     │
│                                     │
│         I also have options         │
│   I wont dis-close how i got them   │
│                                     │
│                                     │
╰─────────────────────────────────────╯