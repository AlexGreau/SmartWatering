
// differents parametres arrosage
/*
 frequence
 duree
 heure de depart
 seuil humidite
 heck meteo & code postal
*/
window.onload = init;
var blocklyArea;
var blocklyDiv;
var workspace;

function init() {
    // une fois chargée, que doit on voir
    injectBlockly();
    window.addEventListener('resize', resizeAll(), false);
    workspace.addChangeListener(updateGeneratedCode);
    Blockly.svgResize(workspace);
    console.log("page loaded"); // TODO : faire ecran chargements
}


function resizeAll() {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(workspace);
}


function updateGeneratedCode(event) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    console.log('before : ' + document.getElementById('generated').value);
    document.getElementById('generated').value = code;
    console.log('after : ' + document.getElementById('generated').value);

}

function injectBlockly() {
    blocklyArea = document.getElementById('blocklyArea');
    blocklyDiv = document.getElementById('blocklyDiv');
    workspace = Blockly.inject('blocklyDiv',
        {
            toolbox: document.getElementById('toolbox'),
            grid:
            {
                spacing: 20,
                length: 3,
                colour: '#ccc',
                snap: true
            },
            trashcan: true
        });
}

