import { ArgsType, Field } from "@nestjs/graphql";
import { ClassWhereUniqueInput } from "./ClassWhereUniqueInput";

@ArgsType()
class FindOneClassArgs {
  @Field(() => ClassWhereUniqueInput, { nullable: false })
  where!: ClassWhereUniqueInput;
}

export { FindOneClassArgs };
