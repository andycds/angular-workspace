import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
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
  // @ts-ignore
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      fone: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      })
    });
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
          this.form.setValue({
            nome: this.cliente.nome,
            fone: this.cliente.fone,
            email: this.cliente.email
          })
        });
      } else {
        this.modo = "criar";
        this.idCliente = null;
      }
    });
  }

  onSalvarCliente() {
    if (this.form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === "criar") {
      this.clienteService.adicionarCliente(
        this.form.value.nome,
        this.form.value.fone,
        this.form.value.email
      );
    } else {
      this.clienteService.atualizarCliente(
        this.idCliente ?? "0",
        this.form.value.nome,
        this.form.value.fone,
        this.form.value.email
      )
    }
    this.form.reset();
  }

}
