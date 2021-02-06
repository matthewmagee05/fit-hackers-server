import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { InstructorWorkoutTypeService } from "./instructorWorkoutType.service";
import { InstructorWorkoutTypeCreateInput } from "./InstructorWorkoutTypeCreateInput";
import { InstructorWorkoutTypeWhereInput } from "./InstructorWorkoutTypeWhereInput";
import { InstructorWorkoutTypeWhereUniqueInput } from "./InstructorWorkoutTypeWhereUniqueInput";
import { InstructorWorkoutTypeUpdateInput } from "./InstructorWorkoutTypeUpdateInput";
import { InstructorWorkoutType } from "./InstructorWorkoutType";

@swagger.ApiBasicAuth()
@swagger.ApiTags("instructor-workout-types")
@common.Controller("instructor-workout-types")
export class InstructorWorkoutTypeController {
  constructor(
    private readonly service: InstructorWorkoutTypeService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "InstructorWorkoutType",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: InstructorWorkoutType })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: InstructorWorkoutTypeCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<InstructorWorkoutType> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "InstructorWorkoutType",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"InstructorWorkoutType"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        instructor: {
          connect: data.instructor,
        },

        workoutType: data.workoutType
          ? {
              connect: data.workoutType,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,

        instructor: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        workoutType: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "InstructorWorkoutType",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [InstructorWorkoutType] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: InstructorWorkoutTypeWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<InstructorWorkoutType[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "InstructorWorkoutType",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        createdAt: true,
        id: true,

        instructor: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        workoutType: {
          select: {
            id: true,
          },
        },
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "InstructorWorkoutType",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: InstructorWorkoutType })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: InstructorWorkoutTypeWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<InstructorWorkoutType | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "InstructorWorkoutType",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        createdAt: true,
        id: true,

        instructor: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        workoutType: {
          select: {
            id: true,
          },
        },
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "InstructorWorkoutType",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: InstructorWorkoutType })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: InstructorWorkoutTypeWhereUniqueInput,
    @common.Body()
    data: InstructorWorkoutTypeUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<InstructorWorkoutType | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "InstructorWorkoutType",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"InstructorWorkoutType"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          instructor: {
            connect: data.instructor,
          },

          workoutType: data.workoutType
            ? {
                connect: data.workoutType,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          id: true,

          instructor: {
            select: {
              id: true,
            },
          },

          updatedAt: true,

          workoutType: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "InstructorWorkoutType",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: InstructorWorkoutType })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: InstructorWorkoutTypeWhereUniqueInput
  ): Promise<InstructorWorkoutType | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          createdAt: true,
          id: true,

          instructor: {
            select: {
              id: true,
            },
          },

          updatedAt: true,

          workoutType: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
