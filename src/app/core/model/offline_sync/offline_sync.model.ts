import { CalendarEventResponse } from "../calendar/calendar.model";
import { CandidateResponse } from "../candidates/candidates.model";
import { PartyResponse } from "../parties/parties.model";
import { TrainingMaterialResponse, WorkerTaskResponse } from "../poll_worker/poll_worker.model";

export interface OfflinePackage {
  packageVersion: string;
  calendarEvents: CalendarEventResponse[];
  parties: PartyResponse[];
  candidates: CandidateResponse[];
  pollWorkerTasks: WorkerTaskResponse[];
  trainingMaterials: TrainingMaterialResponse[];
}
