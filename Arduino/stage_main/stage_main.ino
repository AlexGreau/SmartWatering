#include "variable.h"

SoftwareSerial HC06(RX, TX);

struct DataRelay relay1;
struct DataRelay relay2;
struct DataRelay relay3;
struct DataRelay relay4;

long temps = 0;

String result1;
String result2;
String result3;
String result4;

String param1[5];
String param2[5];
String param3[5];
String param4[5];

void setup() {
    HC06.begin(9600); // Initialisation connexion série Bluetooth à 9600 bauds
    Serial.begin(9600);   // Initialisation du port serie
    Serial.println();

    // Place le pin du capteur en entree avec pull-up
    pinMode(PIN_SENSOR_DHT11_1, INPUT_PULLUP);    // ceci afin d'eviter que le capteur se reveille prematurement
    pinMode(PIN_LED_TEST, OUTPUT);
}

void loop() {

    trameRecu();

    if (cmd_recu.length() > 0) {
        Serial.println(cmd_recu);
        result1 = splitMySring(cmd_recu, ';', 0);
        result2 = splitMySring(cmd_recu, ';', 1);
        // result3 = splitMySring(cmd_recu, ';', 2);
        // result4 = splitMySring(cmd_recu, ';', 3);

        for (int i = 0; i < 5; i++) {
            param1[i] = splitMySring(splitMySring(result1, ',', i), '_', 1);
            param2[i] = splitMySring(splitMySring(result2, ',', i), '_', 1);
            param3[i] = splitMySring(splitMySring(result3, ',', i), '_', 1);
            param4[i] = splitMySring(splitMySring(result4, ',', i), '_', 1);
        }

        cmd_recu = "";

        waterFor1 = atol(param1[1].c_str());
        waterTimes1 = atoi(param1[2].c_str());
        startWatering1 = atol(param1[3].c_str());
        moistureMax1 = atoi(param1[4].c_str());

        waterFor2 = atol(param2[1].c_str());
        waterTimes2 = atoi(param2[2].c_str());
        startWatering2 = atol(param2[3].c_str());
        moistureMax2 = atoi(param2[4].c_str());

        waterFor3 = atol(param3[1].c_str());
        waterTimes3 = atoi(param3[2].c_str());
        startWatering3 = atol(param3[3].c_str());
        moistureMax3 = atoi(param3[4].c_str());

        waterFor4 = atol(param4[1].c_str());
        waterTimes4 = atoi(param4[2].c_str());
        startWatering4 = atol(param4[3].c_str());
        moistureMax4 = atoi(param4[4].c_str());

        relay1 = {1, waterFor1, waterTimes1, startWatering1, moistureMax1};
        relay2 = {2, waterFor2, waterTimes2, startWatering2, moistureMax2};
        relay3 = {3, waterFor3, waterTimes3, startWatering3, moistureMax3};
        relay4 = {4, waterFor4, waterTimes4, startWatering4, moistureMax4};
    }

    Serial.println("############ POMPE (1) ############");
    Serial.println(relay1.num_pompe);
    Serial.println(relay1.duree_arrosage);
    Serial.println(relay1.nb_arrosage);
    Serial.println(relay1.debut_arrosage);
    Serial.println(relay1.moisture);
    Serial.println("---------------------");
    Serial.println("############ POMPE (2) ############");
    Serial.println(relay2.num_pompe);
    Serial.println(relay2.duree_arrosage);
    Serial.println(relay2.nb_arrosage);
    Serial.println(relay2.debut_arrosage);
    Serial.println(relay2.moisture);
    Serial.println("---------------------");
    Serial.println("############ POMPE (3) ############");
    Serial.println(relay3.num_pompe);
    Serial.println(relay3.duree_arrosage);
    Serial.println(relay3.nb_arrosage);
    Serial.println(relay3.debut_arrosage);
    Serial.println(relay3.moisture);
    Serial.println("---------------------");
    Serial.println("############ POMPE (4) ############");
    Serial.println(relay4.num_pompe);
    Serial.println(relay4.duree_arrosage);
    Serial.println(relay4.nb_arrosage);
    Serial.println(relay4.debut_arrosage);
    Serial.println(relay4.moisture);
    Serial.println("---------------------");

    // if (temps > 0) {
    //     digitalWrite(PIN_LED_TEST, HIGH);
    //     delay(temps);
    //     digitalWrite(PIN_LED_TEST, LOW);
    //     delay(temps);
    // }

    // moisture1 = analogRead(PIN_MOISTURE_1);
 /*   initSensorMoisture();

    Serial.print("Humidite (%): ");
    Serial.println(moisture1);
    receiveProgram();


    float temperature, humidity;

    /* Lecture de la temperature et de l'humidite, avec la gestion des erreurs */
    // switch (readDHT11(PIN_SENSOR_DHT11_1, &temperature, &humidity)) {
    //     case DHT11_SUCCESS:
    //         Serial.print("Humidite (%): ");
    //         Serial.println(humidity, 2);
    //         Serial.print("Temperature (^C): ");
    //         Serial.println(temperature, 2);
    //         break;
    //     case DHT11_TIMEOUT_ERROR:
    //         Serial.println("Pas de reponse !");
    //         break;
    //     case DHT11_CHECKSUM_ERROR:
    //         Serial.println("Probleme de communication !");
    //         break;
    // }

    // Pas plus d'une mesure par seconde

    delay(1000);
}

