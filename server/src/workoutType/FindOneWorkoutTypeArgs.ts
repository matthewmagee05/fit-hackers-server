import { ArgsType, Field } from "@nestjs/graphql";
import { WorkoutTypeWhereUniqueInput } from "./WorkoutTypeWhereUniqueInput";

@ArgsType()
class FindOneWorkoutTypeArgs {
  @Field(() => WorkoutTypeWhereUniqueInput, { nullable: false })
  where!: WorkoutTypeWhereUniqueInput;
}

export { FindOneWorkoutTypeArgs };
