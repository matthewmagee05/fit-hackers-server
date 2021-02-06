import { ArgsType, Field } from "@nestjs/graphql";
import { ClassCreateInput } from "./ClassCreateInput";

@ArgsType()
class CreateClassArgs {
  @Field(() => ClassCreateInput, { nullable: false })
  data!: ClassCreateInput;
}

export { CreateClassArgs };