/**
 * Methode qui lit les trames venant du mobile
 */
void trameRecu() {
    while (Serial.available()) {
        delay(3);
        char c = Serial.read();
        cmd_recu.concat(c);
        if (c == '\n') {
            cmd_recu = "";
        }
    }
    if (!Serial.available()) {
        return;
    }
}


/**
 * Methode qui permet de faire un split d'une String
 * https://stackoverflow.com/questions/29671455/how-to-split-a-string-using-a-specific-delimiter-in-arduino
 */
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

void receiveProgram() {
    while (Serial.available()) {
        programm_receive = Serial.readString();/* lit la data entrant */
        Serial.println(programm_receive);
    }
}


void initSensorMoisture() {
    moisture1 = analogRead(PIN_MOISTURE_1);
}


/**
 * Detecte si le Sensor est dans : air, sol sec, sol humide ou dans l'eau
 *
 * @param moisture la valeur returne par le sensor.
*/
byte sensorMoistureIsIn(int moisture) {
    if (moisture > m_D_S && moisture <= M_D_S) {
        /* Je suis dans un sol sec */
        return DRY_SOIL;
    }
    if (moisture > m_H_S && moisture <= M_H_S) {
        /* Je suis dans un sol humide */
        return HUMID_SOIL;
    }
    if (moisture > m_W && moisture <= M_W) {
        /* Je suis dans l'eau */
        return WATER;
    }
    /* Je suis dans l'air */
    return AIR;
}
























