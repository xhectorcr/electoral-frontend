import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonButtons,
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
  IonNote,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  barChartOutline,
  briefcaseOutline,
  calendarOutline,
  checkmarkDoneOutline,
  listOutline,
  mapOutline,
  newspaperOutline,
  peopleOutline,
  personOutline,
  ribbonOutline,
  sadOutline,
  schoolOutline,
  searchOutline,
} from 'ionicons/icons';
import { finalize } from 'rxjs';
import { CandidateResponseDTO } from 'src/app/core/model/candidates/candidates.model';
import { CandidateService } from 'src/app/core/services/candidates/candidates.service';

addIcons({
  searchOutline,
  peopleOutline,
  ribbonOutline,
  calendarOutline,
  checkmarkDoneOutline,
  newspaperOutline,
  personOutline,
  addCircleOutline,
  listOutline,
  barChartOutline,
  mapOutline,
  schoolOutline,
  briefcaseOutline,
  sadOutline,
});

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.page.html',
  styleUrls: ['./candidates.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
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
    IonSpinner,
    IonNote,
  ],
})
export class CandidatesPage implements OnInit {
  candidates: CandidateResponseDTO[] = [];
  filteredCandidates: CandidateResponseDTO[] = [];
  searchTerm: string = '';
  tags: string[] = ['Todos', 'Presidente', 'Congresistas', 'Parlamento Andino'];
  selectedTag: string = 'Todos';
  isLoading: boolean = false;

  officeMap: { [key: string]: string[] } = {
    Todos: [],
    Presidente: ['Presidencia'],
    Congresistas: [
      'Congresista',
      'Primera Vicepresidencia',
      'Segunda Vicepresidencia',
    ],
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
    this.isLoading = true;
    this.candidateService
      .getAllActiveCandidates()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
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
        this.selectedTag === 'Todos' ||
        officesToFilter.some((office) => c.office.includes(office));

      return matchesTerm && matchesOffice;
    });
  }

  viewDetails(candidate: CandidateResponseDTO) {
    sessionStorage.setItem('selectedCandidate', JSON.stringify(candidate));
    this.router.navigate(['/candidate-detail', candidate.id]);
  }

  onImageError(event: Event, candidate: CandidateResponseDTO) {
    const placeholder = `https://placehold.co/300x300/64748b/ffffff?text=${candidate.fullName
      .charAt(0)
      .toUpperCase()}`;
    (event.target as HTMLImageElement).src = placeholder;
  }
}
