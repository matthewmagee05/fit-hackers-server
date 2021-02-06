import { ArgsType, Field } from "@nestjs/graphql";
import { PlatformWhereUniqueInput } from "./PlatformWhereUniqueInput";

@ArgsType()
class DeletePlatformArgs {
  @Field(() => PlatformWhereUniqueInput, { nullable: false })
  where!: PlatformWhereUniqueInput;
}

export { DeletePlatformArgs };
