import { VoteCountProjection } from '../projections/vote-count.model';

export interface ResultsResponse {
  totalVotesCasted: number;
  lastUpdated: string;
  candidateResults: VoteCountProjection[];
  partyResults: VoteCountProjection[];
}
