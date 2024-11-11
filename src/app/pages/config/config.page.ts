import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonIcon, IonTitle, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [IonToolbar, IonHeader, IonTitle, CommonModule, IonContent, IonButton, IonIcon]
})
export class ConfigPage implements OnInit {

  constructor(private router: Router) {
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
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    // Aquí puedes agregar la lógica para cerrar sesión
  }

}
