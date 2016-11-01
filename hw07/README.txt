js:
1.run setup.gpioToggle.sh
2.run copy.js


mmap via C:
1.run setup.gpioToggle.sh
2.run mmap1


Kernel:
make some change to gpio_test.c:
1.to change the pins
2.trigger interrupt both when P9_28 go rising or falling

insmod gpio_test.ko


PRU:
make some change to the file of main_pru0.c to get it work
first run setup.sh
then make;make install

As for the GPIO speed compare,please check the GPIO speed compare pdf. Snapshots are attached in the pdf.

