import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
}) 

export class EstadisticasComponent{}


/*Respuesta  parte 4.1
1. ¿En que archivo se define la interfaz de usuario?
  - En el app.component.html  
2. ¿ que archivo maneja el estado global de los filtros?
  En la carpeta de los services
3. ¿ Donde se configura el HttpClient para la aplicaciòn?
  - 

*/ 
