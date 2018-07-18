/*
 *  This sketch sends data via HTTP GET requests to data.sparkfun.com service.
 *
 *  You need to get streamId and privateKey at data.sparkfun.com and paste them
 *  below. Or just customize this script to talk to other HTTP servers.
 *
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

void setup() {
    Serial.begin(115200);
    delay(10);

    // We start by connecting to a WiFi network

    Serial.println();
    Serial.println();

}

void loop() {
    delay(5000);
    ++value;
    
//------------------------------------------------------------------------------
/*if (WiFi.status() == WL_NO_SSID_AVAIL) {
  
}*/
    while (Serial.available()) {
        delay(3);
        char c = Serial.read();
        cmd_recu.concat(c);
        if (c == '\n') {
            cmd_recu = "";
        }
    }
    // if (!Serial.available()) {
    //     return;
    // }
    /*if (cmd_recu.length() > 0) {
        if (cmd_recu.substring(0, 5) == "Wi-Fi") {
            ssid = splitMySring(cmd_recu, '_', 1).c_str();
            password = splitMySring(cmd_recu, '_', 2).c_str();
            Serial.println(ssid);
            Serial.println(password);
        }
    }*/
//------------------------------------------------------------------------------
    Serial.print("Connecting to ");
    Serial.println(ssid);

    //ssid = "Grace";
    //password = "azertyuiop1234567890";

    /* Explicitly set the ESP8266 to be a WiFi-client, otherwise, it by default,
    would try to act as both a client and an access-point and could cause
    network-issues with your other WiFi-devices on your WiFi-network. */
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
//------------------------------------------------------------------------------


    Serial.print("connecting to ");
    Serial.println(host);

    // Use WiFiClient class to create TCP connections
    WiFiClient client;
    const int httpPort = 80;
    if (!client.connect(host, httpPort)) {
        Serial.println("connection failed");
        return;
    }
}
