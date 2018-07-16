/*
 *  This sketch sends data via HTTP GET requests to data.sparkfun.com service.
 *
 *  You need to get streamId and privateKey at data.sparkfun.com and paste them
 *  below. Or just customize this script to talk to other HTTP servers.
 *
 */
#include "variable.h"

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
    // while (ESPserial.available()) {
    //     delay(3);
    //     char c = ESPserial.read();
    //     cmd_recu.concat(c);
    //     if (c == '\n') {
    //         cmd_recu = "";
    //     }
    // }
    // if (!ESPserial.available()) {
    //     return;
    // }
//------------------------------------------------------------------------------
    Serial.print("Connecting to ");
    Serial.println(ssid);

    ssid = "Grace";
    password = "azertyuiop1234567890";

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
