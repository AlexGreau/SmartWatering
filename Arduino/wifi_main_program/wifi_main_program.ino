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

/*
 *  Methods used in Station mode, when connecting to meteo
 *
 */
 
/*
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
*/

String readFromSerial() {
  String strRcv = "";
  
  if(Serial.available()) {
    strRcv = Serial.readString();
  }
  
  return strRcv;
}

/*
void setWifiConfiguration(String strRcv) {
  String ssidTemp = splitMySring(strRcv, '_', 1);
  ssidTemp.toCharArray(ssid, ssidTemp.length() + 1);

  String passTemp = splitMySring(strRcv, '_', 2);
  passTemp.toCharArray(password, passTemp.length() + 1);
  
  configSet = true; 
  Serial.write("Config done");    
}*/

/*
void setmeteoCity(String strRcv) {
  String placeTemp = splitMySring(strRcv, '_', 1);
  placeTemp.toCharArray(meteoCity, placeTemp.length() + 1);

  meteoCitySet = true;
  Serial.write("Place done");   
}*/


bool connectToWifiAndMeteo() {

  if(WiFi.status() != WL_CONNECTED && isWifiConfigSet) {
    Serial.println("conecting...");
    WiFi.begin(ssid, password);
    delay(5000);
  }

  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }       
  Serial.println("WiFi connected"); 
 
  // Connect to HTTP server - Meteo
  if (!client.connect(host, httpPort)) {
      Serial.println("connection to host failed");
      return false;
  }    
  Serial.println("host connected");

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






/*
 *  Methods used in Access Point mode, when creating its own wifi and server
 *
 */

// When URI / is requested, send a web page with a button to toggle the LED
void handleRoot() {  
  server.send(200, "text/html", "<form action=\"/config\" method=\"POST\">Wifi Name:<input type=\"text\" name=\"ssid\" placeholder=\"wifi name\"></br>Password:<input type=\"password\" name=\"password\" placeholder=\"password\"></br>City:<input type=\"text\" name=\"city\" placeholder=\"city\"></br></br></br><input type=\"submit\" value=\"Set Configuration\"></form>");
}


// If a POST request is made to URI /config
void handleConfig() {           
  
  // If the POST request doesn't have wifi name and password data the request is invalid, so send HTTP status 400  
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

    Serial.print("Coconfig set");  
    Serial.println(ssid);  
    Serial.println(password);  
    Serial.println(meteoCity);
    
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
  WiFi.softAP(myssid, mypassword);

  // Server configuration
  server.on("/", HTTP_GET, handleRoot);        // Call the 'handleRoot' function when a client requests URI "/"
  server.on("/config", HTTP_POST, handleConfig); // Call the 'handleLogin' function when a POST request is made to URI "/login"
  server.onNotFound(handleNotFound);           // When a client requests an unknown URI (i.e. something other than "/"), call function "handleNotFound"
  server.begin();
  Serial.println("HTTP server started");

  // Disconnect from any previous wifi
  // WiFi.disconnect();
  //  Serial.println("Setup done");

  // set the maximm waiting time
  client.setTimeout(HTTP_TIMEOUT);
}




void loop() {  
  server.handleClient();

  if (readFromSerial() == "meteo") {
        
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
