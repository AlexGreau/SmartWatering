#include <SoftwareSerial.h>
/**
 * Pin de communication RX et TX pour le module Bluetooth
 * RX = 8
 * TX = 9
 */
#define RX_BT 8
#define TX_BT 9

#define RX_WiFi 2
#define TX_WiFi 3

String cmd_recu;   // Commande recu du Device (Mobile)

const uint8_t PIN_LED_TEST = 13;

/**
 * Pin de gestion des pompes
 * 7, 6, 5 et 4 correspondent au Relay utilise
 */
#define POMPE1 = 7;
#define POMPE2 = 6;
#define POMPE3 = 5;
#define POMPE4 = 4;

/**
 * Specifications capteur Humidite
 */
const byte AIR = 0;
const byte DRY_SOIL = 1;
const byte HUMID_SOIL = 2;
const byte WATER = 3;

/**
 * Module capteur d'Humidite
 * Utilise des PINs Analog
 */
const uint8_t PIN_MOISTURE_1 = A0;
const uint8_t PIN_MOISTURE_2 = A1;
const uint8_t PIN_MOISTURE_3 = A2;
const uint8_t PIN_MOISTURE_4 = A3;

int moisture1 = 0;
int moisture2 = 0;
int moisture3 = 0;
int moisture4 = 0;

/**
 * Module utilise pour le capteur de temperature et d'humidite
 * Le capteur DHT11 est capable de mesurer :
 * - des temperatures de 0 a + 50°C avec une precision de +/- 2°C
 * - des taux d'humidite relative de 20 a 80% avec une precision de +/- 5°C
 * une mesure peut etre realisee toutes les secondes
 *
 * Alimentation : 3.3 a 5 Volts

 Humidite (relative %)      20 ~ 80%
 Précision (humidite)       +/-5%

 Temperature                0 ~ +50°C
 Précision (temperature)    +/-2°C

 Frequence mesure max       1Hz (1 mesure par seconde)
 Tension d'Alimentation     3 ~ 5 Volts
 Stabilite a long terme     +/- 1% par an
 */

// PIN "DATA" du capteur DHT11
const uint8_t PIN_SENSOR_DHT11_1 = 3;

// Code d'erreur de la fonction readDHT11()
const byte DHT11_SUCCESS = 0;         // Pas d'erreur
const byte DHT11_TIMEOUT_ERROR = 1;   // Temps d'attente depasse
const byte DHT11_CHECKSUM_ERROR = 2;  // Donnees recues erronees

String programm_receive;

/**
 * les valeurs de configuration (from Blockly App)
 */
byte pomp1;
byte pomp2;
byte pomp3;
byte pomp4;

// Duree d'arrosage // TODO : int or long
long waterFor1 = 0;
long waterFor2 = 0;
long waterFor3 = 0;
long waterFor4 = 0;

// Nombre fois qu'on arrosage
int waterTimes1 = 0;
int waterTimes2 = 0;
int waterTimes3 = 0;
int waterTimes4 = 0;

// Demarrage de l'arrosage
long startWatering1 = 0;
long startWatering2 = 0;
long startWatering3 = 0;
long startWatering4 = 0;

// Niveau d'humidite pour arroser valeurs pour la configuration
int moistureMax1 = 0;
int moistureMax2 = 0;
int moistureMax3 = 0;
int moistureMax4 = 0;

struct DataRelay {
    byte num_pompe;
    long duree_arrosage;
    int nb_arrosage;
    long debut_arrosage;
    int moisture;
};

struct ConfigWiFi {
    String ssid;
    String password;
};
