import { ArgsType, Field } from "@nestjs/graphql";
import { ClassWhereInput } from "./ClassWhereInput";

@ArgsType()
class FindManyClassArgs {
  @Field(() => ClassWhereInput, { nullable: true })
  where?: ClassWhereInput;
}

export { FindManyClassArgs };
