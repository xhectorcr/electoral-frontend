import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  barChartOutline,
  calendarOutline,
  checkmarkDoneOutline,
  listOutline,
  newspaperOutline,
  peopleOutline,
  personOutline,
  ribbonOutline,
  searchOutline,
} from 'ionicons/icons';

addIcons({
  'search-outline': searchOutline,
  'people-outline': peopleOutline,
  'ribbon-outline': ribbonOutline,
  'calendar-outline': calendarOutline,
  'checkmark-done-outline': checkmarkDoneOutline,
  'newspaper-outline': newspaperOutline,
  'person-outline': personOutline,
  'add-circle-outline': addCircleOutline,
  'list-outline': listOutline,
  'bar-chart-outline': barChartOutline,
});

export interface Candidate {
  name: string;
  position: string;
  experience: number;
  description: string;
  party: string;
  skills: string[];
  photo?: string;
  color: string;
  positionTag: string;
  votes?: number;
  popularity?: number;
  age: number;
  birthPlace: string;
  education: string;
  previousPositions: string;
}

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.page.html',
  styleUrls: ['./candidates.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonItem,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
  ],
})
export class CandidatesPage implements OnInit {
  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  searchTerm: string = '';
  tags: string[] = ['Todos', 'Presidenciales', 'Diputados', 'Senadores'];
  selectedTag: string = 'Todos';

  constructor(private router: Router) {
    addIcons({ searchOutline });
  }

  ngOnInit() {
    this.candidates = [
      {
        name: 'Juan Pérez',
        position: 'Candidato Presidencial',
        experience: 5,
        description: 'Experto en políticas públicas y desarrollo económico.',
        party: 'Partido A',
        skills: ['Gestión', 'Economía', 'Política'],
        photo: 'https://i.pravatar.cc/300?img=1',
        color: '#1976d2',
        positionTag: 'Presidenciales',
        votes: this.getRandomInt(500, 1500),
        popularity: this.getRandomInt(50, 100),

        // 🔹 Datos agregados
        age: 48,
        birthPlace: 'Lima, Perú',
        education:
          'Licenciado en Economía por la Universidad del Pacífico. Maestría en Políticas Públicas en Harvard.',
        previousPositions:
          'Ministro de Economía (2018–2020), Director de Desarrollo Económico (2015–2018).',
      },
      {
        name: 'María Gómez',
        position: 'Candidata Diputada',
        experience: 3,
        description: 'Especialista en educación y derechos sociales.',
        party: 'Partido B',
        skills: ['Educación', 'Legislación'],
        photo: 'https://i.pravatar.cc/300?img=2',
        color: '#e64a19',
        positionTag: 'Diputados',
        votes: this.getRandomInt(300, 1200),
        popularity: this.getRandomInt(50, 100),
        age: 35,
        birthPlace: 'Cusco, Perú',
        education:
          'Licenciada en Educación por la UNSAAC. Diplomado en Derechos Humanos.',
        previousPositions:
          'Coordinadora regional del Ministerio de Educación (2019–2022).',
      },
      {
        name: 'Carlos López',
        position: 'Candidato Senador',
        experience: 4,
        description: 'Experto en desarrollo tecnológico y ciberseguridad.',
        party: 'Partido C',
        skills: ['Tecnología', 'Seguridad', 'Legislación'],
        photo: 'https://i.pravatar.cc/300?img=3',
        color: '#388e3c',
        positionTag: 'Senadores',
        votes: this.getRandomInt(400, 1300),
        popularity: this.getRandomInt(50, 100),
        age: 42,
        birthPlace: 'Arequipa, Perú',
        education:
          'Ingeniero de Sistemas por la Universidad Católica San Pablo. Especialización en Ciberseguridad en MIT.',
        previousPositions:
          'Jefe de Seguridad Informática del Estado (2017–2021).',
      },
      {
        name: 'Ana Torres',
        position: 'Candidata Presidencial',
        experience: 8,
        description: 'Larga trayectoria en relaciones internacionales.',
        party: 'Partido D',
        skills: ['Diplomacia', 'Comercio', 'DDHH'],
        photo: 'https://i.pravatar.cc/300?img=4',
        color: '#fbc02d',
        positionTag: 'Presidenciales',
        votes: this.getRandomInt(600, 1800),
        popularity: this.getRandomInt(60, 100),
        age: 52,
        birthPlace: 'Trujillo, Perú',
        education:
          'Abogada por la Universidad de Lima. Magíster en Relaciones Internacionales en Georgetown University.',
        previousPositions:
          'Embajadora del Perú en Chile (2016–2020), Viceministra de Comercio Exterior (2013–2016).',
      },
    ];

    this.filteredCandidates = [...this.candidates];
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  filterCandidates() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCandidates = this.candidates.filter(
      (c) =>
        (c.name.toLowerCase().includes(term) ||
          c.party.toLowerCase().includes(term)) &&
        (this.selectedTag === 'Todos' || c.positionTag === this.selectedTag)
    );
  }

  viewDetails(candidate: Candidate) {
    sessionStorage.setItem('selectedCandidate', JSON.stringify(candidate));
    this.router.navigate(['/candidate-detail', candidate.name]);
  }

  /**
   * Maneja errores de carga de imagen y pone un placeholder.
   */
  onImageError(event: Event, candidate: Candidate) {
    const placeholder = `https://placehold.co/300x300/64748b/ffffff?text=${candidate.name
      .charAt(0)
      .toUpperCase()}`;
    (event.target as HTMLImageElement).src = placeholder;
  }
}
