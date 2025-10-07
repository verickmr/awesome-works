import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDeviceDto: CreateDeviceDto) {
      const { employeeId, departmentId, ...rest } = createDeviceDto;
    return this.prisma.device.create({
      data: {
      ...rest,
      ...(employeeId && { employee: { connect: { id: employeeId } } }),
      ...(departmentId && { department: { connect: { id: departmentId } } }),
    },
    });
  }

  async findAll() {
    return this.prisma.device.findMany({
      include: {
        employee: true,
        department: true,
        tickets: true,
      },
    });
  }

  async findOne(id: number) {
    const device = await this.prisma.device.findUnique({
      where: { id },
      include: {
        employee: true,
        department: true,
        tickets: true,
      },
    });

    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }

    return device;
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const exists = await this.prisma.device.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }

    return this.prisma.device.update({
      where: { id },
      data: updateDeviceDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.device.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }

    return this.prisma.device.delete({ where: { id } });
  }
}