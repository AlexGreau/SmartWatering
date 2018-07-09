#include "variable.h"

void setup() {
    Serial.begin(115200);   // Initialisation du port serie
    Serial.println();

    // Place le pin du capteur en entree avec pull-up
    pinMode(PIN_SENSOR_DHT11_1, INPUT_PULLUP);    // ceci afin d'eviter que le capteur se reveille prematurement
}

void loop() {

    // moisture1 = analogRead(PIN_MOISTURE_1);
    initSensorMoisture();

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
