
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
let menuBtn;
var customizeBlocks;
window.onload = init;


function init() {
    // create the toolbox with the customize blocks
    toolboxXml = createBlocksAndToolboxXml();
    injectBlockly();
    addListeners();

    Blockly.svgResize(workspace);
    console.log("page loaded");
    customizeToolbox(workspace);
    console.log(document.getElementById('toolbox'));
  //  createButtons(workspace);
}

function addListeners() {
    window.addEventListener('resize', resizeAll(), false);
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
    let toolBx = space.getToolbox();
    // toolBx = space.getToolbox(); 
    // toolBx.width = 500; 
    console.log(' here is da toolbox ' + toolBx);
} 

function createButtons(space){
    var xml = createMenuButtonXML();
    menuBtn = new FlyoutButton (space,space,xml,false);
}

function createMenuButtonXML(){
    var xml = "<button>" +
    "<text>Button A</text>" +
    "<font>Arial</font>" +
    "<font_size>12</font_size>"+
    "<text_color>0x000000</text_color>" +
    "<x>45</x>" +
    "<y>100</y>" +
    "<height>35</height> "+
    "<width>75</width>" +
    "<word_wrap>NO</word_wrap>" +
        "<button_color>0xDDDDDD</button_color>" +
        "<bold>YES</bold>" +
        "<opacity>.3</opacity>" +
        "<next_node>node_a</next_node>" +
        "<link>http://www.my_site.com</link>" +
    "<assign name=" + "user_clicked_button_a" + "expr=" + '1' + "/>" +
    "</button>";
    return xml;
    }