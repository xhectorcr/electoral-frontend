import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonNote,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronForwardOutline,
  informationCircleOutline,
  logOutOutline,
  moonOutline,
  notificationsOutline,
  personCircleOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';

addIcons({
  personCircleOutline,
  chevronForwardOutline,
  notificationsOutline,
  moonOutline,
  logOutOutline,
  shieldCheckmarkOutline,
  informationCircleOutline,
});

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonIcon,
    IonToggle,
    IonAvatar,
    IonNote,
  ],
})
export class SettingsPage implements OnInit {
  // --- Estado de la UI ---
  pushNotifications: boolean = true;
  darkMode: boolean = false;

  constructor() {}

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  togglePush() {
    console.log('Notificaciones Push:', this.pushNotifications);
  }

  toggleDarkMode() {
    console.log('Modo Oscuro:', this.darkMode);
    document.body.classList.toggle('dark', this.darkMode);
  }

  changePassword() {
    console.log('Navegando a cambiar contraseña...');
  }

  logout() {
    console.log('Cerrando sesión...');
  }
}
