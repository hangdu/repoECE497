// From : http://stackoverflow.com/questions/13124271/driving-beaglebone-gpio-through-dev-mem
//
// Read one gpio pin and write it out to another using mmap.
// Be sure to set -O3 when compiling.
// Modified by Mark A. Yoder  26-Sept-2013
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h> 
#include <signal.h>    // Defines signal-handling functions (i.e. trap Ctrl-C)
#include "beaglebone_gpio.h"

/****************************************************************
 * Global variables
 ****************************************************************/
int keepgoing = 1;    // Set to 0 when ctrl-c is pressed

/****************************************************************
 * signal_handler
 ****************************************************************/
void signal_handler(int sig);
// Callback called when SIGINT is sent to the process (Ctrl-C)
void signal_handler(int sig)
{
    printf( "\nCtrl-C pressed, cleaning up and exiting...\n" );
	keepgoing = 0;
}

int main(int argc, char *argv[]) {
    volatile void *gpio_addr3;
    volatile unsigned int *gpio_oe_addr3;
    volatile unsigned int *gpio_datain3;
    volatile unsigned int *gpio_setdataout_addr3;
    volatile unsigned int *gpio_cleardataout_addr3;
 
    // Set the signal callback for Ctrl-C
    signal(SIGINT, signal_handler);

    int fd = open("/dev/mem", O_RDWR);

//    printf("Mapping %X - %X (size: %X)\n", GPIO1_START_ADDR, GPIO1_END_ADDR, 
//                                          GPIO1_SIZE);

    gpio_addr3 = mmap(0, GPIO3_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 
                        GPIO3_START_ADDR);

    gpio_oe_addr3           = gpio_addr3 + GPIO_OE;
    gpio_datain3            = gpio_addr3 + GPIO_DATAIN;
    gpio_setdataout_addr3   = gpio_addr3 + GPIO_SETDATAOUT;
    gpio_cleardataout_addr3 = gpio_addr3 + GPIO_CLEARDATAOUT;

   
    if(gpio_addr3 == MAP_FAILED) {
        printf("Unable to map GPIO\n");
        exit(1);
    }


    printf("Start copying GPIO_113(P9_28) to GPIO_115(P9_27)\n");
    while(keepgoing) {
    	if(*gpio_datain3 & GPIO_113) {
            *gpio_setdataout_addr3= GPIO_115;
    	} else {
            *gpio_cleardataout_addr3 = GPIO_115;
    	}


        //usleep(1);
    }
    munmap((void *)gpio_addr3, GPIO3_SIZE);

    close(fd);
    return 0;
}
