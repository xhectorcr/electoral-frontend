export interface CandidateResponse {
  id: number;
  fullName: string;
  documentNumber: string;
  office: string;
  region: string;
  partyName: string;
  imageUrl: string;
  resumeUrl: string;
  planUrl: string;
  active: boolean;
}

// candidate-request.model.ts
export interface CandidateRequest {
  fullName: string;
  documentNumber: string;
  office: string;
  region: string;
  partyId: number;
  imageUrl?: string;
  resumeUrl: string;
  planUrl: string;
}
