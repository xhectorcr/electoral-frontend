import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.page.html',
  styleUrls: ['./candidate-card.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CandidateCardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
