import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private APIURL = 'https://gorra-api.ddns.net/images';
  /* private APIURL = 'http://localhost:3000/images'; */

  private readonly _http = inject(HttpClient);

  constructor(private http: HttpClient) { }
  
  getAllImages(): Observable<string[]> {
    return this.http.get<{ images: string[] }>(this.APIURL).pipe(
      map((response: { images: string[] }) => response.images) // Extrae solo el arreglo `images`
    );
  }
}
