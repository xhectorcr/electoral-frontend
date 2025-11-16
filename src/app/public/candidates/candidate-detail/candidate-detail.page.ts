import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonBackButton,
  IonBadge,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CandidateResponse } from 'src/app/core/model/candidates/candidates.model';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.page.html',
  styleUrls: ['./candidate-detail.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonBadge,
    CommonModule,
    FormsModule,
    IonBadge,
    IonLabel,
    IonList,
    IonContent,
    IonHeader,
    IonItem,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
})
export class CandidateDetailPage implements OnInit {
  candidate!: CandidateResponse;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const stored = sessionStorage.getItem('selectedCandidate');
    if (stored) {
      this.candidate = JSON.parse(stored);
    } else {
      this.router.navigate(['/candidates']);
    }
  }

  onImageError(event: Event) {
    if (!this.candidate) return;
    const placeholder = `https://placehold.co/300x300/64748b/ffffff?text=${this.candidate.fullName
      .charAt(0)
      .toUpperCase()}`;
    (event.target as HTMLImageElement).src = placeholder;
  }
}
