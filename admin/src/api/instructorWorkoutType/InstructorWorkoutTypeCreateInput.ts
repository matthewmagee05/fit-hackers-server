import { InstructorWhereUniqueInput } from "../instructor/InstructorWhereUniqueInput";
import { WorkoutTypeWhereUniqueInput } from "../workoutType/WorkoutTypeWhereUniqueInput";

export type InstructorWorkoutTypeCreateInput = {
  instructor: InstructorWhereUniqueInput;
  workoutType?: WorkoutTypeWhereUniqueInput | null;
};
