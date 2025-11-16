export enum PollWorkerRole {
  PRESIDENT = 'PRESIDENT',
  SECRETARY = 'SECRETARY',
  THIRD_MEMBER = 'THIRD_MEMBER',
  SUBSTITUTE = 'SUBSTITUTE',
}

export interface PollWorkerResponse {
  assignmentId: number;
  username: string;
  role: PollWorkerRole;
  pollStationName: string;
  pollStationTable: string;
  tasks: WorkerTaskResponse[];
  trainingMaterials: TrainingMaterialResponse[];
}

export interface WorkerTaskResponse {
  id: number;
  stage: string;
  description: string;
  taskOrder: number;
  imageUrl: string;
}

export interface TrainingMaterialResponse {
  id: number;
  title: string;
  description: string;
  materialUrl: string;
  thumbnailUrl: string;
}

export interface AssignWorkerRequest {
  userId: number;
  role: PollWorkerRole;
  pollStationName: string;
  pollStationTable: string;
}

export interface TrainingMaterialRequest {
  title: string;
  description?: string;
  materialUrl: string;
  thumbnailUrl?: string;
}

export interface WorkerTaskRequest {
  stage: string;
  description: string;
  taskOrder: number;
  imageUrl?: string;
}
