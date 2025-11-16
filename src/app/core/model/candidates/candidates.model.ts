export interface HdvResponseDTO {
  placeOfBirth: string;
  departament: string;
  province: string;
  district: string;
  address: string;
  employmentRecord: string;

  technicalStudies: string;
  studyTime: string;
  academicFormation: string;
  previousPositions: string;

  occupations: string;
  since: string;
  active: boolean;
}

export interface CandidateResponseDTO {
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
  hdv: HdvResponseDTO;
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
