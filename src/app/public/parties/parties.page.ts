import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowForwardCircle,
  documentTextOutline,
  linkOutline,
} from 'ionicons/icons';
import { finalize } from 'rxjs';
import { PartyResponse } from 'src/app/core/model/parties/parties.model';
import { PartiesService } from 'src/app/core/services/parties/parties.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

addIcons({
  linkOutline,
  documentTextOutline,
  arrowForwardCircle,
});

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
    IonIcon,
    IonSpinner,
    HeaderComponent
  ],
})
export class PartiesPage implements OnInit {
  parties: PartyResponse[] = [];
  loading: boolean = false;

  constructor(private partiesService: PartiesService, private router: Router) {}

  ngOnInit() {
    this.loadParties();
  }

  loadParties() {
    this.loading = true;
    this.partiesService
      .getAllParties()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.parties = data;
        },
        error: (err) => {
          console.error('Error fetching parties:', err);
          this.loading = false;
        },
      });
  }

  viewDetails(party: PartyResponse) {
    sessionStorage.setItem('selectedParty', JSON.stringify(party));
    this.router.navigate(['/party-detail', party.id]);
  }

  onImageError(event: Event, party: PartyResponse) {
    const placeholder = `https://placehold.co/150x150/64748b/ffffff?text=${party.acronym}`;
    (event.target as HTMLImageElement).src = placeholder;
  }
}
