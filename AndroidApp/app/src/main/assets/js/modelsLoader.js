
function setupDefaultModelsDict() {
    var models_list = {};

    models_list['New'] = '<xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">\
                               <variables></variables>\
                               <block type="program_type" id="mainBlock" x="63" y="38"></block>\
                             </xml>';

    getPlantTypesBlocks().forEach(block => {
        models_list[block.name] = createProgramXml(block.type, block.childrenBlocksSettings);
    });

    return models_list;
}


function createProgramXml(blockType, setting){
    var xmlBlockType = createBlockXml(blockType, setting);
    var xml = '<xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">\
                 <variables></variables>\
                 <block type="program_type" id="mainBlock" x="63" y="38">\
                   <statement name="program">';

    for (i = 1; i <= 4; i++) {
        xml += '<block type="sprinkler_type">\
                  <field name="sprinkler_number">' + i +'</field>\
                  <field name="sprinkler_active">TRUE</field>\
                  <statement name="sprinkler_settings">'
                   + xmlBlockType +
                 '</statement>';

        if(i != 4) {
            xml += '<next>';
        }
    }

    for (i = 1; i <= 4; i++) {
        xml += '</block>';

        if(i != 4) {
            xml += '<next>';
        }
    }

    xml += '</statement>\
         </block>\
       </xml>';

    return xml;
}