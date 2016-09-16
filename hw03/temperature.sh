#!/bin/bash

temp=`i2cget -y 2 0x4a 0`

temp2=$(($temp))

echo "$temp2*1.8+32" | bc

