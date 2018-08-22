Blockly.JavaScript['sprinkler_type'] = function(block) {
  var dropdown_sprinkler_number = block.getFieldValue('sprinkler_number');
  var checkbox_sprinkler_active = block.getFieldValue('sprinkler_active') == 'TRUE';
  var statements_sprinkler_settings = Blockly.JavaScript.statementToCode(block, 'sprinkler_settings');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['plant_type'] = function(block) {
  var text_plant_name = block.getFieldValue('plant_name');
  var statements_plant_settings = Blockly.JavaScript.statementToCode(block, 'plant_settings');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['plant_type_cactus'] = function(block) {
  var statements_settings = Blockly.JavaScript.statementToCode(block, 'settings');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['spklr_setting_meteo'] = function(block) {
  var checkbox_check_meteo = block.getFieldValue('check_meteo') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['spklr_setting_season_summer'] = function(block) {
  var statements_settings = Blockly.JavaScript.statementToCode(block, 'settings');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['spklr_setting_season_winter'] = function(block) {
  var statements_settings = Blockly.JavaScript.statementToCode(block, 'settings');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['spklr_setting_duration'] = function(block) {
  var number_duration_num = block.getFieldValue('duration_num');
  var dropdown_duration_unit = block.getFieldValue('duration_unit');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['spklr_setting_start_time'] = function(block) {
  var number_watering_hour = block.getFieldValue('watering_hour');
  var number_watering_min = block.getFieldValue('watering_min');
  var dropdown_watering_unit = block.getFieldValue('watering_unit');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['spklr_setting_moisture'] = function(block) {
  var dropdown_moist_level = block.getFieldValue('moist_level');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['spklr_setting_intensity'] = function(block) {
  var dropdown_water_intensity = block.getFieldValue('water_intensity');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['spklr_setting_frequency'] = function(block) {
  var number_freq_time = block.getFieldValue('freq_time');
  var number_freq_times_unit = block.getFieldValue('freq_times_unit');
  var dropdown_freq_unit = block.getFieldValue('freq_unit');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['plant_type_roses'] = function(block) {
  var statements_settings = Blockly.JavaScript.statementToCode(block, 'settings');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['program_type'] = function(block) {
  var statements_program = Blockly.JavaScript.statementToCode(block, 'program');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};