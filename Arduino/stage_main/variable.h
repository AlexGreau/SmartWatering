#define DHT11PIN 2

/**
 * Module capteur d'Humidite
 */
const int moisture_sensor1 = A0;
const int moisture_sensor2 = A1;
const int moisture_sensor3 = A2;
const int moisture_sensor4 = A3;
int sensor_humidite1 = 0;
int sensor_humidite2 = 0;
int sensor_humidite3 = 0;
int sensor_humidite4 = 0;

/**
 * Pin de gestion des pompes
 * 7, 6, 5 et 4 correspondent au Relay utilise
 */
int pompe1 = 7;
int pompe2 = 6;
int pompe3 = 5;
int pompe4 = 4;

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

// PINs "DATA" du capteur DHT11
const byte PIN_SENSOR_DHT11_1 = 3;
const byte PIN_SENSOR_DHT11_2 = 9;
const byte PIN_SENSOR_DHT11_3 = 10;
const byte PIN_SENSOR_DHT11_4 = 11;

// Code d'erreur de la fonction readDHT11()
const byte DHT11_SUCCESS = 0;         // Pas d'erreur
const byte DHT11_TIMEOUT_ERROR = 1;   // Temps d'attente depasse
const byte DHT11_CHECKSUM_ERROR = 2;  // Donnees recues erronees

// const byte DHT11_SUCCESS_2 = 0;
// const byte DHT11_TIMEOUT_ERROR_2 = 1;
// const byte DHT11_CHECKSUM_ERROR_2 = 2;
//
// const byte DHT11_SUCCESS_3 = 0;
// const byte DHT11_TIMEOUT_ERROR_3 = 1;
// const byte DHT11_CHECKSUM_ERROR_3 = 2;
//
// const byte DHT11_SUCCESS_4 = 0;
// const byte DHT11_TIMEOUT_ERROR_4 = 1;
// const byte DHT11_CHECKSUM_ERROR_4 = 2;







struct Zone {
  int *tabPompe;
  int *tabMoisture;
  int *tabTemperature;
  int nbPompe;
  int nbMoisture;
  int nbTemperature;
};

struct POMPE {
  int id;
  bool start;
};