/**
 * Lit la temperature et le taux d'humidite mesure par un capteur DHT11.
 *
 * @param pin sur laquelle est cablee le capteur.
 * @param temperature Pointeur vers la variable stockant la temperature.
 * @param humidity Pointeur vers la variable stockant le taux d'humidite.
 * @return DHT11_SUCCESS si aucune erreur, DHT11_TIMEOUT_ERROR en cas de timeout, ou DHT11_CHECKSUM_ERROR en cas d'erreur de checksum.
*/
byte readDHT11(byte pin, float *temperature, float *humidity) {
    /* Lit le capteur */
    byte data[5];   // on declare un tableau de 5 octets pour stocker les donnees du capteur
    byte res = readDHTxx(pin, data, 18, 1000);  // on lit le capteur DHT sans convertir les octets
    /* Detecte et retourne les erreurs de communication */
    if (res != DHT11_SUCCESS) {
        return res;
    }
    /* Calcul la vraie valeur de la temperature et de l'humidite */
    *humidity = data[0];
    *temperature = data[2];
    /* Ok */
    return DHT11_SUCCESS;
}
/**
 * Fonction de bas niveau permettant de lire la temperature et le taux d'humidité (en valeurs brutes)
 * mesure par un capteur DHTxx
*/
byte readDHTxx(byte pin, byte *data, unsigned long start_time, unsigned long timeout) {
    data[0] = data[1] = data[2] = data[3] = data[4] = 0;
    // start_time est en millisecondes
    // timeout est en microsecondes
    /* Conversion du numéro de broche Arduino en ports / masque binaire "bas niveau" */
    uint8_t bit = digitalPinToBitMask(pin);
    uint8_t port = digitalPinToPort(pin);
    volatile uint8_t *ddr = portModeRegister(port);   // Registre MODE (INPUT / OUTPUT)
    volatile uint8_t *out = portOutputRegister(port); // Registre OUT (écriture)
    volatile uint8_t *in = portInputRegister(port);   // Registre IN (lecture)
    /* Conversion du temps de timeout en nombre de cycles processeur */
    unsigned long max_cycles = microsecondsToClockCycles(timeout);
    /* Evite les problèmes de pull-up */
    *out |= bit;  // PULLUP
    *ddr &= ~bit; // INPUT
    delay(100);   // Laisse le temps à la résistance de pullup de mettre la ligne de données à HIGH
    /* Réveil du capteur */
    *ddr |= bit;  // OUTPUT
    *out &= ~bit; // LOW
    delay(start_time); // Temps d'attente à LOW causant le réveil du capteur
    // N.B. Il est impossible d'utilise delayMicroseconds() ici car un délai
    // de plus de 16 millisecondes ne donne pas un timing assez précis.
    /* Portion de code critique - pas d'interruptions possibles */
    noInterrupts();
    /* Passage en écoute */
    *out |= bit;  // PULLUP
    delayMicroseconds(40);
    *ddr &= ~bit; // INPUT
    /* Attente de la réponse du capteur */
    timeout = 0;
    while(!(*in & bit)) { /* Attente d'un état LOW */
        if (++timeout == max_cycles) {
            interrupts();
            return DHT11_TIMEOUT_ERROR;
        }
    }
    timeout = 0;
    while(*in & bit) { /* Attente d'un état HIGH */
        if (++timeout == max_cycles) {
            interrupts();
            return DHT11_TIMEOUT_ERROR;
        }
    }
    /* Lecture des données du capteur (40 bits) */
    for (byte i = 0; i < 40; ++i) {
        /* Attente d'un état LOW */
        unsigned long cycles_low = 0;
        while(!(*in & bit)) {
            if (++cycles_low == max_cycles) {
                interrupts();
                return DHT11_TIMEOUT_ERROR;
            }
        }
        /* Attente d'un état HIGH */
        unsigned long cycles_high = 0;
        while(*in & bit) {
            if (++cycles_high == max_cycles) {
                interrupts();
                return DHT11_TIMEOUT_ERROR;
            }
        }
        /* Si le temps haut est supérieur au temps bas c'est un "1", sinon c'est un "0" */
        data[i / 8] <<= 1;
        if (cycles_high > cycles_low) {
            data[i / 8] |= 1;
        }
    }
    /* Fin de la portion de code critique */
    interrupts();
    /*
    * Format des données :
    * [1, 0] = humidité en %
    * [3, 2] = température en degrés Celsius
    * [4] = checksum (humidité + température)
    */
    /* Vérifie la checksum */
    byte checksum = (data[0] + data[1] + data[2] + data[3]) & 0xff;
    if (data[4] != checksum)
        return DHT11_CHECKSUM_ERROR; /* Erreur de checksum */
    else
        return DHT11_SUCCESS; /* Pas d'erreur */
}
