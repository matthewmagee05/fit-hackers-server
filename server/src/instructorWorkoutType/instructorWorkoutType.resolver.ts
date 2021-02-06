import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { InstructorWorkoutTypeService } from "./instructorWorkoutType.service";
import { CreateInstructorWorkoutTypeArgs } from "./CreateInstructorWorkoutTypeArgs";
import { UpdateInstructorWorkoutTypeArgs } from "./UpdateInstructorWorkoutTypeArgs";
import { DeleteInstructorWorkoutTypeArgs } from "./DeleteInstructorWorkoutTypeArgs";
import { FindManyInstructorWorkoutTypeArgs } from "./FindManyInstructorWorkoutTypeArgs";
import { FindOneInstructorWorkoutTypeArgs } from "./FindOneInstructorWorkoutTypeArgs";
import { InstructorWorkoutType } from "./InstructorWorkoutType";
import { Instructor } from "../instructor/Instructor";
import { WorkoutType } from "../workoutType/WorkoutType";

@graphql.Resolver(() => InstructorWorkoutType)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class InstructorWorkoutTypeResolver {
  constructor(
    private readonly service: InstructorWorkoutTypeService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [InstructorWorkoutType])
  @nestAccessControl.UseRoles({
    resource: "InstructorWorkoutType",
    action: "read",
    possession: "any",
  })
  async instructorWorkoutTypes(
    @graphql.Args() args: FindManyInstructorWorkoutTypeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InstructorWorkoutType[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "InstructorWorkoutType",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => InstructorWorkoutType, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "InstructorWorkoutType",
    action: "read",
    possession: "own",
  })
  async instructorWorkoutType(
    @graphql.Args() args: FindOneInstructorWorkoutTypeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InstructorWorkoutType | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "InstructorWorkoutType",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => InstructorWorkoutType)
  @nestAccessControl.UseRoles({
    resource: "InstructorWorkoutType",
    action: "create",
    possession: "any",
  })
  async createInstructorWorkoutType(
    @graphql.Args() args: CreateInstructorWorkoutTypeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InstructorWorkoutType> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "InstructorWorkoutType",
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
        `providing the properties: ${properties} on ${"InstructorWorkoutType"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        instructor: {
          connect: args.data.instructor,
        },

        workoutType: args.data.workoutType
          ? {
              connect: args.data.workoutType,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => InstructorWorkoutType)
  @nestAccessControl.UseRoles({
    resource: "InstructorWorkoutType",
    action: "update",
    possession: "any",
  })
  async updateInstructorWorkoutType(
    @graphql.Args() args: UpdateInstructorWorkoutTypeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InstructorWorkoutType | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "InstructorWorkoutType",
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
        `providing the properties: ${properties} on ${"InstructorWorkoutType"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          instructor: {
            connect: args.data.instructor,
          },

          workoutType: args.data.workoutType
            ? {
                connect: args.data.workoutType,
              }
            : undefined,
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

  @graphql.Mutation(() => InstructorWorkoutType)
  @nestAccessControl.UseRoles({
    resource: "InstructorWorkoutType",
    action: "delete",
    possession: "any",
  })
  async deleteInstructorWorkoutType(
    @graphql.Args() args: DeleteInstructorWorkoutTypeArgs
  ): Promise<InstructorWorkoutType | null> {
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

  @graphql.ResolveField(() => Instructor, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "InstructorWorkoutType",
    action: "read",
    possession: "any",
  })
  async instructor(
    @graphql.Parent() parent: InstructorWorkoutType,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Instructor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Instructor",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .instructor();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => WorkoutType, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "InstructorWorkoutType",
    action: "read",
    possession: "any",
  })
  async workoutType(
    @graphql.Parent() parent: InstructorWorkoutType,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<WorkoutType | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "WorkoutType",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .workoutType();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
