import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
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
  IonRefresher,
  IonRefresherContent,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
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
import { finalize } from 'rxjs';
import {
  IncidentRequest,
  IncidentResponse,
  IncidentStatus,
  IncidentType,
} from 'src/app/core/model/incident/incident.model';
import { IncidentService } from 'src/app/core/services/incident/incident.service';

addIcons({
  add,
  warningOutline,
  timeOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  personOutline,
});

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
    IonSpinner,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class IncidentsPage implements OnInit {
  allIncidents: IncidentResponse[] = [];
  filteredIncidents: IncidentResponse[] = [];

  selectedSegment: 'all' | IncidentStatus = 'all';
  IncidentStatus = IncidentStatus;
  IncidentType = IncidentType;

  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private incidentService: IncidentService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadIncidents();
  }

  loadIncidents(event: any = null) {
    if (!event) {
      this.isLoading = true;
    }
    this.errorMessage = null;

    this.incidentService
      .getIncidentsForMyTable()
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
          this.allIncidents = data;
          this.filterIncidents();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'No se pudieron cargar los incidentes.';
        },
      });
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

  getIconForType(type: string): string {
    switch (type) {
      case IncidentType.VOTANTE:
        return 'person-outline';
      case IncidentType.MATERIAL:
        return 'warning-outline';
      case IncidentType.SEGURIDAD:
        return 'alert-circle-outline';
      case IncidentType.OTRO:
        return 'clipboard-outline';
      default:
        return 'warning-outline';
    }
  }

  trackIncident(index: number, incident: IncidentResponse) {
    return incident.id;
  }

  async viewIncident(incident: IncidentResponse) {
    console.log('Viendo detalle de:', incident.title);
    const alert = await this.alertCtrl.create({
      header: incident.title,
      subHeader: `${incident.type} - ${incident.status}`,
      message: `
        <p>${incident.description}</p>
        <br>
        <p><strong>Reportado por:</strong> ${incident.reportedByFullName}</p>
        ${
          incident.subjectFullName
            ? `<p><strong>Votante afectado:</strong> ${incident.subjectFullName}</p>`
            : ''
        }
      `,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentIncidentModal() {
    const alert = await this.alertCtrl.create({
      header: 'Reportar Nuevo Incidente',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Título (ej. "Votante agresivo")',
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Describe lo que pasó...',
        },
        {
          name: 'subjectDni',
          type: 'tel',
          placeholder: 'DNI del votante (Opcional)',
          attributes: {
            maxlength: 8,
          },
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (!data.title || !data.description) {
              this.presentToast('El título y la descripción son obligatorios.');
              return false;
            }
            this.createIncident(
              data.title,
              data.description,
              IncidentType.OTRO,
              data.subjectDni
            );
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  createIncident(
    title: string,
    description: string,
    type: IncidentType,
    subjectDni?: string
  ) {
    const request: IncidentRequest = {
      title,
      description,
      type,
      subjectDni: subjectDni || undefined,
    };

    this.incidentService.createIncident(request).subscribe({
      next: (newIncident) => {
        this.allIncidents.unshift(newIncident);
        this.filterIncidents();
        this.presentToast('Incidente reportado con éxito.');
      },
      error: (err) => {
        console.error(err);
        this.presentToast('Error al reportar el incidente.', 'danger');
      },
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert-class',
    });
    await alert.present();
  }

  async presentToast(message: string, color: string = 'success') {
    await this.presentAlert(color === 'success' ? 'Éxito' : 'Error', message);
  }
}
