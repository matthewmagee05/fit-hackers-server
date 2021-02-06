import { ArgsType, Field } from "@nestjs/graphql";
import { InstructorWorkoutTypeCreateInput } from "./InstructorWorkoutTypeCreateInput";

@ArgsType()
class CreateInstructorWorkoutTypeArgs {
  @Field(() => InstructorWorkoutTypeCreateInput, { nullable: false })
  data!: InstructorWorkoutTypeCreateInput;
}

export { CreateInstructorWorkoutTypeArgs };
