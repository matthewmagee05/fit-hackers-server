import { ArgsType, Field } from "@nestjs/graphql";
import { WorkoutTypeWhereInput } from "./WorkoutTypeWhereInput";

@ArgsType()
class FindManyWorkoutTypeArgs {
  @Field(() => WorkoutTypeWhereInput, { nullable: true })
  where?: WorkoutTypeWhereInput;
}

export { FindManyWorkoutTypeArgs };
