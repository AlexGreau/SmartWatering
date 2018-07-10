// include before main.js

var customizeBlocks =
[{
    "categoryName" : "Sprinkler",
    "blocks" :
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
        }]
},
{
    "categoryName" : "Plants",
    "blocks" :
        [{
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
              "name": "plant_settings",
              "check": [
                "spklr_setting",
                "plant_type_mode"
              ]
            }
          ],
          "previousStatement": "sprinkler_type",
          "colour": 135,
          "tooltip": "",
          "helpUrl": ""
        },
        {
          "type": "plant_type_cactus",
          "message0": "I water the: Cactus %1 %2",
          "args0": [
            {
              "type": "input_dummy"
            },
            {
              "type": "input_statement",
              "name": "settings",
              "check": "spklr_setting"
            }
          ],
          "previousStatement": "sprinkler_type",
          "colour": 135,
          "tooltip": "",
          "helpUrl": "",
          "childrenBlocksSettings": {
                "duration_num": 15,
                "duration_unit": "min",
                "freq_time": 1,
                "freq_unit": "month",
                "moist_level": 100,
                "water_intensity": "drop",
                "watering_hour": 10,
                "watering_min": 0,
                "watering_unit": "am"
          }
        },
         {
           "type": "plant_type_rose",
           "message0": "I water the: Roses %1 %2",
           "args0": [
             {
               "type": "input_dummy"
             },
             {
               "type": "input_statement",
               "name": "settings",
               "check": "spklr_setting"
             }
           ],
           "previousStatement": "sprinkler_type",
           "colour": 135,
           "tooltip": "",
           "helpUrl": "",
           "childrenBlocksSettings": {
               "duration_num": 5,
               "duration_unit": "min",
               "freq_time": 5,
               "freq_unit": "day",
               "moist_level": 200,
               "water_intensity": "medium",
               "watering_hour": 4,
               "watering_min": 0,
               "watering_unit": "pm"
           }
         }]
 },
 {
     "categoryName" : "Water",
     "blocks" :
         [{
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
          }]
 },
 {
      "categoryName" : "Time",
      "blocks" :
          [{
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
          }]
 },
{
      "categoryName" : "Meteo",
      "blocks" :
          [{
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
           }]
},
{
      "categoryName" : "Season Modes",
      "blocks" :
          [{
              "type": "spklr_setting_season_summer",
              "message0": "Summer mode %1 %2",
              "args0": [
                {
                  "type": "input_dummy"
                },
                {
                  "type": "input_statement",
                  "name": "settings",
                  "check": "spklr_setting"
                }
              ],
              "previousStatement": [
                "sprinkler_type",
                "plant_type_mode"
              ],
              "colour": 0,
              "tooltip": "",
              "helpUrl": "",
              "childrenBlocksSettings": {
                  "duration_num": 15,
                  "duration_unit": "min",
                  "freq_time": 5,
                  "freq_unit": "week",
                  "moist_level": 200,
                  "water_intensity": "drop",
                  "watering_hour": 9,
                  "watering_min": 0,
                  "watering_unit": "pm"
              }
            },
            {
              "type": "spklr_setting_season_winter",
              "message0": "Winter mode %1 %2",
              "args0": [
                {
                  "type": "input_dummy"
                },
                {
                  "type": "input_statement",
                  "name": "settings",
                  "check": "spklr_setting"
                }
              ],
              "previousStatement": [
                "sprinkler_type",
                "plant_type_mode"
              ],
              "colour": 160,
              "tooltip": "",
              "helpUrl": "",
              "childrenBlocksSettings": {
                  "duration_num": 5,
                  "duration_unit": "min",
                  "freq_time": 2,
                  "freq_unit": "week",
                  "moist_level": 100,
                  "water_intensity": "drop",
                  "watering_hour": 10,
                  "watering_min": 0,
                  "watering_unit": "am"
              }
          }]
}];



function createBlocksAndToolboxXml() {
    var toolboxXml = '<xml>';

    /*
        goog.require('Blockly.FieldDate');

        Blockly.Blocks["example_date"] = {
            init: function() {
              this.jsonInit({
               "type": "example_date",
               "message0": "date: %1",
               "args0": [
                 {
                   "type": "field_date",
                   "name": "FIELDNAME",
                   "date": "2020-02-20"
                 }
               ]
             });
            }
        };

        toolboxXml += '<block type="example_date"></block>';
    */


    // Create the customize blocks
    customizeBlocks.forEach(category =>
    {
        toolboxXml += "<category name='" + category.categoryName + "'>";

        category.blocks.forEach(block =>
        {
            // initialize the block in blockly
            Blockly.Blocks[block.type] = {
                init: function() {
                  this.jsonInit(block);
                }
            };

            // create the xml of the block and add it to the toolbox's xml
            if(block.childrenBlocksSettings != undefined) {
                toolboxXml += createBlockXml(block.type, block.childrenBlocksSettings);
            }
            else
            {
                toolboxXml += '<block type="' + block.type + '"></block>';
            }
         });

        toolboxXml += "</category><sep></sep>";
    });

    toolboxXml += '</xml>';

    // generates all the executing code for the blocks
    generateAllStubs();

    return toolboxXml;
}


function createBlockXml(blockType, setting) {
  var xml = "<block type='" + blockType + "'> \
    <statement name='settings'> \
      <block type='spklr_setting_duration'> \
        <field name='duration_num'>" + setting.duration_num + "</field> \
        <field name='duration_unit'>" + setting.duration_unit + "</field> \
        <next> \
          <block type='spklr_setting_frequency'> \
            <field name='freq_time'>" + setting.freq_time + "</field> \
            <field name='freq_unit'>" + setting.freq_unit + "</field> \
            <next> \
              <block type='spklr_setting_moisture'> \
                <field name='moist_level'>" + setting.moist_level + "</field> \
                <next> \
                  <block type='spklr_setting_intensity'> \
                    <field name='water_intensity'>" + setting.water_intensity + "</field> \
                    <next> \
                      <block type='spklr_setting_start_time'> \
                        <field name='watering_hour'>" + setting.watering_hour + "</field> \
                        <field name='watering_min'>" + setting.watering_min + "</field> \
                        <field name='watering_unit'>" + setting.watering_unit + "</field> \
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


function getSeasonBlocks() {
    var value = null;

    customizeBlocks.forEach(category => {
        if (category.categoryName == "Season Modes") value = category.blocks;
    });
    return value;
}


function getPlantTypesBlocks() {
    var value = null;

    customizeBlocks.forEach(category => {
        if (category.categoryName == "Plants") value = category.blocks;
    });
    return value.splice(1, value.length);  // remove the first element which is 'plant_type' and only have the different types of plants (cactus, roses, etc..)
}