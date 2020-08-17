import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PessoaComponent } from './pessoa.component';
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
    PessoaComponent
  ],

  exports:[
  ],

  providers:[ 
  ]
})
export class PessoaModule {}
