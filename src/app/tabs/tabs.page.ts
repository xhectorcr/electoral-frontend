import { CommonModule } from '@angular/common'; // <-- AÑADIDO
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonNote,
  IonTitle,
  IonToolbar,
  IonTabs,
  IonTabBar,
  IonTabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  documentTextOutline,
  homeOutline,
  informationCircleOutline,
  logInOutline,
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
  'log-in-outline': logInOutline,
  'document-text-outline': documentTextOutline,
});

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ChatbotPage,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonListHeader,
    IonNote,
  ],
})
export class TabsPage {}
