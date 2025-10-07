import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTicketDto {
  @ApiProperty({ example: 'Monitor not working' ,
    description: 'Short title for the ticket'})
  @IsString()
  @Length(3, 100)
  title: string;

  @ApiProperty({  example: 'The screen goes black after turning on',
    description: 'Detailed description of the issue',
    required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'open',
    description: 'Ticket status', default: 'open' })
  @IsOptional()
  @IsString()
  status?: string;

    @ApiPropertyOptional({
    example: 'João Rodrigues',
    description: 'Technician responsible for the ticket',
  })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  technician?: string;

  @ApiProperty({
    example: 1,
    description: 'Employee ID who opened the ticket',
   })
  @Type(() => Number)
  @IsInt()
  employeeId: number;

  @ApiProperty({ example: 5,
    description: 'Device ID related to the ticket',
   })
  @Type(() => Number)
  @IsInt()
  deviceId: number;
}
