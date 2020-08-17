import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    LoginComponent
  ],

  exports:[
    FormsModule
  ]
})
export class LoginModule { }
