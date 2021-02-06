import { ArgsType, Field } from "@nestjs/graphql";
import { InstructorWorkoutTypeWhereUniqueInput } from "./InstructorWorkoutTypeWhereUniqueInput";

@ArgsType()
class DeleteInstructorWorkoutTypeArgs {
  @Field(() => InstructorWorkoutTypeWhereUniqueInput, { nullable: false })
  where!: InstructorWorkoutTypeWhereUniqueInput;
}

export { DeleteInstructorWorkoutTypeArgs };
