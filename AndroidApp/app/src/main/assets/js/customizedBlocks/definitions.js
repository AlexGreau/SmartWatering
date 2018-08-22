// include before main.js

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
              "name": "sprinkler_settings",
              "check": [
                "spklr_setting",
                "sprinkler_plant",
                "sprinkler_season_mode"
              ]
            }
          ],
          "previousStatement": [
              "program_sprinkler",
              "sprinkler_sprinkler",
              "sprinkler_meteo"
          ],
          "nextStatement": [
              "sprinkler_sprinkler",
              "sprinkler_meteo"
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
                "plant_season_mode"
              ]
            }
          ],
          "previousStatement": "sprinkler_plant",
          "colour": 135,
          "tooltip": "",
          "helpUrl": ""
        },
        {
          "type": "plant_type_cactus",
          "name": "Cactus",
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
          "previousStatement": "sprinkler_plant",
          "colour": 135,
          "tooltip": "",
          "helpUrl": "",
          "childrenBlocksSettings": {
                "duration_num": 1,
                "duration_unit": "min",
                "freq_time": 1,
                "freq_times_unit": 3,
                "freq_unit": "month",
                "moist_level": 200,
                "watering_hour": 10,
                "watering_min": 0,
                "watering_unit": "pm"
          }
        },
         {
           "type": "plant_type_rose",
           "name": "Rose",
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
           "previousStatement": "sprinkler_plant",
           "colour": 135,
           "tooltip": "",
           "helpUrl": "",
           "childrenBlocksSettings": {
               "duration_num": 60,
               "duration_unit": "sec",
               "freq_time": 2,
               "freq_times_unit": 5,
               "freq_unit": "day",
               "moist_level": 400,
               "watering_hour": 9,
               "watering_min": 0,
               "watering_unit": "am"
           }
         }]
 },
 {
     "categoryName" : "Water",
     "blocks" :
         [{
            "type": "spklr_setting_moisture",
            "message0": "Water when the soil has %1 %% of humidity",
            "args0": [
              {
                "type": "field_dropdown",
                "name": "moist_level",
                "options": [
                  [
                    "25",
                    "200"
                  ],
                  [
                    "50",
                    "400"
                  ],
                  [
                    "75",
                    "600"
                  ]
                ]
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
             "message0": "Water %1  time(s) every %2 %3",
             "args0": [
               {
                 "type": "field_number",
                 "name": "freq_time",
                 "value": 1,
                 "min": 0
               },
               {
                 "type": "field_number",
                 "name": "freq_times_unit",
                 "value": 1
               },
               {
                 "type": "field_dropdown",
                 "name": "freq_unit",
                 "options": [
                   [
                     "day(s)",
                     "day"
                   ],
                   [
                     "week(s)",
                     "week"
                   ],
                   [
                     "month(s)",
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
              "message0": "Check meteo: %1",
              "args0": [
                {
                  "type": "field_checkbox",
                  "name": "check_meteo",
                  "checked": true
                }
              ],
              "previousStatement": [
                  "program_meteo",
                  "sprinkler_meteo"
              ],
              "nextStatement": [
                  "program_meteo",
                  "sprinkler_meteo"
              ],
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
                "sprinkler_season_mode",
                "plant_season_mode"
              ],
              "colour": 0,
              "tooltip": "",
              "helpUrl": "",
              "childrenBlocksSettings": {
                  "duration_num": 5,
                  "duration_unit": "min",
                  "freq_time": 2,
                  "freq_times_unit": 1,
                  "freq_unit": "day",
                  "moist_level": 200,
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
                "sprinkler_season_mode",
                "plant_season_mode"
              ],
              "colour": 160,
              "tooltip": "",
              "helpUrl": "",
              "childrenBlocksSettings": {
                  "duration_num": 2,
                  "duration_unit": "min",
                  "freq_time": 2,
                  "freq_times_unit": 1,
                  "freq_unit": "week",
                  "moist_level": 400,
                  "watering_hour": 10,
                  "watering_min": 0,
                  "watering_unit": "am"
              }
          }]
},
{
      "categoryName" : "default",
      "blocks" :
          [{
             "type": "program_type",
             "message0": "Program %1 %2",
             "args0": [
               {
                 "type": "input_dummy"
               },
               {
                 "type": "input_statement",
                 "name": "program",
                 "check": [
                   "program_meteo",
                   "program_sprinkler"
                 ]
               }
             ],
             "colour": 0,
             "tooltip": "",
             "helpUrl": ""
          }]

}];



function createBlocksAndToolboxXml() {
    var toolboxXml = '<xml id="toolbox" style="display: none;">';

    // Create the customize blocks
    customizeBlocks.forEach(category =>
    {
        // initialize blocks but don't add them to the toolbox
        if(category.categoryName == "default") {
            category.blocks.forEach(block =>
            {
                // initialize the block in blockly
                Blockly.Blocks[block.type] = {
                    init: function() {
                      this.jsonInit(block);
                    }
                };
            });

        }
        // initialize blocks AND add them to the toolbox
        else {
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
        }
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
            <field name='freq_times_unit'>" + setting.freq_times_unit + "</field> \
            <field name='freq_unit'>" + setting.freq_unit + "</field> \
            <next> \
              <block type='spklr_setting_moisture'> \
                <field name='moist_level'>" + setting.moist_level + "</field> \
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
    </statement> \
  </block>";

  return xml;
}



/* Functions used when by generator_stubs */

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
    return value.slice(1, value.length);  // remove the first element which is 'plant_type' and only have the different types of plants (cactus, roses, etc..)
}