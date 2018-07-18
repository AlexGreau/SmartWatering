#include <SoftwareSerial.h>

SoftwareSerial ESPserial(2, 3);
String coucou;

void setup() {
  Serial.begin(115200);

  ESPserial.begin(115200);

  Serial.println("");
  Serial.println("Remember to to set Both NL & CR in the serial monitor.");
  Serial.println("Ready");
  Serial.println("");
}

void loop() {
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

}
