import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  barChartOutline,
  calendarOutline,
  checkmarkDoneOutline,
  listCircleOutline,
  listOutline,
  locationOutline,
  newspaperOutline,
  peopleOutline,
  personOutline,
  ribbonOutline,
  searchOutline,
  walkOutline,
} from 'ionicons/icons';
import { finalize } from 'rxjs';
import { ReniecResponse } from 'src/app/core/model/reniec/reniec.model';
import { ReniecService } from 'src/app/core/services/reniec/reniec.service';

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
  'walk-outline': walkOutline,
  'list-circle-outline': listCircleOutline,
  'location-outline': locationOutline,
});

interface PollingStationData {
  institution: string;
  address: string;
  table: string;
  district: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-vote-info',
  templateUrl: './vote-info.page.html',
  styleUrls: ['./vote-info.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterModule,
    IonItem,
    IonInput,
    IonIcon,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonLabel,
  ],
})
export class VoteInfoPage implements OnInit {
  dni: string = '';
  showResults: boolean = false;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  voterData: ReniecResponse | null = null;
  pollingStationData: PollingStationData | null = null;

  constructor(private reniecService: ReniecService) {}

  ngOnInit() {}

  onSearch() {
    if (!this.dni || this.dni.length !== 8) {
      this.errorMessage =
        'Por favor, ingresa un número de DNI válido (8 dígitos).';
      this.showResults = false;
      return;
    }

    this.isLoading = true;
    this.showResults = false;
    this.errorMessage = null;
    this.voterData = null;
    this.pollingStationData = null;

    this.reniecService
      .consultDni(this.dni)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.voterData = response;
          this.pollingStationData = this.getSimulatedPollingData(this.dni);
          this.showResults = true;
        },
        error: (err) => {
          console.error('Error al consultar DNI:', err);
          this.errorMessage =
            'No se pudo encontrar el DNI. Verifica el número e intenta de nuevo.';
          this.showResults = false;
        },
      });
  }

  private getSimulatedPollingData(dni: string): PollingStationData {
    const lastDigit = parseInt(dni.charAt(7), 10);

    const schools = [
      'I.E. San José',
      'I.E. San Luis Gonzaga',
      'I.E. Nuestra Sra. de las Mercedes',
    ];

    const addresses = [
      'Av. Túpac Amaru 303, Ica',
      'Av. San Martín 123, Ica',
      'Av. Grau 567, Ica',
    ];

    const tables = ['048198', '048192', '048194'];

    const images = [
      'assets/images/colegio_san_jose.png',
      'assets/images/san_luis_gonzaga.png',
      'assets/images/nuestra_mercedes.jpg',
    ];

    const index = lastDigit % 3;

    return {
      institution: schools[index],
      address: addresses[index],
      table: tables[index],
      district: 'Ica',
      imageUrl: images[index],
    };
  }

  openMap() {
    if (this.pollingStationData) {
      const query = encodeURIComponent(
        `${this.pollingStationData.institution}, ${this.pollingStationData.address}`
      );
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${query}`,
        '_blank'
      );
    }
  }
}
