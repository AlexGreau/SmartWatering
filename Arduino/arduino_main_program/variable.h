// s,1,1;m,100;f,1,1,m;st,10,30,a;d,15,m;me

#include <SoftwareSerial.h>

#define RX_WiFi 2
#define TX_WiFi 3
#define NUM_SPRINKLERS 4


/* Structure use for sprinklers */
struct Sprinkler {
  bool isActivated = false;    // OR BE ACTIVE BY DEFAULT???
  int moisture = 100;
  int freqTime = 1;
  int freqTimeUnit = 1;
  char freqUnit = 'd';
  int duration = 5000; // milliseconds
  int startingHour = 9;
  int startingMin = 0;
  char startingUnit = 'p';  
  bool checkMeteo = false;

  // Auxiliary attributes
  bool itStarted = false;
};

struct Sprinkler sprinklerList[NUM_SPRINKLERS];


/* Pumps */
const uint8_t pumpPinList[4] = {7, 6, 5, 4};


/* Moisture Sensors */
const uint8_t moisturePinList[NUM_SPRINKLERS] = {A0, A1, A2, A3};


/* Speed sensor - to measure water level in the tank with the floater */
//const uint8_t floaterPin = 2;


/* Set the serial for the wifi module */
SoftwareSerial ESPserial(RX_WiFi, TX_WiFi);



