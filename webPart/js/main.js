
// differents parametres arrosage
/*
 frequence
 duree
 heure de depart
 seuil humidite
 heck meteo & code postal
*/
window.onload = init;

function init(){
    console.log("page loaded"); // TODO : faire ecran chargements
    // une fois chargée, que doit on voir
    window.addEventListener('resize', resizeAll, false);
    workspace.addChangeListener(updateGeneratedCode);
}


function resizeAll(){
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
    document.getElementById('generatedCodeArea').value = code;
  }


