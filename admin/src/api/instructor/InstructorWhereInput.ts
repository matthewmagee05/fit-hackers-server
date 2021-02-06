import { PlatformWhereUniqueInput } from "../platform/PlatformWhereUniqueInput";

export type InstructorWhereInput = {
  about?: string | null;
  createdAt?: Date;
  id?: string;
  imageUrl?: string | null;
  likes?: number;
  name?: string;
  platform?: PlatformWhereUniqueInput;
  updatedAt?: Date;
};
