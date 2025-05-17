// export interface DayWorkout {
//   id: string;
//   day?: string;
//   warm_up?: string;
//   exercises?: string[];
//   activities?: string;
// }
// export interface WorkoutSchedule {
//   [key: string]: DayWorkout;
// }

export interface DayWorkout {
  id?: string;
  day: string;
  warm_up?: string;
  exercises?: string[];
  activities?: string;
}

export interface WorkoutSchedule {
  [key: string]: DayWorkout;
  _id?: string;
}