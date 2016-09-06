#include <stdio.h>
#include <string.h>
#include "printDraw.h"
#define N 10

char arr[10][10];
int main(void){
    char ss[9];
    int i,j;
    int rowD = 0;
    int columnD = 0;    
    int dimension;
    
    //initialize arr
    for(i=0;i<N;i++){
        for(j=0;j<N;j++){
            arr[i][j] = '.';
        }
    }
    arr[0][0] = 'X';
    
    printf("input the dimension n(0<n<10 n is a integar) ");
    scanf("%d",&dimension);
    while(dimension<0||dimension>N){
        printf("n is invalid\n");
        printf("input the dimension n(0<n<10 n is a integar) ");
         scanf("%d",&dimension);
        
    }
    
    printDraw(dimension);
    
    while(1){
       printf("input up/down/left/right to move\n");
       printf("input clear to clear the screen\n");
       scanf("%s",ss);
       if(0 == strcmp(ss,"right")){
            columnD++;

            if(columnD == dimension){
                 columnD = 0;
             }
            arr[rowD][columnD] = 'X';       
          
            printDraw(dimension);
       }else if(0 == strcmp(ss,"left")){
            columnD--;
             if(columnD == -1){
                 columnD = dimension-1;
             }

            arr[rowD][columnD] = 'X';
            printDraw(dimension);
            
       }else if(0 == strcmp(ss,"up")){
            rowD--;

            if(rowD == -1){
                  rowD = dimension-1;
             }
            arr[rowD][columnD] = 'X';
            printDraw(dimension);
       }else if(0 == strcmp(ss,"down")){
            rowD++;
            if(rowD == dimension){
                  rowD = 0;
             }

            arr[rowD][columnD] = 'X';
            printDraw(dimension);
       }else if(0 == strcmp(ss,"clear")){
//do something
             for(i=0;i<N;i++){
                for(j=0;j<N;j++){
                   arr[i][j] = '.';
                }
              }
            arr[0][0] = 'X';

            rowD = 0;
            columnD = 0;
            printDraw(dimension);
       }else{
            printf("please input sonmething valid\n");
       }
    }
    return 0;
}
