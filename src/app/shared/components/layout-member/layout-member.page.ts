import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  homeOutline,
  peopleOutline,
  settingsOutline,
  warningOutline,
} from 'ionicons/icons';

addIcons({
  'home-outline': homeOutline,
  'people-outline': peopleOutline,
  'warning-outline': warningOutline,
  'settings-outline': settingsOutline,
  'book-outline': bookOutline,
});

@Component({
  selector: 'app-layout-member',
  templateUrl: './layout-member.page.html',
  styleUrls: ['./layout-member.page.scss'],
  standalone: true,
  imports: [
    IonRouterOutlet,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonMenu,
    IonIcon,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class LayoutMemberPage {}
