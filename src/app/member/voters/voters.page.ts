import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  alertCircle,
  checkmarkCircle,
  personCircleOutline,
  timeOutline,
} from 'ionicons/icons';

addIcons({
  personCircleOutline,
  checkmarkCircle,
  timeOutline,
  alertCircle,
});

interface Voter {
  id: string;
  name: string;
  dni: string;
  status: 'pending' | 'voted';
}

@Component({
  selector: 'app-voters',
  templateUrl: './voters.page.html',
  styleUrls: ['./voters.page.scss'],
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
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonChip,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonListHeader,
  ],
})
export class VotersPage implements OnInit {
  allVoters: Voter[] = [];
  filteredVoters: Voter[] = [];

  searchTerm: string = '';
  selectedSegment: 'all' | 'pending' | 'voted' = 'all';

  constructor() {}

  ngOnInit() {
    this.allVoters = [
      {
        id: '1',
        name: 'Alva Mendoza, Juan Carlos',
        dni: '45678901',
        status: 'pending',
      },
      {
        id: '2',
        name: 'Barrios Gomez, Maria Luisa',
        dni: '41234567',
        status: 'voted',
      },
      {
        id: '3',
        name: 'Castillo Rojas, Pedro',
        dni: '42345678',
        status: 'pending',
      },
      {
        id: '4',
        name: 'Diaz Flores, Ana Maria',
        dni: '43456789',
        status: 'pending',
      },
      {
        id: '5',
        name: 'Espinoza Zúñiga, Luis',
        dni: '44567890',
        status: 'voted',
      },
      {
        id: '6',
        name: 'Fernandez Diaz, Rosa',
        dni: '45678902',
        status: 'pending',
      },
    ];
    this.filterVoters();
  }

  filterVoters() {
    const term = this.searchTerm.toLowerCase();

    this.filteredVoters = this.allVoters.filter((voter) => {
      const segmentMatch =
        this.selectedSegment === 'all' || voter.status === this.selectedSegment;

      const searchMatch =
        voter.name.toLowerCase().includes(term) ||
        voter.dni.toLowerCase().includes(term);

      return segmentMatch && searchMatch;
    });
  }

  trackVoter(index: number, voter: Voter) {
    return voter.id;
  }

  markAsVoted(voter: Voter, slidingItem: IonItemSliding) {
    voter.status = 'voted';
    console.log('Marcado como votado:', voter.name);
    this.filterVoters();
    slidingItem.close();
  }

  reportIncident(voter: Voter, slidingItem: IonItemSliding) {
    console.log('Reportar incidencia para:', voter.name);
    slidingItem.close();
  }
}
