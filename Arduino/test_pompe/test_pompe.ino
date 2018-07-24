/*
  Test de pompes. Combien de temps prendre vider 1.5l d'eau.
*/

const uint8_t pompe = 7;
unsigned long timestart = 0;
unsigned long timeend = 0;
int statuS = 0; 
/*
  0 stop
  1 start
  2 in process
  3 end
*/


void setup() {
  Serial.begin(9600);
  pinMode(pompe, OUTPUT);
}


void loop() {
  if(Serial.available()) {  
    if(Serial.read() == '0') {     
      statuS = 3; 
    } else {
      statuS = 1;
    } 
  }

  switch (statuS) {
    case 1:
      timestart = millis();
      digitalWrite(pompe, HIGH);  
      //Serial.println("\nOn"); 
      statuS = 2;  
      break;
  
    case 2:
      //Serial.println("in process");
      break;
  
    case 3:
      digitalWrite(pompe, LOW);
      timeend = millis();
      //Serial.println("Off"); 
  
      //Serial.print("Time start: ");
      Serial.println(timestart);
      //Serial.print("Time end: ");
      Serial.println(timeend);
      //Serial.print("Temps pris: ");
      Serial.println(timeend - timestart);
  
      statuS = 0;
      break;
      
    default:
      break;
  }
}
