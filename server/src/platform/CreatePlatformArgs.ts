import { ArgsType, Field } from "@nestjs/graphql";
import { PlatformCreateInput } from "./PlatformCreateInput";

@ArgsType()
class CreatePlatformArgs {
  @Field(() => PlatformCreateInput, { nullable: false })
  data!: PlatformCreateInput;
}

export { CreatePlatformArgs };
