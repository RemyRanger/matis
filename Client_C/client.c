#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <netdb.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <arpa/inet.h>
#include "complex.h"
#include <math.h>
#include "function_cplx.h"

#define MAX_PATH 30
#define BUF_SIZE 64

void lecture(float * tab, int len, char * filename) {
  FILE * fd = NULL;
  fd = fopen(filename, "r");

  if (fd != NULL) {
    for (int i = 0; i < len; i++) {
      for (int j = 0; j < len; j++) {
        fscanf(fd, "%f, ", & tab[j + len * i]);
      }
    }
    fclose(fd);
  } else {
    printf("Impossible to open file");
  }
}

void lire_colonne(float * tab, float * tabCol, int len, int noCol) {
  for (int i = 0; i < len; i++) {
    tabCol[i] = tab[noCol - 1 + len * i];
  }
}

int main(void) {
  int sockfd = 0;
  int bytesReceived = 0;
  char recvBuff[65536];
  char * buffer = malloc(10);
  memset(recvBuff, '0', sizeof(recvBuff));
  size_t nbecrit;
  struct sockaddr_in serv_addr;

  /* Create a socket first */
  if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
    printf("\n Error : Could not create socket \n");
    return 1;
  }

  /* Initialize sockaddr_in data structure */
  serv_addr.sin_family = AF_INET;
  serv_addr.sin_port = htons(8124); // port
  serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");

  /* Attempt a connection */
  if (connect(sockfd, (struct sockaddr * ) & serv_addr, sizeof(serv_addr)) < 0) {
    printf("\n Error : Connect Failed \n");
    return 1;
  }

  while (1) {
    printf("Waiting..\n");
    memset(buffer, 0, 10);
    //read_line(sockfd, buffer, 10);
    read(sockfd, buffer, 10);
    printf("%s ---------------------------------------------------------\n", buffer);
    if (strncmp(buffer, "/upload", 7) == 0) {
      /* Create file where data will be stored */
      FILE * fp;
      //remove("data_complex.csv");
      fp = fopen("data_complex.csv", "w+");
      if (NULL == fp) {
        printf("Error opening file\n");
        return 1;
      }
      /* Receive data in chunks of 256 bytes */
      memset(recvBuff, 0, 65536);
      while ((bytesReceived = read(sockfd, recvBuff, 65536)) > 0) {
        printf("Bytes received %d\n", (int) bytesReceived);
        printf("%s ----\n", recvBuff);
        nbecrit = fwrite(recvBuff, 1, bytesReceived, fp);
        printf("Bytes write %d\n", (int) nbecrit);
        if (nbecrit < 65536) {
          break;
        }
      }
      printf("File Uploaded.\n");
      if (bytesReceived < 0) {
        printf("\n Read Error \n");
      }
    }
    if (strncmp(buffer, "/fft", 4) == 0) {
      int numcol = 0;
      numcol = atoi(buffer+7);
      char filenameLecture[MAX_PATH];
      sprintf(filenameLecture,"data_complex.csv");
      int mode = 1;
      principal_function(filenameLecture, sockfd, numcol, mode);
      printf("numcol = %d\n", numcol);
      printf("Trying to compute a FFT...\n");
    }
    if (strncmp(buffer, "/2d", 3) == 0) {
      int numcol =1;
      char filenameLecture[MAX_PATH];
      sprintf(filenameLecture,"data_complex.csv");
      int mode = 2;
      printf("Trying to compute a FFT2D...\n");
      principal_function(filenameLecture, sockfd, numcol, mode);
    }
  }

  return 0;
}
