  import { Injectable, NotFoundException } from '@nestjs/common';
  import { CreateDepartmentDto } from './dto/create-department.dto';
  import { UpdateDepartmentDto } from './dto/update-department.dto';
  import { PrismaService } from 'src/db/prisma.service';

  @Injectable()
  export class DepartmentService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createDepartmentDto: CreateDepartmentDto) {
      return this.prisma.department.create({
        data: createDepartmentDto,
      });
    }

    async findAll() {
      return this.prisma.department.findMany({
        include: {
          employees: true,
          devices: true,
        },
      });
    }

    async findOne(id: number) {
      const department = await this.prisma.department.findUnique({
        where: { id },
        include: {
          employees: true,
          devices: true,
        },
      });

      if (!department) {
        throw new NotFoundException(`Department with ID ${id} not found`);
      }

      return department;
    }

    async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
      const exists = await this.prisma.department.findUnique({ where: { id } });

      if (!exists) {
        throw new NotFoundException(`Department with ID ${id} not found`);
      }

      return this.prisma.department.update({
        where: { id },
        data: updateDepartmentDto,
      });
    }

    async remove(id: number) {
      const exists = await this.prisma.department.findUnique({ where: { id } });

      if (!exists) {
        throw new NotFoundException(`Department with ID ${id} not found`);
      }

      return this.prisma.department.delete({ where: { id } });
    }
  }
