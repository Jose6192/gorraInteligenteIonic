import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonIcon, ToastController } from '@ionic/angular/standalone';
import { TabsComponent } from '../../component/tabs/tabs.component';
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
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, TabsComponent, IonItem, IonLabel, IonInput, IonButton, IonIcon, ReactiveFormsModule, CommonModule],
})
export class HomePage {

  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage = '';

  private readonly authService = inject(AuthServiceService);
  

  constructor( private router: Router, private toastController: ToastController) {
    addIcons({personCircleOutline});
  }

  async sendForm() { 
    if (this.form.valid) {
      const credentials = {
        user: this.form.value.user || '',
        password: this.form.value.password || ''
      };
      this.authService.login(credentials).subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
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
