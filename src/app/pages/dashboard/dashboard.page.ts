import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonItem, IonLabel, IonList, IonHeader, IonToolbar, IonButton, IonTitle, IonButtons } from '@ionic/angular/standalone';
import { NoDeviceComponent } from 'src/app/component/no-device/no-device.component';
import { HatServiceService } from 'src/app/services/hat-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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
  private readonly authService = inject(AuthServiceService);

  gorras: Gorra[] = [];

  constructor() { }

  ngOnInit() {
    this.loadGorras(this.getId());
  }

  loadGorras(id: number) {
    this.hatService.getHats(id).subscribe((res:Gorra[]) => {
      this.gorras = res;
      console.log(res);
    }, (err:Gorra) => {
      console.log(err);
    });
  }

  getId(){
    return this.authService.getId(localStorage.getItem('token'));
  }

  elimiarGorra(Gorra: Gorra){
    this.hatService.deleteHat(Gorra.id_gorra).subscribe((res:any) => {
      console.log(res);
      this.loadGorras(this.getId());
    }, (err:any) => {
      console.log(err);
    });
  }

}
