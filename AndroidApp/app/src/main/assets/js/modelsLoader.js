
var workspaceBlocks;
var cactus

function loadModel(name) {
    switch (name) {
        case "cactus" :
            workspaceBlocks = Blockly.Xml.textToDom(cactus);
            console.log ("cactus loaded")
            break;
        case "tomato" :
            workspaceBlocks = document.getElementById("tomato");
            console.log("tomato loaded")
            break;

        default: // load blank
            console.log("could not find model : default loaded")
    }
    /* Clears and Load blocks to workspace. */
    Blockly.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
    console.log("model loaded");
}



cactus = '<xml xmlns="http://www.w3.org/1999/xhtml"> \
<variables></variables> \
<block type="sprinkler_type" id="nIUY5%2n4l:sg}mKdy^;" x="330" y="110"> \
  <field name="sprinkler_number">1</field> \
  <field name="sprinkler_active">TRUE</field> \
  <statement name="sprinkler_settings"> \
    <block type="spklr_setting_frequency" id="^cb1[nJb=,xp`Iu,~tuY"> \
      <field name="freq_time">0</field>\
      <field name="freq_unit">day</field>\
    </block>\
  </statement>\
</block>\
</xml>'