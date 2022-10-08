import { Component } from '@angular/core';
import { Previsao } from './model/previsao';
import { PrevisoesService } from './previsoes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'previsaotempo';
  previsoes!: Previsao[];

  constructor(private previsoesService: PrevisoesService) {
    previsoesService.obterPrevisoes("sao paulo").subscribe((previsoes: any) => {
      this.previsoes = previsoes['list'];
      console.log(this.previsoes);
    });
    //this.previsoes = previsoesService.obterPrevisoes();
  }

  recarregar(city: any) {
    this.previsoesService.obterPrevisoes(city.value).subscribe((previsoes: any) => {
      this.previsoes = previsoes['list'];
    });

  }

}
