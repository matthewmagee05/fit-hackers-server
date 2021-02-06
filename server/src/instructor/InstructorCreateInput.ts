import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsInt, ValidateNested } from "class-validator";
import { PlatformWhereUniqueInput } from "../platform/PlatformWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class InstructorCreateInput {
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
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  likes!: number;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;
  @ApiProperty({
    required: true,
    type: PlatformWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PlatformWhereUniqueInput)
  @Field(() => PlatformWhereUniqueInput)
  platform!: PlatformWhereUniqueInput;
}
export { InstructorCreateInput };
