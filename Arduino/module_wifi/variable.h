#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
#include <ArduinoJson.h>


#define RX_WiFi 2
#define TX_WiFi 3
#define HTTP_TIMEOUT 5000 // max respone time from server
#define LIMIT_PRECIPITATION 40


// Wifi name and password
char* ssid = (char*) malloc(sizeof(char)*40);
char* password= (char*) malloc(sizeof(char)*100);


// Meteo site to connect to
WiFiClient client;
const int httpPort = 80;
const char* host = "api.openweathermap.org";
const char* apiKey = "217b07a5c3c0dc0c6036378abf0a750f";


// Place to search the forecast to
char* meteoPlace= (char*) malloc(sizeof(char)*100);

SoftwareSerial ESPserial(RX_WiFi, TX_WiFi);







// Configuration received from device (mobile)
bool configSet = false;
bool meteoPlaceSet = false;
//const char* host = "dataservice.accuweather.com";
