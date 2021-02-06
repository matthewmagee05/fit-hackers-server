import { InstructorWhereUniqueInput } from "../instructor/InstructorWhereUniqueInput";
import { PlatformWhereUniqueInput } from "../platform/PlatformWhereUniqueInput";
import { WorkoutTypeWhereUniqueInput } from "../workoutType/WorkoutTypeWhereUniqueInput";

export type ClassUpdateInput = {
  description?: string | null;
  instructor?: InstructorWhereUniqueInput | null;
  platform?: PlatformWhereUniqueInput;
  time?: Date;
  workoutType?: WorkoutTypeWhereUniqueInput;
};
