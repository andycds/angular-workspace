import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'diretiva';

  textoBotao = "Esconder";
  esconder = false;

  pessoas = [
    { nome: "José", idade: 18 },
    { nome: "Maria", idade: 22 },
    { nome: "Lili", idade: 14 }
  ];

  alterarExibicao() {
    this.textoBotao = !this.esconder ? "Exibir" : "Esconder";
    this.esconder = !this.esconder;
  }

  adicionar(nome: any, idade: any) {
    this.pessoas = [{ nome: nome, idade: idade }, ...this.pessoas];
    }

}
