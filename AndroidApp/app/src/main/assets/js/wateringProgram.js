
//the watering program is what the arduino will obey, with every orders to every sprinkler
// simply put : a structure to put the spinklers (with their parameters) alltogether and send the whole

class wateringProgram{
    constructor (n){
        for (var i = 0; i < n; i++){
            this.sprinklers.push(new Sprinkler(i));
        }
    }

    reset(){
        this.sprinklers = [];
    }

    setup(){

    }

    sendToArduino(){
        
    }
}

function retrieveArduinoParameters(){

}