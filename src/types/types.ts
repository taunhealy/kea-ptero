export interface Journey {
  id: number;
  habitName: string;
  streak: number;
  lives: number;
  treatDays: number;
  status: string;
  onClick?: () => void;
}

export interface UpdateJourneyParams {
  journeyId: number;
  success: boolean;
}
