import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll() {
    return this.prisma.employee.findMany({
      include: {
        department: true,
        devices: true,
        tickets: true,
      },
    });
  }

  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
        devices: true,
        tickets: true,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const exists = await this.prisma.employee.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.employee.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return this.prisma.employee.delete({ where: { id } });
  }
}