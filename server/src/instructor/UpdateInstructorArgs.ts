import { ArgsType, Field } from "@nestjs/graphql";
import { InstructorWhereUniqueInput } from "./InstructorWhereUniqueInput";
import { InstructorUpdateInput } from "./InstructorUpdateInput";

@ArgsType()
class UpdateInstructorArgs {
  @Field(() => InstructorWhereUniqueInput, { nullable: false })
  where!: InstructorWhereUniqueInput;
  @Field(() => InstructorUpdateInput, { nullable: false })
  data!: InstructorUpdateInput;
}

export { UpdateInstructorArgs };
