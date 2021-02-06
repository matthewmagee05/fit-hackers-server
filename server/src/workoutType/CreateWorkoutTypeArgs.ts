import { ArgsType, Field } from "@nestjs/graphql";
import { WorkoutTypeCreateInput } from "./WorkoutTypeCreateInput";

@ArgsType()
class CreateWorkoutTypeArgs {
  @Field(() => WorkoutTypeCreateInput, { nullable: false })
  data!: WorkoutTypeCreateInput;
}

export { CreateWorkoutTypeArgs };
