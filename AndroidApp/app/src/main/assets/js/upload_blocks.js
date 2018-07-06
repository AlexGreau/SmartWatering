
/*$.getJSON('js/customize_blocks.json').done(function (block_list) 
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


  workspace.toolbox.refreshSelection();
});

*/





var a = [{
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
},
{
  "type": "plant_type",
  "message0": "I water the %1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "plant_name",
      "text": "plant's name"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "sprinkler_settings"
    }
  ],
  "previousStatement": "sprinkler_type",
  "colour": 135,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "spklr_setting_duration",
  "message0": "Water for  %1 %2",
  "args0": [
    {
      "type": "field_number",
      "name": "duration_num",
      "value": 60,
      "min": 0
    },
    {
      "type": "field_dropdown",
      "name": "duration_unit",
      "options": [
        [
          "sec",
          "sec"
        ],
        [
          "min",
          "min"
        ],
        [
          "hour",
          "hour"
        ]
      ]
    }
  ],
  "previousStatement": "spklr_setting",
  "nextStatement": "spklr_setting",
  "colour": 315,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "spklr_setting_start_time",
  "message0": "Start watering at: %1 : %2 %3",
  "args0": [
    {
      "type": "field_number",
      "name": "watering_hour",
      "value": 0,
      "min": 1,
      "max": 12
    },
    {
      "type": "field_number",
      "name": "watering_min",
      "value": 0,
      "min": 0,
      "max": 59
    },
    {
      "type": "field_dropdown",
      "name": "watering_unit",
      "options": [
        [
          "am",
          "am"
        ],
        [
          "pm",
          "pm"
        ]
      ]
    }
  ],
  "previousStatement": "spklr_setting",
  "nextStatement": "spklr_setting",
  "colour": 315,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "spklr_setting_meteo",
  "message0": "Check meteo: %1 %2 Zip code: %3",
  "args0": [
    {
      "type": "field_checkbox",
      "name": "check_meteo",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "zip_code",
      "text": "06000"
    }
  ],
  "previousStatement": "spklr_setting",
  "nextStatement": "spklr_setting",
  "colour": 225,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "spklr_setting_frequency",
  "message0": "Water %1  times a  %2",
  "args0": [
    {
      "type": "field_number",
      "name": "freq_num",
      "value": 0,
      "min": 0
    },
    {
      "type": "field_dropdown",
      "name": "freq_time",
      "options": [
        [
          "day",
          "day"
        ],
        [
          "week",
          "week"
        ],
        [
          "month",
          "month"
        ]
      ]
    }
  ],
  "previousStatement": "spklr_setting",
  "nextStatement": "spklr_setting",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "spklr_setting_moisture",
  "message0": "Water if moisture level is less than %1",
  "args0": [
    {
      "type": "field_number",
      "name": "moist_level",
      "value": 10,
      "min": 0
    }
  ],
  "previousStatement": "spklr_setting",
  "nextStatement": "spklr_setting",
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "spklr_setting_intensity",
  "message0": "Water intensity: %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "water_intensity",
      "options": [
        [
          "drop",
          "drop"
        ],
        [
          "low",
          "low"
        ],
        [
          "medium",
          "medium"
        ],
        [
          "high",
          "high"
        ]
      ]
    }
  ],
  "previousStatement": "spklr_setting",
  "nextStatement": "spklr_setting",
  "colour": 195,
  "tooltip": "",
  "helpUrl": ""
}]

a.forEach(block => { 
    console.log("creo");
    Blockly.Blocks[block.type] = {
      init: function() {
        this.jsonInit(block);

          console.log(block);
      }
    };
  });


