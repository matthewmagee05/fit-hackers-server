import { ArgsType, Field } from "@nestjs/graphql";
import { InstructorWhereInput } from "./InstructorWhereInput";

@ArgsType()
class FindManyInstructorArgs {
  @Field(() => InstructorWhereInput, { nullable: true })
  where?: InstructorWhereInput;
}

export { FindManyInstructorArgs };
