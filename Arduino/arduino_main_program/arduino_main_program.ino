/*
  Program String:
    sprinkler(s),num_ID(1-4),activated(0/1)  -> example: s,1,1
    moiustre(m),value(x)                     -> example: m,300
    starting time(st),time(x in seconds)     -> example: st,5   
    frequency(f),time(x in seconds)          -> example: f,30
    duration(d),seconds(x)                   -> example: d,20    
    meteo(me),active(0/1)                    -> example: me,1

    Example program:
      pg[s,1,1;m,300;st,5;f,30;d,20]
      pg[me,1]

      rst|pg[s,1,1;m,300;st,20;f,30;d,20]|pg[s,2,1;m,400;st,20;f,20;d,10]|pg[s,3,1;m,500;st,20;f,20;d,5]|pg[s,4,1;m,600;st,20;f,25;d,15]|pg[me,1]

      pg[s,1,0;m,300;st,20;f,30;d,20][1696]
*/

#include "variable.h"


String splitSring(String data, char separator, int index) {
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length() - 1;

  for(int i = 0; i <= maxIndex && found <= index; i++) {
      if(data.charAt(i) == separator || i == maxIndex) {
          found++;
          strIndex[0] = strIndex[1]+1;
          strIndex[1] = (i == maxIndex) ? i+1 : i;
      }
  }
  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}


// Used for debugging
void printForDebug() {
  Serial.println("\nA moi  st  freq  dura  me  timerStart timerFreq timerDura timerMeteo");
  for(int spklrNum=0; spklrNum<4; spklrNum++){
    Serial.print(sprinklerList[spklrNum].isActivated);    
    Serial.print(" ");
    Serial.print(sprinklerList[spklrNum].moisture);
    Serial.print(" ");
    Serial.print(sprinklerList[spklrNum].startingTime); 
    Serial.print(" ");
    Serial.print(sprinklerList[spklrNum].frequency);
    Serial.print(" ");
    Serial.print(sprinklerList[spklrNum].duration);       
    Serial.print("  ");
    Serial.print(checkMeteo);
    Serial.print("      ");
    Serial.print(sprinklerList[spklrNum].startTimerId);
    Serial.print("         ");
    Serial.print(sprinklerList[spklrNum].freqTimerId);
    Serial.print("        ");
    Serial.print(sprinklerList[spklrNum].durationTimerId);
    Serial.print("          ");
    Serial.println(meteoTimerId);    
  }
  Serial.println();
}


bool verifyChecksum(String str) {
  String checksumInString = str.substring(str.indexOf("[", 3) + 1, str.length() - 1);
  String prog = str.substring(3, str.indexOf("]")); // to get the string inside pg[...]
  
  int total = 0;
  for(int i = 0; i < prog.length(); i++) {
    total += prog.charAt(i);
  }
  return total == checksumInString.toInt();  
}


