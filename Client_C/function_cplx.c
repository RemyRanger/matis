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
#include<math.h>
#include<fcntl.h>
#include "fft.h"
#include "fft2d.h"

// Fonction qui recupere la dimension de la matrice ou la longueur d une ligne
// en lisant soit une ligne soit tout la matrice
// Compte en realite le nombre de i dans le fichier correspondant aux i complexe
int MatriceDimension(char *filename)
{
	int compteur = 0;
	char c;
	FILE* file;
	if((file = fopen(filename, "r")) == NULL)
	{
		perror("Error opening filename MatriceDimancsion");
	}
	else
	{
		while((c = fgetc(file)) != '\n' )    // Version lecture une seule ligne
		//while((c = fgetc(file)) != EOF )   // Version lecture tout fichier
		{
			if(c == 'i')
			{
				compteur++;
			}
		}
	}
	fclose(file);
	return compteur;            // Version lecture une seule ligne
	//return sqrt(compteur);    // Version lecture tout fichier
}


//Allocation memoire d un tableau qui contiendra les valeurs de la matrice
complex* memory_alloc(int len)
{
	complex *tab = malloc(len*sizeof(complex));

	if(tab == NULL)
	{
		perror("Error in allocation memory_alloc");
	}
	return tab;
}

//Desallocation memoire d un tableau qui contiendra les valeurs de la matrice
void memory_free(complex *tab)
{
	free(tab);
}


// Fonction qui lit un fichier contenant des COMPLEXES et qui ecrit dans un tableau
// de complexe tab
void lecture_cplx(complex *tab, int len, char *filename)
{
	FILE* file;
	float cplx_idt;
	float cplx_idt2;

	if((file = fopen(filename, "r")) == NULL)
	{
		perror("Error opening filename lecture_cplx");
	}
	else
	{
		for(int i=0; i < len; i++)
		{
			for(int j=0; j < len; j++)
			{
				fscanf(file,"%f",&cplx_idt);
				fscanf(file,"%fi, ",&cplx_idt2);
				tab[j + len*i].re = cplx_idt;
				tab[j + len*i].im = cplx_idt2;
			}
		}
		fclose(file);
	}
}


// Fonction qui lit une colonne de complex a partir d une matrice tab
void lireCol_cplx(complex *tab, complex *tabCol, int len, int noCol)
{
	for(int i = 0; i < len; i++)
	{
		tabCol[i] = tab[noCol-1 + len*i];
	}
}


// Fonction qui reecrit une colonne complexe dans un fichier
void ecritureCol_cplx(complex *tab, int len, char *filename)
{
	FILE* file;
	float module0 =0;
	float module =0;
	if((file = fopen(filename, "w")) == NULL)
	{
		perror("Error opening filename ecritureCol_cplx");
	}
	else
	{
		for(int i=0; i < len; i++)
		{
			module0 = tab[i].re*tab[i].re + tab[i].im*tab[i].im;
			module = sqrt(module0);
			//fprintf(file,"%f",tab[i].re);
			//fprintf(file,"%fi,",tab[i].im);
			fprintf(file,"%f,",module);
			//fprintf(file,"\n");
		}
		fclose(file);
	}
}


// Fonction qui met une colonne au carre
void auCarre_cplx(complex *tab, int len)
{
	for(int i = 0; i < len; i++)
	{
		tab[i] = multiply(tab[i],tab[i]);
	}
}

int* divise(int n)
{
	int *tab = malloc(sizeof(int)*2);
	int *tab_idt = malloc(sizeof(int)*50);

	int k=0;
	for (int i = 1; i<=n ; i++){
		if(n%i==0){
			tab_idt[k]=i;
			k=k+1;
		}
	}

	if(k%2==0){
		tab[0]=tab_idt[(k/2)-1];
		tab[1]=tab_idt[k/2];
	}
	else{
		tab[0]=tab_idt[(k-1)/2];
		tab[1]=tab[0];
	}
	free(tab_idt);
	return tab;
	//printf("%d : %d\n", tab[0], tab[1]);
}

