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
  IonMenuButton,
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
  ],
})
export class DashboardPage implements OnInit {
  miembroNombre = 'Miembro Pérez';
  mesaNumero = 'Mesa 048192';
  estadoMesa: 'Aperturada' | 'Cerrada' = 'Aperturada';

  totalVotantes = 400;
  votaron = 117;
  votantesPendientes = this.totalVotantes - this.votaron;
  incidenciasReportadas = 2;

  ultimasIncidencias = [
    { titulo: 'Falta de luz en aula', fecha: '09:15 AM' },
    { titulo: 'Elector sin DNI', fecha: '08:40 AM' },
  ];

  get porcentajeParticipacion() {
    if (this.totalVotantes === 0) return 0;
    return Math.round((this.votaron / this.totalVotantes) * 100);
  }

  constructor(private router: Router) {}

  ngOnInit() {}

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
