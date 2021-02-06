import { ArgsType, Field } from "@nestjs/graphql";
import { PlatformWhereUniqueInput } from "./PlatformWhereUniqueInput";

@ArgsType()
class FindOnePlatformArgs {
  @Field(() => PlatformWhereUniqueInput, { nullable: false })
  where!: PlatformWhereUniqueInput;
}

export { FindOnePlatformArgs };
