
var workspaceBlocks;
var cactus, tomato,defaut

function loadModel(name) {
    switch (name) {
        case "cactus" :
        //    workspaceBlocks = Blockly.Xml.textToDom(cactus);
            console.log ("cactus loaded")
            break;
        case "tomato" :
            workspaceBlocks = Blockly.Xml.textToDom(tomato);
       //     console.log("tomato loaded")
            break;

        default: // load blank
       //     console.log("could not find model : default loaded")
            workspaceBlocks = Blockly.Xml.textToDom(defaut);
    }
    /* Clears and Load blocks to workspace. */
    Blockly.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
    console.log("model loaded");
}



cactus = '<xml xmlns="http://www.w3.org/1999/xhtml"> \
<variables></variables>\
<block type="sprinkler_type" id="nIUY5%2n4l:sg}mKdy^;" x="110" y="90">\
  <field name="sprinkler_number">1</field>\
  <field name="sprinkler_active">TRUE</field>\
  <statement name="sprinkler_settings">\
    <block type="plant_type_cactus" id="TvG?4)C}Pc^D*tn8l{-n">\
      <statement name="settings">\
        <block type="spklr_setting_duration" id=";hG#j{z|Y^)XU||Npwth">\
          <field name="duration_num">15</field>\
          <field name="duration_unit">min</field>\
          <next>\
            <block type="spklr_setting_frequency" id="sF]mSBff_Hgo=_hWw/|f">\
              <field name="freq_time">1</field>\
              <field name="freq_unit">month</field>\
              <next>\
                <block type="spklr_setting_moisture" id="X!a10W]e,Dwo@`KYk(l=">\
                  <field name="moist_level">0</field>\
                  <next>\
                    <block type="spklr_setting_start_time" id="DfwEp;#X]MRPGMPVHLAC">\
                      <field name="watering_hour">10</field>\
                      <field name="watering_min">0</field>\
                      <field name="watering_unit">am</field>\
                    </block>\
                  </next>\
                </block>\
              </next>\
            </block>\
          </next>\
        </block>\
      </statement>\
    </block>\
  </statement>\
</block>\
</xml>'


tomato = '<xml xmlns="http://www.w3.org/1999/xhtml">\
<variables></variables>\
<block type="sprinkler_type" id="nIUY5%2n4l:sg}mKdy^;" x="250" y="70">\
  <field name="sprinkler_number">1</field>\
  <field name="sprinkler_active">TRUE</field>\
  <statement name="sprinkler_settings">\
    <block type="plant_type" id="G[Y(N269+sa+P|{0Xa97">\
      <field name="plant_name">Tomato</field>\
      <statement name="plant_settings">\
        <block type="spklr_setting_moisture" id=")f-cM`XME=7E[stC_#_n">\
          <field name="moist_level">2</field>\
          <next>\
            <block type="spklr_setting_frequency" id="y)qp)M32VEhQ0Z?VEGCd">\
              <field name="freq_time">1</field>\
              <field name="freq_unit">day</field>\
              <next>\
                <block type="spklr_setting_duration" id="h$FM+wGd6zGX[.:mTf;M">\
                  <field name="duration_num">15</field>\
                  <field name="duration_unit">min</field>\
                  <next>\
                    <block type="spklr_setting_start_time" id=";|7A#)t4HOAu1{BI:U{4">\
                      <field name="watering_hour">8</field>\
                      <field name="watering_min">0</field>\
                      <field name="watering_unit">pm</field>\
                    </block>\
                  </next>\
                </block>\
              </next>\
            </block>\
          </next>\
        </block>\
      </statement>\
    </block>\
  </statement>\
</block>\
</xml>'

defaut = '<xml xmlns="http://www.w3.org/1999/xhtml"> \
<variables></variables>\
<block type="sprinkler_type" id="}0eK(Yxausq_v:m#QQ,r" x="130" y="50">\
  <field name="sprinkler_number">1</field>\
  <field name="sprinkler_active">TRUE</field>\
</block>\
</xml>'