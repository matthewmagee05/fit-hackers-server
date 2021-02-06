import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested, IsDate } from "class-validator";
import { InstructorWhereUniqueInput } from "../instructor/InstructorWhereUniqueInput";
import { Type } from "class-transformer";
import { PlatformWhereUniqueInput } from "../platform/PlatformWhereUniqueInput";
import { WorkoutTypeWhereUniqueInput } from "../workoutType/WorkoutTypeWhereUniqueInput";
@InputType()
class ClassCreateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  description?: string | null;
  @ApiProperty({
    required: false,
    type: InstructorWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => InstructorWhereUniqueInput)
  @IsOptional()
  @Field(() => InstructorWhereUniqueInput, {
    nullable: true,
  })
  instructor?: InstructorWhereUniqueInput | null;
  @ApiProperty({
    required: true,
    type: PlatformWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PlatformWhereUniqueInput)
  @Field(() => PlatformWhereUniqueInput)
  platform!: PlatformWhereUniqueInput;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  time!: Date;
  @ApiProperty({
    required: true,
    type: WorkoutTypeWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => WorkoutTypeWhereUniqueInput)
  @Field(() => WorkoutTypeWhereUniqueInput)
  workoutType!: WorkoutTypeWhereUniqueInput;
}
export { ClassCreateInput };
