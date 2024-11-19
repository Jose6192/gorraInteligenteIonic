import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HatServiceService {
  
    private APIURL = 'https://gorra-api.ddns.net/hats';
    /* private APIURL = 'http://localhost:3000/hats'; */
    private readonly _http = inject(HttpClient);

  constructor(private http: HttpClient) { }

  register(Gorra: { id_usuario: number, modelo:string, nombre:string, estado:number}): any {
    return this.http.post(this.APIURL + "/register", Gorra);
  }

  getHats(id_usuario: number): any {
    let hats = this.http.get(`${this.APIURL}/get/${id_usuario}`);
    return hats;
  }
  
  deleteHat(id_gorra: number): any {
    return this.http.delete(`${this.APIURL}/delete/${id_gorra}`);
  }
  
}
