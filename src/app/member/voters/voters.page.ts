import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
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
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  alertCircle,
  checkmarkCircle,
  personCircleOutline,
  sadOutline,
  timeOutline,
} from 'ionicons/icons';
import { finalize } from 'rxjs';
import { ElectorResponse } from 'src/app/core/model/elector_tools/elector_tools.model';
import { ElectorService } from 'src/app/core/services/elector_tools/elector_tools.service';

addIcons({
  personCircleOutline,
  checkmarkCircle,
  timeOutline,
  alertCircle,
  sadOutline,
});

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
    IonSpinner,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class VotersPage implements OnInit {
  allVoters: ElectorResponse[] = [];
  filteredVoters: ElectorResponse[] = [];

  searchTerm: string = '';
  selectedSegment: 'all' | 'pending' | 'voted' = 'all';

  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private electorService: ElectorService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadVoters();
  }

  loadVoters(event: any = null) {
    if (!event) {
      this.isLoading = true;
    }
    this.errorMessage = null;

    this.electorService
      .getVotersForMyTable()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) {
            event.target.complete();
          }
        })
      )
      .subscribe({
        next: (data) => {
          this.allVoters = data;
          this.filterVoters();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'No se pudo cargar el padrón de la mesa.';
        },
      });
  }

  filterVoters() {
    const term = this.searchTerm.toLowerCase();

    this.filteredVoters = this.allVoters.filter((voter) => {
      let segmentMatch = true;
      if (this.selectedSegment === 'pending') {
        segmentMatch = !voter.hasVoted;
      } else if (this.selectedSegment === 'voted') {
        segmentMatch = voter.hasVoted === true;
      }

      const searchMatch =
        voter.fullName.toLowerCase().includes(term) ||
        voter.documentNumber.toLowerCase().includes(term);

      return segmentMatch && searchMatch;
    });
  }
  trackVoter(index: number, voter: ElectorResponse) {
    return voter.documentNumber;
  }

  markAsVoted(voter: ElectorResponse, slidingItem: IonItemSliding) {
    this.electorService.markElectorAsVoted(voter.documentNumber).subscribe({
      next: (updatedVoter) => {
        const index = this.allVoters.findIndex(
          (v) => v.documentNumber === updatedVoter.documentNumber
        );
        if (index > -1) {
          this.allVoters[index] = updatedVoter;
        }
        this.filterVoters();
        slidingItem.close();
      },
      error: async (err) => {
        console.error(err);
        slidingItem.close();
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudo marcar el voto. Intente de nuevo.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }

  reportIncident(voter: ElectorResponse, slidingItem: IonItemSliding) {
    console.log('Reportar incidencia para:', voter.fullName);
    slidingItem.close();
  }
}
