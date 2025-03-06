export interface DayWorkout {
  day?: string;
  warm_up?: string;
  exercises?: string[];
  activities?: string;
}
export interface WorkoutSchedule {
  [key: string]: DayWorkout;
}