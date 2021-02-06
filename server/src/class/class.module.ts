import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { ClassService } from "./class.service";
import { ClassController } from "./class.controller";
import { ClassResolver } from "./class.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [ClassController],
  providers: [ClassService, ClassResolver],
  exports: [ClassService],
})
export class ClassModule {}
