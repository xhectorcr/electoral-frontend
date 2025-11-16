import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  barChartOutline,
  calendarOutline,
  checkmarkDoneOutline,
  listOutline,
  newspaperOutline,
  peopleOutline,
  personOutline,
  ribbonOutline,
} from 'ionicons/icons';

addIcons({
  'people-outline': peopleOutline,
  'ribbon-outline': ribbonOutline,
  'calendar-outline': calendarOutline,
  'checkmark-done-outline': checkmarkDoneOutline,
  'newspaper-outline': newspaperOutline,
  'person-outline': personOutline,
  'add-circle-outline': addCircleOutline,
  'list-outline': listOutline,
  'bar-chart-outline': barChartOutline,
});

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    FormsModule,
  ],
})
export class HomePage implements OnInit {
  recentCandidates = [
    { name: 'Juan Pérez', party: 'Partido A', office: 'Alcalde' },
    { name: 'María López', party: 'Partido B', office: 'Regidor' },
    { name: 'Carlos García', party: 'Partido C', office: 'Consejal' },
  ];

  recentVotes = [
    { voter: 'Ana Torres', pollStation: 'Mesa 12', time: '08:15' },
    { voter: 'Luis Rojas', pollStation: 'Mesa 03', time: '08:22' },
    { voter: 'Marta Díaz', pollStation: 'Mesa 07', time: '08:30' },
  ];

  constructor() {}
  ngOnInit() {}
}
