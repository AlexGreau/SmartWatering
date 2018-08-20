// include after definitions.js

// pg[s,1,1;m,300;st,20;f,30;d,20]|pg[s,2,1;m,400;st,20;f,20;d,10]|pg[s,3,1;m,500;st,20;f,20;d,5]|pg[s,4,1;m,600;st,20;f,25;d,15]|pg[me,1]

function generateAllStubs() {
    // Starting blocks
    Blockly.JavaScript['sprinkler_type'] = function(block) {
      var dropdown_sprinkler_number = block.getFieldValue('sprinkler_number');
      var checkbox_sprinkler_active = block.getFieldValue('sprinkler_active') == 'TRUE';
      var statements_sprinkler_settings = Blockly.JavaScript.statementToCode(block, 'sprinkler_settings');
      var code = "pg[s," + dropdown_sprinkler_number + "," + (checkbox_sprinkler_active ? 1 : 0)

      var tmp = statements_sprinkler_settings.trim();

      if(tmp != "") {
        if(tmp.charAt( tmp.length-1 ) == ";") {
            tmp = tmp.slice(0, tmp.length-1);
        }
        code += ";" + tmp;
      }
      code += "]";

      return code;
    };

    Blockly.JavaScript['plant_type'] = function(block) {
      var text_plant_name = block.getFieldValue('plant_name');
      var statements_plant_settings = Blockly.JavaScript.statementToCode(block, 'plant_settings');
      var code = statements_plant_settings;
      return code;
    };




    // Base blocks
    Blockly.JavaScript['spklr_setting_duration'] = function(block) {
      var number_duration_num = block.getFieldValue('duration_num');
      var dropdown_duration_unit = block.getFieldValue('duration_unit');
      var code = "d," + number_duration_num + ";";
      return code;
    };

    Blockly.JavaScript['spklr_setting_start_time'] = function(block) {
      var number_watering_hour = block.getFieldValue('watering_hour');
      var number_watering_min = block.getFieldValue('watering_min');
      var dropdown_watering_unit = block.getFieldValue('watering_unit');
      var code = "st," + number_watering_hour + ";";
      return code;
    };

    Blockly.JavaScript['spklr_setting_meteo'] = function(block) {
      var checkbox_check_meteo = block.getFieldValue('check_meteo') == 'TRUE';
      var text_zip_code = block.getFieldValue('zip_code');
      var code = "me," + (checkbox_check_meteo ? 1 : 0) + ";";
      return code;
    };

    Blockly.JavaScript['spklr_setting_frequency'] = function(block) {
      var number_freq_time = block.getFieldValue('freq_time');
      var number_freq_times_unit = block.getFieldValue('freq_times_unit');
      var dropdown_freq_unit = block.getFieldValue('freq_unit');
      var code = "f," + number_freq_time + ";";
      return code;
    };

    Blockly.JavaScript['spklr_setting_moisture'] = function(block) {
      var number_moist_level = block.getFieldValue('moist_level');
      var code = "m," + number_moist_level + ";";
      return code;
    };
/*
    Blockly.JavaScript['spklr_setting_intensity'] = function(block) {
      var dropdown_water_intensity = block.getFieldValue('water_intensity');
      var code = "\n<intensity level = '" + dropdown_water_intensity + "'/>";
      return code;
    };*/




    // Blocs composes

    // Season blocks
    getSeasonBlocks().forEach(block => {
        Blockly.JavaScript[block.type] = function(b) {
          var statements_settings = Blockly.JavaScript.statementToCode(b, 'settings');
          var code = statements_settings;
          return code;
        };
    });


    // Plant type blocks
    getPlantTypesBlocks().forEach(block => {
        Blockly.JavaScript[block.type] = function(b) {
          var statements_settings = Blockly.JavaScript.statementToCode(b, 'settings');
          var code = statements_settings;
          return code;
        };
    });
}