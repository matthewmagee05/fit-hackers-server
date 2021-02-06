import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { InstructorService } from "./instructor.service";
import { InstructorController } from "./instructor.controller";
import { InstructorResolver } from "./instructor.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [InstructorController],
  providers: [InstructorService, InstructorResolver],
  exports: [InstructorService],
})
export class InstructorModule {}