// Extract the parameters from the string containing the program and configure the corresponding sprinkler
void setProgram(String progStr) {  
     
  if(!verifyChecksum(progStr)) {
    Serial.println("ERROR! String received is not correct.");
    ESPserial.write("ack:0"); // Send acknowledge with status: 0 - program was not correctly received so resend it
    return;
  }

  progStr = progStr.substring(3, progStr.indexOf("]")); // to get the string inside pg[...]
      
  byte spklrId;
  byte i = 0;      
  String str = splitSring(progStr, ';', 0); // get the first parameter. It should normally be the sprinkler first
  
  while(str != "") {        
    String param = splitSring(str, ',', 0);  // get the different data from the parameter
    
    // sprinkler
    if (param == "s") {
      spklrId = splitSring(str, ',', 1).toInt() - 1;
      sprinklerList[spklrId].isActivated = splitSring(str, ',', 2).toInt();
    } 
    // moisture
    else if(param == "m") {
      sprinklerList[spklrId].moisture = splitSring(str, ',', 1).toInt();
    }
    // starting time
    else if(param == "st") {
      sprinklerList[spklrId].startingTime = splitSring(str, ',', 1).toInt() * 1000;  // received in seconds but transformed into milliseconds
    }
    // frequency
    else if(param == "f") {
      sprinklerList[spklrId].frequency = splitSring(str, ',', 1).toInt() * 1000;  // received in seconds but transformed into milliseconds
    }
    // duration
    else if(param == "d") {
      sprinklerList[spklrId].duration = splitSring(str, ',', 1).toInt() * 1000;  // received in seconds but transformed into milliseconds
    }      
    // meteo
    else if(param == "me") {
      checkMeteo = splitSring(str, ',', 1).toInt();
      stopTimer(&meteoTimerId);
      
      if(checkMeteo) {        
        meteoTimerId = timer.after(START_CHECKING_METEO_TIME, startMeteoCheckingTimer, NULL);
      }
      else {        
        waterPlants = true;
      }
    }
    else {
      Serial.println("ERROR 2! String received is not correct.");
      setSprinklerDefaultValue(spklrId); // set the sprinkler back to the default value
      ESPserial.write("ack:0"); // Send acknowledge with status: 0 - program was not correctly received so resend it
      return;
    }
    
    i++;
    str = splitSring(progStr, ';', i);  // get next parameter
  }
  setStartingTimer(spklrId); 

  // Send acknowledge with status: 1 - program was well received
  ESPserial.write("ack:1");

  // TODO: ERASE
  printForDebug();
}


void startMeteoCheckingTimer(void* p) {
  stopTimer(&meteoTimerId);
  meteoTimerId = timer.every(CHECK_METEO_TIME, getMeteo, NULL);

  getMeteo(p);
}


void getMeteo(void* p) {
  Serial.print("Checking meteo");
  Serial.print("      timer: ");
  Serial.println(meteoTimerId);
      
  // write 'meteo' to the wifi module so it can go check the meteo site
  ESPserial.write("meteo");
}


void setMeteo(String result) {  
  Serial.println(splitSring(result, ':', 1).toInt());
  
  if (splitSring(result, ':', 1).toInt() < LIMIT_PRECIPITATION) {
    waterPlants = true;
  } else {   
    waterPlants = false;
  }
  Serial.print("Meteo result: ");
  Serial.println(waterPlants);
}



/*
 **************************************************
 *  Timer methods
 **************************************************
 */

void setStartingTimer(int i) {
  stopAllCurrentSpklrTimers(i);
  
  if(sprinklerList[i].isActivated) {
    Serial.print("set sprinkler: ");
    Serial.println(i+1);
    sprinklerList[i].startTimerId = timer.after(sprinklerList[i].startingTime, startWateringCycle, (void*) i);
  }
}


void setAllStartingTimers() {
  Serial.println("setting");
  for(int i = 0; i < NUM_SPRINKLERS; i++) {
    setStartingTimer(i);
  }
}


void startWateringCycle(void* spklrId) {
  int i = (int) spklrId;
  Serial.print("Start watering cycle of sprinkler: ");
  Serial.println(((int) spklrId) + 1);

  stopTimer(&sprinklerList[i].startTimerId); 
  sprinklerList[i].freqTimerId = timer.every(sprinklerList[i].frequency, timeToWater, spklrId);
  
  timeToWater(spklrId);
}


void timeToWater(void* spklrId) {
  int i = (int) spklrId;

  // Check moisture of the soil
  int moistureLevel = analogRead(moisturePinList[i]); // read data from sensor
  Serial.print("Pump: ");
  Serial.print(i+1);
  Serial.print("  Moist: ");
  Serial.print(moistureLevel);
  Serial.print("  Water low: ");
  Serial.print(isWaterLevelLow);
  Serial.print("   Result Meteo: ");
  Serial.print(waterPlants);
  Serial.print("  ");
  
  if(0 < moistureLevel && moistureLevel < sprinklerList[i].moisture) { 

    if(!isWaterLevelLow && waterPlants) {      
      digitalWrite(pumpPinList[i], HIGH);
      Serial.print("  ON ");
      
      sprinklerList[i].durationTimerId = timer.after(sprinklerList[i].duration, stopWatering, (void*)i);

      // TODO: ERASE
      //printForDebug();
    }              
  }
  Serial.print(sprinklerList[i].startTimerId);
  Serial.print(" ");
  Serial.print(sprinklerList[i].freqTimerId);
  Serial.print(" ");
  Serial.print(sprinklerList[i].durationTimerId);
  Serial.println("");
}


