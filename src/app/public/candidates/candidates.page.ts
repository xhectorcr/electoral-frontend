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
import { CandidateResponse } from 'src/app/core/model/candidates/candidates.model';
import { CandidateService } from 'src/app/core/services/candidates/candidates.service';

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
  candidates: CandidateResponse[] = [];
  filteredCandidates: CandidateResponse[] = [];
  searchTerm: string = '';
  tags: string[] = ['Todos', 'Presidente', 'Congresistas', 'Parlamento Andino'];
  selectedTag: string = 'Todos';

  officeMap: { [key: string]: string[] } = {
    Todos: [],
    Presidente: ['Presidencia'],
    Congresistas: ['Primera Vicepresidencia', 'Segunda Vicepresidencia'],
    'Parlamento Andino': ['Parlamento Andino'],
  };

  constructor(
    private router: Router,
    private candidateService: CandidateService
  ) {}

  ngOnInit() {
    this.loadCandidates();
  }

  loadCandidates() {
    this.candidateService.getAllActiveCandidates().subscribe({
      next: (data) => {
        this.candidates = data;
        this.filteredCandidates = [...this.candidates];
      },
      error: (err) => {
        console.error('Error fetching candidates:', err);
      },
    });
  }

  filterCandidates() {
    const term = this.searchTerm.toLowerCase();
    const officesToFilter = this.officeMap[this.selectedTag] || [];

    this.filteredCandidates = this.candidates.filter((c) => {
      const matchesTerm =
        c.fullName.toLowerCase().includes(term) ||
        c.partyName.toLowerCase().includes(term);

      const matchesOffice =
        this.selectedTag === 'Todos' || officesToFilter.includes(c.office);

      return matchesTerm && matchesOffice;
    });
  }

  viewDetails(candidate: CandidateResponse) {
    sessionStorage.setItem('selectedCandidate', JSON.stringify(candidate));
    this.router.navigate(['/candidate-detail', candidate.fullName]);
  }

  onImageError(event: Event, candidate: CandidateResponse) {
    const placeholder = `https://placehold.co/300x300/64748b/ffffff?text=${candidate.fullName
      .charAt(0)
      .toUpperCase()}`;
    (event.target as HTMLImageElement).src = placeholder;
  }
}
