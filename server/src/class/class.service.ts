import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneClassArgs,
  FindManyClassArgs,
  ClassCreateArgs,
  ClassUpdateArgs,
  ClassDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyClassArgs>(args: Subset<T, FindManyClassArgs>) {
    return this.prisma.class.findMany(args);
  }
  findOne<T extends FindOneClassArgs>(args: Subset<T, FindOneClassArgs>) {
    return this.prisma.class.findOne(args);
  }
  create<T extends ClassCreateArgs>(args: Subset<T, ClassCreateArgs>) {
    return this.prisma.class.create<T>(args);
  }
  update<T extends ClassUpdateArgs>(args: Subset<T, ClassUpdateArgs>) {
    return this.prisma.class.update<T>(args);
  }
  delete<T extends ClassDeleteArgs>(args: Subset<T, ClassDeleteArgs>) {
    return this.prisma.class.delete(args);
  }
}
