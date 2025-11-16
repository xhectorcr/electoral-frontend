import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  checkmarkCircleOutline,
  downloadOutline,
  warningOutline,
} from 'ionicons/icons';

addIcons({
  bookOutline,
  checkmarkCircleOutline,
  warningOutline,
  downloadOutline,
});

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonRow,
    IonCol,
    IonGrid,
  ],
})
export class ManualPage implements OnInit {
  manualUrl =
    'https://www.onpe.gob.pe/elecciones/2022/elecciones-internas/docs/miembro-mesa/manual-instrucciones.pdf';
  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  downloadManual() {
    console.log('Abriendo PDF...');
    window.open(this.manualUrl, '_blank');
  }
}
