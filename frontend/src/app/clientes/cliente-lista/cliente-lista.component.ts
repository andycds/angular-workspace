import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Subscription, Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit, OnDestroy {

  clientes: Cliente[] = [];
  private clientesSubscription !: Subscription;
  public estaCarregando = false;
  totalDeClientes: number = 3;
  totalDeClientesPorPagina: number = 2;
  opcoesTotalDeClientesPorPagina = [2, 5, 10];
  paginaAtual: number = 1;
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
    this.estaCarregando = true;
    this.clientes = this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
    this.clientesSubscription = this.clienteService
      .getListaDeClientesAtualizadaObservable()
      .subscribe((clientes: Cliente[]) => {
        this.estaCarregando = false;
        this.clientes = clientes;
      });
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

  onDelete(id?: string): void {
    this.clienteService.removerCliente(id);
  }

  onPaginaAlterada(dadosPagina: PageEvent): void {
    this.estaCarregando = true;
    // console.log(dadosPagina);
    this.paginaAtual = dadosPagina.pageIndex + 1; //no paginator a contagem começa de 0
    this.totalDeClientesPorPagina = dadosPagina.pageSize;
    this.clienteService.getClientes(this.totalDeClientesPorPagina, this.paginaAtual);
  }
}
