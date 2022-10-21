import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  @Input() clientes: Cliente[] = [];

  // clientes: any[] = [];

  // clientes: Cliente[] = [
  //   {
  //     nome: 'José',
  //     fone: '11223344',
  //     email: 'jose@email.com',
  //   },
  //   {
  //     nome: 'Maria',
  //     fone: '22334455',
  //     email: 'maria@email.com',
  //   },
  // ];

  constructor(public clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
  }

}
