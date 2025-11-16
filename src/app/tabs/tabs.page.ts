import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  homeOutline,
  informationCircleOutline,
  newspaperOutline,
  peopleOutline,
  ribbonOutline,
} from 'ionicons/icons';
import { ChatbotPage } from '../shared/components/chatbot/chatbot.page';

addIcons({
  'calendar-outline': calendarOutline,
  'people-outline': peopleOutline,
  'ribbon-outline': ribbonOutline,
  'information-circle-outline': informationCircleOutline,
  'newspaper-outline': newspaperOutline,
  'home-outline': homeOutline,
});

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, ChatbotPage],
})
export class TabsPage {}
