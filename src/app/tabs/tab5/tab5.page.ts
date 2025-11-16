import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [IonContent, RouterOutlet],
})
export class Tab5Page implements OnInit {
  constructor() {}

  ngOnInit() {}
}
