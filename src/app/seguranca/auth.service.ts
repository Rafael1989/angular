import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

export interface Response {
  access_token: string;
}

@Injectable()
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;
  tokensRevokeUrl: string;

  constructor(private http: HttpClient, 
        private jwtHelperService: JwtHelperService) { 
          this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
          this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
          this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/x-www-form-urlencoded');
    headers = headers.append('Authorization','Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    console.log(headers);
    console.log(body);

    return this.http.post(this.oauthTokenUrl,body,{ headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
      })
      .catch(response => {
        const responseError = response.error;
        if(response.status === 400) {
          if(responseError.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida');
          }
        }
        return Promise.reject(response);
      });
  }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, {withCredentials: true})
      .toPromise()
      .then(() => {
        this.limparAccessToken();
      })
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  temQualquerPermissao(roles) {
    for(const role of roles) {
      if(this.temPermissao(role)){
        return true;
      }
    }
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelperService.isTokenExpired(token);
  }

  obterNovoAccessToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/x-www-form-urlencoded');
    headers = headers.append('Authorization','Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';
    return this.http.post(this.oauthTokenUrl,body,{headers, withCredentials: true})
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
        console.log('Novo Access token criado');
        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token', response);
        return Promise.resolve(null);
      });
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('token',token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if(token) {
      this.armazenarToken(token);
    }
  }
}
