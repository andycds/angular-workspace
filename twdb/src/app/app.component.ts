import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  nome: any;
  esconderCaixa = true;
  numero = 0;
  produto = "";

  escolher() {
    this.numero = Math.floor(Math.random() * 100) + 1;
  }

  alterarNome(evento: any) {
    console.log(evento.target.value);
    this.nome = evento.target.value;
  }

  adicionar(nomeInput: any) {
    console.log(nomeInput.value);
    this.esconderCaixa = nomeInput.value.lenth <= 0;
  }

  alterarProduto(produtoInput: any) {
    this.produto = 'Novo produto: ' + produtoInput.value;
  }
}
