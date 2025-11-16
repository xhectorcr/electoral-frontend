import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePe from '@angular/common/locales/es-PE';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  chevronDownOutline,
  refreshOutline,
  warningOutline,
} from 'ionicons/icons';
import { finalize, forkJoin } from 'rxjs';
import {
  CalendarEventResponse,
  CalendarEventType,
} from 'src/app/core/model/calendar/calendar.model';
import { CalendarService } from 'src/app/core/services/calendar/calendar.service';

registerLocaleData(localePe, 'es-PE');

interface ElectoralEvent {
  severity: 'CRÍTICO' | 'IMPORTANTE';
  category: string;
  displayDate: string;
  sortDate: Date;
  title: string;
  description: string;
}

interface HighlightedDate {
  date: string;
  textColor: string;
  backgroundColor: string;
}

addIcons({
  calendarOutline,
  chevronDownOutline,
  warningOutline,
  refreshOutline,
});

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonRow,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonTitle,
    IonToolbar,
    IonButton,
    IonDatetime,
    IonNote,
  ],
  providers: [DatePipe],
})
export class CalendarPage implements OnInit {
  allEvents: ElectoralEvent[] = [];
  filteredEvents: ElectoralEvent[] = [];
  categories: string[] = [];
  highlightedDates: HighlightedDate[] = [];

  // Estado de UI
  selectedCategory: string = 'all';
  sortOrder: string = 'recent';
  isLoading: boolean = false;
  errorMessage: string | null = null;
  selectedDateValue: string | string[] | null = null;
  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;

  constructor(
    private calendarService: CalendarService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loadCalendarData();
  }

  loadCalendarData() {
    this.isLoading = true;
    this.errorMessage = null;
    this.allEvents = [];
    this.filteredEvents = [];

    forkJoin({
      general: this.calendarService.getGeneralCalendar(),
      pollWorkers: this.calendarService.getPollWorkerCalendar(),
    })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: ({ general, pollWorkers }) => {
          const all = [...general, ...pollWorkers];
          this.allEvents = all.map((event) =>
            this.transformToElectoralEvent(event)
          );

          this.categories = [...new Set(this.allEvents.map((e) => e.category))];
          this.generateHighlightedDates();
          this.filterAndSortEvents();
        },
        error: (err) => {
          console.error('Error fetching calendar:', err);
          this.errorMessage =
            'No se pudo cargar el calendario. Intenta más tarde.';
        },
      });
  }

  private generateHighlightedDates() {
    const dates = new Set<string>();
    this.allEvents.forEach((event) => {
      const dateString = this.datePipe.transform(event.sortDate, 'yyyy-MM-dd');
      if (dateString) {
        dates.add(dateString);
      }
    });

    this.highlightedDates = Array.from(dates).map((date) => ({
      date: date,
      textColor: '#ffffff',
      backgroundColor: 'var(--ion-color-primary)',
    }));
  }

  private transformToElectoralEvent(
    event: CalendarEventResponse
  ): ElectoralEvent {
    let severity: 'CRÍTICO' | 'IMPORTANTE' = 'IMPORTANTE';
    if (event.title.includes('ELECCIONES') || event.title.includes('VUELTA')) {
      severity = 'CRÍTICO';
    }

    let category: string;
    switch (event.type) {
      case CalendarEventType.POLL_WORKER:
        category = 'Miembros de mesa';
        break;
      case CalendarEventType.GENERAL:
        category = 'General';
        break;
      default:
        category = 'Preparación';
    }

    const sortDate = new Date(event.eventDate);
    const displayDate =
      this.datePipe.transform(
        sortDate,
        "EEEE d 'de' MMMM 'de' yyyy",
        'es-PE'
      ) || event.eventDate;

    return {
      severity: severity,
      category: category,
      displayDate: displayDate.charAt(0).toUpperCase() + displayDate.slice(1),
      sortDate: sortDate,
      title: event.title,
      description: event.description,
    };
  }

  onDateSelected(event: any) {
    const value = event.detail.value;

    if (Array.isArray(value)) {
      this.selectedStartDate = this.formatDate(value[0]);
      this.selectedEndDate = this.formatDate(value[value.length - 1]);

      this.selectedDateValue = [this.selectedStartDate, this.selectedEndDate];
    } else {
      this.selectedStartDate = this.formatDate(value);
      this.selectedEndDate = this.selectedStartDate;
      this.selectedDateValue = this.selectedStartDate;
    }
    this.filterAndSortEvents();
  }

  filterAndSortEvents() {
    let events = [...this.allEvents];

    if (this.selectedStartDate && this.selectedEndDate) {
      events = events.filter((event) => {
        const eventDateStr = this.formatDate(event.sortDate);
        return (
          eventDateStr! >= this.selectedStartDate! &&
          eventDateStr! <= this.selectedEndDate!
        );
      });
    }
    if (this.selectedCategory !== 'all') {
      events = events.filter(
        (event) => event.category === this.selectedCategory
      );
    }

    events.sort((a, b) => {
      if (this.sortOrder === 'recent') {
        return a.sortDate.getTime() - b.sortDate.getTime();
      } else {
        return b.sortDate.getTime() - a.sortDate.getTime();
      }
    });

    this.filteredEvents = events;
  }

  onDateRangeSelected(event: any) {
    const range = event.detail.value;
    this.selectedStartDate = range?.start || null;
    this.selectedEndDate = range?.end || null;
    this.filterAndSortEvents();
  }

  clearDateFilter() {
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    this.selectedDateValue = null;
    this.filterAndSortEvents();
  }

  private formatDate(date: any): string {
    const formatted = this.datePipe.transform(date, 'yyyy-MM-dd');
    if (!formatted) {
      return '';
    }
    return formatted;
  }
}
