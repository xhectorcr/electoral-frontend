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
import { lockClosedOutline, mailOutline } from 'ionicons/icons';

addIcons({
  'mail-outline': mailOutline,
  'lock-closed-outline': lockClosedOutline,
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

  private staticUser = {
    email: 'user',
    password: '123456',
  };

  constructor(private router: Router) {}

  login() {
    if (!this.email.trim() || !this.password.trim()) {
      alert('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    if (
      this.email.trim() === this.staticUser.email &&
      this.password.trim() === this.staticUser.password
    ) {
      console.log('Login OK', this.email, this.password);

      this.router.navigateByUrl('/member/dashboard', { replaceUrl: true });
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  }

  forgotPassword() {
    alert('Función de recuperación aún no implementada.');
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}