var zoneBlocJson = {
  "type": "block_type",
  "message0": "%1 %2 %3 %4",
  "args0": [
    {
      "type": "field_input",
      "name": "BLOCNAME",
      "text": "bloc"
    },
    {
      "type": "field_dropdown",
      "name": "NAME",
      "options": [
        [
          "automatique",
          "OPTIONNAME"
        ],
        [
          "manuel",
          "OPTIONNAME"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "NAME1"
    }
  ],
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
}


Blockly.Blocks['block_type'] = {
	init: function() {
		this.jsonInit(zoneBlocJson);
	}
};

/*Blockly.JavaScript['block_type'] = function(block) {
  var text_blocname = block.getFieldValue('BLOCNAME');
  var dropdown_name = block.getFieldValue('NAME');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_name1 = Blockly.JavaScript.statementToCode(block, 'NAME1');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};*/