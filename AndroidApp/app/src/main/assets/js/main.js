
// differents parametres arrosage
/*
 frequence
 duree
 heure de depart
 seuil humidite
 check meteo & code postal
*/
var blocklyArea;
var blocklyDiv;
let workspace;
var toolboxXml;
var customizeBlocks;
var modelsFact;
var models_list;

var objectFromDB;

window.onload = init;

function init() {
    // create the toolbox with the customize blocks
    toolboxXml = createBlocksAndToolboxXml();
    injectBlockly();
    //getAllProg();

    console.log("LOG: "+ objectFromDB);

    setupModelsDict();
    modelsFact = new modelsFactory(models_list,"defaut");
    //modelsFact.load_Models()
    addListeners();

   // customizeToolbox(workspace);
    Blockly.svgResize(workspace);
    loadModel('defaut')

    console.log("page loaded");
}

function addListeners() {
    window.addEventListener('resize', resizeAll(), false);
    setButtonListeners();
    //workspace.addChangeListener(updateGeneratedCode);
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

    Blockly.svgResize(workspace);
}


function updateGeneratedCode(event) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('generated').value = code;
}

function injectBlockly() {
    blocklyArea = document.getElementById('blocklyArea');

    workspace = Blockly.inject('blocklyArea',
        {
            toolbox: toolboxXml,
            toolboxPosition: 'start',
            grid:
            {
                spacing: 20,
                length: 3,
                colour: '#ccc',
                snap: true
            },
            trashcan: true,
            zoom: 
            {
                controls: true,
                startScale: 0.6,
                maxScale: 1,
                minScale: 0.3,
                scaleSpeed: 1.2
            },
            scrollbars: true,
            // sounds: false,

        });
}

function customizeToolbox(space) {
    let toolBx = space.getToolbox().getWidth();
    console.log(' here is da toolbox : ' + toolBx);
} 