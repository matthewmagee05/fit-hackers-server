import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsInt, ValidateNested } from "class-validator";
import { PlatformWhereUniqueInput } from "../platform/PlatformWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class InstructorUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  about?: string | null;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  imageUrl?: string | null;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  likes?: number;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name?: string;
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
}
export { InstructorUpdateInput };
