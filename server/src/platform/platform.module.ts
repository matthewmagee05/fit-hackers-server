import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { PlatformService } from "./platform.service";
import { PlatformController } from "./platform.controller";
import { PlatformResolver } from "./platform.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [PlatformController],
  providers: [PlatformService, PlatformResolver],
  exports: [PlatformService],
})
export class PlatformModule {}
