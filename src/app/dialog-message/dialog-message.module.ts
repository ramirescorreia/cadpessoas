import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DialogMessageComponent } from "./dialog-message.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
  ],

  exports:[
    DialogMessageComponent 
  ],

  declarations: [
    DialogMessageComponent
  ],
})
export class DialogMessageModule { }