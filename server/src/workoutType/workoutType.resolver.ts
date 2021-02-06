import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { WorkoutTypeService } from "./workoutType.service";
import { CreateWorkoutTypeArgs } from "./CreateWorkoutTypeArgs";
import { UpdateWorkoutTypeArgs } from "./UpdateWorkoutTypeArgs";
import { DeleteWorkoutTypeArgs } from "./DeleteWorkoutTypeArgs";
import { FindManyWorkoutTypeArgs } from "./FindManyWorkoutTypeArgs";
import { FindOneWorkoutTypeArgs } from "./FindOneWorkoutTypeArgs";
import { WorkoutType } from "./WorkoutType";

@graphql.Resolver(() => WorkoutType)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class WorkoutTypeResolver {
  constructor(
    private readonly service: WorkoutTypeService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [WorkoutType])
  @nestAccessControl.UseRoles({
    resource: "WorkoutType",
    action: "read",
    possession: "any",
  })
  async workoutTypes(
    @graphql.Args() args: FindManyWorkoutTypeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<WorkoutType[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "WorkoutType",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => WorkoutType, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "WorkoutType",
    action: "read",
    possession: "own",
  })
  async workoutType(
    @graphql.Args() args: FindOneWorkoutTypeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<WorkoutType | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "WorkoutType",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => WorkoutType)
  @nestAccessControl.UseRoles({
    resource: "WorkoutType",
    action: "create",
    possession: "any",
  })
  async createWorkoutType(
    @graphql.Args() args: CreateWorkoutTypeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<WorkoutType> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "WorkoutType",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"WorkoutType"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => WorkoutType)
  @nestAccessControl.UseRoles({
    resource: "WorkoutType",
    action: "update",
    possession: "any",
  })
  async updateWorkoutType(
    @graphql.Args() args: UpdateWorkoutTypeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<WorkoutType | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "WorkoutType",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"WorkoutType"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => WorkoutType)
  @nestAccessControl.UseRoles({
    resource: "WorkoutType",
    action: "delete",
    possession: "any",
  })
  async deleteWorkoutType(
    @graphql.Args() args: DeleteWorkoutTypeArgs
  ): Promise<WorkoutType | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
