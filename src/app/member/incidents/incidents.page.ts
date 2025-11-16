import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  alertCircleOutline,
  checkmarkCircleOutline,
  personOutline,
  timeOutline,
  warningOutline,
} from 'ionicons/icons';

interface Incident {
  id: string;
  title: string;
  type: 'Votante' | 'Material' | 'Seguridad';
  time: string;
  status: 'pending' | 'resolved';
  description: string;
}

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.page.html',
  styleUrls: ['./incidents.page.scss'],
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
    IonSegment,
    IonSegmentButton,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonChip,
    IonFab,
    IonFabButton,
    IonListHeader,
  ],
})
export class IncidentsPage implements OnInit {
  allIncidents: Incident[] = [];
  filteredIncidents: Incident[] = [];

  selectedSegment: 'all' | 'pending' | 'resolved' = 'all';

  constructor() {
    addIcons({
      add,
      warningOutline,
      timeOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
      personOutline,
    });
  }

  ngOnInit() {
    this.allIncidents = [
      {
        id: '1',
        title: 'Votante no aparece en padrón',
        type: 'Votante',
        time: '09:15 AM',
        status: 'pending',
        description: 'DNI 45678901 no figura en la lista de esta mesa.',
      },
      {
        id: '2',
        title: 'Faltan cédulas de sufragio',
        type: 'Material',
        time: '09:05 AM',
        status: 'resolved',
        description: 'Se solicitó reposición al coordinador.',
      },
      {
        id: '3',
        title: 'Persona agresiva en la fila',
        type: 'Seguridad',
        time: '08:45 AM',
        status: 'pending',
        description: 'Un ciudadano se niega a usar mascarilla y alza la voz.',
      },
      {
        id: '4',
        title: 'Votante necesita asistencia',
        type: 'Votante',
        time: '08:30 AM',
        status: 'resolved',
        description: 'Persona en silla de ruedas, se le dio prioridad.',
      },
    ];
    this.filterIncidents();
  }

  filterIncidents() {
    if (this.selectedSegment === 'all') {
      this.filteredIncidents = [...this.allIncidents];
    } else {
      this.filteredIncidents = this.allIncidents.filter(
        (incident) => incident.status === this.selectedSegment
      );
    }
  }

  getIconForType(type: 'Votante' | 'Material' | 'Seguridad'): string {
    switch (type) {
      case 'Votante':
        return 'person-outline';
      case 'Material':
        return 'warning-outline';
      case 'Seguridad':
        return 'alert-circle-outline';
      default:
        return 'warning-outline';
    }
  }

  trackIncident(index: number, incident: Incident) {
    return incident.id;
  }

  viewIncident(incident: Incident) {
    console.log('Viendo detalle de:', incident.title);
  }

  addNewIncident() {
    console.log('Abriendo modal para nuevo incidente...');
  }
}
