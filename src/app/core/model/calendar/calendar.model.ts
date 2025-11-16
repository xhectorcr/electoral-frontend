export enum CalendarEventType {
  GENERAL = 'GENERAL',
  POLL_WORKER = 'POLL_WORKER',
}

export interface CalendarEventResponse {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  type: CalendarEventType;
  imageUrl: string;
}

export interface CalendarEventRequest {
  title: string;
  description?: string;
  eventDate: string;
  type: CalendarEventType;
  imageUrl?: string;
}
