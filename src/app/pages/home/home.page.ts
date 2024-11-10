import { Component, inject } from '@angular/core';
import { IonContent, IonInput, IonButton, IonIcon, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton, IonIcon, ReactiveFormsModule, CommonModule],
})
export class HomePage {

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
  });

  errorMessage = '';

  private readonly authService = inject(AuthServiceService);
  

  constructor( private router: Router, private toastController: ToastController) {
    addIcons({personCircleOutline});
  }

  async sendForm() { 
    if (this.form.valid) {
      const credentials = {
        nombre: this.form.value.nombre || '',
        contrasena: this.form.value.contrasena || ''
      };
      this.authService.login(credentials).subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          this.form.reset();
          this.router.navigate(['/tabs/location']);
        }, async (err) => {
          await this.showErrorToast(err.error.message);
        }
      );
    }
    else{
      await this.showErrorToast('Por favor, rellene todos los campos');
    };
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración en milisegundos
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
  }

}
