import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonInput, IonLabel, IonItem, IonButton, NavController, IonButtons, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, add } from 'ionicons/icons';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonButton, IonItem, IonLabel, IonInput, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons]
})
export class AddDevicePage implements OnInit {

  constructor(private navCtrl: NavController) {
    addIcons({arrowBackOutline,add});
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back(); // Regresa a la página anterior
  }

  addDevice(){
    
  }

}
