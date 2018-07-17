#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>

const char* ssid;
const char* password;

const char* host = "www.google.com";
const char* streamId   = "....................";
const char* privateKey = "....................";

int value = 0;

#define RX_WiFi 2
#define TX_WiFi 3

SoftwareSerial ESPserial(RX_WiFi, TX_WiFi);
String cmd_recu;   // Commande recu du Device (Mobile)
