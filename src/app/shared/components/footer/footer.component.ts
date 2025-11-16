import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() text?: string;
  @Input() showBorder: boolean = false;

  currentYear: number = new Date().getFullYear();

  constructor() {}

  get displayText(): string {
    return this.text || `Elecciones Perú ${this.currentYear} ©. Todos los derechos reservados`;
  }
}