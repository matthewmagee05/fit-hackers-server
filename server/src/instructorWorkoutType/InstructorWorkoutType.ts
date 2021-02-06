import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { InstructorWhereUniqueInput } from "../instructor/InstructorWhereUniqueInput";
import { WorkoutTypeWhereUniqueInput } from "../workoutType/WorkoutTypeWhereUniqueInput";
@ObjectType()
class InstructorWorkoutType {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
  @ApiProperty({
    required: true,
    type: InstructorWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => InstructorWhereUniqueInput)
  instructor!: InstructorWhereUniqueInput;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
  @ApiProperty({
    required: false,
    type: WorkoutTypeWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => WorkoutTypeWhereUniqueInput)
  @IsOptional()
  workoutType!: WorkoutTypeWhereUniqueInput | null;
}
export { InstructorWorkoutType };
