import { PartialType } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiPropertyOptional({ example: 'closed', description: 'Ticket status' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: '2025-10-07T12:00:00.000Z', description: 'Date when the ticket was closed' })
  @IsOptional()
  closedAt?: Date;
}