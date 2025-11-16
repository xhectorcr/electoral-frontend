export interface ElectorRequest {
  documentNumber: string;
  fullName: string;
  department: string;
  province: string;
  district: string;
  votingPlaceName: string;
  votingPlaceAddress: string;
  tableNumber: string;
  tableMember: boolean;
  latitude?: number;
  longitude?: number;
  tableLocationDetail?: string;
}

export interface ElectorResponse {
  documentNumber: string;
  fullName: string;
  department: string;
  province: string;
  district: string;
  votingPlaceName: string;
  votingPlaceAddress: string;
  tableNumber: string;
  tableMember: boolean;
  active: boolean;
  latitude?: number;
  longitude?: number;
  tableLocationDetail?: string;
  hasVoted?: boolean;
}

export interface TableStatsResponse {
  tableNumber: string;
  totalVoters: number;
  votersWhoVoted: number;
  pendingVoters: number;
}
