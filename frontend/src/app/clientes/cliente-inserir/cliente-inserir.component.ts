import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { Cliente } from "../cliente.model";
@Component({
  selector: 'app-cliente-inserir',
  templateUrl: './cliente-inserir.component.html',
  styleUrls: ['./cliente-inserir.component.css'],
})
export class ClienteInserirComponent {

  @Output() clienteAdicionado = new EventEmitter<Cliente>();
  nome = "";
  fone = "";
  email = "";

  onAdicionarCliente(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const cliente: Cliente = {
      nome: form.value.nome,
      fone: form.value.fone,
      email: form.value.email,
    };
    this.clienteAdicionado.emit(cliente);
  }

}
