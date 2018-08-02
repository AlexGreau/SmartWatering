unsigned long int count = 0;
bool notend = true;

void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
pinMode(8, OUTPUT);
  pinMode(3, INPUT_PULLUP);
attachInterrupt(digitalPinToInterrupt(3),go, RISING);
}

void loop() {
 
}

void go(){

  Serial.println("bau");
  
  }
