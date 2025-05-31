import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Juego } from '../interfaces/juego.interface';

@Injectable({
  providedIn: 'root'
})
export class JuegosDataService {
  private juegosSubject = new BehaviorSubject<Juego[]>([]);
  public juegos$ = this.juegosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarJuegos();
  }

  private cargarJuegos(): void {
    this.http.get<{ juegos: Juego[] }>('assets/data/juegos.json')
      .subscribe(data => {
        this.juegosSubject.next(data.juegos);
      });
  }

  obtenerJuegos(): Observable<Juego[]> {
    return this.juegos$;
  }


  obtenerJuegoPorId(id: number): Observable<Juego | undefined> {
    return this.juegos$.pipe(
      map(juegos => juegos.find(juego => juego.id === id))
    );
  }

  buscarJuegos(termino: string): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => juegos.filter(juego => 
        juego.nombre.toLowerCase().includes(termino.toLowerCase()) ||
        juego.desarrollador.toLowerCase().includes(termino.toLowerCase()) ||
        juego.categoria.toLowerCase().includes(termino.toLowerCase())
      ))
    );
  }

  filtrarPorCategoria(categoria: string): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => juegos.filter(juego => 
        juego.categoria.toLowerCase() === categoria.toLowerCase()
      ))
    );
  }

  filtrarPorPlataforma(plataforma: string): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => juegos.filter(juego => 
        juego.plataformas.includes(plataforma)
      ))
    );
  }

  filtrarPorPrecio(esGratis: boolean): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => juegos.filter(juego => juego.esGratis === esGratis))
    );
  }

  filtrarPorRating(minRating: number): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => juegos.filter(juego => juego.rating >= minRating))
    );
  }

  obtenerJuegosPopulares(limite: number = 6): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => [...juegos]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limite)
      )
    );
  }

  obtenerJuegosRecientes(limite: number = 4): Observable<Juego[]> {
    return this.juegos$.pipe(
      map(juegos => [...juegos]
        .sort((a, b) => new Date(b.fechaLanzamiento).getTime() - new Date(a.fechaLanzamiento).getTime())
        .slice(0, limite)
      )
    );
  }

  // Método 1: getJuegosPorPrecio
  getJuegosPorPrecio(min: number, max: number): Observable<Juego[]> {
    return this.juegos$.pipe(map(juegos => 
        juegos.filter(juego => typeof juego.precio === 'number' && 
        juego.precio >= min && juego.precio <= max
      ))
    );
  }

  // Método 2: getEstadisticas
  getEstadisticas(): Observable<{
      totalJuegos: number,
      juegosGratis: number,
      juegosPago: number,
      mejorRating: { nombre: string, rating: number } | null,
      promedioPrecio: number
    }> 
  {
    return this.juegos$.pipe(
      map(juegos => {
        let totalJuegos = juegos.length;
        let juegosGratis = 0;
        let juegosPago = 0;
        let mejor: Juego | null = null;
        let sumaPrecios = 0;
        let cantidadPago = 0;

        for (let juego of juegos) {
          if (juego.esGratis) {
            juegosGratis++;
          } else {
            juegosPago++;
            if (typeof juego.precio === 'number') {
              sumaPrecios += juego.precio;
              cantidadPago++;
            }
          }
          if (!mejor || juego.rating > mejor.rating) {
            mejor = juego;
          }
        }

        let mejorRating = mejor ? { nombre: mejor.nombre, rating: mejor.rating } : null;
        let promedioPrecio = cantidadPago > 0 ? sumaPrecios / cantidadPago : 0;

        return { totalJuegos,juegosGratis,juegosPago,mejorRating,promedioPrecio};
      })
    );
  }

}