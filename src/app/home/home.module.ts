import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { HomeComponent } from './home.component';
import { DialogMessageModule } from '../dialog-message/dialog-message.module';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    TableModule,
    ConfirmDialogModule,
    DialogMessageModule
  ],

  declarations: [
    HomeComponent
  ],

  exports:[
  ],

  providers:[
    ConfirmationService 
  ]
})
export class HomeModule { }
