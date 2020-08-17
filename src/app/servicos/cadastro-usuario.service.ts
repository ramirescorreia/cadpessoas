import { Injectable,  } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Usuario } from '../model/usuario.model';

import { Observable } from 'rxjs';

import { CONSTANTS } from '../constants/constants'

@Injectable()
export class CadastroUsuarioService {

    private httpOptions = {
        headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    
    constructor(private http: HttpClient, private location: Location) { }

    cadastrarUsuario(usuario: Usuario) : Observable<HttpResponse<Usuario>>{
        return this.http.post<HttpResponse<Usuario>>(CONSTANTS.ENDPOINTS.CADASTRO, JSON.stringify(usuario), this.httpOptions);
    }

    goBack(): void {
        this.location.back();
    }
}