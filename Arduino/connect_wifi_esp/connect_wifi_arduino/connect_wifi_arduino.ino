#include <SoftwareSerial.h>

SoftwareSerial ESPserial(2, 3);

void setup() {
  Serial.begin(9600);

  ESPserial.begin(115200);

  Serial.println("");
  Serial.println("Remember to to set Both NL & CR in the serial monitor.");
  Serial.println("Ready");
  Serial.println("");
}

void loop() {
    
    // listen for user input and send it to the ESP8266

    char copy[50];
    

   if ( Serial.available() )       {  
      String strRcv = "";
      
      while(Serial.available()) {
        delay(3);
        char c = Serial.read();
        strRcv.concat(c);
        
       /* Serial.print("ca: ");
        Serial.println(c);*/
        
        if (c == '\n') {
            strRcv = "";
        }
      }
      Serial.println("received from command line: ");
      Serial.println(strRcv);
      strRcv.toCharArray(copy, 50);
      ESPserial.write(copy);  
      
      //ESPserial.write("hello");
   }


    delay(1000);

    // listen for communication from the ESP8266 and then write it to the serial monitor
    if(ESPserial.available()) {
      String strRcv = "";
      
      while(ESPserial.available()) {
        delay(3);
        char c = ESPserial.read();
        strRcv.concat(c);
        
       /* Serial.print("ca: ");
        Serial.println(c);*/
        
        if (c == '\n') {
            strRcv = "";
        }
      }
    
      Serial.print("\n\nrecu wifi: ");
      Serial.println(strRcv);
    }
 

  /*
  // listen for communication from the ESP8266 and write it to the serial monitor
  if (ESPserial.available()) {
    Serial.write(ESPserial.read());
  }
  coucou = "Wi-Fi_Grace_azertyuiop1234567890";
  // listen for user input and send it to the ESP8266
  if (Serial.available()) {
    char* charString;
    coucou.toCharArray(charString, coucou.length());
    ESPserial.write(charString);
  }
*/
}
