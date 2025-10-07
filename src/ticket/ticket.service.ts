import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
  const { employeeId, deviceId, ...rest } = createTicketDto;
  return this.prisma.ticket.create({
    data: {
      ...rest,
      ...(employeeId && { employee: { connect: { id: employeeId } } }),
      device: { connect: { id: deviceId } },
    },
  });
}

  async findAll() {
    return this.prisma.ticket.findMany({
      include: {
        employee: true,
        device: true,
      },
    });
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        employee: true,
        device: true,
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const exists = await this.prisma.ticket.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.ticket.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return this.prisma.ticket.delete({ where: { id } });
  }
}