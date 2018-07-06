
// differents parametres arrosage
/*
 frequence
 duree
 heure de depart
 seuil humidite
 check meteo & code postal
*/
window.onload = init;
var blocklyArea;
var blocklyDiv;
var workspace;

function init() {
    // create the toolbox with the customize blocks
    createToolboxXml();
    injectBlockly();

    //listenners
    window.addEventListener('resize', resizeAll(), false);
    workspace.addChangeListener(updateGeneratedCode);

    Blockly.svgResize(workspace);

    console.log("page loaded");
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
    document.getElementById('generated').value = code;
}

function injectBlockly() {
    blocklyArea = document.getElementById('blocklyArea');
    blocklyDiv = document.getElementById('blocklyDiv');
    workspace = Blockly.inject('blocklyDiv',
        {
            toolbox: toolbox,
            toolboxPosition: 'start',
            grid:
            {
                spacing: 20,
                length: 3,
                colour: '#ccc',
                snap: true
            },
            trashcan: true,
            zoom: {
                controls: true,
                wheel: true,
                startScale: 0.6,
                maxScale: 1,
                minScale: 0.6,
                scaleSpeed: 1.2
            },
            sounds: false,
        });
}


