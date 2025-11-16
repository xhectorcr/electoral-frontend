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
  searchOutline,
} from 'ionicons/icons';

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
});

@Component({
  selector: 'app-vote-info',
  templateUrl: './vote-info.page.html',
  styleUrls: ['./vote-info.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class VoteInfoPage implements OnInit {
  dni: string = '';
  showResults: boolean = false;

  constructor() {}

  ngOnInit() {}

  onSearch() {
    if (this.dni && this.dni.length === 8) {
      console.log('Buscando DNI:', this.dni);
      this.showResults = true;
    } else {
      console.log('DNI no válido');
      this.showResults = false;
    }
  }
}
