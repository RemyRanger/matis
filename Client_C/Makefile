FLAGS = -std=c99 -Wall

all: complex.c fft.c fft2d.c function_cplx.c client.c
	gcc complex.c $(FLAGS) -c
	gcc fft.c $(FLAGS) -c
	gcc fft2d.c $(FLAGS) -c
	gcc function_cplx.c $(FLAGS) -c
	gcc client.c complex.o fft.o fft2d.o function_cplx.o $(FLAGS) -o client -lm

clean:
	rm complex.o fft.o fft2d.o function_cplx.o client
