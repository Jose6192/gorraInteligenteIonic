import { Component, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { albums, settings, compass } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, ModalController } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalPage } from '../../component/modal/modal.page';
import { NoDeviceComponent } from 'src/app/component/no-device/no-device.component';
import { HatServiceService } from 'src/app/services/hat-service.service';

interface Gorra {
  id_gorra: number;
  id_usuario: string;
  modelo: string;
  nombre: string;
  estado: boolean;
  coordinate: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, NoDeviceComponent]
})
export class LocationPage implements OnInit {

  private readonly hatService = inject(HatServiceService);

  // Gorras que debo obtener de la API
  gorras: Gorra[] = [
    /* {
      id: 1,
      name: 'gorra 1',
      coordinate: { lat: 20.674, lng: -87.083 },
      snippet: 'Jose',
      connected: true
    },
    {
      id: 2,
      name: 'gorra 2',
      coordinate: { lat: 20.673, lng: -87.083 },
      snippet: 'Carlos',
      connected: false
    },
    {
      id: 3,
      name: 'gorra 3',
      coordinate: { lat: 20.672, lng: -87.083 },
      snippet: 'Juan',
      connected: true
    } */
  ];

  @ViewChild('map') mapRef: ElementRef | undefined;
  map: GoogleMap | undefined;

  constructor(private modalCtrl: ModalController) {
    addIcons({
      'compass-outline': compass,
      'albums-outline': albums,
      'settings-outline': settings
    });
  }

  ngOnInit() {
    this.getHats();
    
  }

  getHats() {
    this.hatService.getHats(1).subscribe((res:Gorra[]) => {
      console.log(res);
      console.log(this.gorras);
      this.gorras = res;
    }, (err:Gorra) => {
      console.log(err);
    });
  }

/*   getCordinates(){
    this.gorras.forEach((gorra) => {
      push(coordinate: { lat: 20.673, lng: -87.083 });
    });
  } */

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
    const markers: Marker[] = this.gorras;
    const result = await this.map?.addMarkers(markers);

    this.map?.setOnMarkerClickListener(async (marker) => {
      console.log('marker clicked', marker);
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
