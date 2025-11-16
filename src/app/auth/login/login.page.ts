import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgForm AÑADIDO
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  eyeOffOutline,
  eyeOutline,
  idCardOutline,
  lockClosedOutline,
  mailOutline,
} from 'ionicons/icons';
import { finalize } from 'rxjs';
import { LoginRequest } from 'src/app/core/model/auth/auth.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

addIcons({
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  arrowBackOutline,
  idCardOutline,
});
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    FormsModule,
    CommonModule,
    IonSpinner,
    IonSegment,
    IonSegmentButton,
    IonLabel,
  ],
})
export class LoginPage {
  loginMode: 'public' | 'member' = 'public';
  loginIdentifier = '';
  password = '';
  loading = false;
  showPassword = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    let passToSend = this.password.trim();

    if (!this.loginIdentifier.trim()) {
      alert('Por favor, ingresa tu DNI o correo.');
      return;
    }

    if (this.loginMode === 'member') {
      if (this.loginIdentifier.length !== 8) {
        alert('Por favor, ingresa un DNI válido de 8 dígitos.');
        return;
      }
      passToSend = this.loginIdentifier.trim();
    } else {
      if (!passToSend) {
        alert('Por favor, ingresa tu contraseña.');
        return;
      }
    }

    this.loading = true;

    const request: LoginRequest = {
      usernameOrEmail: this.loginIdentifier.trim(),
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
        next: (res) => {
          if (res.success) {
            this.authService.setToken(res.data.accessToken);
            this.router.navigateByUrl('/member/dashboard', {
              replaceUrl: true,
            });
          } else {
            alert(res.message || 'Error en el login.');
          }
        },
        error: (err) => {
          console.error(err);
          alert(err.error?.message || 'Ocurrió un error al iniciar sesión.');
        },
      });
  }

  forgotPassword() {
    alert('Función de recuperación aún no implementada.');
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goBack() {
    this.navCtrl.back();
  }
}
