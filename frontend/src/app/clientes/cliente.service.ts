import { Injectable } from '@angular/core';
import { Cliente } from './cliente.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private clientes: Cliente[] = [];

  constructor(private httpClient: HttpClient) {

  }

  getClientes(): Cliente[] {
    return [...this.clientes];
  }

  adicionarCliente(nome: string, fone: string, email: string) {
    const cliente: Cliente = {
      nome: nome,
      fone: fone,
      email: email,
    };
    this.clientes.push(cliente);
  }

}
