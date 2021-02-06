import { InstructorWhereUniqueInput } from "../instructor/InstructorWhereUniqueInput";
import { PlatformWhereUniqueInput } from "../platform/PlatformWhereUniqueInput";
import { WorkoutTypeWhereUniqueInput } from "../workoutType/WorkoutTypeWhereUniqueInput";

export type Class = {
  createdAt: Date;
  description: string | null;
  id: string;
  instructor: InstructorWhereUniqueInput | null;
  platform: PlatformWhereUniqueInput;
  time: Date;
  updatedAt: Date;
  workoutType: WorkoutTypeWhereUniqueInput;
};
