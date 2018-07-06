// include before main.js

var toolbox;

var customize_blocks = 
[{
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
      "text": "name of plant"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "plants_settings"
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
      "name": "freq_time",
      "value": 0,
      "min": 0
    },
    {
      "type": "field_dropdown",
      "name": "freq_unit",
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
},
{
  "type": "spklr_setting_winter_mode",
  "message0": "Winter mode %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "mode_settings",
      "check": "spklr_setting"
    }
  ],
  "previousStatement": [
    "sprinkler_type",
    "plant_type"
  ],
  "colour": 160,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "spklr_setting_summer_mode",
  "message0": "Summer mode %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "mode_settings",
      "check": "spklr_setting"
    }
  ],
  "previousStatement": [
    "sprinkler_type",
    "plant_type"
  ],
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
}];


function createToolboxXml() {
   /* goog.require('Blockly.FieldDate');

    Blockly.Blocks['example_date'] = {
      init: function() {
        this.appendDummyInput()
            .appendField('date:')
            .appendField(new Blockly.FieldDate('2015-02-05'), 'FIELDNAME');
      }
    };*/

    toolbox = '<xml>';
  //  toolbox += '<block type="example_date"></block>';

    // Create the customize blocks
    customize_blocks.forEach(block => { 
      Blockly.Blocks[block.type] = {
        init: function() {
          this.jsonInit(block);
        }
      };

      if (block.type.indexOf("winter_mode") != -1) {
        toolbox += createWinterModeBlock(block.type);
      }
      else if (block.type.indexOf("summer_mode") != -1) {
        toolbox += createSummerModeBlock(block.type);
      }
      else {
        toolbox += '<block type="' + block.type + '"></block>';
      }
    });

    
    toolbox += '</xml>';
}


function createWinterModeBlock(blockType) {
  var xml = "<block type='" + blockType + "'> \
    <statement name='mode_settings'> \
      <block type='spklr_setting_duration'> \
        <field name='duration_num'>5</field> \
        <field name='duration_unit'>min</field> \
        <next> \
          <block type='spklr_setting_frequency'> \
            <field name='freq_time'>2</field> \
            <field name='freq_unit'>week</field> \
            <next> \
              <block type='spklr_setting_moisture'> \
                <field name='moist_level'>100</field> \
                <next> \
                  <block type='spklr_setting_intensity'> \
                    <field name='water_intensity'>drop</field> \
                    <next> \
                      <block type='spklr_setting_start_time'> \
                        <field name='watering_hour'>10</field> \
                        <field name='watering_min'>0</field> \
                        <field name='watering_unit'>am</field> \
                      </block> \
                    </next> \
                  </block> \
                </next> \
              </block> \
            </next> \
          </block> \
        </next> \
      </block> \
    </statement> \
  </block>";

  return xml;
}


function createSummerModeBlock(blockType) {
  var xml = "<block type='" + blockType + "'> \
    <statement name='mode_settings'> \
      <block type='spklr_setting_duration'> \
        <field name='duration_num'>15</field> \
        <field name='duration_unit'>min</field> \
        <next> \
          <block type='spklr_setting_frequency'> \
            <field name='freq_time'>5</field> \
            <field name='freq_unit'>week</field> \
            <next> \
              <block type='spklr_setting_moisture'> \
                <field name='moist_level'>200</field> \
                <next> \
                  <block type='spklr_setting_intensity'> \
                    <field name='water_intensity'>medium</field> \
                    <next> \
                      <block type='spklr_setting_start_time'> \
                        <field name='watering_hour'>9</field> \
                        <field name='watering_min'>0</field> \
                        <field name='watering_unit'>pm</field> \
                      </block> \
                    </next> \
                  </block> \
                </next> \
              </block> \
            </next> \
          </block> \
        </next> \
      </block> \
    </statement> \
  </block>";

  return xml;
}