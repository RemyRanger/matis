
#ifndef FUNCTION_CPLX_H_
#define FUNCTION_CPLX_H_

// Fonction qui recupere la dimension de la matrice ou la longueur d une ligne
// en lisant soit une ligne soit tout la matrice
// Compte en realite le nombre de i dans le fichier correspondant aux i complexes
int MatriceDimension(char *filename);

// Allocation et liberation memoire d un tableau de complexe de longueur len
// qui contiendra les valeurs de la matrice ou d une colonne
complex* memory_alloc(int len);
void memory_free(complex *tab);

// Fonction qui lit un fichier contenant une matrice de COMPLEXES de dimension len*len
// et qui ecrit dans un tableau de complexe tab
void lecture_cplx(complex *tab, int len, char *filename);

// Fonction qui lit une colonne / ligne de la matrice tab et la recopie dans tabCol
// a partir d un numero de colonne / ligne et la dimension de la matrice
void lireCol_cplx(complex *tab, complex *tabCol, int len, int noCol);
void lireLine_cplx(complex *tabMatrice, complex *tabLine, int len, int noLine);

// Fonction qui reecrit une matrice complexe de dimension len*len dans un fichier
void ecritureMatrice_cplx(complex *tab, int len, char *filename);
// Fonction qui reecrit une colonne d une matrice complexe de longueur len dans un fichier
void ecritureCol_cplx(complex *tab, int len, char *filename);

// Fonction qui met une chaque valeur d une colonne complexe de longueur len au carr�
void auCarre_cplx(complex *tab, int len);

// Fonctions qui prend un entier N et ressort N1, N2 tel que N = N1*N2 dans un tableau
int* divise(int n);

// Fonction qui realise la fftshift en 1D et 2D
complex *fft_shift(complex *tab, int len);
complex *fft_shift2D(complex *tab, int len);
double* logarithme(complex *tabMatrice, int len);

// Fonctions de test pour les algorithmes de FFT2D
void testfft2d(complex *mat, int N, int M);
void testfft2d_2(complex *mat, int N, int M);


// Fonction qui prend une partie d'un vecteur d une colonne
complex* tabCut(complex *tabCol, int indiceDepart, int longueurARecuperer);
//long double* esprit(complex *tabCol, int len, int Fech);

// Fonction principale qui implemente les differents mode de calcul sur la matrie de base
// contenue dans le fichier Lecture, r�ecrit quand un fichier Ecriture le resultat
// -- prend un num�ro de colonne a traiter et un mode
// -- mode 0 (au carre) 1 (FFT1D) 2 (FFT2D)
void principal_function(char *filenameLecture, int sockfd, int noCol, int mode);

#endif /* FUNCTION_CPLX_H_ */
