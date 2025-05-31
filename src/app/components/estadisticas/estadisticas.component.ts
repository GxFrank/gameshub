import { Component, OnInit, inject } from '@angular/core';
import { CommonModule} from '@angular/common';
import { JuegosDataService } from '../../services/juegos-data.service';
import { Juego } from '../../interfaces/juego.interface';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  private juegosService = inject(JuegosDataService);

  totalJuegos = 0;
  juegosGratuitos = 0;
  juegosPago = 0;
  mejorJuego: Juego | null = null;
  promedioPrecio = 0;

  ngOnInit() {
    this.juegosService.obtenerJuegos().subscribe(juegos => {
      this.totalJuegos = juegos.length;
      this.juegosGratuitos = juegos.filter(j => j.esGratis).length;
      this.juegosPago = juegos.filter(j => !j.esGratis).length;
      this.mejorJuego = juegos.reduce((max, j) => j.rating > (max?.rating ?? 0) ? j : max, null as any);
      const juegosDePago = juegos.filter(j => !j.esGratis && typeof j.precio === 'number');
      this.promedioPrecio = juegosDePago.length
        ? juegosDePago.reduce((sum, j) => sum + (j.precio ?? 0), 0) / juegosDePago.length
        : 0;
    });
  }
}

/*Respuesta  parte 4.1
1. ¿En que archivo se define la interfaz de usuario?
  - En el app.component.html  
2. ¿ que archivo maneja el estado global de los filtros?
  En la carpeta de los services
3. ¿ Donde se configura el HttpClient para la aplicaciòn?
  - 

*/ 
