import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Previsao } from './model/previsao';

@Injectable({
  providedIn: 'root'
})
export class PrevisoesService {

  /*
  private previsoes: Previsao[] = [
    {
      data: '20/02/2020 15:00',
      descricao: 'Sol',
      tempMax: 32,
      tempMin: 27,
      humidity: 0.87,
      imgURL: '../assets/01d.png'
    },
    {
      data: '20/02/2020 18:00',
      descricao: 'Sol com nuvens',
      tempMax: 28,
      tempMin: 22,
      humidity: 0.85,
      imgURL: '../assets/02d.png'
    },
    {
      data: '20/02/2020 21:00',
      descricao: 'Noite limpa',
      tempMax: 24,
      tempMin: 18,
      humidity: 0.82,
      imgURL: '../assets/01n.png'
    }
  ];
*/

  constructor(private httpClient: HttpClient) { }

  public obterPrevisoes(): Observable<Previsao[]> {
    return this.httpClient.get<Previsao[]>('http://api.openweathermap.org/data/2.5/forecast?q=sao%20paulo&appid=be8b5a409db5a652138d22f3a50368f9&units=metric&lang=pt_br&cnt=16');
  }
}
