import { ArgsType, Field } from "@nestjs/graphql";
import { InstructorWorkoutTypeWhereUniqueInput } from "./InstructorWorkoutTypeWhereUniqueInput";
import { InstructorWorkoutTypeUpdateInput } from "./InstructorWorkoutTypeUpdateInput";

@ArgsType()
class UpdateInstructorWorkoutTypeArgs {
  @Field(() => InstructorWorkoutTypeWhereUniqueInput, { nullable: false })
  where!: InstructorWorkoutTypeWhereUniqueInput;
  @Field(() => InstructorWorkoutTypeUpdateInput, { nullable: false })
  data!: InstructorWorkoutTypeUpdateInput;
}

export { UpdateInstructorWorkoutTypeArgs };
