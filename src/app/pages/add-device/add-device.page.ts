import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonLabel, IonItem, IonButton, NavController, IonButtons, LoadingController, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, add } from 'ionicons/icons';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
  standalone: true,
  imports: [IonList, IonButton, IonItem, IonLabel, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons]
})
export class AddDevicePage implements OnInit {

  dispositivos: { name: string }[] = [];

  constructor(private navCtrl: NavController, private loadingController: LoadingController) {
    addIcons({ arrowBackOutline, add });
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back(); // Regresa a la página anterior
  }

  async buscarDispositivos() {
    // Muestra el loading
    const loading = await this.loadingController.create({
      message: 'Buscando dispositivos...',
      duration: 3000, // 3 segundos para simular la búsqueda
      spinner: 'crescent',
    });

    await loading.present();

    // Después de 3 segundos, "encuentra" dispositivos simulados
    setTimeout(() => {
      loading.dismiss();
      this.dispositivos = [];
      for (let i=0; i<3; i++) {
        let UUID = this.generateUUID();
        this.dispositivos.push({ name: `Gorra ${UUID}` });
      }
    }, 3000);
  }

  generateUUID(): string {
    return 'xxx-xxx-xxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }



}
