import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested, IsDate } from "class-validator";
import { InstructorWhereUniqueInput } from "../instructor/InstructorWhereUniqueInput";
import { Type } from "class-transformer";
import { PlatformWhereUniqueInput } from "../platform/PlatformWhereUniqueInput";
import { WorkoutTypeWhereUniqueInput } from "../workoutType/WorkoutTypeWhereUniqueInput";
@InputType()
class ClassUpdateInput {
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
    required: false,
    type: PlatformWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PlatformWhereUniqueInput)
  @IsOptional()
  @Field(() => PlatformWhereUniqueInput, {
    nullable: true,
  })
  platform?: PlatformWhereUniqueInput;
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  time?: Date;
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
  workoutType?: WorkoutTypeWhereUniqueInput;
}
export { ClassUpdateInput };
