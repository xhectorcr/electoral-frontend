export interface PartyRequest {
  name: string;
  acronym: string;
  logoUrl: string;
  websiteUrl?: string;
  description?: string;
  planOfGovernmentUrl?: string;
}

// party-response.model.ts
export interface PartyResponse {
  id: number;
  name: string;
  acronym: string;
  logoUrl: string;
  websiteUrl?: string;
  description?: string;
  planOfGovernmentUrl?: string;
}
