#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>
#include <ArduinoJson.h>

#define RX_WiFi 2
#define TX_WiFi 3

#define HTTP_TIMEOUT 5000 // max response time from server
#define LIMIT_PRECIPITATION 40


// Credentials when module is in access point mode - the wifi created by the module
const char *myssid = "Smart_Watering";
const char *mypassword = "smart12345";
ESP8266WebServer server(80);


// Credentials when module is in station mode - ssid and password of wifi to connect to
char* ssid = (char*) malloc(sizeof(char)*100);
char* password= (char*) malloc(sizeof(char)*100);
bool isWifiConfigSet = false;
//bool firstConnectionDone = false;


// Meteo site to connect to
WiFiClient client;
const int httpPort = 80;
const char* host = "api.openweathermap.org";
const char* apiKey = "217b07a5c3c0dc0c6036378abf0a750f";


// City to search the forecast of
char* meteoCity= (char*) malloc(sizeof(char)*100);


//Set the serial port for the wifi module
SoftwareSerial ESPserial(RX_WiFi, TX_WiFi);