void stopWatering(void* spklrId) {
  int i = (int) spklrId;
  digitalWrite(pumpPinList[i], LOW);  
  stopTimer(&sprinklerList[i].durationTimerId);
  Serial.print("Pump: ");
  Serial.print(i+1);
  Serial.println("  off");
  
  // TODO: ERASE
  //printForDebug();
}


void stopTimer(int8_t *id) {
  timer.stop(*id);
  *id = -1;
}

void stopAllCurrentSpklrTimers(int i) {
  stopTimer(&sprinklerList[i].startTimerId);
  stopTimer(&sprinklerList[i].freqTimerId); 
  stopTimer(&sprinklerList[i].durationTimerId);
  digitalWrite(pumpPinList[i], LOW);
}



/*
 *****************
 *****************
 *  SETUP & LOOP
 *****************
 *****************
 */
void setSprinklerDefaultValue(int i) {
  sprinklerList[i].isActivated = true;    // TODO: OR BE ACTIVE BY DEFAULT???
  sprinklerList[i].moisture = 400;        //
  sprinklerList[i].frequency = 10000;    // 10 seconds in milliseconds
  sprinklerList[i].duration = 5000;;     // 5 seconds in milliseconds
  sprinklerList[i].startingTime = 1000;  // 1 second in milliseconds

  stopAllCurrentSpklrTimers(i); // all timers ID will be -1 by default which means they don't have a timer assigned yet
}

void setAllSprinklersDefaultValues() {
  for(int i = 0; i < NUM_SPRINKLERS; i++) {
    setSprinklerDefaultValue(i);
  }
  // TODO: ERASE
  printForDebug();
}

  
void setWaterLevel() {
  isWaterLevelLow = digitalRead(floaterPin);

  Serial.print("Water low: ");
  Serial.println(isWaterLevelLow);
  if(isWaterLevelLow) {
    for(int i = 0; i < NUM_SPRINKLERS; i++) {
      digitalWrite(pumpPinList[i], LOW);
      stopTimer(&sprinklerList[i].durationTimerId);
    }
    Serial.println("All pumps off");
    ESPserial.write("alert");
    // TODO: ERASE
    printForDebug();
  }  
}


void setup() {
  Serial.begin(9600);
  ESPserial.begin(115200);

  // initialize floater pin to input  
  pinMode(floaterPin, INPUT);     //set the pin to input
  digitalWrite(floaterPin, HIGH); //use the internal pullup resistor
  PCintPort::attachInterrupt(floaterPin, setWaterLevel, CHANGE); // attach a PinChange Interrupt to our pin
  
  for(int i = 0; i < NUM_SPRINKLERS; i++) {
    pinMode(pumpPinList[i], OUTPUT); 
  }

  setAllSprinklersDefaultValues();
  setAllStartingTimers();
}


void loop() { 
  String str = "";
  
  if(ESPserial.available()) {
    str = ESPserial.readString();
    str.trim(); // erase any posible whitespaces at both ends
  }  

  if(str.startsWith("rst")) { 
    Serial.println(str);
    setAllSprinklersDefaultValues(); 
    
    ESPserial.write("ack:1"); // Send acknowledge with status: 1 - rst was well received
  } 
  else if(str.startsWith("pg")) { 
    Serial.println(str);
    setProgram(str);  
  } 
  else if(str.startsWith("me")){
    Serial.println(str);
    setMeteo(str);
  }
  else if(str.startsWith("st")){
    Serial.println(str);
  }
  
  timer.update(); // update the timers
}

