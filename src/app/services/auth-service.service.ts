import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private APIURL = 'https://gorra-api.ddns.net/auth';
  /* private APIURL = 'http://localhost:3000/auth'; */
  private readonly _http = inject(HttpClient);

  constructor(private http: HttpClient) { }

  register(credentials: { nombre: string, correo: string, contrasena: string}): Observable<any> {
    return this.http.post(this.APIURL + "/register", credentials);
  }

  login(credentials: { nombre: string, contrasena: string}): Observable<any> {
    return this._http.post(this.APIURL + "/login", credentials);
  }

  logout() {
    // Elimina el token del almacenamiento local al cerrar sesión
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    // Verifica si el token existe
    return !!localStorage.getItem('token');
  }

  getId(token:any): any {
    // Decodifica el token y obtiene el id del usuario
    const decodedToken = jwtDecode<{ id: string}>(token);
    return decodedToken.id;
  }

  getNombre(token:any): any {
    // Decodifica el token y obtiene el nombre del usuario
    const decodedToken = jwtDecode<{ nombre: string}>(token);
    return decodedToken.nombre;
  }
  
}
