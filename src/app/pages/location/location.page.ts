import { Component, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, ModalController } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalPage } from '../../component/modal/modal.page';
import { HatServiceService } from 'src/app/services/hat-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

interface Gorra {
  id_gorra: number;
  id_usuario: string;
  modelo: string;
  nombre: string;
  estado: boolean;
  latitud: number;
  longitud: number;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem]
})
export class LocationPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  private readonly hatService = inject(HatServiceService);
  private readonly authService = inject(AuthServiceService);

  // Gorras que debo obtener de la API
  maerker: Marker[] = [];
  gorras: Gorra[] = [];

  @ViewChild('map') mapRef: ElementRef | undefined;
  map: GoogleMap | undefined;

  async ngOnInit() {
    await this.getHats();
    for (let i = 0; i < this.gorras.length; i++) {
      this.maerker.push(this.toMaerker(this.gorras[i]));
    } 
  }

  //agrega formato coordinate para los markadores del mapa
  toMaerker(gorra: Gorra) {
    return {
      title: gorra.nombre,
      iconUrl: 'assets/icon/marcador-gorra.svg',
      iconSize: { width: 50, height: 50 },
      coordinate: { lat: Number(gorra.latitud), lng: Number(gorra.longitud)}
    }
  }

  async getHats() {
    return new Promise<void>((resolve, reject) => {
      // Obtener el id del usuario para enviárselo a la API
      let id = this.authService.getId(localStorage.getItem('token'));
      
      this.hatService.getHats(id).subscribe({
          next: (res: Gorra[]) => {
              this.gorras = res;
              resolve();
          },
          error: (err: any) => {
              console.error(err);
          }
      });
  });

  }

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: 'AIzaSyCLa_oMJYpLLe3ozQ6eT08LzfIQbDbpV9E',
      element: this.mapRef?.nativeElement,
      language: 'es',
      config: {
        center: { lat: 20.653, lng: -87.080 },
        zoom: 12,
        disableDefaultUI: true,
      }
    });
    this.addMarkers();
    this.map.enableCurrentLocation(true);
  }

  async addMarkers() {
    const markers: Marker[] = this.maerker;
    const result = await this.map?.addMarkers(markers);

    this.map?.setOnMarkerClickListener(async (marker) => {
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0, 0.3],
        initialBreakpoint: 0.3
      });
      modal.present();
    })
  }


}
