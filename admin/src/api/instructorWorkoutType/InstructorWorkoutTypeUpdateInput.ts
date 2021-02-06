import { InstructorWhereUniqueInput } from "../instructor/InstructorWhereUniqueInput";
import { WorkoutTypeWhereUniqueInput } from "../workoutType/WorkoutTypeWhereUniqueInput";

export type InstructorWorkoutTypeUpdateInput = {
  instructor?: InstructorWhereUniqueInput;
  workoutType?: WorkoutTypeWhereUniqueInput | null;
};
