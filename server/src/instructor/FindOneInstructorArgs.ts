import { ArgsType, Field } from "@nestjs/graphql";
import { InstructorWhereUniqueInput } from "./InstructorWhereUniqueInput";

@ArgsType()
class FindOneInstructorArgs {
  @Field(() => InstructorWhereUniqueInput, { nullable: false })
  where!: InstructorWhereUniqueInput;
}

export { FindOneInstructorArgs };
