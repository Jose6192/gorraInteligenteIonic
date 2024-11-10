import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonIcon, ToastController} from '@ionic/angular/standalone';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonInput, IonButton, IonIcon, ReactiveFormsModule]
})
export class RegisterPage {

  formRegistro = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required]),
  });

  private readonly authService = inject(AuthServiceService);

  constructor(private router: Router, private toastController: ToastController) {
  }

  async sendForm() { 
    if (this.formRegistro.valid) {
      const credentials = {
        nombre: this.formRegistro.value.nombre || '',
        correo: this.formRegistro.value.correo || '',
        contrasena: this.formRegistro.value.contrasena || ''
      };
      this.authService.register(credentials).subscribe(
        async (res) => {
          await this.showSuccesToast('Usuario registrado correctamente');
          this.router.navigate(['/home']);
        }, async (err) => {
          console.log(err);
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

  async showSuccesToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración en milisegundos
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }



}
