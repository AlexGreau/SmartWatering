#include <SoftwareSerial.h>

//#define RX_WiFi 2
//#define TX_WiFi 3
#define RX_WiFi 8
#define TX_WiFi 9

#define NUM_SPRINKLERS 4


// Structure used for the sprinklers
struct Sprinkler {
  bool isActivated = false;    // TODO: OR BE ACTIVE BY DEFAULT???
  int moisture = 100;
  int freqTime = 1;
  int freqTimeUnit = 1;
  char freqUnit = 'd';
  int duration = 5000;  // in milliseconds
  int startingHour = 9;
  int startingMin = 0;
  char startingUnit = 'p';  
  bool checkMeteo = false;

  // Auxiliary attributes
  bool itStarted = false;
};

struct Sprinkler sprinklerList[NUM_SPRINKLERS];


// Pumps
const uint8_t pumpPinList[4] = {7, 6, 5, 4};


// Moisture Sensors
const uint8_t moisturePinList[NUM_SPRINKLERS] = {A0, A1, A2, A3};


// Speed sensor - to measure water level in the tank with the floater
const uint8_t floaterPin = 3;
bool isWaterLevelOk = true;


//Set the serial port for the wifi module
SoftwareSerial ESPserial(RX_WiFi, TX_WiFi);



