import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private APIURL = 'http://localhost:3000/auth';
  private readonly _http = inject(HttpClient);

  constructor(private http: HttpClient) { }

  register(credentials: { correo: string, password: string, usuario: string}): Observable<any> {
    return this.http.post(this.APIURL + "/register", credentials);
  }

  login(credentials: { user: string, password: string }): Observable<any> {
    return this._http.post(this.APIURL + "/login", credentials).pipe(
      catchError((error) => {
        console.error('Servicio-- Error en la solicitud de login:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    // Elimina el token del almacenamiento local al cerrar sesión
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    // Verifica si el token existe
    return !!localStorage.getItem('token');
  }
  
}
