import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneInstructorArgs,
  FindManyInstructorArgs,
  InstructorCreateArgs,
  InstructorUpdateArgs,
  InstructorDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class InstructorService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyInstructorArgs>(
    args: Subset<T, FindManyInstructorArgs>
  ) {
    return this.prisma.instructor.findMany(args);
  }
  findOne<T extends FindOneInstructorArgs>(
    args: Subset<T, FindOneInstructorArgs>
  ) {
    return this.prisma.instructor.findOne(args);
  }
  create<T extends InstructorCreateArgs>(
    args: Subset<T, InstructorCreateArgs>
  ) {
    return this.prisma.instructor.create<T>(args);
  }
  update<T extends InstructorUpdateArgs>(
    args: Subset<T, InstructorUpdateArgs>
  ) {
    return this.prisma.instructor.update<T>(args);
  }
  delete<T extends InstructorDeleteArgs>(
    args: Subset<T, InstructorDeleteArgs>
  ) {
    return this.prisma.instructor.delete(args);
  }
}
