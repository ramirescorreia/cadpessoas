import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../model/usuario.model';
import { Observable, BehaviorSubject} from 'rxjs';

import { Router } from '@angular/router';

import { CONSTANTS } from "../constants/constants"

@Injectable()
export class UsuarioService {

  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loggedIn: Observable<boolean> = this._loggedIn.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router) {

  }

  autenticar(usuario: Usuario) : Observable<any> {
      return this.http.post<any>(CONSTANTS.ENDPOINTS.LOGIN, JSON.stringify(usuario), {observe: 'response'});
  }

  logout() {
    localStorage.removeItem('token');
    this._loggedIn.next(false);
    this.router.navigate(['login']);
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');

    if(token){
      this._loggedIn.next(true);
    } else {
      this._loggedIn.next(false);
    }

    return this._loggedIn.getValue();
  }

  goHome(token){
    this._loggedIn.next(true);
    localStorage.setItem('token', token);
    this.router.navigate(['home']);
  }
}