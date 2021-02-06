import { PlatformWhereUniqueInput } from "../platform/PlatformWhereUniqueInput";

export type InstructorUpdateInput = {
  about?: string | null;
  imageUrl?: string | null;
  likes?: number;
  name?: string;
  platform?: PlatformWhereUniqueInput;
};
