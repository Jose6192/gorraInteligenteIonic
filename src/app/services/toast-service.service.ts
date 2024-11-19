import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(private toastController: ToastController) { }

  async showErrorToast(message: string) {
    const toast = this.toastController.create({
      message: message,
      duration: 3000, // Duración en milisegundos
      color: 'danger',
      position: 'bottom'
    });
    (await toast).present();
  }

  async showSuccesToast(message: string) {
    const toast = this.toastController.create({
      message: message,
      duration: 3000, // Duración en milisegundos
      color: 'success',
      position: 'bottom'
    });
    (await toast).present();
  }

}
