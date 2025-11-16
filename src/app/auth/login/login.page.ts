import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  mailOutline,
} from 'ionicons/icons';
import { LoginRequest } from 'src/app/core/model/auth/auth.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

addIcons({
  'mail-outline': mailOutline,
  'lock-closed-outline': lockClosedOutline,
  'eye-outline': eyeOutline,
  'eye-off-outline': eyeOffOutline,
});

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonItem, IonInput, IonButton, IonIcon, FormsModule],
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;
  showPassword = false;

  constructor(private router: Router, private authService: AuthService) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.email.trim() || !this.password.trim()) {
      alert('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    this.loading = true;

    const request: LoginRequest = {
      usernameOrEmail: this.email.trim(),
      password: this.password.trim(),
    };

    this.authService.login(request).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.success) {
          this.authService.setToken(res.data.accessToken);

          this.router.navigateByUrl('/member/dashboard', { replaceUrl: true });
        } else {
          alert(res.message || 'Error en el login.');
        }
      },
      error: (err) => {
        this.loading = false;
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
}
