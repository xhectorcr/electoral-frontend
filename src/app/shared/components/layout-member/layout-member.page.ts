import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonNote,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  homeOutline,
  logOutOutline,
  peopleOutline,
  settingsOutline,
  warningOutline,
} from 'ionicons/icons';
import { Observable } from 'rxjs';
import { UserProfileResponse } from 'src/app/core/model/user/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

addIcons({
  'home-outline': homeOutline,
  'people-outline': peopleOutline,
  'warning-outline': warningOutline,
  'settings-outline': settingsOutline,
  'book-outline': bookOutline,
  'log-out-outline': logOutOutline,
});

@Component({
  selector: 'app-layout-member',
  templateUrl: './layout-member.page.html',
  styleUrls: ['./layout-member.page.scss'],
  standalone: true,
  imports: [
    IonRouterOutlet,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonMenu,
    IonIcon,
    CommonModule,
    FormsModule,
    RouterModule,
    IonAvatar,
    IonListHeader,
    IonMenuButton,
    IonNote,
  ],
})
export class LayoutMemberPage {
  public userProfile$: Observable<UserProfileResponse | null>;

  constructor(private router: Router, private authService: AuthService) {
    this.userProfile$ = this.authService.currentUser$;
  }

  ngOnInit() {}

  logout() {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    this.authService.logoutAll(token).subscribe({
      next: () => {
        console.log('Logout exitoso');
      },
      error: (err) => {
        console.error('Error en logout, forzando cierre local:', err);
        this.authService.removeToken();
        this.router.navigate(['/login'], { replaceUrl: true });
      },
    });
  }
}