complex *fft_shift(complex *tab, int len)
{
	complex *result = memory_alloc(len);
	for(int i = 0; i < len/2-1; i++)
	{
		result[i] = tab[len/2 + i];
	}
	for(int i = len/2; i < len; i++)
	{
		result[i] = tab[i - len/2];
	}
	return result;
}

complex *fft_shift2D(complex *tab, int len)
{
	complex *matrice_out = memory_alloc(len*len);
	int i,j;

	for(i = 0; i < len/2; i++)
	{
		for(j = 0; j < len/2; j++)
		{
			// Le carre haut gauche dans le carre bas droite
			 matrice_out[ (i+len/2) + (j*len)  + len*len/2] = tab[i + len * j];
			// Le carre bas droite dans le carre haut gauche (inverse precedent)
			 matrice_out[i + len * j] = tab[(i+len/2) + (j*len)  + len*len/2];
			// Le carre haut droite dans le carre bas gauche
			 matrice_out[ i + (j*len)  + len*len/2] = tab[i+len/2 + len * j];
			// Le carre bas gauche dans le carre haut droite
			 matrice_out[ i+len/2 + len * j ] = tab[ i + (j*len)  + len*len/2 ];
		}
	}
	return matrice_out;
}

double* logarithme(complex *tabMatrice, int len)
{
	int i;
	double *tab_out = malloc(sizeof(double)*len*len);

	for(i = 0; i < len*len; i++)
	{
		tab_out[i] = 20*log10(sqrt(pow(tabMatrice[i].re,2)+pow(tabMatrice[i].im,2)));
	}
	return tab_out;
}

// Appliquer une fonction (mode) sur une certaine colonne et reecrire dans un fichier
void principal_function(char *filenameLecture, int sockfd, int noCol, int mode)
{
	// Taille du tableau a allouer - Nb de valeurs dans le fichier
	int len = MatriceDimension(filenameLecture);

	// Decomposition de len = tab[0] * tab[1]
	int *tab;
	tab = divise(len);

	// Allocation memoire de la matrice et d une colonne
	complex *tabMatrice = memory_alloc(len*len);
	complex *tabCol = memory_alloc(len);
	complex *result;

	float module0 =0;
	float module =0;
	char buf[256000];
	char bof[1024000];

    // Lecture et Remplissage du tableau
	lecture_cplx(tabMatrice, len, filenameLecture);

	// Appliquer une transformation sur le vecteur selon le mode
	switch(mode)
	{
	case 0:
		// Mettre au carre une colonne
		auCarre_cplx(tabCol,len);
		break;
	case 1:
		// FFT
		//Lire une colonne
		lireCol_cplx(tabMatrice,tabCol,len,noCol);
		memset(bof, 0, 1024000);
		result = FFT_CooleyTukey(tabCol, len, 32, 16);
		result = fft_shift(result, len);
		for(int i=0; i < len; i++)
		{
			module0 = result[i].re*result[i].re + result[i].im*result[i].im;
			module = sqrt(module0);
			memset(buf, 0, 256000);
			sprintf(buf, "%f,", module);
			strcat(bof, buf);
		}
		write(sockfd, bof, strlen(bof));
		printf("%s ----\n", bof);
		break;

		case 2:
			// FFT2D utilisant Cooley-Tukey et Stockham fichier fft2d
			fft2D(tabMatrice, len, len, 1);
			tabMatrice = fft_shift2D(tabMatrice,len);
			double *tabLog = malloc(sizeof(double)*len*len);
			tabLog = logarithme(tabMatrice,len);
			//tabMatrice = fft_shift2D(tabMatrice,len);
			for(int k=0; k < 256; k++) {
				memset(bof, 0, 1024000);
				memset(buf,0,256000);
			for(int j=0; j < len*2; j++) {
        if ((j+1) % len == 0) {
          sprintf(buf,"%f\n",tabLog[j+(k*len*2)]);
        } else {
          sprintf(buf,"%f,",tabLog[j+(k*len*2)]);
        }
				strcat(bof, buf);
			}
      write(sockfd, bof, strlen(bof));
			}
			break;
	}

	// Free des mallocs
	memory_free(tabMatrice);
	memory_free(tabCol);
}
