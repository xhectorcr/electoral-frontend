export enum IncidentStatus {
  PENDIENTE = 'PENDIENTE',
  RESUELTO = 'RESUELTO',
}

export enum IncidentType {
  VOTANTE = 'VOTANTE',
  MATERIAL = 'MATERIAL',
  SEGURIDAD = 'SEGURIDAD',
  OTRO = 'OTRO',
}

export interface IncidentRequest {
  title: string;
  description: string;
  type: string;
  subjectDni?: string;
}

export interface IncidentResponse {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  tableNumber?: string;
  reportedByFullName?: string;
  subjectDni?: string;
  subjectFullName?: string;
  createdAt: string;
}
