#!/usr/bin/env node
var b = require('bonescript');
var button = 'P9_41'; 

b.pinMode(button,b.INPUT,7,'pulldown');
b.attachInterrupt(button,true,b.CHANGE,printStatus);

var control1 = 'P9_11';
var control2 = 'P9_13';
var control3 = 'P9_15';
var control4 = 'P9_17';
b.pinMode(control1,b.OUTPUT,7);
b.pinMode(control2,b.OUTPUT,7);
b.pinMode(control3,b.OUTPUT,7);
b.pinMode(control4,b.OUTPUT,7);
var timer;
var count = 0;
var mode = 0;
function printStatus(x){
    console.log('x.value='+x.value);
    if(x.value == 1){
        timer = setInterval(command,1000);
     }
}


function command(){
     if(count % 4 == 0){
      console.log('count%4=0');
       b.digitalWrite(control1,b.LOW);
       b.digitalWrite(control2,b.LOW);
       b.digitalWrite(control3,b.HIGH);
       b.digitalWrite(control4,b.HIGH);
    }
    if(count%4 == 1){
      console.log('count%4=1');
       b.digitalWrite(control1,b.LOW);
       b.digitalWrite(control2,b.HIGH);
       b.digitalWrite(control3,b.HIGH);
       b.digitalWrite(control4,b.LOW);
    }
    if(count%4==2){
       console.log('count%3=2');
       b.digitalWrite(control1,b.HIGH);
       b.digitalWrite(control2,b.HIGH);
       b.digitalWrite(control3,b.LOW);
       b.digitalWrite(control4,b.LOW);
    }
    if(count%4==3){
       console.log('count%4=3');
       b.digitalWrite(control1,b.HIGH);
       b.digitalWrite(control2,b.LOW);
       b.digitalWrite(control3,b.LOW);
       b.digitalWrite(control4,b.HIGH);
    }
    if(mode == 0){
       count++;
    }
    if(mode == 1){
       count--;
    }
    
    if(count == 20){
       count = 19;
       console.log('count = 20 start opposite direction');     
       mode = 1; 
    }
    if(count == -1&&mode == 1){
       clearInterval(timer);
    }
}    

