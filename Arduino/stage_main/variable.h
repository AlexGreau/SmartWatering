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
dht11 DHT11_1;
dht11 DHT11_2;
dht11 DHT11_3;
dht11 DHT11_4;







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
