export interface Journey {
  id: number;
  habitName: string;
  streak: number;
  lives: number;
  treatDays: number;
  status: string;
  checkedIn: boolean;
  onClick?: () => void;
  lastCheckedIn: Date;
}

export interface UpdateJourneyParams {
  journeyId: number;
  success: boolean;
}
