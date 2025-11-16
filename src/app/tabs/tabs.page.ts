import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  informationCircleOutline,
  peopleOutline,
  ribbonOutline,
} from 'ionicons/icons';

addIcons({
  'calendar-outline': calendarOutline,
  'people-outline': peopleOutline,
  'ribbon-outline': ribbonOutline,
  'information-circle-outline': informationCircleOutline,
});

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class TabsPage {}
