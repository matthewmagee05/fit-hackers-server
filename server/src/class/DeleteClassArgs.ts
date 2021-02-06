import { ArgsType, Field } from "@nestjs/graphql";
import { ClassWhereUniqueInput } from "./ClassWhereUniqueInput";

@ArgsType()
class DeleteClassArgs {
  @Field(() => ClassWhereUniqueInput, { nullable: false })
  where!: ClassWhereUniqueInput;
}

export { DeleteClassArgs };
