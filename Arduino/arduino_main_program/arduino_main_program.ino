// program: pg[s,1,1;m,300;f,1,1,m;d,10;st,10,30,a;me]
// program: pg[s,1,1;m,300;f,1,1,m;d,10;st,10,30,a]
/*
  Program String:
    sprinkler(s),num_ID(1-4),activated(0/1)        -> example: s,1,1
    moiustre(m),value(x)                           -> example: m,300
    frequency(f),time(x),times_unit(x),unit(d/w/m) -> example: f,1,1,m (1 time once(1) a month(m))    TODO: transform it to seconds before sending to arduino
    duration(d),seconds(x)                         -> example: d,10
    starting time(st),hour(x),minutes(x),unit(a/p) -> example: st,10,30,a    TODO: See if this will change or not... add starting date   
    meteo(me)                                      -> example: me
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


String readFromSerial() {
  if(Serial.available()) {
    return Serial.readString();
  }  
  return "";
}




// TODO: ERASE this variable and function.... used only for debugging
bool printOnce = false;

void printOne() {
  if(printOnce){
    Serial.println();
    for(int spklrNum=0; spklrNum<4; spklrNum++){
      Serial.print(sprinklerList[spklrNum].isActivated);    
      Serial.print(" ");
      Serial.print(sprinklerList[spklrNum].moisture);
      Serial.print(" ");
      Serial.print(sprinklerList[spklrNum].freqTime);
      Serial.print(" ");
      Serial.print(sprinklerList[spklrNum].freqTimeUnit);
      Serial.print(" ");
      Serial.print(sprinklerList[spklrNum].freqUnit);
      Serial.print(" ");
      Serial.print(sprinklerList[spklrNum].duration);
      Serial.print(" ");
      Serial.print(sprinklerList[spklrNum].startingHour);
      Serial.print(" ");
      Serial.print(sprinklerList[spklrNum].startingMin);
      Serial.print(" ");
      Serial.print(sprinklerList[spklrNum].startingUnit);      
      Serial.print(" ");
      Serial.println(sprinklerList[spklrNum].checkMeteo);
    }    
    Serial.println();
    printOnce = false;
  }
}



// Extract the parameters from the string containing the program and configure the corresponding sprinkler
void setProgram(String progStr) {

  // erase any posible whitspace at both ends
  progStr.trim();
  
  if(progStr != "" && progStr.startsWith("pg")) {    
    progStr.remove(0, 2);
    Serial.println(progStr); 

    // TODO: handle part when the string received is not correct... tell the wifi module to resend
    if(!progStr.startsWith("[") || !progStr.endsWith("]")) {      
      Serial.print("ERROR! String received is not correct. String received: ");
      Serial.println(progStr);
      return;      
    }
    progStr.remove(0, 1);
    progStr.remove(progStr.length() - 1, 1);
        
    byte spklrNum;
    byte i = 0;
    String str = splitSring(progStr, ';', 0); // get the first parameter. It should normally be the sprinkler first
    
    while(str != "") {        
      String param = splitSring(str, ',', 0);  // get the different data from the parameter
      Serial.println(str);
      
      // sprinkler
      if (param == "s") {
        spklrNum = splitSring(str, ',', 1).toInt() - 1;
        sprinklerList[spklrNum].isActivated = splitSring(str, ',', 2).toInt();
        printOnce = true;  // TODO: ERASE
      } 
      // moisture
      else if(param == "m") {
        sprinklerList[spklrNum].moisture = splitSring(str, ',', 1).toInt();
      }
      // frequency
      else if(param == "f") {
        sprinklerList[spklrNum].freqTime = splitSring(str, ',', 1).toInt();
        sprinklerList[spklrNum].freqTimeUnit = splitSring(str, ',', 2).toInt();
        splitSring(str, ',', 3).toCharArray(&sprinklerList[spklrNum].freqUnit, 2);
      }
      // duration
      else if(param == "d") {
        sprinklerList[spklrNum].duration = splitSring(str, ',', 1).toInt() * 1000;  // received in seconds but transformed into milliseconds
      }
      // starting time
      else if(param == "st") {
        sprinklerList[spklrNum].startingHour = splitSring(str, ',', 1).toInt();
        sprinklerList[spklrNum].startingMin = splitSring(str, ',', 2).toInt();
        splitSring(str, ',', 3).toCharArray(&sprinklerList[spklrNum].startingUnit, 2);        
      }
      // meteo
      else if(param == "me") {
        sprinklerList[spklrNum].checkMeteo = true;
      }
      
      i++;
      str = splitSring(progStr, ';', i);  // get next parameter
    }
  }
}



void setup() {
  Serial.begin(9600);
  ESPserial.begin(115200);

  // initialize floater pin to input
  pinMode(floaterPin, INPUT_PULLUP); // TODO: see INPUT_PULLUP
  attachInterrupt(digitalPinToInterrupt(floaterPin), activateWaterLowAlert, RISING); // or use change??? when is active there is no water but the when the person fills it will change again

  for(int i = 0; i < NUM_SPRINKLERS; i++) {
    pinMode(pumpPinList[i], OUTPUT); 
  }
}


// TODO: use a boolean or just turn of the pump??
void activateWaterLowAlert() {
  if(digitalRead(floaterPin)) {
    isWaterLevelOk = false;  
  } else {
    isWaterLevelOk = true;  
  }
}



void loop() {
  setProgram(readFromSerial());

  // TODO: ERASE
  printOne();

  // Check every sprinkler to see if is time to water
  for(int i = 0; i < NUM_SPRINKLERS; i++) {

    // Check if the sprinkler is activated
    if(sprinklerList[i].isActivated) {
      //Serial.print("I'm activated - pump ");
      //Serial.println(i);

      // TODO: Check starting date and time
      /*if(!itStarted) {
          // check starting date
          itStarted = true;
        }
      */
  

      
      //if(sprinklerList[i].itStarted) {
  
        // TODO: Check frequency -> if it is the moment to water
        //if() {
  
          // Check moisture of the soil
          int moistureLevel = analogRead(moisturePinList[i]); // read data from sensor
          Serial.print("Moist sensor: ");
          Serial.print(moistureLevel);
          Serial.print(" ");
          Serial.println(digitalRead(floaterPin));
          
          if(0 < moistureLevel && moistureLevel < sprinklerList[i].moisture) { 
                       
            Serial.println("In moist if");       
            
            bool waterPlants = true;

            // Check meteo
            if(sprinklerList[i].checkMeteo) {
              Serial.println("Checking meteo");
              
              // write 'meteo' to the wifi module so it can go check the meteo site
              ESPserial.write("meteo");

              delay(1000);


              // TODO: SEE HOW TO IMPROVE THE WAITNG FOR REPONSE

              
              // Check if there is response from wifi
              if(ESPserial.available()) {
                char c = ESPserial.read();
                waterPlants = atoi(c);
                              
                Serial.print("\n\nrecu wifi: ");
                Serial.println(c);
              }
            }

            if(waterPlants) {            
              
              unsigned long timeStart = millis();
              //uint8_t waterAlert = 0;

              // TODO: SEE HOW TO MANAGE WATER LEVEL!!
              // Water while water level is ok and while the duration time is not yet reached           
              while(isWaterLevelOk /*waterAlert < 10*//*!digitalRead(floaterPin)*/ && (millis() - timeStart) <  sprinklerList[i].duration) {                  
                  digitalWrite(pumpPinList[i], HIGH); 

                  int tmp = digitalRead(floaterPin);
                   
                  Serial.print("watering...    ");    
                  Serial.print(tmp);    
                  Serial.print("  "); 
                  /*Serial.print(waterAlert); 
                  Serial.print("  "); */
                  Serial.println(analogRead(moisturePinList[i]));

                  /*if(tmp) {
                    waterAlert++;
                  } else if (waterAlert > 0) {
                    waterAlert--;
                  }*/
              }
              digitalWrite(pumpPinList[i], LOW);  
              
              Serial.println("Finish watering");              
            }              
          }
        //}
      //}  
    }
  //}
  }
}

