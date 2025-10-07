import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDeviceDto {
  @ApiProperty({
    example: 'PC-001',
    description: 'Unique prefix or code identifying the device.',
  })
  @IsString()
  @Length(2, 30)
  prefix: string;

  @ApiProperty({
    example: 'SN123456789',
    description: 'Device serial number.',
  })
  @IsString()
  @Length(5, 50)
  serialNumber: string;

  @ApiProperty({
    example: '123456789012345',
    description: 'Device IMEI (if applicable).',
    required: false,
  })
  @IsString()
  imei: string;

  @ApiPropertyOptional({
    example: 'available',
    default: 'available',
    description: 'Current status of the device.',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Associated employee ID, if the device is assigned.',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  employeeId?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'Department ID responsible for the device.',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  departmentId?: number;
}
