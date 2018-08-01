// program: s,1,1;m,300;f,1,1,m;d,5;st,10,30,a;me


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



// TODO: ERASE this variable.... used only for debugging
bool aa = false;


// Extract the parameters from the string containing the program and configure the corresponding sprinkler
void setProgram(String progStr) {
  
  if(progStr != "") {
    byte spklrNum;
    byte i = 0;
    String str = splitSring(progStr, ';', 0); // get the first parameter. It should normally be the sprinkler first
    
    while(str != "") {        
      String param = splitSring(str, ',', 0);  // get the different data from the parameter
      Serial.println(str);
      
      // sprinkler
      if (param == "s") {
        spklrNum = atoi(splitSring(str, ',', 1).c_str()) - 1;
        sprinklerList[spklrNum].isActivated = atoi(splitSring(str, ',', 2).c_str());
        aa = true;  // TODO: ERASE
      } 
      // moisture
      else if(param == "m") {
        sprinklerList[spklrNum].moisture = atoi(splitSring(str, ',', 1).c_str());
      }
      // frequency
      else if(param == "f") {
        sprinklerList[spklrNum].freqTime = atoi(splitSring(str, ',', 1).c_str());
        sprinklerList[spklrNum].freqTimeUnit = atoi(splitSring(str, ',', 2).c_str());
        splitSring(str, ',', 3).toCharArray(&sprinklerList[spklrNum].freqUnit, 2);
      }
      // duration
      else if(param == "d") {
        sprinklerList[spklrNum].duration = atoi(splitSring(str, ',', 1).c_str()) * 1000;  // received in seconds but transformed into milliseconds
      }
      // starting time
      else if(param == "st") {
        sprinklerList[spklrNum].startingHour = atoi(splitSring(str, ',', 1).c_str());
        sprinklerList[spklrNum].startingMin = atoi(splitSring(str, ',', 2).c_str());
        splitSring(str, ',', 3).toCharArray(&sprinklerList[spklrNum].startingUnit, 2);        
      }
      // meteo
      else if(param == "me") {
        sprinklerList[spklrNum].checkMeteo = true;
      }
      // end of params
      else if(param == "|") {
        // TODO: Check if we received the start and end of the string... make sure we have the entire string
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
  //pinMode(floaterPin, INPUT);

  for(int i = 0; i < NUM_SPRINKLERS; i++) {
    pinMode(pumpPinList[i], OUTPUT); 
  }
}


void loop() {
  setProgram(readFromSerial());

  // TODO: ERASE
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

              // TODO: SEE HOW TO MANAGE WATER LEVEL!!
              // Water while water level is ok and while the duration time is not yet reached           
              while(/*!digitalRead(floaterPin) &&*/ (millis() - timeStart) <  sprinklerList[i].duration) {                  
                  digitalWrite(pumpPinList[i], HIGH); 
                   
                  Serial.print("watering...    ");    
                  //Serial.print(digitalRead(floaterPin));    
                  //Serial.print("  "); 
                  Serial.println(analogRead(moisturePinList[i]));
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

