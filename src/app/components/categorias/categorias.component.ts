/*Respuesta 4.1
  1. ¿En que archivo se define la interfaze juego?
    - La interfaz Juego se define en el archivo src/app/interfaces/juego.interface.ts.

  2. ¿Que archivo maneja el global de los filtros?
    - El archivo es src/app/components/filtros/filtros.component.ts.

  3. ¿Que archivo maneja la lista de juegos?
    - El archivo es el src/app/components/lista-juegos/lista-juegos.component.ts.

//Respuesta 4.2

  1. ¿Porque el proyecto no tiene app.module.ts 
    - El proyecto utiliza la característica de módulos independientes de Angular, 
    lo que permite que cada componente sea autónomo y no requiera un módulo raíz como app.module.ts.

  2. ¿Que ventajas tiene usar BehaviorSubject en el servicio de juegos?
    - Permite emitir valores iniciales y mantener el estado actual de los juegos, facilitando
     la suscripción y actualización de los componentes que dependen de los datos de juegos.

*/ 
// ALIUMNO: AGUILAR JAICO FRANKLIN

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from '../../interfaces/categoria.interface';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  categoriasConContador$!: Observable<Array<Categoria & { contador: number }>>;
  
  constructor(private categoriasService: CategoriasService) {
  }
  ngOnInit(): void {
    this.categoriasConContador$ = this.categoriasService.obtenerCategoriasConContador();
  }
}