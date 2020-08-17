import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { VerificaLogin } from './servicos/verifica-login.service';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { PessoaComponent } from './pessoa/pessoa.component';

const APP_ROUTES: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [VerificaLogin]
    },
    {
        path: 'pessoa',
        component: PessoaComponent,
        canActivate: [VerificaLogin]
    },
    {
        path: 'pessoa/:cpf',
        component: PessoaComponent,
        canActivate: [VerificaLogin]
    },
    {
       path: 'login',
       component: LoginComponent 
    },
    {
        path: 'registrar',
        component: RegistroComponent 
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{
    
}