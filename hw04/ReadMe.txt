Part1:Memory Tree
It is a memory tree.pdf
Please check that.

Part2:GPIO via mmap
(1)write a C program that reads from at least two switches and controls two LEDs.
First run setup.gpioToggle.sh to export the gpios and also set the direction for the gpios.
Then compile mmap1.c to get mmap1
Run mmap1.
In mmap1.c, I choose P9_12(GPIO1_28) to connect the button and the button is used to control USR3(GPIO1_24).They are both from GPIO1. Then I also choose P9_42(GPIO0_7) to connect the second button and use the button to control a led that is connected to P9_21(GPIO0_3).They are both from GPIO0.

(2)modify gpioThru.c to read from a swithch and control an LED.
First run setup.gpioToggle.sh to export the gpios and also set the direction for the gpios.
Then compile gpioThrubuiltinled.c to get gpioThrubuiltinled.
Run gpioThrubuiltinled.
In gpioThrubuiltinled.c,I choose P9_12(GPIO1_28) to connect the button and the button is used to control USR3(GPIO1_24).They are both from GPIO1.

(When I run setup.gpioToggle.sh,there is an error shows that the resource is busy. The error comes up because the specific GPIO has already exported.So when the export command tries to export again,there will be the error. So I just comment the export command in setup.gpioToggle.sh)

Part3:Web-based control
Please check web-based_control.pdf

==========
Prof. Yoder's comments
Looks good and complete.

Grade:  10/10
