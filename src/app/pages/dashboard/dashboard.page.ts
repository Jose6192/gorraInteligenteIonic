import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonItem, IonLabel, IonList, IonHeader, IonToolbar, IonButton, IonTitle, IonButtons, IonCard, IonCardContent, IonText } from '@ionic/angular/standalone';
import { NoDeviceComponent } from 'src/app/component/no-device/no-device.component';
import { HatServiceService } from 'src/app/services/hat-service.service';

interface Gorra {
  id_gorra: number;
  id_usuario: string;
  modelo: string;
  nombre: string;
  estado: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonButtons, IonTitle, IonButton, IonToolbar, IonHeader, IonList, IonLabel, IonItem, IonContent, CommonModule, FormsModule, NoDeviceComponent]
})

export class DashboardPage implements OnInit {

  private readonly hatService = inject(HatServiceService);

  gorras: Gorra[] = [];

  constructor() { }

  ngOnInit() {
    this.loadGorras();
  }

  loadGorras() {
    this.hatService.getHats(1).subscribe((res:Gorra[]) => {
      this.gorras = res;
      console.log(res);
    }, (err:Gorra) => {
      console.log(err);
    });
  }

}
