import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { filter } from 'rxjs';
import { ChatbotPage } from './shared/components/chatbot/chatbot.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, ChatbotPage, CommonModule],
})
export class AppComponent {
  showChatbot = false;

  constructor(private router: Router) {
    this.listenToRouteChanges();
  }

  listenToRouteChanges() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;

        const publicRoutes = [
          '/tabs',
          '/candidate-detail',
          '/news',
          '/calendar',
        ];

        this.showChatbot = publicRoutes.some((route) => url.startsWith(route));
      });
  }
}
