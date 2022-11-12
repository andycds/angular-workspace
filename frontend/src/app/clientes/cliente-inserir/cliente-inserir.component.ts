import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { Cliente } from "../cliente.model";
import { ClienteService } from "../cliente.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
@Component({
  selector: 'app-cliente-inserir',
  templateUrl: './cliente-inserir.component.html',
  styleUrls: ['./cliente-inserir.component.css'],
})
export class ClienteInserirComponent implements OnInit {

  constructor(public clienteService: ClienteService, public route: ActivatedRoute) { }

  private modo: string = "criar";
  private idCliente: string | null = "criar";
  public cliente: Cliente | null = null;
  public estaCarregando: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idCliente")) {
        this.modo = "editar";
        this.idCliente = paramMap.get("idCliente"); //TODO: pensar numa coerção para sempre ter string
        this.estaCarregando = true;
        this.clienteService.getCliente(this.idCliente).subscribe(dadosCli => {
          this.estaCarregando = false;
          this.cliente = {
            id: dadosCli._id,
            nome: dadosCli.nome,
            fone: dadosCli.fone,
            email: dadosCli.email
          };
        });
      } else {
        this.modo = "criar";
        this.idCliente = null;
      }
    });
  }

  onSalvarCliente(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === "criar") {
      this.clienteService.adicionarCliente(
        form.value.nome,
        form.value.fone,
        form.value.email
      );
    } else {
      this.clienteService.atualizarCliente(
        this.idCliente ?? "0",
        form.value.nome,
        form.value.fone,
        form.value.email
      )
    }
    form.resetForm();
  }

}
