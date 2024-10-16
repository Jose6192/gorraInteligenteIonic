import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonIcon} from '@ionic/angular/standalone';
import { TabsComponent } from '../tabs/tabs.component';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, TabsComponent, IonItem, IonLabel, IonInput, IonButton, IonIcon],
})
export class HomePage {
  constructor() {
    addIcons({
      'person-circle-outline': person
    });
  }

  logIn() {
    console.log('login');
  } 
}
