import { ArgsType, Field } from "@nestjs/graphql";
import { InstructorWhereUniqueInput } from "./InstructorWhereUniqueInput";

@ArgsType()
class DeleteInstructorArgs {
  @Field(() => InstructorWhereUniqueInput, { nullable: false })
  where!: InstructorWhereUniqueInput;
}

export { DeleteInstructorArgs };
