import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import * as errors from "../errors";
import { InstructorService } from "./instructor.service";
import { InstructorCreateInput } from "./InstructorCreateInput";
import { InstructorWhereInput } from "./InstructorWhereInput";
import { InstructorWhereUniqueInput } from "./InstructorWhereUniqueInput";
import { InstructorUpdateInput } from "./InstructorUpdateInput";
import { Instructor } from "./Instructor";

@swagger.ApiBasicAuth()
@swagger.ApiTags("instructors")
@common.Controller("instructors")
export class InstructorController {
  constructor(
    private readonly service: InstructorService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Instructor",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Instructor })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: InstructorCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Instructor> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Instructor",
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
        `providing the properties: ${properties} on ${"Instructor"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: {
        ...data,

        platform: {
          connect: data.platform,
        },
      },
      select: {
        about: true,
        createdAt: true,
        id: true,
        imageUrl: true,
        likes: true,
        name: true,

        platform: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Instructor",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Instructor] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: InstructorWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Instructor[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Instructor",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        about: true,
        createdAt: true,
        id: true,
        imageUrl: true,
        likes: true,
        name: true,

        platform: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Instructor",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Instructor })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: InstructorWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Instructor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Instructor",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        about: true,
        createdAt: true,
        id: true,
        imageUrl: true,
        likes: true,
        name: true,

        platform: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
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
    resource: "Instructor",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Instructor })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: InstructorWhereUniqueInput,
    @common.Body()
    data: InstructorUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Instructor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Instructor",
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
        `providing the properties: ${properties} on ${"Instructor"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: {
          ...data,

          platform: {
            connect: data.platform,
          },
        },
        select: {
          about: true,
          createdAt: true,
          id: true,
          imageUrl: true,
          likes: true,
          name: true,

          platform: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
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
    resource: "Instructor",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Instructor })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: InstructorWhereUniqueInput
  ): Promise<Instructor | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          about: true,
          createdAt: true,
          id: true,
          imageUrl: true,
          likes: true,
          name: true,

          platform: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
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
