import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { PlatformService } from "./platform.service";
import { CreatePlatformArgs } from "./CreatePlatformArgs";
import { UpdatePlatformArgs } from "./UpdatePlatformArgs";
import { DeletePlatformArgs } from "./DeletePlatformArgs";
import { FindManyPlatformArgs } from "./FindManyPlatformArgs";
import { FindOnePlatformArgs } from "./FindOnePlatformArgs";
import { Platform } from "./Platform";

@graphql.Resolver(() => Platform)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PlatformResolver {
  constructor(
    private readonly service: PlatformService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Platform])
  @nestAccessControl.UseRoles({
    resource: "Platform",
    action: "read",
    possession: "any",
  })
  async platforms(
    @graphql.Args() args: FindManyPlatformArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Platform[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Platform",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Platform, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Platform",
    action: "read",
    possession: "own",
  })
  async platform(
    @graphql.Args() args: FindOnePlatformArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Platform | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Platform",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Platform)
  @nestAccessControl.UseRoles({
    resource: "Platform",
    action: "create",
    possession: "any",
  })
  async createPlatform(
    @graphql.Args() args: CreatePlatformArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Platform> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Platform",
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
        `providing the properties: ${properties} on ${"Platform"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Platform)
  @nestAccessControl.UseRoles({
    resource: "Platform",
    action: "update",
    possession: "any",
  })
  async updatePlatform(
    @graphql.Args() args: UpdatePlatformArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Platform | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Platform",
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
        `providing the properties: ${properties} on ${"Platform"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Platform)
  @nestAccessControl.UseRoles({
    resource: "Platform",
    action: "delete",
    possession: "any",
  })
  async deletePlatform(
    @graphql.Args() args: DeletePlatformArgs
  ): Promise<Platform | null> {
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
