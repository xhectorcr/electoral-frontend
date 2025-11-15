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

  constructor(private router: Router) {}

  login() {
    if (this.email.trim() && this.password.trim()) {
      console.log('Login OK', this.email, this.password);
      this.router.navigate(['/tabs']);
    } else {
      alert('Por favor, ingresa tu correo y contraseña.');
    }
  }

  forgotPassword() {
    alert('Función de recuperación aún no implementada.');
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
