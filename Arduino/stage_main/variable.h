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
#define m_D_S 0    // MIN_MOISTURE_IN_DRY_SOIL
#define M_D_S 300  // MAX_MOISTURE_IN_DRY_SOIL
#define m_H_S 300  // MIN_MOISTURE_IN_HUMID_SOIL
#define M_H_S 700  // MAX_MOISTURE_IN_HUMID_SOIL
#define m_W 700    // MIN_MOISTURE_IN_WATER
#define M_W 950    // MAX_MOISTURE_IN_WATER

const byte AIR = 0;
const byte DRY_SOIL = 1;
const byte HUMID_SOIL = 2;
const byte WATER = 3;

/**
 * Module capteur d'Humidite
 * Utilise des PINs Analog
 */
const int PIN_MOISTURE_1 = A0;
const int PIN_MOISTURE_2 = A1;
const int PIN_MOISTURE_3 = A2;
const int PIN_MOISTURE_4 = A3;

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
const byte PIN_SENSOR_DHT11_1 = 3;

// Code d'erreur de la fonction readDHT11()
const byte DHT11_SUCCESS = 0;         // Pas d'erreur
const byte DHT11_TIMEOUT_ERROR = 1;   // Temps d'attente depasse
const byte DHT11_CHECKSUM_ERROR = 2;  // Donnees recues erronees


String programm_receive;
