#!/usr/bin/env node

var blessed = require('blessed');
var readlineSync = require('readline-sync');
var b = require('bonescript');

var dimension = readlineSync.questionInt('Dimension? Dimension<20 is required\n');

while(dimension<0||dimension>20){
   dimension = readlineSync.questionInt('Dimension?\n');
}

var row = 0;
var col = 0;

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'my window title';

// Create a box perfectly centered horizontally and vertically.
var table = blessed.table({
    data:null,
    border:'line',
    align:'center',
});

var data = new Array();
for(var k = 0;k<dimension;k++){
    data[k] = new Array();
    for(var j=0;j<dimension;j++){
        data[k][j] = '.';
    }
}

data[0][0] = 'X';
table.setData(data);
screen.append(table);
screen.render();

var button_up = 'P9_11';
var button_down = 'P9_17';
var button_left = 'P9_23';
var button_right = 'P9_42';
var button_clear = 'P9_24';

b.pinMode(button_clear,b.INPUT,7,'pulldown');
b.attachInterrupt(button_clear,true,b.CHANGE,printStatus0);

b.pinMode(button_up,b.INPUT,7,'pulldown');
b.attachInterrupt(button_up,true,b.CHANGE,printStatus1);


b.pinMode(button_down,b.INPUT,7,'pulldown');
b.attachInterrupt(button_down,true,b.CHANGE,printStatus2);

b.pinMode(button_left,b.INPUT,7,'pulldown');
b.attachInterrupt(button_left,true,b.CHANGE,printStatus3);

b.pinMode(button_right,b.INPUT,7,'pulldown');
b.attachInterrupt(button_right,true,b.CHANGE,printStatus4);

function printStatus0(x){
  if(1 == x.value){
       row = row-1;
      if(-1 == row){
          row = dimension-1;
       }

       for(var k = 0;k<dimension;k++){
           data[k] = new Array();
           for(var j=0;j<dimension;j++){
               data[k][j] = '.';
           }
        }  

       data[0][0] = 'X';
      
       table.setData(data);
       screen.render();
       row = 0;
       col = 0;
  }
}


function printStatus1(x){
  if(1 == x.value){
       row = row-1;
      if(-1 == row){
          row = dimension-1;
       }

       data[row][col] = 'X';
       table.setData(data);
       screen.render();

  }
}

function printStatus2(x){
  if(1 == x.value){
      row = row+1;
      if(dimension == row){
         row = 0;
      }
      data[row][col] = 'X';
      table.setData(data);
      screen.render();
  }
}

function printStatus3(x){
  if(1 == x.value){
      col = col-1;
     if(col == -1){
         col = dimension-1;
      }
     data[row][col] = 'X';
     table.setData(data);
     screen.render();

  }
} 


function printStatus4(x){
  if(1 == x.value){
       col = col+1;
      if(dimension == col){
         col = 0;
       }
       data[row][col] = 'X';
       table.setData(data);
       screen.render();

  }
}



table.key('down', function(ch, key) {
  row = row+1;
  if(dimension == row){
      row = 0;
  }
  data[row][col] = 'X';
  table.setData(data);
  screen.render();
});

table.key('up', function(ch, key) {
  row = row-1;
  if(-1 == row){
     row = dimension-1;
  }

  data[row][col] = 'X';
  table.setData(data);
  screen.render();
});

table.key('left', function(ch, key) {
  col = col-1;
  if(col == -1){
       col = dimension-1;
  }
  data[row][col] = 'X';
  table.setData(data);
  screen.render();
});

table.key('right', function(ch, key) {
  col = col+1;
  if(dimension == col){
      col = 0;
  }
  data[row][col] = 'X';
  table.setData(data);
  screen.render();
});


// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});


// Render the screen.
screen.render();
