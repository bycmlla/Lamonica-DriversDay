import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Motorista } from '../models/motorista'; 
@Injectable({
  providedIn: 'root',
})
export class MotoristaService {
  private apiUrl = 'http://localhost:8080/drivers'; 

  constructor(private http: HttpClient) {}

  getMotoristas(): Observable<Motorista[]> {
    return this.http.get<Motorista[]>(this.apiUrl);
  }
}
