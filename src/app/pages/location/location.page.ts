import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';
import { IonTabs, IonTabBar, IonIcon, IonTabButton } from '@ionic/angular/standalone';
import { albums, settings, compass } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, ModalController } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalPage } from '../../component/modal/modal.page';
import { TabsComponent } from "../../component/tabs/tabs.component";

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, TabsComponent, RouterLink, IonTabs, IonTabBar, IonIcon, IonTabButton]
})
export class LocationPage implements OnInit {

  // Gorras que debo obtener de la API
  gorras = [
    {
      title: 'gorra 1',
      coordinate: { lat: 20.674, lng: -87.083 },
      snippet: 'Jose',
    },
    {
      title: 'gorra 2',
      coordinate: { lat: 20.671, lng: -87.089 },
      snippet: 'Maria',
    },
    {
      title: 'gorra 3',
      coordinate: { lat: 20.678, lng: -87.075 },
      snippet: 'Pedro',
    }
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

  

  ngOnInit() {
  }

 

}
