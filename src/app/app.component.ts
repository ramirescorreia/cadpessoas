import { Component } from '@angular/core';
import { UsuarioService } from './servicos/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Cadastro de pessoas';

  constructor(private usuarioService: UsuarioService){}
}
