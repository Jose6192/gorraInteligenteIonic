import { Component, OnInit } from '@angular/core';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-no-device',
  templateUrl: './no-device.component.html',
  styleUrls: ['./no-device.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonContent]
})
export class NoDeviceComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
