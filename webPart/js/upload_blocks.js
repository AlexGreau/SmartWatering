/*
$.getJSON('js/customize_blocks.json').done(function (block_list) 
{
  console.log("leo");
  block_list.forEach(block => { 
    console.log("creo");
    Blockly.Blocks[block.type] = {
      init: function() {
        this.jsonInit(block);

          console.log(block);
      }
    };
  });
});
*/




/*

var a = {
  "type": "sprinkler_type",
  "message0": "I'm sprinkler number: %1 %2 I'm actived: %3 %4 %5",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "sprinkler_number",
      "options": [
        [
          "1",
          "1"
        ],
        [
          "2",
          "2"
        ],
        [
          "3",
          "3"
        ],
        [
          "4",
          "4"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "sprinkler_active",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "sprinkler_settings"
    }
  ],
  "colour": 270,
  "tooltip": "",
  "helpUrl": ""
};

 Blockly.Blocks['sprinkler_type'] = {
      init: function() {
        this.jsonInit(a);
        console.log(a);
      }

    };



*/