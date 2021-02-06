import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { WorkoutTypeService } from "./workoutType.service";
import { WorkoutTypeController } from "./workoutType.controller";
import { WorkoutTypeResolver } from "./workoutType.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [WorkoutTypeController],
  providers: [WorkoutTypeService, WorkoutTypeResolver],
  exports: [WorkoutTypeService],
})
export class WorkoutTypeModule {}
