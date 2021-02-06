import { ArgsType, Field } from "@nestjs/graphql";
import { PlatformWhereUniqueInput } from "./PlatformWhereUniqueInput";
import { PlatformUpdateInput } from "./PlatformUpdateInput";

@ArgsType()
class UpdatePlatformArgs {
  @Field(() => PlatformWhereUniqueInput, { nullable: false })
  where!: PlatformWhereUniqueInput;
  @Field(() => PlatformUpdateInput, { nullable: false })
  data!: PlatformUpdateInput;
}

export { UpdatePlatformArgs };
