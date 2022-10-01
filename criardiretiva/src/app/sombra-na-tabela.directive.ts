import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSombraNaTabela]',
  exportAs: 'sombraNoComponente'
})
export class SombraNaTabelaDirective {

  @HostBinding("style.boxShadow") sombra: string = '';
  @Input('appSombraNaTabela') sombraEntrada: string = '';

  /*
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    //this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', '10px 10px');
  }
  */
  @HostListener('mouseover') quandoOMousePassarPorCima() {
    //this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', '10px 10px');
    this.sombra = this.sombraEntrada;
  }

  @HostListener('mouseleave') quandoOMouseSair() {
    //this.renderer.removeStyle(this.elementRef.nativeElement, 'box-shadow');
    this.sombra = "";
  }

}
