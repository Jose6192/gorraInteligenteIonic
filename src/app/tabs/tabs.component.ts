import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';

import { IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel } from '@ionic/angular/standalone';
import { albums, settings, compass } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel, RouterLink]
})
export class TabsComponent  implements OnInit {

  constructor() {
    addIcons({
      'compass-outline': compass,
      'albums-outline': albums,
      'settings-outline': settings
    });

  }

  ngOnInit() {}

}
