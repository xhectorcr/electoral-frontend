import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { barChartOutline } from 'ionicons/icons';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

addIcons({
  calendar: barChartOutline,
});

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderComponent, FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePage {
  constructor(private router: Router) {}


  navigateToCandidates() {
   
    this.router.navigate(['/tabs', 'tab2']);
  }

  navigateToCalendar() {
   
    this.router.navigate(['/calendar']);
  }

  navigateToVote() {

    this.router.navigate(['/tabs', 'tab4']);
  }

 navigateToLegal() {
  window.open('https://portal.jne.gob.pe/portal_documentos/files/41f93b7f-d414-47e4-97cd-eec13b1cf6c8.pdf');
}

  
}
