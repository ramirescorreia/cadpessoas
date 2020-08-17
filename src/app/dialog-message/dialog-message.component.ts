import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Mensagem } from '../model/mensagem.model';

@Component({
  selector: 'dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css'] 
})
export class DialogMessageComponent implements OnInit, OnChanges{
  @Input() mensagem: Mensagem;
  classesCss: {};

  constructor() { }

  ngOnInit(){
    this.mensagem = new Mensagem(undefined, undefined);
  }

  ngOnChanges(){
    if(undefined != this.mensagem){
      this.mostrarMensagem();
    }
  }

   private mostrarMensagem(): void {
      this.montarClasses(this.mensagem.tipo);
      setTimeout(() => {
          this.mensagem = new Mensagem(undefined, undefined);
          this.classesCss = {};
      }, 3000);
  }

  private montarClasses(tipo: string): void {
      this.classesCss = {
          'alert': true,
      };
      this.classesCss['alert-' + tipo] = true;
  }

}
