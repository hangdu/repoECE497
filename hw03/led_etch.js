#!/usr/bin/env node
var i2c = require('i2c');
var b = require('bonescript');
var util = require('util');
var process = require('child_process');

var port = '/dev/i2c-2';
var matrix = 0x70;
var row = 0;
var col = 0;

process.exec('i2cget -y 2 0x4a 0',execcallback1);

var ARLET = 'P9_27';
b.pinMode(ARLET,b.INPUT,7);
b.attachInterrupt(ARLET,true,b.CHANGE,alertcallback);

var button_up = 'P9_11';
var button_down = 'P9_23';
var button_left = 'P9_41';
var button_right = 'P9_42';

b.pinMode(button_up,b.INPUT,7,'pulldown');
b.attachInterrupt(button_up,true,b.CHANGE,printStatus1);

b.pinMode(button_down,b.INPUT,7,'pulldown');
b.attachInterrupt(button_down,true,b.CHANGE,printStatus2);

b.pinMode(button_left,b.INPUT,7,'pulldown');
b.attachInterrupt(button_left,true,b.CHANGE,printStatus3);

b.pinMode(button_right,b.INPUT,7,'pulldown');
b.attachInterrupt(button_right,true,b.CHANGE,printStatus4);

var initial = [0x00,0x00,0,0,0,0,0,0,0,0,0,0,0,0,0x01,0];
var wire = new i2c(0x70, {
    device: '/dev/i2c-2'
});

wire.writeByte(0x21, function(err) {
    wire.writeByte(0x81, function(err) {
        wire.writeByte(0xe7, function(err) {
            setTimeout(doinitial, 0);
        });
    });
});

function doinitial() {
    wire.writeBytes(0x00, initial, function(err) {
    });
}

function goRight(){
  col = col+1;
  if(8 == col){
      col = 0;
  }
  initial[14-2*col] = initial[14-2*col] | (1<<row);
  doinitial(); 
}

function goDown(){
  row = row+1;
  if(8 == row){
      row = 0;
  }
  initial[14-2*col] = initial[14-2*col] | (1<<row);
  doinitial(); 
}

function goLeft(){
   col = col-1;
   if(-1 == col){
        col = 7;
    }
   initial[14-2*col] = initial[14-2*col] | (1<<row);
   doinitial();
}

function goUp(){
   row = row-1;
   if(-1 == row){
        row = 7;
   }
   initial[14-2*col] = initial[14-2*col] | (1<<row);
   doinitial();
}


function printStatus1(x){
   if(1 == x.value){
       goUp();
   }
}

function printStatus2(x){
   if(1 == x.value){
       goDown();
   }
}
function printStatus3(x){
   if(1 == x.value){
       goLeft();
   }
}
function printStatus4(x){
   if(1 == x.value){
       goRight();
   }
}

function alertcallback(x){
    console.log(util.inspect(x));
    if(0 == x.value){
        process.exec('i2cget -y 2 0x4a 0',execcallback);
        initial = [0x00,0x00,0,0,0,0,0,0,0,0,0,0,0,0,0x01,0];
        doinitial();
        row = 0;
        col = 0;
    }
}


function execcallback(err,stdout,stderr){
    console.log('temperature is '+stdout*2.1+'\n');
    console.log('It is too hot.The ledmatrix is cleared');
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
