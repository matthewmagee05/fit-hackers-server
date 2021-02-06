import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneWorkoutTypeArgs,
  FindManyWorkoutTypeArgs,
  WorkoutTypeCreateArgs,
  WorkoutTypeUpdateArgs,
  WorkoutTypeDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class WorkoutTypeService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyWorkoutTypeArgs>(
    args: Subset<T, FindManyWorkoutTypeArgs>
  ) {
    return this.prisma.workoutType.findMany(args);
  }
  findOne<T extends FindOneWorkoutTypeArgs>(
    args: Subset<T, FindOneWorkoutTypeArgs>
  ) {
    return this.prisma.workoutType.findOne(args);
  }
  create<T extends WorkoutTypeCreateArgs>(
    args: Subset<T, WorkoutTypeCreateArgs>
  ) {
    return this.prisma.workoutType.create<T>(args);
  }
  update<T extends WorkoutTypeUpdateArgs>(
    args: Subset<T, WorkoutTypeUpdateArgs>
  ) {
    return this.prisma.workoutType.update<T>(args);
  }
  delete<T extends WorkoutTypeDeleteArgs>(
    args: Subset<T, WorkoutTypeDeleteArgs>
  ) {
    return this.prisma.workoutType.delete(args);
  }
}
