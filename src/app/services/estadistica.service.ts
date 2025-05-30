import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, combineLatest } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';
import { JuegosDataService } from './juegos-data.service';
@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  constructor() { }
}
