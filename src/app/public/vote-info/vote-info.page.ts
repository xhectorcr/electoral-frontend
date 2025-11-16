import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonBadge,
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
  closeCircleOutline,
  documentText,
  easelOutline,
  idCardOutline,
  listCircleOutline,
  location,
  locationOutline,
  mapOutline,
  person,
  searchOutline,
  shieldCheckmarkOutline,
  walkOutline,
} from 'ionicons/icons';
import { finalize } from 'rxjs';
import { ElectorResponse } from 'src/app/core/model/elector_tools/elector_tools.model';
import { ElectorService } from 'src/app/core/services/elector_tools/elector_tools.service';
import { ReniecService } from 'src/app/core/services/reniec/reniec.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

addIcons({
  searchOutline,
  locationOutline,
  closeCircleOutline,
  person,
  location,
  mapOutline,
  documentText,
  walkOutline,
  shieldCheckmarkOutline,
  listCircleOutline,
  idCardOutline,
  easelOutline,
});

interface PollingStationData {
  institution: string;
  address: string;
  table: string;
  district: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  tableLocationDetail?: string;
}

interface VoterDataView {
  full_name: string;
  document_number: string;
  isTableMember: boolean;
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
    IonBadge,
    HeaderComponent
  ],
  providers: [DatePipe],
})
export class VoteInfoPage implements OnInit {
  dni: string = '';
  showResults: boolean = false;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  voterData: VoterDataView | null = null;
  pollingStationData: PollingStationData | null = null;

  private testElectors: ElectorResponse[] = [];

  constructor(
    private reniecService: ReniecService,
    private electorToolsService: ElectorService
  ) {}

  ngOnInit() {
    this.loadElectors();
  }

  loadElectors() {
    this.electorToolsService.getAllTestElectors().subscribe({
      next: (res) => {
        this.testElectors = res;
        console.log(
          'Electores de prueba cargados localmente:',
          this.testElectors.map((e) => e.documentNumber)
        );
      },
      error: (err) => {
        console.error('No se pudieron cargar los electores de prueba:', err);
      },
    });
  }

  onSearch() {
    if (!this.dni || this.dni.length !== 8) {
      this.errorMessage =
        'Por favor, ingresa un número de DNI válido (8 dígitos).';
      this.showResults = false;
      return;
    }

    // 1. Reiniciar estados
    this.isLoading = true;
    this.showResults = false;
    this.errorMessage = null;
    this.voterData = null;
    this.pollingStationData = null;

    const testElector = this.testElectors.find(
      (e) => e.documentNumber === this.dni
    );

    if (testElector) {
      console.log('DNI encontrado en la lista local de prueba.');

      this.voterData = {
        full_name: testElector.fullName,
        document_number: testElector.documentNumber,
        isTableMember: testElector.tableMember,
      };
      this.pollingStationData = {
        institution: testElector.votingPlaceName,
        address: testElector.votingPlaceAddress,
        table: testElector.tableNumber,
        district: testElector.district,
        latitude: testElector.latitude,
        longitude: testElector.longitude,
        tableLocationDetail: testElector.tableLocationDetail,
        imageUrl: 'assets/images/colegio_san_jose.png',
      };

      this.isLoading = false;
      this.showResults = true;
      return;
    }

    console.log('DNI no encontrado localmente. Consultando Reniec...');
    this.reniecService
      .consultDni(this.dni)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (reniecUser) => {
          this.voterData = {
            full_name: reniecUser.full_name,
            document_number: reniecUser.document_number,
            isTableMember: false,
          };
          this.pollingStationData = this.getSimulatedPollingData(this.dni);
          this.showResults = true;
        },
        error: (err) => {
          console.error('Error final en la búsqueda (Reniec):', err);
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
    if (!this.pollingStationData) return;

    if (this.pollingStationData.latitude && this.pollingStationData.longitude) {
      const lat = this.pollingStationData.latitude;
      const lng = this.pollingStationData.longitude;
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng})`;
      window.open(url, '_blank');
    } else {
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
