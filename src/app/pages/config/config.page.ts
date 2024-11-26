import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonIcon, IonTitle, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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

  private readonly authService = inject(AuthServiceService);

  ngOnInit() {
    this.getUsername();
  }

  user: string = '';

  getUsername() {
    this.user = this.authService.getNombre(localStorage.getItem('token'));
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
