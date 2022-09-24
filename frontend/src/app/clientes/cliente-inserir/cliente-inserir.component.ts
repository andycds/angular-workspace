import { Component } from "@angular/core";

@Component({
  selector: 'app-cliente-inserir',
  templateUrl: './cliente-inserir.component.html',
  styleUrls: ['./cliente-inserir.component.css'],
})
export class ClienteInserirComponent {

  nome = "";
  fone = "";
  email = "";

  onAdicionarCliente() {
    console.log('inserindo cliente...');
  }

}
