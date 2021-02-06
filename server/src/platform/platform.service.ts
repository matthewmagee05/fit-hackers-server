import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOnePlatformArgs,
  FindManyPlatformArgs,
  PlatformCreateArgs,
  PlatformUpdateArgs,
  PlatformDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class PlatformService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyPlatformArgs>(
    args: Subset<T, FindManyPlatformArgs>
  ) {
    return this.prisma.platform.findMany(args);
  }
  findOne<T extends FindOnePlatformArgs>(args: Subset<T, FindOnePlatformArgs>) {
    return this.prisma.platform.findOne(args);
  }
  create<T extends PlatformCreateArgs>(args: Subset<T, PlatformCreateArgs>) {
    return this.prisma.platform.create<T>(args);
  }
  update<T extends PlatformUpdateArgs>(args: Subset<T, PlatformUpdateArgs>) {
    return this.prisma.platform.update<T>(args);
  }
  delete<T extends PlatformDeleteArgs>(args: Subset<T, PlatformDeleteArgs>) {
    return this.prisma.platform.delete(args);
  }
}
