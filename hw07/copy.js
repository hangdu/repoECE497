#!/usr/bin/env node
var b = require('bonescript');
var from = 'P9_28';
var to='P9_27';

b.pinMode(from,b.INPUT,7,'pulldown');
b.pinMode(to,b.OUTPUT,7);

b.attachInterrupt(from,true,b.CHANGE,printStatus);

function printStatus(x){
    console.log('x.value='+x.value);

    if(x.value == 0){
        b.digitalWrite(to,b.LOW);
    }else if(x.value == 1){
        b.digitalWrite(to,b.HIGH);
    }
}
