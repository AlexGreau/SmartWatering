#include "Timer.h"

Timer t;
bool isSet = false;
int other = 0;
//int tickEvent = 0;


void setup()
{
  Serial.begin(9600);
  /*int tickEvent = t.every(2000, doSomething, (void*)2);
  Serial.print("2 second tick started id=");
  Serial.println(tickEvent);  */
}

void loop()
{
  //delay(100);
  
  if(!isSet) {
    
    int tickEvent = t.every(2000, doSomething, (void*)2);
    Serial.print("first timer started id= ");
    Serial.println(tickEvent); 
    tickEvent = t.every(3000, doSomething, (void*)3);
    Serial.print("first timer started id= ");
    Serial.println(tickEvent);
    isSet = true;
  } else {
    t.update();
  }  
}

void doSomething(void* context)
{
  int time = (int)context;
  Serial.print(time);
  Serial.print(" timer: millis()=");
  Serial.println(millis());

  if(other == 3) {
      //t.stop(0);
      int tickEvent = t.every(1000, doSomething, (void*)1);
      Serial.print("second timer started id= ");
      Serial.println(tickEvent);
      tickEvent = t.every(4000, doSomething, (void*)4);
    Serial.print("first timer started id= ");
    Serial.println(tickEvent);
    }
    other++;
}
