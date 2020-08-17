import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CadastroUsuarioService } from '../servicos/cadastro-usuario.service';
import { DialogMessageModule } from '../dialog-message/dialog-message.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    DialogMessageModule
  ],

  declarations: [
    RegistroComponent
  ],

  providers:[
    CadastroUsuarioService
  ]
})
export class RegistroModule { }
