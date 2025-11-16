import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ReniecService } from 'src/app/core/services/reniec/reniec.service';

@Component({
  selector: 'app-reniec',
  templateUrl: './reniec.page.html',
  styleUrls: ['./reniec.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ReniecPage implements OnInit {

  constructor(private reniecSerivce: ReniecService) { }

  ngOnInit() {
  }

}
