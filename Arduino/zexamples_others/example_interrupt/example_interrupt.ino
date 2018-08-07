volatile bool triggered = true;

void setup() {
  Serial.begin(9600);
  
  pinMode(3, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(3), go, CHANGE);
}

void loop() {
  
  /*if(triggered) {
    Serial.println("bad: NO water");
    triggered = false;
  } else {
    Serial.println("good");
  }*/
  Serial.println("before");
  while(triggered){
    Serial.println(".");
    delay(500);
  }
  Serial.println("after");
}

void go() {
  triggered = digitalRead(3);
  Serial.print("bad: NO water ");
  Serial.println(triggered);  
}
