import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonButtons, IonButton, IonIcon, NavController, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, arrowBackOutline } from 'ionicons/icons';
import { ImageServiceService } from 'src/app/services/image-service.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonIcon, IonButton, IonButtons, IonImg, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonImg]
})
export class AlbumPage implements OnInit {

  imagenes: string[] = [];
  private baseUrl = 'https://gorra-api.ddns.net'

  constructor(private navCtrl: NavController) {
    addIcons({ arrowBackOutline, add });
  }

  private readonly imageService = inject(ImageServiceService);

  ngOnInit() {
    this.cargarImagenes();
  }

  cargarImagenes() {
    this.imageService.getAllImages().subscribe(
      (data:any) => {
        this.imagenes = data.map((imagen: string) => `${this.baseUrl}${imagen}`);
        console.log('Imagenes cargadas:', this.imagenes);
      },
      (error:any) => {
        console.error('Error loading images:', error);
      }
    );
  }

  goBack() {
    this.navCtrl.back(); // Regresa a la página anterior
  }

}