import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chatbubblesOutline,
  closeCircleOutline,
  sendOutline,
} from 'ionicons/icons';
import { finalize } from 'rxjs';
import { ChatRequest } from 'src/app/core/model/chatBot/chatBot.model';
import { ChatService } from 'src/app/core/services/chatBot/chatBot.service';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonFooter,
    IonInput,
    IonButton,
    IonSpinner,
    IonButtons,
    IonAvatar,
  ],
})
export class ChatbotPage implements OnInit {
  @ViewChild('chatEnd') chatEnd: any;

  isOpen = false;

  messages: ChatMessage[] = [];
  newMessage: string = '';
  isLoading: boolean = false;

  constructor(private chatService: ChatService) {
    addIcons({ chatbubblesOutline, closeCircleOutline, sendOutline });
  }

  ngOnInit() {
    this.addWelcomeMessage();
  }

  addWelcomeMessage() {
    this.messages.push({
      sender: 'bot',
      text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
    });
  }

  openChat() {
    this.isOpen = true;
    if (this.messages.length === 0) {
      this.addWelcomeMessage();
    }
  }

  closeChat() {
    this.isOpen = false;
  }

  sendMessage() {
    const userMessage = this.newMessage.trim();
    if (userMessage === '' || this.isLoading) {
      return;
    }

    this.messages.push({ sender: 'user', text: userMessage });
    this.newMessage = '';
    this.isLoading = true;
    this.scrollToBottom();

    const request: ChatRequest = {
      mensaje: userMessage,
      usuarioId: 1,
    };

    this.chatService
      .preguntar(request)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.scrollToBottom();
        })
      )
      .subscribe({
        next: (response) => {
          this.messages.push({ sender: 'bot', text: response.respuesta });
        },
        error: (err) => {
          console.error('Error al contactar al chatbot:', err);
          this.messages.push({
            sender: 'bot',
            text: 'Lo siento, estoy teniendo problemas para conectarme. Inténtalo de nuevo más tarde.',
          });
        },
      });
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatEnd) {
        this.chatEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}
