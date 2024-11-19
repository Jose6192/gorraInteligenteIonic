import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonItem, IonLabel, IonInput, IonButton, IonToast } from '@ionic/angular/standalone';
import { sendOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [IonToast, IonButton, IonInput, IonLabel, IonItem, IonIcon, IonContent, CommonModule, FormsModule]
})
export class ResetPasswordPage implements OnInit {

  constructor() {
    addIcons({sendOutline});
  }

  ngOnInit() {
  }

}
