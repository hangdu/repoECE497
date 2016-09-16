temperature.sh
function:
a shell to output the environment temperature in the unit of F 

i2ctest.js
function:
Temperature is wired.
The environment temperature is T.
The highest temp is set to be T+2
The lowest temp is set to be T-1.
I have set the temperature limit in the js.
When the temp is higher than the highest temp, the temp will be printed out in the unit of F.


led_etch.js
function:
Temperature and ledmatrix are wired.
The four buttons on the breadboard can control the ledmatrix.(up,down,left,right)
When the temp is higher than the highest temp,the ledmatrix will be cleared(But clear function can work only once)

The environment temperature is T.
The highest temp is set to be T+2
The lowest temp is set to be T-1.

