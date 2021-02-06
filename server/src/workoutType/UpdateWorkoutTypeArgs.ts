import { ArgsType, Field } from "@nestjs/graphql";
import { WorkoutTypeWhereUniqueInput } from "./WorkoutTypeWhereUniqueInput";
import { WorkoutTypeUpdateInput } from "./WorkoutTypeUpdateInput";

@ArgsType()
class UpdateWorkoutTypeArgs {
  @Field(() => WorkoutTypeWhereUniqueInput, { nullable: false })
  where!: WorkoutTypeWhereUniqueInput;
  @Field(() => WorkoutTypeUpdateInput, { nullable: false })
  data!: WorkoutTypeUpdateInput;
}

export { UpdateWorkoutTypeArgs };
