import { ArgsType, Field } from "@nestjs/graphql";
import { InstructorCreateInput } from "./InstructorCreateInput";

@ArgsType()
class CreateInstructorArgs {
  @Field(() => InstructorCreateInput, { nullable: false })
  data!: InstructorCreateInput;
}

export { CreateInstructorArgs };
