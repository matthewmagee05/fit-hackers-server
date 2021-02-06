import { ArgsType, Field } from "@nestjs/graphql";
import { WorkoutTypeWhereUniqueInput } from "./WorkoutTypeWhereUniqueInput";

@ArgsType()
class DeleteWorkoutTypeArgs {
  @Field(() => WorkoutTypeWhereUniqueInput, { nullable: false })
  where!: WorkoutTypeWhereUniqueInput;
}

export { DeleteWorkoutTypeArgs };
