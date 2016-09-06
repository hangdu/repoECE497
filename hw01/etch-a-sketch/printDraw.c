#include<stdio.h>

extern char arr[10][10];
void printDraw(int n){
    for(int i=0;i<n;i++){
       for(int j=0;j<n;j++){
          printf("%c",arr[i][j]);

       }
       printf("\n");
    }

}
