var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject('blocklyDiv',
{toolbox: document.getElementById('toolbox'),
 grid:
     {spacing: 20,
      length: 3,
      colour: '#ccc',
      snap: true},
 trashcan: true});