import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSegmentButton,
  IonSpinner,
  NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, idCardOutline } from 'ionicons/icons';
import { finalize } from 'rxjs';
import { LoginRequest } from 'src/app/core/model/auth/auth.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

addIcons({
  arrowBackOutline,
  idCardOutline,
});

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonSegmentButton,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    FormsModule,
    CommonModule,
    IonSpinner,
    IonLabel,
  ],
})
export class LoginPage {
  dni = '';
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert-class',
    });
    await alert.present();
  }

  async login() {
    if (!this.dni.trim() || this.dni.length !== 8) {
      await this.presentAlert(
        'DNI Inválido',
        'Por favor, ingresa un DNI válido de 8 dígitos.'
      );
      return;
    }

    this.loading = true;
    const passToSend = this.dni.trim();

    const request: LoginRequest = {
      usernameOrEmail: this.dni.trim(),
      password: passToSend,
    };

    this.authService
      .login(request)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: async (res) => {
          if (res.success) {
            this.authService.setToken(res.data.accessToken);
            this.router.navigateByUrl('/member/dashboard', {
              replaceUrl: true,
            });
          } else {
            await this.presentAlert(
              'Error',
              res.message || 'Error en el login.'
            );
          }
        },
        error: async (err) => {
          console.error(err);
          await this.presentAlert(
            'Error al Ingresar',
            err.error?.message || 'Ocurrió un error al iniciar sesión.'
          );
        },
      });
  }

  goBack() {
    this.navCtrl.back();
  }
}
