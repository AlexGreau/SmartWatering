// Wi-Fi_Grace_azertyuiop1234567890
// Wi-Fi_Muahaha_andre2018nice
// Place_nice,fr
// Place_london,uk

 
#include "variable.h"


String readFromSerial() {
  if(Serial.available()) {
    return Serial.readString();
  }  
  return "";
}



/*
 *  Methods used in Station mode, when connecting to an existing wifi
 *
 */

bool connectToWifiAndMeteo() {

  if(!isWifiConfigSet) {
    return false;
  }

  /*if(!firstConnectionDone) {
  //if(WiFi.status() != WL_CONNECTED && isWifiConfigSet) {
    Serial.write("1 conection\n");
    WiFi.begin(ssid, password);
    delay(5000);
    firstConnectionDone = true;
  }*/
  Serial.write("conecting...\n");

  byte i = 0;  
  
  // TODO: See how to better manage this part because when connecting with arduino this is not practical. 
  // give a timeout. if it doesn't connect after the 3 attemps then try it later?
  for (i = 0; WiFi.status() != WL_CONNECTED && i < 3; i++) {
      /*delay(500);
      Serial.write(".");*/      
      WiFi.begin(ssid, password);
      delay(5000);
      Serial.write(".");
  }       
  if(i == 3) {
    Serial.write("NOT Connected\n");
    return false;
  }
  Serial.write("WiFi connected\n"); 
 
  // Connect to HTTP server - Meteo
  if (!client.connect(host, httpPort)) {
      Serial.write("connection to host failed\n");
      return false;
  }    
  Serial.write("host connected\n");

  return true;
}


// Send HTTP request to Meteo Server
void sendRequest() {
  client.print("GET ");
  client.print(String("/data/2.5/weather?q=") + meteoCity + "&appid=" + apiKey);
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
    Serial.write("Unexpected response: ");
    Serial.write(status);
    return false;
  }  

  // Skip HTTP headers
  char endOfHeaders[] = "\r\n\r\n";
  if (!client.find(endOfHeaders)) {
    Serial.write("Invalid response\n");
    return false;
  }
  
  return true;  
}


int getPrecipitationDataFromServer() {

  String line = client.readStringUntil('\r');
  //Serial.println(line);

  // Allocate JsonBuffer
  // TODO: SEE THIS SITE AND CHECK BUFFER SIZE!! 
  // Use arduinojson.org/assistant to compute the capacity.
  const size_t capacity = JSON_OBJECT_SIZE(9) + JSON_ARRAY_SIZE(3) + 60;
  DynamicJsonBuffer jsonBuffer(capacity);  

  // Parse JSON object
  JsonObject& json = jsonBuffer.parseObject(line);
  //JsonObject& root = jsonBuffer.parseObject(client);
  
  if (!json.success()) {
    Serial.write("Parsing failed!\n");
    return -1;
  }

  return json["main"]["humidity"].as<int>();
}


void sendPrecipitationInfoToArduino(int precipitation) {
  if (precipitation < LIMIT_PRECIPITATION) {
      Serial.write("1");  // true
  } 
  Serial.write("0");  // false
}



/*
 *  Methods used in Access Point mode, when creating its own wifi and server
 *
 */

// When URI / is requested, send a web page with a form
void handleRoot() {  
  server.send(200, "text/html", "<form action=\"/config\" method=\"POST\">Wifi Name:<input type=\"text\" name=\"ssid\" placeholder=\"wifi name\"></br>Password:<input type=\"password\" name=\"password\" placeholder=\"password\"></br>City:<input type=\"text\" name=\"city\" placeholder=\"city\"></br></br></br><input type=\"submit\" value=\"Set Configuration\"></form>");
}


// If a POST request is made to URI /config
void handleConfig() {           
  
  // If the POST request doesn't have wifi name and password then the request is invalid, send HTTP status 400  
  if( ! server.hasArg("ssid") || ! server.hasArg("password") || ! server.hasArg("city")
      || server.arg("ssid") == NULL || server.arg("password") == NULL || server.arg("city") == NULL) { 
    server.send(400, "text/plain", "400: Invalid Request");
    return;
  } 
  else {
    server.arg("ssid").toCharArray(ssid, server.arg("ssid").length() + 1);
    server.arg("password").toCharArray(password, server.arg("password").length() + 1);
    server.arg("city").toCharArray(meteoCity, server.arg("city").length() + 1);
    isWifiConfigSet = true;

    Serial.write("Config set\n");  
    /*Serial.println(ssid);  
    Serial.println(password);  
    Serial.println(meteoCity);*/
    
    server.send(200, "text/html", "<h1>Configuration set successful</p>");    
  }
}


// Send HTTP status 404 (Not Found) when there's no handler for the URI in the request
void handleNotFound(){
  server.send(404, "text/plain", "404: Not found");
}




void setup() {
  delay(1000);
  Serial.begin(115200);

  WiFi.mode(WIFI_AP_STA);

  // Set Access Point mode
  WiFi.softAP(myssid, mypassword);

  // Server configuration
  server.on("/", HTTP_GET, handleRoot);        // Call the 'handleRoot' function when a client requests URI "/"
  server.on("/config", HTTP_POST, handleConfig); // Call the 'handleConfig' function when a POST request is made to URI "/config"
  server.onNotFound(handleNotFound);           // When a client requests an unknown URI (i.e. something other than "/"), call function "handleNotFound"
  server.begin();
  //Serial.println("HTTP server started");

  // Disconnect from any previous wifi
  // WiFi.disconnect();
  //  Serial.println("Setup done");

  // set the maximum client waiting time
  client.setTimeout(HTTP_TIMEOUT);
}


void loop() {  
  // listen for clients
  server.handleClient();

  if (readFromSerial() == "meteo") {
    Serial.write("gonna check meteo\n");
        
    if(connectToWifiAndMeteo()) {     
      sendRequest();
      
      if(isResponseFromServerOk()) {
        int prec = getPrecipitationDataFromServer();
        Serial.write("Response server: ");
        Serial.write(prec);
        
        if(prec != -1) {   // TODO: if there was an error what should we send back to arduino??   
          sendPrecipitationInfoToArduino(prec);
        }   
      }
    }
  }
}
