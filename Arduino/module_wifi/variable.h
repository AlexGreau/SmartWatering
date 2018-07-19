#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>

char* ssid = (char*) malloc(40);
char* password= (char*) malloc(100);

const char* host = "www.amazon.com";
const char* streamId   = "....................";
const char* privateKey = "....................";

int value = 0;

#define RX_WiFi 2
#define TX_WiFi 3

SoftwareSerial ESPserial(RX_WiFi, TX_WiFi);
String cmd_recu;   // Commande recu du Device (Mobile)
