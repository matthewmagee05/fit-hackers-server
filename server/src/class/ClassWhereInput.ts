import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type, Transform } from "class-transformer";
import { InstructorWhereUniqueInput } from "../instructor/InstructorWhereUniqueInput";
import { PlatformWhereUniqueInput } from "../platform/PlatformWhereUniqueInput";
import { WorkoutTypeWhereUniqueInput } from "../workoutType/WorkoutTypeWhereUniqueInput";
@InputType()
class ClassWhereInput {
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  createdAt?: Date;
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
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  id?: string;
  @ApiProperty({
    required: false,
    type: InstructorWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => InstructorWhereUniqueInput)
  @IsOptional()
  instructor?: InstructorWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: PlatformWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => PlatformWhereUniqueInput)
  @IsOptional()
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
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt?: Date;
  @ApiProperty({
    required: false,
    type: WorkoutTypeWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => WorkoutTypeWhereUniqueInput)
  @IsOptional()
  workoutType?: WorkoutTypeWhereUniqueInput;
}
export { ClassWhereInput };
