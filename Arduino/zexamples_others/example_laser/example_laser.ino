unsigned long int count = 0;
bool notend = true;

void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
pinMode(2, INPUT); 
}

void loop() {
  // put your main code here, to run repeatedly:
  int val = digitalRead(2);
/*    
  if(digitalRead(2) != 1) {
    Serial.println(digitalRead(2));
  }
*/
  
  if(val&&notend) {
    ++count;
    
    if(count>3600)
      notend=false;

      
    if(!notend)
     {
      Serial.println(count);
      notend = true;
      count = 0;
     }

  }
}
