import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { InstructorWhereUniqueInput } from "../instructor/InstructorWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { WorkoutTypeWhereUniqueInput } from "../workoutType/WorkoutTypeWhereUniqueInput";
@InputType()
class InstructorWorkoutTypeCreateInput {
  @ApiProperty({
    required: true,
    type: InstructorWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => InstructorWhereUniqueInput)
  @Field(() => InstructorWhereUniqueInput)
  instructor!: InstructorWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: WorkoutTypeWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => WorkoutTypeWhereUniqueInput)
  @IsOptional()
  @Field(() => WorkoutTypeWhereUniqueInput, {
    nullable: true,
  })
  workoutType?: WorkoutTypeWhereUniqueInput | null;
}
export { InstructorWorkoutTypeCreateInput };
