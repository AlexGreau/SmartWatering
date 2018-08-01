#include <EEPROM.h>

struct Sprinkler {
  bool isActivated = false;    // OR BE ACTIVE BY DEFAULT???
  int moisture = 100;
  int freqTime = 1;
  int freqTimeUnit = 1;
  char freqUnit = 'd';
  int duration = 5;
  char durationUnit = 'm';
  int startingHour = 9;
  int startingMin = 0;
  char startingUnit = 'p';  
  bool checkMeteo = false;

  // Auxiliary attributes
  bool itStarted = false;
};

struct Sprinkler sprinklerList[4];
int eeAddress = 0;

void setup() {
  Serial.begin(9600);
}

void loop() { 
  
  if(Serial.available()) {
    
    char a = Serial.read();
    if(a != 'x') {
      Serial.println(sprinklerList[2].freqUnit);
      sprinklerList[2].freqUnit = a;

      EEPROM.put(eeAddress, sprinklerList);
      Serial.println(sprinklerList[2].freqUnit);
      Serial.print("Written custom data type!");
      
    } else {
      Sprinkler list[4];
      EEPROM.get(eeAddress, list);
    
      Serial.println("Read custom object from EEPROM: ");
      Serial.println(list[0].isActivated);
      Serial.println(list[1].moisture);
      Serial.println(list[2].freqUnit);
    }
  }  
}
