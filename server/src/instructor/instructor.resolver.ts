import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { InstructorService } from "./instructor.service";
import { CreateInstructorArgs } from "./CreateInstructorArgs";
import { UpdateInstructorArgs } from "./UpdateInstructorArgs";
import { DeleteInstructorArgs } from "./DeleteInstructorArgs";
import { FindManyInstructorArgs } from "./FindManyInstructorArgs";
import { FindOneInstructorArgs } from "./FindOneInstructorArgs";
import { Instructor } from "./Instructor";
import { Platform } from "../platform/Platform";

@graphql.Resolver(() => Instructor)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class InstructorResolver {
  constructor(
    private readonly service: InstructorService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Instructor])
  @nestAccessControl.UseRoles({
    resource: "Instructor",
    action: "read",
    possession: "any",
  })
  async instructors(
    @graphql.Args() args: FindManyInstructorArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Instructor[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Instructor",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Instructor, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Instructor",
    action: "read",
    possession: "own",
  })
  async instructor(
    @graphql.Args() args: FindOneInstructorArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Instructor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Instructor",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Instructor)
  @nestAccessControl.UseRoles({
    resource: "Instructor",
    action: "create",
    possession: "any",
  })
  async createInstructor(
    @graphql.Args() args: CreateInstructorArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Instructor> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Instructor",
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
        `providing the properties: ${properties} on ${"Instructor"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        platform: {
          connect: args.data.platform,
        },
      },
    });
  }

  @graphql.Mutation(() => Instructor)
  @nestAccessControl.UseRoles({
    resource: "Instructor",
    action: "update",
    possession: "any",
  })
  async updateInstructor(
    @graphql.Args() args: UpdateInstructorArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Instructor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Instructor",
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
        `providing the properties: ${properties} on ${"Instructor"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          platform: {
            connect: args.data.platform,
          },
        },
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

  @graphql.Mutation(() => Instructor)
  @nestAccessControl.UseRoles({
    resource: "Instructor",
    action: "delete",
    possession: "any",
  })
  async deleteInstructor(
    @graphql.Args() args: DeleteInstructorArgs
  ): Promise<Instructor | null> {
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

  @graphql.ResolveField(() => Platform, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Instructor",
    action: "read",
    possession: "any",
  })
  async platform(
    @graphql.Parent() parent: Instructor,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Platform | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Platform",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .platform();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
