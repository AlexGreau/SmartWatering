/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
var workspaceBlocks;

function loadModel(name) {
    switch (name) {
        case "cactus" :
            workspaceBlocks = document.getElementById("cactus");
        case "tomato" :
            workspaceBlocks = document.getElementById("tomato");


        default: // load blank
    }

    /* Load blocks to workspace. */
    Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
    console.log("model loaded");
}