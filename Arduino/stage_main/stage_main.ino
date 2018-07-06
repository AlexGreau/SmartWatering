#include <dht11.h>
#include "variable.h"


int getMoisture(int moisture_sensor) {
  return analogRead(moisture_sensor);
}

void setup() {
  Serial.begin(9600);
  pinMode(pompe1, OUTPUT);
  while(!Serial) {
    // Attendre le port serie pour se connecter. Need for native USB (LEONARDO)
  }
}

void loop() {
  DHT11.read(DHT11PIN);


  sensor_humidite1 = analogRead(moisture_sensor1);
  sensor_humidite2 = analogRead(moisture_sensor2);
  sensor_humidite3 = analogRead(moisture_sensor3);

  Serial.print("Humidité (%): ");
  Serial.print((float)DHT11.humidity, 2);
  Serial.print("\t");
  Serial.print("Température (°C): ");
  Serial.println((float)DHT11.temperature, 2);
  Serial.println("--------------------------------------------------");
  Serial.print("Humidité 1 : ");
  Serial.print(sensor_humidite1);
  Serial.println(" % ");
  Serial.print("Humidité 2 : ");
  Serial.print(sensor_humidite2);
  Serial.println(" % ");
  Serial.print("Humidité 3 : ");
  Serial.print(sensor_humidite3);
  Serial.println(" % ");
  Serial.println("--------------------------------------------------");

  if (sensor_humidite1 > 10) {
    digitalWrite(pompe1, HIGH);
  } else {
    digitalWrite(pompe1, LOW);
  }

  delay(1000);
}
