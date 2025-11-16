import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { finalize } from 'rxjs';
import { NewsResponse } from 'src/app/core/model/news/news.model';
import { NewsService } from 'src/app/core/services/news/news.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonCardSubtitle,
    IonItem,
    IonLabel,
    IonSpinner,
    IonRefresher,
    IonRefresherContent,
    IonNote,
    DatePipe,
    HeaderComponent
  ],
})
export class NewsPage implements OnInit {
  newsList: NewsResponse[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.fetchNews();
  }

  fetchNews(event: any = null) {
    this.isLoading = event ? false : true;
    this.errorMessage = null;

    this.newsService
      .getNews()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) {
            event.target.complete();
          }
        })
      )
      .subscribe({
        next: (news) => {
          this.newsList = news.sort(
            (a, b) =>
              new Date(b.published).getTime() - new Date(a.published).getTime()
          );
        },
        error: (err) => {
          console.error('Error fetching news:', err);
          this.errorMessage =
            'No se pudieron cargar las noticias. Intenta más tarde.';
        },
      });
  }

  handleRefresh(event: any) {
    this.fetchNews(event);
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
