#include <Timer.h>
#include <Event.h>
#include <MySoftwareSerial.h>

#define NO_PORTB_PINCHANGES
#define NO_PORTD_PINCHANGES
#include <PinChangeInt.h>


#define RX_WiFi 8
#define TX_WiFi 9

#define NUM_SPRINKLERS 4
#define START_CHECKING_METEO_TIME 60000 // start 1 minute (expressed in milliseconds) after meteo it's been set. To give time to finish reading the programs
#define CHECK_METEO_TIME  300000  // every 5 minutes (expressed in milliseconds)
#define LIMIT_PRECIPITATION 60


Timer timer;

// Structure used for the sprinklers
struct Sprinkler {
  bool isActivated;
  int moisture;
  unsigned long frequency;    // in milliseconds
  unsigned long duration;     // in milliseconds
  unsigned long startingTime; // in milliseconds

  // timers
  int8_t startTimerId;
  int8_t freqTimerId; 
  int8_t durationTimerId;  
};

struct Sprinkler sprinklerList[NUM_SPRINKLERS];


// Meteo
int8_t meteoTimerId = -1;  
bool checkMeteo = false;
bool waterPlants = true;


// Pumps
const uint8_t pumpPinList[4] = {7, 6, 5, 4};


// Moisture Sensors
const uint8_t moisturePinList[NUM_SPRINKLERS] = {A0, A1, A2, A3};


// Speed sensor - to measure water level in the tank with the floater
const uint8_t floaterPin = A4;
volatile bool isWaterLevelLow = false;


//Set the serial port for the wifi module
MySoftwareSerial ESPserial(RX_WiFi, TX_WiFi);


