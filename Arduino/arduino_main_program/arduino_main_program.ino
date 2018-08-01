// s,1,1;m,300;f,1,1,m;d,5;st,10,30,a;me
/*
  s,1,1
  d,15,m
  f,1,1,m
  m,100
  st,30
  me
*/


#include "variable.h"


String splitMySring(String data, char separator, int index) {
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
  String strRcv = "";  
  if(Serial.available()) {
    strRcv = Serial.readString();
  }  
  return strRcv;
}




bool aa = false;

void setProgram(String progStr) {
  
  if(progStr != "") {
    byte spklrNum;
    uint8_t i = 0;
    String str = splitMySring(progStr, ';', 0);
    
    while(str != "") {        
      String param = splitMySring(str, ',', 0);  
      Serial.println(str);
      
      // sprinkler
      if (param == "s") {
        spklrNum = atoi(splitMySring(str, ',', 1).c_str()) - 1;
        sprinklerList[spklrNum].isActivated = atoi(splitMySring(str, ',', 2).c_str());
        aa = true;
      } 
      // moisture
      else if(param == "m") {
        sprinklerList[spklrNum].moisture = atoi(splitMySring(str, ',', 1).c_str());
      }
      // frequency
      else if(param == "f") {
        sprinklerList[spklrNum].freqTime = atoi(splitMySring(str, ',', 1).c_str());
        sprinklerList[spklrNum].freqTimeUnit = atoi(splitMySring(str, ',', 2).c_str());
        splitMySring(str, ',', 3).toCharArray(&sprinklerList[spklrNum].freqUnit, 2);
      }
      // duration
      else if(param == "d") {
        sprinklerList[spklrNum].duration = atoi(splitMySring(str, ',', 1).c_str()) * 1000;  // receive seconds and we transform to milliseconds
      }
      // starting time
      else if(param == "st") {
        sprinklerList[spklrNum].startingHour = atoi(splitMySring(str, ',', 1).c_str());
        sprinklerList[spklrNum].startingMin = atoi(splitMySring(str, ',', 2).c_str());
        splitMySring(str, ',', 3).toCharArray(&sprinklerList[spklrNum].startingUnit, 2);        
      }
      // meteo
      else if(param == "me") {
        sprinklerList[spklrNum].checkMeteo = true;
      }
      // end of params
      else if(param == "|") {
        // Check if we received the start and end of the string... make sure we have the entire string
      }
      
      i++;
      str = splitMySring(progStr, ';', i);
    }
  }
}













void setup() {
  Serial.begin(9600);
  ESPserial.begin(115200);

  // initialize floater pin to input
  //pinMode(floaterPin, INPUT);

  for(int i = 0; i < NUM_SPRINKLERS; i++) {
    pinMode(pumpPinList[i], OUTPUT); 
  }
}


void loop() {
  setProgram(readFromSerial());

  if(aa){
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
    aa = false;
  }

  for(int i = 0; i < NUM_SPRINKLERS; i++) {

    // Check if the sprinkler is activated
    if(sprinklerList[i].isActivated) {
      //Serial.print("I'm activated - pump ");
      //Serial.println(i);

      // Check starting date and time
      /*if(!itStarted) {
          // check starting date
          itStarted = true;
        }
      */
  

      
      //if(sprinklerList[i].itStarted) {
  
        // Check frequency -> if it is the moment to water
        //if() {
  
          // Check moisture of the soil
          int moistureLevel = analogRead(moisturePinList[i]);
          Serial.print("Moist sensor: ");
          Serial.println(moistureLevel);
          if(0 < moistureLevel && moistureLevel < sprinklerList[i].moisture) { 
                       
            Serial.println("In moist if");       
            
            bool waterPlants = true;

            // Check meteo
            if(sprinklerList[i].checkMeteo) {
              Serial.println("Checking meteo");
              
              // write 'meteo' to the wifi module so it can go check the meteo site
              ESPserial.write("meteo");

              delay(1000);


              // SEE HOW TO IMPROVE THE WAITNG FOR REPONSE

              
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
              //unsigned long dif = millis() - timeStart;

              // Water while water level is ok and while the duration time is not yet reached
              
              // SEE HOW TO MANAGE WATER LEVEL!!
              
              while(/*!digitalRead(floaterPin) &&*/ (millis() - timeStart) <  sprinklerList[i].duration) {                  
                 /* Serial.print(digitalRead(floaterPin));
                  Serial.print(" ");
                  Serial.println(dif);
                  dif = millis() - timeStart;*/
                  digitalWrite(pumpPinList[i], HIGH);  
                  Serial.print("watering...    ");    
                  //Serial.print(digitalRead(floaterPin));    
                  //Serial.print("  "); 
                  Serial.println(analogRead(moisturePinList[i]));
              }
              digitalWrite(pumpPinList[i], LOW);  
              //Serial.println(dif);  
              Serial.println("Finish watering");              
            }              
          }
        //}
      //}  
    }
  //}
  }
}

