import { Component, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel } from '@ionic/angular/standalone';
import { compassOutline, homeOutline, settingsOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel]
})
export class TabsComponent  implements OnInit {

  constructor() {
    addIcons({compassOutline,homeOutline,settingsOutline});

  }

  ngOnInit() {}

}
