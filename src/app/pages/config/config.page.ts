import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonTitle, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { person, personCircleOutline } from 'ionicons/icons';
import { TabsComponent } from "../../component/tabs/tabs.component";

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [IonToolbar, IonHeader, IonTitle, CommonModule, FormsModule, IonContent, IonButton, IonIcon, RouterLink, TabsComponent]
})
export class ConfigPage implements OnInit {

  constructor() {
    addIcons({personCircleOutline});
  }

  ngOnInit() {
    this.getUsername();
  }

  user: string = 'John Doe';
  perfilUsuario: string = 'Admin';


  getUsername() {
    return this.user;
  }

  agregarGorra() {
    console.log('Agregar Gorra');
    // Aquí puedes agregar la lógica para agregar gorras
  }

  logOut() {
    console.log('Cerrar sesión');
    // Aquí puedes agregar la lógica para cerrar sesión
  }

}
