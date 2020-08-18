import { environment } from 'src/environments/environment';

export class CONSTANTS{
    public static ENDPOINTS = {
        PESSOA: environment.baseUrl + '/pessoa',
        LOGIN: environment.baseUrl + '/login',
        CADASTRO: environment.baseUrl + '/usuario/cadastrar'
    }
}