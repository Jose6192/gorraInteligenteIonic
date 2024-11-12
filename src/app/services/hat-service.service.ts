import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HatServiceService {
  
    /* private APIURL = 'http://34.174.123.196:3000/hats'; */
    private APIURL = 'http://localhost:3000/hats';
    private readonly _http = inject(HttpClient);

  constructor(private http: HttpClient) { }

  register(credentials: { nombre: string, color: string, precio: number, cantidad: number}): any {
    return this.http.post(this.APIURL + "/register", credentials);
  }

  getHats(id_usuario: number): any {
    let hats = this.http.get(`${this.APIURL}/get/${id_usuario}`);
    return hats;
  }
  
}
