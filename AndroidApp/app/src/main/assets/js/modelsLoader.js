
var workspaceBlocks;

function loadModel(name) {
    switch (name) {
        case "cactus" :
            workspaceBlocks = document.getElementById("cact");
            console.log ("cactus loaded")
            break;
        case "tomato" :
            workspaceBlocks = document.getElementById("tomato");
            console.log("tomato loaded")
            break;

        default: // load blank
            console.log("default loaded")
    }
    /* Clears and Load blocks to workspace. */
    Blockly.Xml.clearWorkspaceAndLoadFromXml(workspaceBlocks, workspace);
    console.log("model loaded");
}