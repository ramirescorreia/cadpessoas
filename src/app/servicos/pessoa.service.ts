import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable} from "rxjs";
import { Pessoa } from "../model/pessoa.model";
import { CONSTANTS } from "../constants/constants"

@Injectable()
export class PessoaService {

    headers: HttpHeaders;

    constructor(private http: HttpClient) {
        let token = localStorage.getItem('token');
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type' , 'application/json').set('Authorization', `${token}`);
    }

    buscarTodasPessoasCadastradas(): Observable<any>{
        return this.http.get<any>(CONSTANTS.ENDPOINTS.PESSOA + "/", {headers: this.headers});
    }
    
    buscarPessoaPeloCpf(cpf: string): Observable<any>{
        return this.http.get<any>(CONSTANTS.ENDPOINTS.PESSOA + "/" + cpf, {headers: this.headers});
    }

    salvar(pessoa: Pessoa) : Observable<any>{
        return this.http.post<any>(CONSTANTS.ENDPOINTS.PESSOA + "/salvar", pessoa, {headers: this.headers, observe: 'response'});
    }

    editar(pessoa: Pessoa) : Observable<any>{
        return this.http.patch<any>(CONSTANTS.ENDPOINTS.PESSOA + "/alterar", pessoa, {headers: this.headers, observe: 'response'});
    }

    deletar(pessoa: Pessoa) : Observable<any> {
        return this.http.delete<any>(CONSTANTS.ENDPOINTS.PESSOA + "/deletar/" + pessoa.cpf, {headers: this.headers, observe: 'response'});
    }
}