

class Sprinkler {
    constructor(id, frequency, duration, startTime, humidityLvl, forecastSensible) {
        this.id = id || -1;
        this.frequency = frequency || -1;
        this.duration = duration || 0;
        this.startTime = startTime || 0;
        this.humidityLvl = humidityLvl || -1;
        this.forecastSensible = forecastSensible || false;
    }

    sendParameters() {
        // send actual data to user base for tests
    }

    actualizeParameters() {
        // communicate new parameters to arduino
    }
}