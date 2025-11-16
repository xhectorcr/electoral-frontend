export interface VoteCountProjection {
  itemId: number;
  itemName: string;
  voteCount: number;
}

export interface VoteRequest {
  candidateId: number;
}
