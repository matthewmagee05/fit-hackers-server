import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { PlatformModule } from "./platform/platform.module";
import { WorkoutTypeModule } from "./workoutType/workoutType.module";
import { InstructorModule } from "./instructor/instructor.module";
import { InstructorWorkoutTypeModule } from "./instructorWorkoutType/instructorWorkoutType.module";
import { ClassModule } from "./class/class.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    PlatformModule,
    WorkoutTypeModule,
    InstructorModule,
    InstructorWorkoutTypeModule,
    ClassModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
