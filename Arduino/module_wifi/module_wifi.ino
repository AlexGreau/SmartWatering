/*
 *  This sketch sends data via HTTP GET requests to data.sparkfun.com service.
 *
 *  You need to get streamId and privateKey at data.sparkfun.com and paste them
 *  below. Or just customize this script to talk to other HTTP servers.
 *
 */
 
// Wi-Fi_Grace_azertyuiop1234567890
// Wi-Fi_Muahaha_andre2018nice
// Place_nice,fr
// Place_london,uk

 
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


String readSerial() {
  String strRcv = "no";
  
/*  while(Serial.available()) {
    delay(3);
    char c = Serial.read();
    strRcv.concat(c);
    if (c == '\n') {
        strRcv = "";
    }
  }*/
  
  if(Serial.available()) {
    strRcv = Serial.readString();
    //Serial.print("\n\n\n***recu ");
    //Serial.write(strRcv);
  }
  
  return strRcv;
}


void setWifiConfiguration(String strRcv) {
  String ssidTemp = splitMySring(strRcv, '_', 1);
  ssidTemp.toCharArray(ssid, ssidTemp.length() + 1);

  String passTemp = splitMySring(strRcv, '_', 2);
  passTemp.toCharArray(password, passTemp.length() + 1);
  
  configSet = true; 
  Serial.write("Config done");    
}


void setMeteoPlace(String strRcv) {
  String placeTemp = splitMySring(strRcv, '_', 1);
  placeTemp.toCharArray(meteoPlace, placeTemp.length() + 1);

  meteoPlaceSet = true;
  Serial.write("Place done");   
}


bool connectToWifiAndMeteo() {
  if(WiFi.status() != WL_CONNECTED) {
    //Serial.println("NOT connected");
    /* Explicitly set the ESP8266 to be a WiFi-client, otherwise, it by default,
    would try to act as both a client and an access-point and could cause
    network-issues with your other WiFi-devices on your WiFi-network. */
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    
    Serial.write("connecting");
    delay(3000);
    //return;
  } 
      
  Serial.write("WiFi connected"); 
 
  // Connect to HTTP server - Meteo
  client.setTimeout(HTTP_TIMEOUT);
  if (!client.connect(host, httpPort)) {
      Serial.write("connection to host failed");
      return false;
  }
    
  Serial.write("host connected");
  //Serial.println(host);

  return true;
}



 // Send HTTP request
void sendRequest() {
/*  client.print(String("GET ") + "/data/2.5/weather?q=" + meteoPlace + "&appid=" + apiKey + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");*/

  client.print("GET ");
  client.print(String("/data/2.5/weather?q=") + meteoPlace + "&appid=" + apiKey);
  client.println(" HTTP/1.1");
  client.println(String("Host: ") + host);
  client.println("Connection: close");    // close the connection with host after response has been received
  client.println();
}


bool isResponseFromServerOk() {
  // Check HTTP status
  char status[32] = {0};
  client.readBytesUntil('\r', status, sizeof(status));
  if (strcmp(status, "HTTP/1.1 200 OK") != 0) {
    Serial.print("Unexpected response: ");
    Serial.println(status);
    return false;
  }  

  // Skip HTTP headers
  char endOfHeaders[] = "\r\n\r\n";
  if (!client.find(endOfHeaders)) {
    Serial.println("Invalid response");
    return false;
  }
  
  return true;  
}


int getPrecipitationDataFromServer() {
  
  // Read all the lines of the reply from server and print them to Serial
 /* while(client.available()) {
    String line = client.readStringUntil('\r');
    Serial.print(line);
    value++;
  }*/

  String line = client.readStringUntil('\r');
  //Serial.println(line);

  
  // Allocate JsonBuffer
  // Use arduinojson.org/assistant to compute the capacity.
  const size_t capacity = JSON_OBJECT_SIZE(9) + JSON_ARRAY_SIZE(3) + 60;
  DynamicJsonBuffer jsonBuffer(capacity);  

  // Parse JSON object
  JsonObject& json = jsonBuffer.parseObject(line);
  //JsonObject& root = jsonBuffer.parseObject(client);
  
  if (!json.success()) {
    Serial.println("Parsing failed!");
    return -1;
  }
  //Serial.println("closing connection");

  return json["main"]["humidity"].as<int>();
}


void sendPrecipitationInfoToArduino(int precipitation) {
  if (precipitation < LIMIT_PRECIPITATION) {
      // write arduino true
      Serial.write("true");
  } 
  // write arduino false
  Serial.write("false");
}



void setup() {
    Serial.begin(115200);
    delay(10);

    // Disconnect from any previous wifi
    WiFi.disconnect();
    //Serial.println("Setup done");
}




void loop() {  
  //delay(100);

 /* String strRcv = "";
  
  if(Serial.available()) {
     while(Serial.available()) {
        delay(3);
        char c = Serial.read();
        strRcv.concat(c);
        
        //Serial.print("c: ");
        //Serial.println(c);
        
        if (c == '\n') {
            strRcv = "";
        }
     }

     if(strRcv == "hello") {
         Serial.write("bye");
      } else {
        Serial.write("dasd");
      }
  }
*/

  //Serial.print("\n\nrecu arduino: ");
  //Serial.println(strRcv);


    
  //Serial.println("\n\n\nwaiting");

  // read from Serial the wifi configuration settings or the meteo place setting if they are available
  String strRcv = readSerial();

  //delay(1000);

  if (strRcv.length() > 0) {
    String tmp = strRcv.substring(0, 5);
    
    if (tmp == "Place") {
      setMeteoPlace(strRcv);
    }
    else if (tmp == "Wi-Fi") {
      setWifiConfiguration(strRcv); 
    }     
    else if (tmp == "Meteo") {
      /*Serial.print("wifi name: ");
      Serial.println(ssid);
      Serial.print("password: ");
      Serial.println(password);
      Serial.print("place: ");
      Serial.println(meteoPlace);*/
      
      if(connectToWifiAndMeteo()) {     
        sendRequest();
        
        if(isResponseFromServerOk()) {
          int prec = getPrecipitationDataFromServer();
          //Serial.println("Response server: ");
          
          if(prec != -1) {      
            sendPrecipitationInfoToArduino(prec);
          }   
        }
      }
     }
  }

  


  //if(searchMeteo) {
    /*if(WiFi.status() != WL_CONNECTED) {
      Serial.println("NOT connected");
      /* Explicitly set the ESP8266 to be a WiFi-client, otherwise, it by default,
      would try to act as both a client and an access-point and could cause
      network-issues with your other WiFi-devices on your WiFi-network. 
      WiFi.mode(WIFI_STA);
      WiFi.begin(ssid, password);
      
      Serial.println("connecting...");
      return;
    } 
        
    Serial.println("WiFi connected"); 
   
    // Connect to HTTP server - Meteo
    client.setTimeout(HTTP_TIMEOUT);
    if (!client.connect(host, httpPort)) {
        Serial.println("connection to host failed");
        return;
    }
      
    Serial.print("connected to ");
    Serial.println(host);
     
    sendRequest();
    
    if(isResponseFromServerOk()) {
      int prec = getPrecipitationDataFromServer();
      Serial.println("Response server: ");
      Serial.println(prec);
      if(prec != -1) {      
        sendPrecipitationInfoToArduino(prec);
      }   
    }*/
  //}
}
