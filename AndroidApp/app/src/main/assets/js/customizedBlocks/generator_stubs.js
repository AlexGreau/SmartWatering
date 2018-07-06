// Starting blocks
Blockly.JavaScript['sprinkler_type'] = function(block) {
  var dropdown_sprinkler_number = block.getFieldValue('sprinkler_number');
  var checkbox_sprinkler_active = block.getFieldValue('sprinkler_active') == 'TRUE';
  var statements_sprinkler_settings = Blockly.JavaScript.statementToCode(block, 'sprinkler_settings');
  var code = "<sprinkler number = '" + dropdown_sprinkler_number + "' active = '" + checkbox_sprinkler_active + "'>" 
              + statements_sprinkler_settings 
              + '\n</sprinkler>';
  return code;
};

Blockly.JavaScript['plant_type'] = function(block) {
  var text_plant_name = block.getFieldValue('plant_name');
  var statements_plants_settings = Blockly.JavaScript.statementToCode(block, 'plants_settings');
  var code = "\n<plant name = '" + text_plant_name + "'>" 
              + statements_plants_settings 
              + '\n</plant>';
  return code;
};




// Base blocks
Blockly.JavaScript['spklr_setting_duration'] = function(block) {
  var number_duration_num = block.getFieldValue('duration_num');
  var dropdown_duration_unit = block.getFieldValue('duration_unit');
  var code = "\n<duration number = '" + number_duration_num + "' unit = '" + dropdown_duration_unit + "'/>"
  return code;
};

Blockly.JavaScript['spklr_setting_start_time'] = function(block) {
  var number_watering_hour = block.getFieldValue('watering_hour');
  var number_watering_min = block.getFieldValue('watering_min');
  var dropdown_watering_unit = block.getFieldValue('watering_unit');
  var code = "\n<startTime hour = '" + number_watering_hour + "' min = '" + number_watering_min + "' unit = '" + dropdown_watering_unit + "'/>"
  return code;
};

Blockly.JavaScript['spklr_setting_meteo'] = function(block) {
  var checkbox_check_meteo = block.getFieldValue('check_meteo') == 'TRUE';
  var text_zip_code = block.getFieldValue('zip_code');
  var code = "\n<meteo active = '" + checkbox_check_meteo + "' zip = '" + text_zip_code + "'/>"
  return code;
};

Blockly.JavaScript['spklr_setting_frequency'] = function(block) {
  var number_freq_time = block.getFieldValue('freq_time');
  var dropdown_freq_unit = block.getFieldValue('freq_unit');
  var code = "\n<frequency time = '" + number_freq_time + "' unit = '" + dropdown_freq_unit + "'/>";
  return code;
};

Blockly.JavaScript['spklr_setting_moisture'] = function(block) {
  var number_moist_level = block.getFieldValue('moist_level');
  var code = "\n<moisture level = '" + number_moist_level + "'/>";
  return code;
};

Blockly.JavaScript['spklr_setting_intensity'] = function(block) {
  var dropdown_water_intensity = block.getFieldValue('water_intensity');
  var code = "\n<intensity level = '" + dropdown_water_intensity + "'/>";
  return code;
};




// Blocs composes
Blockly.JavaScript['spklr_setting_winter_mode'] = function(block) {
  var statements_mode_settings = Blockly.JavaScript.statementToCode(block, 'mode_settings');
  var code = "\n<mode name = 'winter'>" 
              + statements_mode_settings 
              + '\n</mode>';
  return code;
};

Blockly.JavaScript['spklr_setting_summer_mode'] = function(block) {
  var statements_mode_settings = Blockly.JavaScript.statementToCode(block, 'mode_settings');
  var code = "\n<mode name = 'summer'>" 
              + statements_mode_settings 
              + '\n</mode>';
  return code;
};