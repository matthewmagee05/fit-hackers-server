import { ArgsType, Field } from "@nestjs/graphql";
import { InstructorWorkoutTypeWhereInput } from "./InstructorWorkoutTypeWhereInput";

@ArgsType()
class FindManyInstructorWorkoutTypeArgs {
  @Field(() => InstructorWorkoutTypeWhereInput, { nullable: true })
  where?: InstructorWorkoutTypeWhereInput;
}

export { FindManyInstructorWorkoutTypeArgs };
