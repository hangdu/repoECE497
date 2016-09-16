#!/usr/bin/env node
var util = require('util');
var i2c = require('i2c');
var b = require('bonescript');
var wire = new i2c(0x4a,{device:'/dev/i2c-2'});
var process = require('child_process');

process.exec('i2cget -y 2 0x4a 0',execcallback1);

var ARLET = 'P9_27';
b.pinMode(ARLET,b.INPUT,7);


b.attachInterrupt(ARLET,true,b.CHANGE,printstatus);

function printstatus(x){
    console.log(util.inspect(x));
    if(0 == x.value){
         process.exec('i2cget -y 2 0x4a 0',execcallback);        
    }
    if(1 == x.value){
         wire.readByte(readcallback);
    }else{
        process.exec('i2cget -y 2 0x4a 0',execcallback);

    }

}

function readcallback(err,res){
    console.log('temperature is '+res);
}

function execcallback(err,stdout,stderr){
    console.log('temperature is '+stdout*2.1);
}


//environment temperature is T
//set the highest temp=T+2
//set the lowest temp = T-1
function execcallback1(err,stdout,stderr){
    var low = stdout-1;
    var high = low+3;
    process.exec('i2cset -y 2 0x4a 2 '+low);
    process.exec('i2cset -y 2 0x4a 3 '+high);
}




