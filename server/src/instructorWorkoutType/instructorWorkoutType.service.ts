import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneInstructorWorkoutTypeArgs,
  FindManyInstructorWorkoutTypeArgs,
  InstructorWorkoutTypeCreateArgs,
  InstructorWorkoutTypeUpdateArgs,
  InstructorWorkoutTypeDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class InstructorWorkoutTypeService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyInstructorWorkoutTypeArgs>(
    args: Subset<T, FindManyInstructorWorkoutTypeArgs>
  ) {
    return this.prisma.instructorWorkoutType.findMany(args);
  }
  findOne<T extends FindOneInstructorWorkoutTypeArgs>(
    args: Subset<T, FindOneInstructorWorkoutTypeArgs>
  ) {
    return this.prisma.instructorWorkoutType.findOne(args);
  }
  create<T extends InstructorWorkoutTypeCreateArgs>(
    args: Subset<T, InstructorWorkoutTypeCreateArgs>
  ) {
    return this.prisma.instructorWorkoutType.create<T>(args);
  }
  update<T extends InstructorWorkoutTypeUpdateArgs>(
    args: Subset<T, InstructorWorkoutTypeUpdateArgs>
  ) {
    return this.prisma.instructorWorkoutType.update<T>(args);
  }
  delete<T extends InstructorWorkoutTypeDeleteArgs>(
    args: Subset<T, InstructorWorkoutTypeDeleteArgs>
  ) {
    return this.prisma.instructorWorkoutType.delete(args);
  }
}
