import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonImg, IonButtons, IonButton, IonIcon, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonButtons, IonImg, IonCol, IonRow, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSelect, IonSelectOption, IonGrid, IonImg]
})
export class AlbumPage implements OnInit {

  //DEBES AGREGAR CARGA DIFERENTE DE IMAGENES PARA EL API

  gorras = ['Gorra1', 'Gorra2', 'Gorra3'];  // recibe los valores de la lista de gorras

  gorrasImg = [
    { img: 'https://picsum.photos/200/300?random=1', type: 'Gorra1' },
    { img: 'https://picsum.photos/200/300?random=2', type: 'Gorra1' },
    { img: 'https://picsum.photos/200/300?random=3', type: 'Gorra1' },
    { img: 'https://picsum.photos/200/300?random=4', type: 'Gorra2' },
    { img: 'https://picsum.photos/200/300?random=5', type: 'Gorra2' },
    { img: 'https://picsum.photos/200/300?random=6', type: 'Gorra3' },
    { img: 'https://picsum.photos/200/300?random=7', type: 'Gorra3' },
    { img: 'https://picsum.photos/200/300?random=8', type: 'Gorra3' },
    { img: 'https://picsum.photos/200/300?random=10', type: 'Gorra3' },
    { img: 'https://picsum.photos/200/300?random=11', type: 'Gorra1' },
    { img: 'https://picsum.photos/200/300?random=12', type: 'Gorra1' },
    { img: 'https://picsum.photos/200/300?random=13', type: 'Gorra1' },
    { img: 'https://picsum.photos/200/300?random=14', type: 'Gorra2' },
    { img: 'https://picsum.photos/200/300?random=15', type: 'Gorra2' },
    { img: 'https://picsum.photos/200/300?random=16', type: 'Gorra3' },
    { img: 'https://picsum.photos/200/300?random=17', type: 'Gorra3' },
    { img: 'https://picsum.photos/200/300?random=18', type: 'Gorra3' },
    { img: 'https://picsum.photos/200/300?random=19', type: 'Gorra3' }

    // recibir las images de las gorras
  ];
  

  gorrasFiltradas: { img: string; type: string }[] = [];

  constructor(private navCtrl: NavController) {
    this.gorrasFiltradas = this.gorrasImg;  // Inicialmente mostrar todas las gorras
    addIcons({ arrowBackOutline, add });
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back(); // Regresa a la página anterior
  }

  filterGallery(event: CustomEvent) {
    const selectedType = event.detail.value;
    if (selectedType) {
      this.gorrasFiltradas = this.gorrasImg.filter(hat => hat.type === selectedType);
    } else {
      this.gorrasFiltradas = this.gorrasImg;  // Si no hay filtro, mostrar todas las gorras
    }
  }


}
