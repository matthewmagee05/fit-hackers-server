import { ArgsType, Field } from "@nestjs/graphql";
import { PlatformWhereInput } from "./PlatformWhereInput";

@ArgsType()
class FindManyPlatformArgs {
  @Field(() => PlatformWhereInput, { nullable: true })
  where?: PlatformWhereInput;
}

export { FindManyPlatformArgs };
