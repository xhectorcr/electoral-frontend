import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

interface Party {
  name: string;
  acronym: string;
  members: number;
  color: string;
  logo?: string;
  description?: string;
  candidates?: number;
}

@Component({
  selector: 'app-parties',
  templateUrl: './parties.page.html',
  styleUrls: ['./parties.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    CommonModule,
    FormsModule,
  ],
})
export class PartiesPage implements OnInit {
  parties: Party[] = [];

  ngOnInit() {
    this.parties = [
      {
        name: 'Partido A',
        acronym: 'PA',
        members: 25,
        color: '#1976d2',
        description: 'Partido con enfoque en educación y tecnología.',
        candidates: 15,
        logo: 'assets/logos/pa.png',
      },
      {
        name: 'Partido B',
        acronym: 'PB',
        members: 18,
        color: '#e64a19',
        description: 'Partido enfocado en salud y desarrollo social.',
        candidates: 10,
        logo: 'assets/logos/pb.png',
      },
      {
        name: 'Partido C',
        acronym: 'PC',
        members: 30,
        color: '#388e3c',
        description: 'Partido con políticas verdes y sostenibles.',
        candidates: 20,
        logo: 'assets/logos/pc.png',
      },
      {
        name: 'Partido D',
        acronym: 'PD',
        members: 12,
        color: '#fbc02d',
        description: 'Partido centrado en economía y empleo.',
        candidates: 8,
        logo: 'assets/logos/pd.png',
      },
    ];
  }

  viewDetails(party: Party) {
    console.log('Ver detalles de:', party);
  }
}
