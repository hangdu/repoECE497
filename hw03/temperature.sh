#!/bin/bash

temp1=`i2cget -y 2 0x4a 0`

temp1_1=$(($temp1))

temp2=`i2cget -y 2 0x49 0`

temp2_1=$(($temp2))

echo "temperature of 0x4a is"
echo "$temp1_1*1.8+32" | bc

echo "temperature of 0x49 is"
echo "$temp2_1*1.8+32" | bc

