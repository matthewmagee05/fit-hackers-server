import { ArgsType, Field } from "@nestjs/graphql";
import { InstructorWorkoutTypeWhereUniqueInput } from "./InstructorWorkoutTypeWhereUniqueInput";

@ArgsType()
class FindOneInstructorWorkoutTypeArgs {
  @Field(() => InstructorWorkoutTypeWhereUniqueInput, { nullable: false })
  where!: InstructorWorkoutTypeWhereUniqueInput;
}

export { FindOneInstructorWorkoutTypeArgs };
