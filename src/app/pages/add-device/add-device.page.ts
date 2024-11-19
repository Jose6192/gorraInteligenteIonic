import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonLabel, IonItem, IonButton, NavController, IonButtons, LoadingController, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, add } from 'ionicons/icons';
import { HatServiceService } from 'src/app/services/hat-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

interface Gorra {
  id_usuario: number,
  modelo:string,
  nombre:string,
  estado:number
}

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
  standalone: true,
  imports: [IonList, IonButton, IonItem, IonLabel, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons]
})

export class AddDevicePage implements OnInit {

  private readonly hatService = inject(HatServiceService);
  private readonly authService = inject(AuthServiceService);
  private readonly ToastServiceService = inject(ToastServiceService);

  Gorras: Gorra[] = [];

  constructor(private navCtrl: NavController, private loadingController: LoadingController) {
    addIcons({ arrowBackOutline, add });
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back(); // Regresa a la página anterior
  }

  async buscarGorras() {
    // Muestra el loading
    const loading = await this.loadingController.create({
      message: 'Buscando Gorras...',
      duration: 3000, // 3 segundos para simular la búsqueda
      spinner: 'crescent',
    });

    await loading.present();

    // Después de 3 segundos, "encuentra" dispositivos simulados
    setTimeout(() => {
      loading.dismiss();
      this.Gorras = [];
      let userId = this.getUserId();
      for (let i=0; i<3; i++) {
        let UUID = this.generateUUID();
        this.Gorras.push({ id_usuario:userId, modelo: UUID , nombre: `Gorra ${UUID}` , estado: 1 });
      }
    }, 3000);
  }

  generateUUID(): string {
    return 'xxx-xxx-xxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  agregarGorra(Gorra:Gorra){
    this.hatService.register(Gorra).subscribe((res:Gorra) => {
      this.ToastServiceService.showSuccesToast('Gorra registrada correctamente');
    }, (err:Gorra) => {
      this.ToastServiceService.showErrorToast('Error al registrar la gorra');
    });
  }

  getUserId(): number {
    return this.authService.getId(localStorage.getItem('token'));
  }



}
