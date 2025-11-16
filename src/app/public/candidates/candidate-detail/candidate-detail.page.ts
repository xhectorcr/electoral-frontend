import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  briefcaseOutline,
  documentTextOutline,
  homeOutline,
  idCardOutline,
  linkOutline,
  locationOutline,
  mapOutline,
  schoolOutline,
} from 'ionicons/icons';
import { CandidateResponseDTO } from 'src/app/core/model/candidates/candidates.model';

addIcons({
  locationOutline,
  mapOutline,
  homeOutline,
  schoolOutline,
  bookOutline,
  briefcaseOutline,
  idCardOutline,
  documentTextOutline,
  linkOutline,
});

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
    IonIcon,
    IonButton,
  ],
})
export class CandidateDetailPage implements OnInit {
  candidate!: CandidateResponseDTO;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const stored = sessionStorage.getItem('selectedCandidate');
    if (stored) {
      this.candidate = JSON.parse(stored);
    } else {
      this.router.navigate(['/tabs/tab2']);
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
