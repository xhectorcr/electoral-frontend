import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonListHeader,
  IonMenuButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkboxOutline,
  listOutline,
  personOutline,
  warningOutline,
} from 'ionicons/icons';
import { finalize, Observable } from 'rxjs';
import { ElectorResponse } from 'src/app/core/model/elector_tools/elector_tools.model';
import { UserProfileResponse } from 'src/app/core/model/user/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ElectorService } from 'src/app/core/services/elector_tools/elector_tools.service';

addIcons({
  'person-outline': personOutline,
  'warning-outline': warningOutline,
  'list-outline': listOutline,
  'checkbox-outline': checkboxOutline,
});

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonListHeader,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonButton,
    IonButtons,
    IonIcon,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonSpinner,
  ],
})
export class DashboardPage implements OnInit {
  user$!: Observable<UserProfileResponse | null>;

  mesaData: ElectorResponse | null = null;
  isLoadingMesa = false;

  estadoMesa: 'Aperturada' | 'Cerrada' = 'Aperturada';
  totalVotantes = 400;
  votaron = 117;
  get votantesPendientes() {
    return this.totalVotantes - this.votaron;
  }
  incidenciasReportadas = 2;
  ultimasIncidencias = [
    { titulo: 'Falta de luz en aula', fecha: '09:15 AM' },
    { titulo: 'Elector sin DNI', fecha: '08:40 AM' },
  ];

  get porcentajeParticipacion() {
    if (this.totalVotantes === 0) return 0;
    return Math.round((this.votaron / this.totalVotantes) * 100);
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private electorService: ElectorService
  ) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.loadMesaData();
  }

  loadMesaData() {
    this.isLoadingMesa = true;
    this.electorService
      .getMyVotingInfo()
      .pipe(
        finalize(() => {
          this.isLoadingMesa = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.mesaData = data;
        },
        error: (err) => {
          console.error('Error cargando datos de la mesa:', err);
        },
      });
  }

  registrarAsistencia() {
    console.log('Clic en Registrar Asistencia');
  }
  verPendientes() {
    console.log('Navegando a Votantes...');
    this.router.navigate(['/member/voters']);
  }
  verIncidencias() {
    console.log('Navegando a Incidentes...');
    this.router.navigate(['/member/incidents']);
  }
  manualVotacion() {
    console.log('Clic en Registrar Voto');
    this.router.navigate(['/member/manual']);
  }
  reportarIncidencia() {
    console.log('Navegando a Incidentes para reportar...');
    this.router.navigate(['/member/incidents']);
  }
  cerrarMesa() {
    console.log('Cerrando mesa...');
    this.estadoMesa = 'Cerrada';
  }
  reabrirMesa() {
    console.log('Reabriendo mesa...');
    this.estadoMesa = 'Aperturada';
  }
}
