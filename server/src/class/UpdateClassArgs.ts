import { ArgsType, Field } from "@nestjs/graphql";
import { ClassWhereUniqueInput } from "./ClassWhereUniqueInput";
import { ClassUpdateInput } from "./ClassUpdateInput";

@ArgsType()
class UpdateClassArgs {
  @Field(() => ClassWhereUniqueInput, { nullable: false })
  where!: ClassWhereUniqueInput;
  @Field(() => ClassUpdateInput, { nullable: false })
  data!: ClassUpdateInput;
}

export { UpdateClassArgs };
