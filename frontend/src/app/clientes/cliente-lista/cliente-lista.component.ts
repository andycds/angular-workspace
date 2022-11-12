import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit, OnDestroy {

  clientes: Cliente[] = [];
  private clientesSubscription !: Subscription;
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
    this.clientesSubscription = this.clienteService
      .getListaDeClientesAtualizadaObservable()
      .subscribe((clientes: Cliente[]) => {
        this.clientes = clientes;
      });
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

  onDelete(id?: string): void {
    this.clienteService.removerCliente(id);
  }
}
