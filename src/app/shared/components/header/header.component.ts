import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = 'Elecciones Perú 2026';
  @Input() showBackButton: boolean = false;
  @Input() showMenuButton: boolean = false;

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
