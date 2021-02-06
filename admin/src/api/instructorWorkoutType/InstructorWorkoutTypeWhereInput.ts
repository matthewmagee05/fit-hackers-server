import { InstructorWhereUniqueInput } from "../instructor/InstructorWhereUniqueInput";
import { WorkoutTypeWhereUniqueInput } from "../workoutType/WorkoutTypeWhereUniqueInput";

export type InstructorWorkoutTypeWhereInput = {
  createdAt?: Date;
  id?: string;
  instructor?: InstructorWhereUniqueInput;
  updatedAt?: Date;
  workoutType?: WorkoutTypeWhereUniqueInput | null;
};
